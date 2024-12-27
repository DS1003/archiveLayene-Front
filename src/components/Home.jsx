import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
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

// Composant Notification
const Notification = ({ message }) => (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg py-3 px-4 flex items-center gap-2 border border-green-100 text-green-800 animate-fade-in">
        <CheckCircle size={20} className="text-green-500" />
        <span>{message}</span>
    </div>
);

// Composant MediaPreview
const MediaPreview = ({ article, onClick }) => (
    <div
        className="relative rounded-xl overflow-hidden cursor-pointer group"
        onClick={onClick}
    >
        <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            {article.mediaType === 'video' && (
                <Play size={48} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
            )}
            {article.mediaType === 'image' && (
                <ImageIcon size={48} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
            )}
            {article.mediaType === 'pdf' && (
                <FileText size={48} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
            )}
        </div>
        <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-sm font-medium rounded-full backdrop-blur-sm capitalize">
            {article.mediaType}
        </span>
    </div>
);

// Composant ArticleCard
const ArticleCard = ({ article, onLike, onShare, onMediaSelect }) => {
    const formatPublishDate = (dateString) => {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    };

    return (
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
                        onClick={() => onLike(article.id)}
                    >
                        <Heart className={`${article.isLiked ? 'fill-current animate-pulse' : ''}`} size={22} />
                        <span className="font-medium">{article.likes}</span>
                    </button>

                    <button
                        className="flex items-center gap-2 text-gray-600 hover:scale-110 transition-all hover:text-[#006C5F]"
                        onClick={() => onShare(article)}
                    >
                        <Share2 size={22} />
                    </button>
                </div>
            </div>

            <div className="md:w-1/3">
                <MediaPreview article={article} onClick={() => onMediaSelect(article)} />
            </div>
        </div>
    );
};

// Composant MediaModal
const MediaModal = ({ selectedMedia, onClose }) => {
    if (!selectedMedia) return null;

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    const getPdfUrl = (url, isDownload = false) => {
        if (url.includes('drive.google.com')) {
            const fileId = url.match(/[-\w]{25,}/);
            return fileId 
                ? isDownload 
                    ? `https://drive.google.com/uc?export=download&id=${fileId[0]}`
                    : `https://drive.google.com/file/d/${fileId[0]}/preview`
                : url;
        }
        return url;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">{selectedMedia.title}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
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
                            />
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
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-gray-200">
                                <iframe
                                    src={getPdfUrl(selectedMedia.mediaUrl)}
                                    title={selectedMedia.title}
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                            <div className="flex justify-center">
                                <a
                                    href={getPdfUrl(selectedMedia.mediaUrl, true)}
                                    download={`${selectedMedia.title}.pdf`}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#006C5F] text-white rounded-lg hover:bg-[#004A42] transition-colors"
                                >
                                    <Download size={20} />
                                    Télécharger le PDF
                                </a>
                            </div>
                        </div>
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
            mediaUrl: "https://youtu.be/CaPV1TIdtxk",
            thumbnailUrl: "https://img.youtube.com/vi/CaPV1TIdtxk/maxresdefault.jpg",
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
            mediaUrl: "https://drive.google.com/file/d/1o2TRJy1cgeDpxU9K5m-FF1N7jDt04FaU/view",
            thumbnailUrl: "/api/placeholder/400/320",
            slug: "communaute-layene-aujourd-hui"
        },
        {
            id: 4,
            title: "Conférence Cherif Ousseynou LAHI 2005 OHIO",
            excerpt: "Découvrez l'histoire fascinante de Seydina Limamou Laye et son impact sur la communauté...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/82MGLXcuUrQ",
            thumbnailUrl: "https://img.youtube.com/vi/82MGLXcuUrQ/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 5,
            title: "TÉMOIGNAGES SUR SHÉRIF OUSSEYNOU LAHI",
            excerpt: "Cherif Sa leer dou faye...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/IxvfcYMY_5g",
            thumbnailUrl: "https://img.youtube.com/vi/IxvfcYMY_5g/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 6,
            title: "Message de Cherif Ousseynou Laye Docteur de la Jeunesse",
            excerpt: "Cherif Sa leer dou faye...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/I-Df1tsi-K4",
            thumbnailUrl: "https://img.youtube.com/vi/I-Df1tsi-K4/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 7,
            title: "Conférence cherif Ousseynou LAHI",
            excerpt: "Cherif Sa leer dou faye...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/CG13Jz6_Y0s",
            thumbnailUrl: "https://img.youtube.com/vi/CG13Jz6_Y0s/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 8,
            title: "Mémorial Chérif Ousseynou Laye aux USA avec l'Association des Layénes d'Amérique",
            excerpt: "Cherif Sa leer dou faye...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/WHnYMqaZJgA",
            thumbnailUrl: "https://img.youtube.com/vi/WHnYMqaZJgA/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 9,
            title: "hommage à cherif ousseynou laye",
            excerpt: "Cherif Sa leer dou faye...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/RabM9AEFeOc",
            thumbnailUrl: "https://img.youtube.com/vi/RabM9AEFeOc/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        },
        {
            id: 10,
            title: "Memorial Cherif Ousseynou 2015",
            excerpt: "Cherif Sa leer dou faye...",
            author: "Cherif Ousseynou Lahi",
            publishDate: "2024-12-24T10:30:00",
            readTime: "8 min",
            category: "Histoire",
            likes: 156,
            isLiked: false,
            mediaType: "video",
            mediaUrl: "https://youtu.be/w1ZfPPAQq2c",
            thumbnailUrl: "https://img.youtube.com/vi/w1ZfPPAQq2c/maxresdefault.jpg",
            slug: "seydina-limamou-laye-histoire-renaissance-spirituelle"
        }
    ]);

    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[#006C5F] [&::-webkit-scrollbar-thumb]:rounded-full">
            <ScrollToTop />
            {/* Header */}
            <header className="sticky top-0 backdrop-blur-lg bg-white/80 border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <img src={logo3} alt="Logo" className="h-16 w-auto" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">

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
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onLike={handleLike}
                            onShare={handleShare}
                            onMediaSelect={setSelectedMedia}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <img src={logo3} alt="Logo" className="h-22 w-auto" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                Votre source d'information sur la spiritualité et l'histoire Layène.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center md:text-left text-gray-500 text-sm">
                        © 2024 Farlu ci Diiné dji - Ohio Colombus. Powered with 💚 & 🥤 by <a href="http://espacelayene.com">Espace Layène</a>.
                    </div>
                </div>
            </footer>

            {/* Modals and Notifications */}
            {selectedMedia && (
                <MediaModal
                    selectedMedia={selectedMedia}
                    onClose={() => setSelectedMedia(null)}
                />
            )}
            {showAlert && <Notification message={alertMessage} />}
        </div>
    );
};

export default Home;