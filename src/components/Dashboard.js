'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import {
  Home, FolderOpen, FileText, LogOut, Search, Upload, Edit3, Trash2, 
  MoreVertical, PlusCircle, Heart, MessageCircle, FileImage, 
  FileVideo, FileAudio, File, FileArchive, Moon, Sun, 
  Filter, Tag, Star, Bell, Download, Users, Settings, 
  Hash, ChevronDown, ChevronUp, X, Check, Clipboard
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/Dialog'
import { Input } from './ui/Input'
import Textarea from './ui/Textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/Dropdown-menu'

// Utility Functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// File Type Icons Mapping
const FileTypeIcons = {
  'image': FileImage,
  'video': FileVideo,
  'audio': FileAudio,
  'application/pdf': FileText,
  'application/zip': FileArchive,
  'default': File
}

// Navigation Bar Component
const NavigationBar = ({ activeTab, onTabChange, isDarkMode, toggleTheme, onLogout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className={`fixed left-0 top-0 h-full w-20 ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'} border-r shadow-sm flex flex-col transition-colors z-50`}>
      <div className="p-4 flex justify-center items-center">
        <div className={`w-10 h-10 ${isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-600 text-white'} rounded-lg flex items-center justify-center font-bold text-sm`}>
          LA
        </div>
      </div>
      
      <nav className="flex-grow flex flex-col space-y-4 p-4">
        {[
          { tab: 'dashboard', icon: Home, tooltip: 'Dashboard' },
          { tab: 'files', icon: FolderOpen, tooltip: 'Files' },
          { tab: 'posts', icon: FileText, tooltip: 'Posts' },
          { tab: 'team', icon: Users, tooltip: 'Team' }
        ].map(({ tab, icon: Icon, tooltip }) => (
          <TooltipProvider key={tab}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTabChange(tab)}
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${activeTab === tab 
                      ? `${isDarkMode ? 'bg-emerald-800 text-white' : 'bg-emerald-600 text-white'}` 
                      : `${isDarkMode ? 'text-neutral-400 hover:bg-neutral-800' : 'text-neutral-500 hover:bg-neutral-100'} hover:text-emerald-600`
                    }
                  `}
                >
                  <Icon className="w-6 h-6" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <div className="p-4 space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button 
                onClick={toggleTheme}
                whileHover={{ rotate: 180 }}
                className={`${isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-500 hover:text-emerald-600'}`}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Toggle Theme
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                whileHover={{ scale: 1.1 }}
                className={`${isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-500 hover:text-emerald-600'}`}
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button 
                onClick={onLogout}
                whileHover={{ rotate: 180 }}
                className={`${isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-500 hover:text-emerald-600'}`}
              >
                <LogOut className="w-6 h-6" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

// File Preview Component
const FilePreview = ({ file, isDarkMode }) => {
  const renderPreview = () => {
    if (!file || !file.url) return null

    const fileType = file.type || ''
    const mainType = fileType.split('/')[0]
    const subType = fileType.split('/')[1]

    const FileIcon = FileTypeIcons[mainType] || FileTypeIcons[`${mainType}/${subType}`] || FileTypeIcons['default']

    switch (mainType) {
      case 'image':
        return (
          <div className={`w-full h-40 overflow-hidden rounded-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'} flex items-center justify-center`}>
            <img 
              src={file.url} 
              alt={file.name} 
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}">
                    Image cannot be previewed
                  </div>
                `
              }}
              className="w-full h-full object-cover hover:scale-110 transition-transform"
            />
          </div>
        )
      
      case 'video':
        return (
          <video 
            src={file.url} 
            controls 
            className={`w-full h-40 rounded-lg ${isDarkMode ? 'bg-neutral-900' : 'bg-black'}`}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentNode.innerHTML = `
                <div class="w-full h-40 flex items-center justify-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}">
                  Video cannot be previewed
                </div>
              `
            }}
          />
        )
      
      default:
        return (
          <div className={`w-full h-40 ${isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'} flex items-center justify-center rounded-lg`}>
            <FileIcon className={`w-16 h-16 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
          </div>
        )
    }
  }

  return (
    <div className="w-full h-40 mb-3">
      {renderPreview()}
    </div>
  )
}

// File Card Component
const FileCard = ({ file, onEdit, onDelete, onCopy, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false)
  const FileTypeIcon = FileTypeIcons[file.type?.split('/')[0]] || FileTypeIcons[file.type] || FileTypeIcons['default']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'} border rounded-xl p-4 space-y-3 relative group shadow-sm hover:shadow-md transition-shadow`}
    >
      <FilePreview file={file} isDarkMode={isDarkMode} />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileTypeIcon className={`w-5 h-5 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'} truncate max-w-[200px]`}>
            {file?.name || 'Unnamed File'}
          </span>
        </div>

        <div 
          className={`flex space-x-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onCopy(file)}
                  className={`${isDarkMode ? 'text-neutral-400 hover:text-emerald-600' : 'text-neutral-500 hover:text-emerald-600'} transition-colors`}
                  aria-label="Copy file link"
                >
                  <Clipboard className="w-4 h-4" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                Copy File Link
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={onEdit}
                  className={`${isDarkMode ? 'text-neutral-400 hover:text-emerald-600' : 'text-neutral-500 hover:text-emerald-600'} transition-colors`}
                  aria-label="Edit file"
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                Edit File
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={onDelete}
                  className={`${isDarkMode ? 'text-red-500 hover:text-red-400' : 'text-red-500 hover:text-red-700'} transition-colors`}
                  aria-label="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                Delete File
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className={`flex justify-between text-xs ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'} mt-2`}>
        <span>{file?.type || 'Unknown Type'}</span>
        <div className="flex space-x-2">
          <span>{formatFileSize(file?.size || 0)}</span>
          <span>•</span>
          <span>{formatDate(file?.uploadDate)}</span>
        </div>
      </div>
    </motion.div>
  )
}

// File Upload Modal
const FileUploadModal = ({ isOpen, onClose, onUpload, isDarkMode }) => {
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
      onClose()
      setFile(null)
      setFilePreview(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : ''}`}>
        <DialogHeader>
          <DialogTitle className={isDarkMode ? 'text-neutral-100' : ''}>Upload File</DialogTitle>
          <DialogDescription className={isDarkMode ? 'text-neutral-400' : ''}>
            Drag and drop or click to select a file to upload
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div 
            onClick={() => fileInputRef.current.click()}
            className={`border-2 border-dashed ${
              isDarkMode 
                ? 'border-emerald-800 text-neutral-400 hover:bg-neutral-800' 
                : 'border-emerald-600 text-neutral-500 hover:bg-neutral-50'
            } rounded-lg p-6 text-center cursor-pointer transition relative`}
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple={false}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3,.zip"
            />
            {filePreview ? (
              <div className="w-full h-48 flex items-center justify-center">
                <img 
                  src={filePreview} 
                  alt="File preview" 
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Upload className={`w-10 h-10 ${isDarkMode ? 'text-emerald-700' : 'text-emerald-600'}`} />
                <p>Click or drag file to upload</p>
                <p className="text-xs text-neutral-500">Supported: PDF, DOC, Image, Video, Audio</p>
              </div>
            )}
          </div>
          <Button 
            onClick={handleUpload} 
            className={`w-full ${
              isDarkMode 
                ? 'bg-emerald-800 hover:bg-emerald-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            disabled={!file}
          >
            Upload File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// File Filter and Sort Dropdown
const FileFilterDropdown = ({ isDarkMode, onFilterChange }) => {
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const handleFilterChange = (type) => {
    setFilterType(type)
    onFilterChange({ type, sortBy })
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
    onFilterChange({ type: filterType, sortBy: sort })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter & Sort</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : ''}>
        <div className="p-2">
          <p className={`text-xs mb-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>File Type</p>
          {['all', 'image', 'video', 'document', 'audio'].map((type) => (
            <DropdownMenuItem 
              key={type}
              onSelect={() => handleFilterChange(type)}
              className={`cursor-pointer ${
                filterType === type 
                  ? `${isDarkMode ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}` 
                  : `${isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </DropdownMenuItem>
          ))}
          
          <div className="border-t my-2 border-neutral-200 dark:border-neutral-800"></div>
          
          <p className={`text-xs mb-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Sort By</p>
          {['date', 'name', 'size'].map((sort) => (
            <DropdownMenuItem 
              key={sort}
              onSelect={() => handleSortChange(sort)}
              className={`cursor-pointer ${
                sortBy === sort 
                  ? `${isDarkMode ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}` 
                  : `${isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`
              }`}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Main Application Component
export default function EnhancedModernArchive() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('files')
  const [searchTerm, setSearchTerm] = useState('')
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Conference_Recording_2023.mp4',
      type: 'video/mp4',
      size: 256 * 1024 * 1024, // 256 MB
      url: '', // Add a valid URL if you want to preview
      uploadDate: '2024-03-01'
    },
    {
      id: 2,
      name: 'Religious_Teachings.pdf',
      type: 'application/pdf',
      size: 12 * 1024 * 1024, // 12 MB
      url: '', // Add a valid URL if you want to preview
      uploadDate: '2024-03-02'
    },
    {
      id: 3,
      name: 'Project_Presentation.pptx',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: 5 * 1024 * 1024, // 5 MB
      url: '',
      uploadDate: '2024-02-15'
    }
  ])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [fileFilter, setFileFilter] = useState({ type: 'all', sortBy: 'date' })

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // File upload handler
  const handleFileUpload = (file) => {
    const newFile = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString().split('T')[0]
    }
    setFiles(prevFiles => [...prevFiles, newFile])
  }

  // File delete handler
  const handleDeleteFile = (fileId) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId))
  }

  // Copy file link handler
  const handleCopyFileLink = (file) => {
    navigator.clipboard.writeText(file.url)
      .then(() => {
        // You could add a toast notification here
        console.log('File link copied!')
      })
      .catch(err => {
        console.error('Failed to copy file link', err)
      })
  }

  // Filtered and sorted files
  const processedFiles = useMemo(() => {
    let filteredFiles = files.filter(file => {
      // Search filter
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Type filter
      const matchesType = fileFilter.type === 'all' || 
        (fileFilter.type === 'image' && file.type.startsWith('image/')) ||
        (fileFilter.type === 'video' && file.type.startsWith('video/')) ||
        (fileFilter.type === 'document' && (file.type.includes('pdf') || file.type.includes('document'))) ||
        (fileFilter.type === 'audio' && file.type.startsWith('audio/'))

      return matchesSearch && matchesType
    })

    // Sorting
    return filteredFiles.sort((a, b) => {
      switch (fileFilter.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'size':
          return b.size - a.size
        case 'date':
        default:
          return new Date(b.uploadDate) - new Date(a.uploadDate)
      }
    })
  }, [files, searchTerm, fileFilter])

  // Logout handler (placeholder)
  const handleLogout = () => {
    // Implement actual logout logic
    console.log('Logging out...')
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      isDarkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'
    }`}>
      {/* Navigation Bar */}
      <NavigationBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow pl-20">
        {/* Top Bar with Search and Filters */}
        <div className={`pl-6 pr-6 h-16 flex items-center justify-between border-b ${
          isDarkMode ? 'border-neutral-800' : 'border-neutral-100'
        }`}>
          <div className="flex items-center space-x-4 w-full">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
              <Input 
                placeholder="Search files..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-100 placeholder-neutral-600' 
                    : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            {/* Filter Dropdown */}
            <FileFilterDropdown 
              isDarkMode={isDarkMode} 
              onFilterChange={setFileFilter}
            />

            {/* Upload Button */}
            <motion.button
              onClick={() => setIsUploadModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Upload
            </motion.button>
          </div>
        </div>

        {/* Files Grid */}
        <div className="p-6">
          <AnimatePresence>
            {processedFiles.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-12 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-600'}`}
              >
                <FolderOpen className={`mx-auto w-16 h-16 mb-4 ${isDarkMode ? 'text-neutral-700' : 'text-neutral-300'}`} />
                <p>No files found</p>
                <p className="text-sm mt-2">Upload a file to get started</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {processedFiles.map(file => (
                  <FileCard 
                    key={file.id}
                    file={file}
                    isDarkMode={isDarkMode}
                    onEdit={() => {/* Implement edit functionality */}}
                    onDelete={() => handleDeleteFile(file.id)}
                    onCopy={() => handleCopyFileLink(file)}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* File Upload Modal */}
        <FileUploadModal 
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleFileUpload}
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  )
}