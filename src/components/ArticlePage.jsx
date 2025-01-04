import React, { useState, useEffect } from 'react';
import {
    Heart, Share2, Clock, Download,
    User, Calendar, CheckCircle,
    ChevronLeft
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import { articles1 } from '../data/articles1';
import MediaDisplay from './MediaDisplay';
import MediaCollection from './MediaCollection';

const Notification = ({ message }) => (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 bg-white shadow-lg rounded-lg py-2 px-3 flex items-center gap-2 border border-green-100 text-green-800 text-sm">
        <CheckCircle size={16} className="text-green-500" />
        <span>{message}</span>
    </div>
);

const ArticlePage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const foundArticle = articles1.find(a => a.slug === slug);
        if (foundArticle) {
            setArticle(foundArticle);
            setIsLiked(foundArticle.isLiked);
        } else {
            navigate('/404'); // Redirigez vers une page 404 si l'article n'est pas trouvé
        }
    }, [slug, navigate]);

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = article.mediaUrl;
        link.download = `${article.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotificationMessage("Téléchargement démarré !");
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        const newLikes = isLiked ? article.likes - 1 : article.likes + 1;
        setArticle(prev => ({
            ...prev,
            likes: newLikes,
            isLiked: !isLiked
        }));
        showNotificationMessage(isLiked ? "Like retiré" : "Article liké !");
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: shareUrl
            })
                .then(() => showNotificationMessage("Article partagé avec succès !"))
                .catch(error => console.log('Erreur lors du partage', error));
        } else {
            navigator.clipboard.writeText(shareUrl)
                .then(() => showNotificationMessage("Lien copié dans le presse-papier !"))
                .catch(error => console.log('Erreur lors de la copie', error));
        }
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006C5F] mb-4"></div>
                    <p className="text-gray-600">Chargement de l'article...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-[#006C5F] transition-colors"
                        >
                            <ChevronLeft size={20} />
                            <span className="font-medium">Retour</span>
                        </button>
                        {article.mediaType === 'pdf' && (
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 text-[#006C5F] hover:bg-[#006C5F]/5 rounded-lg transition-colors"
                            >
                                <Download size={20} />
                                <span className="font-medium">Télécharger</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Article Header */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                        <span className="font-medium bg-gray-100 px-3 py-1 rounded-full">
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDistanceToNow(new Date(article.publishDate), {
                                addSuffix: true,
                                locale: fr
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{article.author}</span>
                        </div>
                        {article.readTime && (
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{article.readTime}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Conditional Media Content */}
                <MediaCollection mediaItems={article.media} />

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 py-6">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all
                            ${isLiked
                                ? 'border-red-500 text-red-500 bg-red-50'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Heart className={isLiked ? 'fill-current' : ''} size={20} />
                        <span>{article.likes}</span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        <Share2 size={20} />
                        <span>Partager</span>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
                    © 2024 Farlu ci Diiné dji - Ohio Colombus
                </div>
            </footer>

            {/* Notification */}
            {showNotification && (
                <Notification message={notificationMessage} />
            )}
        </div>
    );
};

export default ArticlePage;
