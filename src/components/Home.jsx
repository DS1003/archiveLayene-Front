import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Bookmark, Clock, Dot } from 'lucide-react';
import logo2 from "../assets/logo21.png";

const Home = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Seydina Limamou Laye: L'histoire de la renaissance spirituelle",
      excerpt: "Découvrez l'histoire fascinante de Seydina Limamou Laye et son impact sur la communauté...",
      author: "Cherif Sidy Laye",
      date: "24 Dec 2024",
      readTime: "8 min",
      category: "Histoire",
      likes: 156,
      isLiked: false,
      imageUrl: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "Les enseignements fondamentaux du Mahdi",
      excerpt: "Une exploration approfondie des principes essentiels enseignés par le Mahdi...",
      author: "Cheikh Thierno Laye",
      date: "23 Dec 2024",
      readTime: "12 min",
      category: "Spiritualité",
      likes: 243,
      isLiked: false,
      imageUrl: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "La communauté Layène aujourd'hui",
      excerpt: "Un regard sur l'évolution et l'état actuel de la communauté Layène...",
      author: "Abdoulaye Diene",
      date: "22 Dec 2024",
      readTime: "6 min",
      category: "Actualités",
      likes: 89,
      isLiked: false,
      imageUrl: "/api/placeholder/800/400"
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleLike = (articleId) => {
    setArticles(articles.map(article => {
      if (article.id === articleId) {
        return {
          ...article,
          likes: article.isLiked ? article.likes - 1 : article.likes + 1,
          isLiked: !article.isLiked
        };
      }
      return article;
    }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={logo2} alt="Logo" className="h-8 w-auto" />
              <h1 className="ml-4 text-xl font-semibold text-[#004a54]">Farlu ci Diiné dji</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#006C5F] text-white rounded-full text-sm font-medium hover:bg-[#004A42]"
              >
                Se connecter
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#006C5F] to-[#004A42] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Explorez notre patrimoine spirituel
          </motion.h2>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl"
            variants={itemVariants}
          >
            Découvrez des articles enrichissants sur l'histoire, les enseignements et la spiritualité de la communauté Layène.
          </motion.p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-12">
          {articles.map(article => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-8 border-b border-gray-200 pb-12"
            >
              <div className="md:w-2/3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <span className="font-medium">{article.author}</span>
                  <Dot size={20} />
                  <span>{article.date}</span>
                  <Dot size={20} />
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {article.readTime}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-[#006C5F] cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(article.id)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                    >
                      <Heart 
                        size={20} 
                        className={article.isLiked ? "fill-red-500 text-red-500" : ""}
                      />
                      <span>{article.likes}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-600 hover:text-[#006C5F]"
                    >
                      <Share2 size={20} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-600 hover:text-[#006C5F]"
                    >
                      <Bookmark size={20} />
                    </motion.button>
                  </div>

                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="md:w-1/3">
                <motion.img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logo2} alt="Logo" className="h-8 w-auto" />
              <p className="ml-4 text-gray-600">© 2024 Farlu ci Diiné dji. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#006C5F]">À propos</a>
              <a href="#" className="text-gray-600 hover:text-[#006C5F]">Contact</a>
              <a href="#" className="text-gray-600 hover:text-[#006C5F]">Mentions légales</a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;