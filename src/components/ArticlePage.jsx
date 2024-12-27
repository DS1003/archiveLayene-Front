import React, { useState, useEffect } from 'react';
import { 
    Heart, Share2, Clock, ArrowLeft, Download,
    FileText, User, Calendar, PlayCircle, 
    ChevronLeft 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';

const ArticlePage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    
    const getYouTubeVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    // Simuler le chargement de l'article
    useEffect(() => {
        // Ici vous chargeriez normalement l'article depuis votre API
        const mockArticle = {
            id: 1,
            title: "Seydina Limamou Laye: L'histoire de la renaissance spirituelle",
            content: `
                <div class="prose prose-lg">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    
                    <h2>Les enseignements fondamentaux</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    
                    <h3>L'importance de la communauté</h3>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
            `,
            excerpt: "Découvrez l'histoire fascinante de Seydina Limamou Laye et son impact sur la communauté...",
            author: "Cherif Sidy Laye",
            publishDate: "2024-12-24T10:30:00",
            category: "Histoire",
            likes: 156,
            mediaType: "video",
            mediaUrl: "https://youtu.be/CaPV1TIdtxk",
            thumbnailUrl: "https://img.youtube.com/vi/CaPV1TIdtxk/maxresdefault.jpg"
        };
        setArticle(mockArticle);
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006C5F]"></div>
            </div>
        );
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Ici vous mettriez à jour le like dans votre backend
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // Afficher une notification de succès
        }
    };

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
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
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
                    </div>
                </div>

                {/* Media Section */}
                <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm">
                    {article.mediaType === 'video' && (
                        <div className="relative pb-[56.25%] bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(article.mediaUrl)}`}
                                title={article.title}
                                className="absolute inset-0 w-full h-full"
                                allowFullScreen
                            />
                        </div>
                    )}
                    {article.mediaType === 'pdf' && (
                        <div className="h-[70vh]">
                            <iframe
                                src={article.mediaUrl}
                                title={article.title}
                                className="w-full h-full"
                            />
                        </div>
                    )}
                    {article.mediaType === 'image' && (
                        <img
                            src={article.mediaUrl}
                            alt={article.title}
                            className="w-full h-auto"
                        />
                    )}
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-8">
                    <div 
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600"
                    />
                </div>

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
        </div>
    );
};

export default ArticlePage;