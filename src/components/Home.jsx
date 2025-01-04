import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    Share2,
    Clock,
    Play,
    X,
    FileText,
    Image as ImageIcon,
    CheckCircle,
    Search,
    Download,
    Menu
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import logo3 from "../assets/logo21.png";
import defaultThumbnail from "../assets/Stv.png";
import { articles1 } from '../data/articles1';


// Composant SearchBar
const SearchBar = ({ onSearch }) => (
    <div className="relative">
        <input
            type="text"
            placeholder="Rechercher un article..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006C5F] focus:bg-white transition-all"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
);

// Composant Categories
const Categories = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="overflow-x-auto whitespace-nowrap py-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <div className="flex gap-2">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                        ${!selectedCategory 
                            ? 'bg-[#006C5F] text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Tous
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                            ${selectedCategory === category 
                                ? 'bg-[#006C5F] text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};


// Notification Component optimisé
const Notification = ({ message }) => (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 bg-white shadow-lg rounded-lg py-2 px-3 flex items-center gap-2 border border-green-100 text-green-800 text-sm">
        <CheckCircle size={16} className="text-green-500" />
        <span>{message}</span>
    </div>
);

// Composant MediaPreview
// Composant MediaPreview modifié
const MediaPreview = ({ article, onClick }) => {
    // Obtenir le bon thumbnail pour l'article
    const getThumbnail = () => {
        // Si l'article a plusieurs médias, prendre le thumbnailUrl du premier média
        if (Array.isArray(article.media) && article.media.length > 0) {
            const firstMedia = article.media[0];
            return firstMedia.thumbnailUrl || firstMedia.url || defaultThumbnail;
        }
        // Si c'est un seul média
        if (article.media && typeof article.media === 'object') {
            return article.media.thumbnailUrl || article.media.url || defaultThumbnail;
        }
        // Fallback sur le defaultThumbnail
        return defaultThumbnail;
    };

    // État pour gérer les erreurs de chargement d'image
    const [imgSrc, setImgSrc] = useState(getThumbnail());

    // Gestionnaire d'erreur d'image
    const handleImageError = () => {
        if (imgSrc !== defaultThumbnail) {
            setImgSrc(defaultThumbnail);
        }
    };

    const getMediaType = () => {
        if (Array.isArray(article.media) && article.media.length > 0) {
            return article.media[0].type;
        }
        return article.media?.type || 'unknown';
    };

    const mediaType = getMediaType();

    return (
        <div
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            onClick={onClick}
        >
            <img
                src={imgSrc}
                alt={article.title}
                className="w-full h-48 sm:h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                {mediaType === 'video' && <Play size={32} className="text-white" />}
                {mediaType === 'image' && <ImageIcon size={32} className="text-white" />}
                {mediaType === 'pdf' && <FileText size={32} className="text-white" />}
            </div>
            <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 text-xs font-medium rounded-full backdrop-blur-sm capitalize">
                {mediaType}
            </span>
        </div>
    );
};



// Composant ArticleCard
const ArticleCard = ({ article, onLike, onShare, onMediaSelect }) => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.slug}`);
  };
    
    const formatPublishDate = (dateString) => {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    };

    return (
        <div onClick={handleClick} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="w-full">
                <MediaPreview article={article} onClick={() => onMediaSelect(article)} />
            </div>

            <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="font-medium bg-gray-50 px-2 py-0.5 rounded-full">{article.author}</span>
                    <span className="bg-gray-50 px-2 py-0.5 rounded-full">{article.category}</span>
                    <span className="text-gray-400 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {formatPublishDate(article.publishDate)}
                    </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
                    {article.excerpt}
                </p>

                <div className="flex items-center gap-4">
                    <button
                        className={`flex items-center gap-1 ${article.isLiked ? 'text-red-500' : 'text-gray-600'}`}
                        onClick={() => onLike(article.id)}
                    >
                        <Heart className={`${article.isLiked ? 'fill-current' : ''}`} size={18} />
                        <span className="text-sm">{article.likes}</span>
                    </button>

                    <button
                        className="flex items-center gap-1 text-gray-600"
                        onClick={() => onShare(article)}
                    >
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};



// Modal optimisé pour mobile
const MediaModal = ({ selectedMedia, onClose }) => {
    if (!selectedMedia) return null;

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
            <div className="relative bg-white w-full sm:w-auto sm:max-w-3xl mx-4 sm:mx-auto rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-3 border-b">
                    <h3 className="text-base font-semibold line-clamp-1">{selectedMedia.title}</h3>
                    <button onClick={onClose} className="p-1">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="relative">
                    {selectedMedia.mediaType === 'video' && (
                        <div className="relative pb-[56.25%]">
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedMedia.mediaUrl)}`}
                                title={selectedMedia.title}
                                className="absolute inset-0 w-full h-full"
                                allowFullScreen
                            />
                        </div>
                    )}
                    {selectedMedia.mediaType === 'image' && (
                        <img
                            src={selectedMedia.mediaUrl}
                            alt={selectedMedia.title}
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};


const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-[#006C5F] hover:bg-[#004A42] text-white rounded-full shadow-lg transition-all duration-300 z-50 transform hover:scale-110"
                    aria-label="Retour en haut"
                >
                    <ChevronUp size={24} />
                </button>
            )}
        </>
    );
};


// Composant principal Home
const Home = () => {

    const [articles, setArticles] = useState(articles1);

    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Nouveaux états pour le filtrage
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Extraire les catégories uniques des articles
    const categories = [...new Set(articles.map(article => article.category))];
    
    // Filtrer les articles en fonction de la catégorie et de la recherche
    const filteredArticles = articles.filter(article => {
        const matchesCategory = !selectedCategory || article.category === selectedCategory;
        const matchesSearch = !searchQuery || 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });


    const showNotification = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleLike = (articleId) => {
        setArticles(articles.map(article => {
            if (article.id === articleId) {
                if (!article.isLiked) {
                    showNotification("Article ajouté à vos favoris !");
                }
                return {
                    ...article,
                    likes: article.isLiked ? article.likes - 1 : article.likes + 1,
                    isLiked: !article.isLiked
                };
            }
            return article;
        }));
    };

    const handleShare = (article) => {
        const shareUrl = `${window.location.origin}/article/${article.slug}`;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: shareUrl
            })
                .then(() => showNotification("Article partagé avec succès !"))
                .catch((error) => console.log('Erreur de partage', error));
        } else {
            navigator.clipboard.writeText(shareUrl)
                .then(() => showNotification("Lien copié dans le presse-papier !"))
                .catch((error) => console.log('Erreur de copie', error));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header modifié */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Logo et Menu */}
                    <div className="flex justify-between items-center h-16">
                        <img src={logo3} alt="Logo" className="h-10 w-auto" />
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block w-64">
                                <SearchBar onSearch={setSearchQuery} />
                            </div>
                            <button 
                                className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Barre de recherche mobile */}
                    <div className="md:hidden py-2">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>
                    
                    {/* Catégories */}
                    <Categories 
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#006C5F] to-[#004A42] text-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Explorez notre<br />patrimoine spirituel
                    </h2>
                    <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                        {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} disponible{filteredArticles.length > 1 ? 's' : ''}
                        {selectedCategory ? ` dans ${selectedCategory}` : ''}
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredArticles.map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                onLike={handleLike}
                                onShare={handleShare}
                                onMediaSelect={setSelectedMedia}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Aucun article ne correspond à votre recherche.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer optimisé */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center text-center">
                        <img src={logo3} alt="Logo" className="h-16 w-auto mb-4" />
                        <p className="text-gray-500 text-sm">
                            Votre source d'information sur la spiritualité et l'histoire Layène.
                        </p>
                        <div className="mt-4 text-xs text-gray-400">
                            © 2024 Farlu ci Diiné dji - Ohio Colombus. Powered By Espace Layène !
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modals and Notifications */}
            {selectedMedia && <MediaModal selectedMedia={selectedMedia} onClose={() => setSelectedMedia(null)} />}
            {showAlert && <Notification message={alertMessage} />}
        </div>
    );
};

export default Home;