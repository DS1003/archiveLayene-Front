import React, { useState } from 'react';
import {
    Heart,
    Share2,
    Bookmark,
    Clock,
    Play,
    X,
    FileText,
    Image as ImageIcon,
    CheckCircle,
    BookmarkPlus,
    Search,
    Menu
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import logo3 from "../assets/logo3.png";

const Home = () => {
    const formatPublishDate = (dateString) => {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    };

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    const Notification = ({ message }) => (
        <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg py-3 px-4 flex items-center gap-2 border border-green-100 text-green-800 animate-fade-in">
            <CheckCircle size={20} className="text-green-500" />
            <span>{message}</span>
        </div>
    );

    const [articles, setArticles] = useState([
        {
            id: 1,
            title: "Seydina Limamou Laye: L'histoire de la renaissance spirituelle",
            excerpt: "Découvrez l'histoire fascinante de Seydina Limamou Laye et son impact sur la communauté...",
            author: "Cherif Sidy Laye",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/CaPV1TIdtxk?si=R0q9gvXQIe2Bb5Dk",
            thumbnailUrl: `https://img.youtube.com/vi/CaPV1TIdtxk/maxresdefault.jpg`,
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 2,
            title: "Les enseignements fondamentaux du Mahdi",
            excerpt: "Une exploration approfondie des principes essentiels enseignés par le Mahdi...",
            author: "Cheikh Thierno Laye",
            publishDate: "2024-12-23T15:45:00",
            readTime: "12 min",
            category: "Spiritualité",
            likes: 243,
            isLiked: false,
            mediaType: "image",
            mediaUrl: "https://res.cloudinary.com/dgro5x4h8/image/upload/v1730646094/5888_itihw3.png",
            thumbnailUrl: "https://res.cloudinary.com/dgro5x4h8/image/upload/v1730646094/5888_itihw3.png",
            slug: "enseignements-fondamentaux-mahdi"
        },
        {
            id: 3,
            title: "La communauté Layène aujourd'hui",
            excerpt: "Un regard sur l'évolution et l'état actuel de la communauté Layène...",
            author: "Abdoulaye Diene",
            publishDate: "2024-12-22T09:15:00",
            readTime: "6 min",
            category: "Actualités",
            likes: 89,
            isLiked: false,
            mediaType: "pdf",
            mediaUrl: "https://res.cloudinary.com/dgro5x4h8/raw/upload/v1/example.pdf",
            thumbnailUrl: "/api/placeholder/800/400",
            slug: "communaute-layene-aujourd-hui"
        }
    ]);

    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const handleSave = (articleId) => {
        setArticles(articles.map(article => {
            if (article.id === articleId) {
                if (!article.isSaved) {
                    showNotification("Article sauvegardé pour plus tard !");
                }
                return {
                    ...article,
                    isSaved: !article.isSaved
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

    const showNotification = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const MediaPreview = ({ article }) => (
        <div
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedMedia(article)}
        >
            <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                {article.mediaType === 'video' && <Play size={48} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />}
                {article.mediaType === 'image' && <ImageIcon size={48} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />}
                {article.mediaType === 'pdf' && <FileText size={48} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />}
            </div>
            <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-sm font-medium rounded-full backdrop-blur-sm capitalize">
                {article.mediaType}
            </span>
        </div>
    );

    const MediaModal = () => {
        if (!selectedMedia) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={() => setSelectedMedia(null)}
                />
                <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">{selectedMedia.title}</h3>
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-4">
                        {selectedMedia.mediaType === 'video' && (
                            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedMedia.mediaUrl)}`}
                                    title={selectedMedia.title}
                                    className="absolute inset-0 w-full h-full"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                        {selectedMedia.mediaType === 'image' && (
                            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={selectedMedia.mediaUrl}
                                    alt={selectedMedia.title}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />
                            </div>
                        )}
                        {selectedMedia.mediaType === 'pdf' && (
                            <div className="bg-gray-100 p-6 rounded-lg text-center">
                                <FileText className="h-16 w-16 mx-auto mb-4 text-[#006C5F]" />
                                <a
                                    href={selectedMedia.mediaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#006C5F] text-white rounded-lg hover:bg-[#004A42] transition-colors inline-block"
                                >
                                    Télécharger le PDF
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const ArticleCard = ({ article }) => (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 flex flex-col md:flex-row gap-8 border border-gray-100">
            <div className="md:w-2/3 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="font-semibold bg-gray-50 px-3 py-1 rounded-full">{article.author}</span>
                    <span className="bg-gray-50 px-3 py-1 rounded-full">{article.category}</span>
                    <span className="text-gray-400 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatPublishDate(article.publishDate)}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 hover:text-[#006C5F] cursor-pointer transition-colors">
                    {article.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
                    {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-auto">
                    <button
                        className={`flex items-center gap-2 hover:scale-110 transition-all ${article.isLiked ? 'text-red-500' : 'text-gray-600'}`}
                        onClick={() => handleLike(article.id)}
                    >
                        <Heart className={`${article.isLiked ? 'fill-current animate-pulse' : ''}`} size={22} />
                        <span className="font-medium">{article.likes}</span>
                    </button>

                    <button
                        className="flex items-center gap-2 text-gray-600 hover:scale-110 transition-all hover:text-[#006C5F]"
                        onClick={() => handleShare(article)}
                    >
                        <Share2 size={22} />
                    </button>
                </div>
            </div>

            <div className="md:w-1/3">
                <MediaPreview article={article} />
            </div>
        </div>
    );

    // Le reste du composant (header, hero section, articles grid, footer) reste inchangé
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Le reste du JSX reste identique */}




            {/* Header */}
            <header className="sticky top-0 backdrop-blur-lg bg-white/80 border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <img src={logo3} alt="Logo" className="h-12 w-auto" />
                                <h1 className="ml-4 text-2xl font-bold text-[#004a54]">
                                    Farlu ci Diiné dji
                                </h1>
                            </div>
                            {/* <nav className="hidden md:flex items-center space-x-6">
                  <a href="#" className="text-gray-600 hover:text-[#006C5F] transition-colors">Accueil</a>
                  <a href="#" className="text-gray-600 hover:text-[#006C5F] transition-colors">Articles</a>
                  <a href="#" className="text-gray-600 hover:text-[#006C5F] transition-colors">À propos</a>
              </nav> */}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:flex items-center">
                                <input
                                    type="search"
                                    placeholder="Rechercher..."
                                    className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#006C5F]/20 w-64"
                                />
                                <Search className="absolute left-3 text-gray-400" size={18} />
                            </div>
                            {/* <button className="px-6 py-2.5 bg-[#006C5F] text-white rounded-full text-sm font-medium hover:bg-[#004A42] transition-all hover:shadow-lg hover:shadow-[#006C5F]/20">
                                Se connecter
                            </button> */}
                            <button
                                className="md:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#006C5F] to-[#004A42] text-white py-24">
                <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] mix-blend-overlay opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Explorez notre<br />patrimoine spirituel
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                        Découvrez des articles enrichissants sur l'histoire, les enseignements et la spiritualité de la communauté Layène.
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="space-y-12">
                    {articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <img src={logo3} alt="Logo" className="h-8 w-auto" />
                                <span className="ml-2 text-gray-600 font-medium">Farlu ci Diiné dji</span>
                            </div>
                            <p className="text-gray-500 text-sm">
                                Votre source d'information sur la spiritualité et l'histoire Layène.
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center md:text-left text-gray-500 text-sm">
                        © 2024 Farlu ci Diiné dji. Tous droits réservés.
                    </div>
                </div>
            </footer>
            <MediaModal />
            {showAlert && <Notification message={alertMessage} />}
        </div>
    );
};

export default Home;