'use client'

import React, { useState, useRef } from 'react'
import {
  Home,
  FileText,
  Folder,
  LogOut,
  Bell,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Edit,
  Paperclip,
  X,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/Dialog"
import { Button } from "./ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/Dropdown-menu"
import { Input } from "./ui/Input"
import Textarea from "./ui/Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"

const ITEMS_PER_PAGE = 5

const Sidebar = ({ activeTab, onTabChange }) => (
  <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
    <div className="p-6">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
        <span className="text-xl font-bold">Layene Archive</span>
      </div>
    </div>

    <nav className="mt-6">
      {['dashboard', 'files', 'posts'].map((tab) => (
        <SidebarLink 
          key={tab}
          icon={tab === 'dashboard' ? Home : tab === 'files' ? Folder : FileText} 
          label={tab.charAt(0).toUpperCase() + tab.slice(1)} 
          active={activeTab === tab} 
          onClick={() => onTabChange(tab)}
        />
      ))}
    </nav>

    <div className="absolute bottom-4 w-full px-6">
      <SidebarLink icon={LogOut} label="Log out" />
    </div>
  </div>
)

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <div 
    className={`flex items-center space-x-3 px-6 py-3 cursor-pointer ${
      active ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span className={active ? 'font-medium' : ''}>{label}</span>
  </div>
)

const Header = ({ searchTerm, onSearchChange }) => (
  <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
    <div className="flex items-center flex-1 ml-64">
      <div className="relative w-96">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search files and posts..."
          className="w-full pl-10"
        />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <button className="p-2 text-gray-400 hover:text-gray-600">
        <Bell className="w-5 h-5" />
      </button>
      <div className="flex items-center space-x-2">
        <img
          src="/placeholder.svg?height=32&width=32"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">Admin</span>
      </div>
    </div>
  </div>
)

const FileUploadModal = ({ isOpen, onClose, onUpload, initialFile = null }) => {
  const [file, setFile] = useState(initialFile ? initialFile : null)
  const [fileType, setFileType] = useState(initialFile ? initialFile.type : 'document')

  const handleUpload = () => {
    if (!file) return
    
    const newFile = {
      id: initialFile ? initialFile.id : Date.now(),
      name: file.name,
      type: fileType,
      size: `${Math.round(file.size / 1024)} KB`,
      uploadDate: new Date().toISOString().split('T')[0],
      posts: initialFile ? initialFile.posts : 0,
      url: URL.createObjectURL(file) // Create a local URL for the file
    }
    
    onUpload(newFile)
    onClose()
    setFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialFile ? 'Edit File' : 'Upload New File'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">File Type</label>
            <Select value={fileType} onValueChange={setFileType}>
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">File</label>
            <Input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpload} disabled={!file}>
            {initialFile ? 'Update' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const CreatePostModal = ({ isOpen, onClose, onSave, files }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [newFiles, setNewFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleSave = () => {
    if (!title || !content) return
    
    const newPost = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      files: [...selectedFiles, ...newFiles]
    }
    
    onSave(newPost)
    onClose()
    setTitle('')
    setContent('')
    setSelectedFiles([])
    setNewFiles([])
  }

  const handleFileSelect = (file) => {
    setSelectedFiles(prev => [...prev, file])
  }

  const handleNewFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: file.type.split('/')[0],
        size: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file)
      }
      setNewFiles(prev => [...prev, newFile])
    }
  }

  const removeFile = (fileToRemove) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileToRemove.id))
    setNewFiles(prev => prev.filter(file => file.id !== fileToRemove.id))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Attach Files</label>
            <div className="flex flex-wrap gap-2">
              {[...selectedFiles, ...newFiles].map(file => (
                <div key={file.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm">{file.name}</span>
                  <button onClick={() => removeFile(file)} className="ml-2 text-gray-500 hover:text-gray-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Select onValueChange={handleFileSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select existing file" />
                </SelectTrigger>
                <SelectContent>
                  {files.map(file => (
                    <SelectItem key={file.id} value={file}>{file.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => fileInputRef.current.click()}>
                <Paperclip className="w-4 h-4 mr-2" />
                Upload New
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleNewFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!title || !content}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const FileManager = ({ files, onDelete, onEdit, typeFilter, onTypeFilterChange }) => (
  <div className="bg-white rounded-lg border border-gray-200 mt-6">
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Archive Files</h2>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Type</span>
          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">File Name</th>
          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Type</th>
          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Size</th>
          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Upload Date</th>
          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Used In Posts</th>
          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {files.map((file) => (
          <tr key={file.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">{file.name}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm">{file.type}</td>
            <td className="px-6 py-4 text-sm">{file.size}</td>
            <td className="px-6 py-4 text-sm">{file.uploadDate}</td>
            <td className="px-6 py-4 text-sm">{file.posts}</td>
            <td className="px-6 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onEdit(file)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onDelete(file.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const FilePreview = ({ file }) => {
  switch (file.type) {
    case 'image':
      return <img src={file.url} alt={file.name} className="max-w-full h-auto rounded-lg" />
    case 'video':
      return <video src={file.url} controls className="max-w-full rounded-lg" />
    case 'audio':
      return <audio src={file.url} controls className="w-full" />
    case 'document':
      if  (file.name.endsWith('.pdf')) {
        return <embed src={file.url} type="application/pdf" width="100%" height="500px" />
      }
      return <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View {file.name}</a>
    default:
      return <span>Unsupported file type</span>
  }
}

const Posts = ({ posts, onDelete }) => (
  <div className="space-y-4">
    {posts.map(post => (
      <div key={post.id} className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{post.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(post.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mt-4 text-gray-600">{post.content}</p>
        {post.files && post.files.length > 0 && (
          <div className="mt-4 space-y-4">
            <h4 className="text-sm font-medium">Attached Files:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.files.map(file => (
                <div key={file.id} className="border rounded-lg p-4">
                  <FilePreview file={file} />
                  <p className="mt-2 text-sm font-medium">{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
    <Button 
      variant="outline"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
          className="w-8 h-8 p-0"
        >
          {page}
        </Button>
      ))}
    </div>
    <Button 
      variant="outline"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('files')
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Conference_2023.mp4',
      type: 'video',
      size: '256 MB',
      uploadDate: '2024-03-01',
      posts: 2,
      url: '/placeholder.svg?height=300&width=400'
    },
    {
      id: 2,
      name: 'Religious_Teachings.pdf',
      type: 'document',
      size: '12 MB',
      uploadDate: '2024-03-02',
      posts: 1,
      url: '/placeholder.svg?height=300&width=400'
    }
  ])
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Community Update',
      content: 'Latest updates from our community gathering...',
      date: '2024-03-01',
      files: [
        {
          id: 1,
          name: 'Conference_2023.mp4',
          type: 'video',
          url: '/placeholder.svg?height=300&width=400'
        }
      ]
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [editingFile, setEditingFile] = useState(null)

  // Filter and search logic
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || file.type === typeFilter
    return matchesSearch && matchesType
  })

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(
    (activeTab === 'files' ? filteredFiles : filteredPosts).length / ITEMS_PER_PAGE
  )
  
  const paginatedItems = (activeTab === 'files' ? filteredFiles : filteredPosts)
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // File operations
  const handleFileUpload = (newFile) => {
    setFiles(prev => [...prev, newFile])
  }

  const handleFileDelete = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const handleFileEdit = (file) => {
    setEditingFile(file)
    setIsUploadModalOpen(true)
  }

  const handleFileUpdate = (updatedFile) => {
    setFiles(prev => prev.map(file => 
      file.id === updatedFile.id ? updatedFile : file
    ))
    setEditingFile(null)
  }

  // Post operations
  const handlePostCreate = (newPost) => {
    setPosts(prev => [...prev, newPost])
    // Update file usage count
    setFiles(prev => prev.map(file => {
      if (newPost.files.some(postFile => postFile.id === file.id)) {
        return { ...file, posts: file.posts + 1 }
      }
      return file
    }))
  }

  const handlePostDelete = (postId) => {
    const postToDelete = posts.find(post => post.id === postId)
    setPosts(prev => prev.filter(post => post.id !== postId))
    // Update file usage count
    if (postToDelete && postToDelete.files) {
      setFiles(prev => prev.map(file => {
        if (postToDelete.files.some(postFile => postFile.id === file.id)) {
          return { ...file, posts: Math.max(0, file.posts - 1) }
        }
        return file
      }))
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="ml-64">
        <Header 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {activeTab === 'files' ? 'Files' : 'Posts'}
            </h1>
            <Button
              onClick={() => activeTab === 'files' ? setIsUploadModalOpen(true) : setIsPostModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === 'files' ? 'Upload File' : 'Create Post'}
            </Button>
          </div>

          {activeTab === 'files' ? (
            <FileManager
              files={paginatedItems}
              onDelete={handleFileDelete}
              onEdit={handleFileEdit}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
            />
          ) : (
            <Posts
              posts={paginatedItems}
              onDelete={handlePostDelete}
            />
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <FileUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => {
              setIsUploadModalOpen(false)
              setEditingFile(null)
            }}
            onUpload={editingFile ? handleFileUpdate : handleFileUpload}
            initialFile={editingFile}
          />

          <CreatePostModal
            isOpen={isPostModalOpen}
            onClose={() => setIsPostModalOpen(false)}
            onSave={handlePostCreate}
            files={files}
          />
        </main>
      </div>
    </div>
  )
}