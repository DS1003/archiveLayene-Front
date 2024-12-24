import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiGlobe, FiServer } from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
            <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <FiServer className="text-blue-400 w-8 h-8" />
                    <span className="text-2xl font-bold">SPARK Consulting</span>
                </div>
                <nav className="space-x-6">
                    {['Services', 'Expertises', 'À Propos', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                            {item}
                        </a>
                    ))}
                </nav>
            </header>

            <main>
                <section className="pt-32 pb-16 text-center">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-5xl font-bold mb-4"
                    >
                        Bienvenue dans notre Univers
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Nous vous facilitons votre transformation digitale avec nos solutions et services innovants.
                    </motion.p>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                        className="mt-8 space-x-4"
                    >
                        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all">
                            Découvrir nos Services
                        </a>
                        <a href="#" className="border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all">
                            Nos Expertises
                        </a>
                    </motion.div>
                </section>

                <section id="services" className="bg-black/20 backdrop-blur-md py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Nos Services Digitaux</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl transform transition-all hover:scale-105">
                                <FiCode className="text-blue-400 w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-medium mb-2">Solutions Digitales</h3>
                                <p className="text-gray-300">
                                    Développement d'applications web, mobiles et d'outils de gestion sur mesure.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl transform transition-all hover:scale-105">
                                <FiGlobe className="text-blue-400 w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-medium mb-2">Services Digital</h3>
                                <p className="text-gray-300">
                                    Stratégie digitale, marketing digital, production vidéo et plus encore.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl transform transition-all hover:scale-105">
                                <FiServer className="text-blue-400 w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-medium mb-2">Futurize Core</h3>
                                <p className="text-gray-300">
                                    Expertise en IT, infrastructure, smart city, matériels tech et plus.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="expertises" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Nos Domaines d'Expertise</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {['Digital Suite (FEMS)', 'Logiciel ERP/CRM', 'Progiciel', 'Transformation Digitale', 'Business Intelligence'].map((expertise) => (
                                <div key={expertise} className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl">
                                    <h3 className="text-2xl font-medium mb-4">{expertise}</h3>
                                    <p className="text-gray-300">
                                        Description détaillée de l'expertise et des services associés.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="bg-black/20 backdrop-blur-md py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">À Propos de Nous</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Chez Futurize Academy, nous sommes une équipe passionnée de professionnels du digital qui s'engagent à vous accompagner dans votre transformation digitale. Avec notre expertise et nos solutions innovantes, nous vous aidons à relever vos défis technologiques et à atteindre vos objectifs.
                        </p>
                    </div>
                </section>

                <section id="contact" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Contactez-Nous</h2>
                        <form className="max-w-xl mx-auto space-y-4">
                            <input type="text" placeholder="Nom" className="w-full bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-xl" />
                            <input type="email" placeholder="Email" className="w-full bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-xl" />
                            <textarea placeholder="Message" rows={5} className="w-full bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-xl"></textarea>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all">
                                Envoyer
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-black/20 backdrop-blur-md p-6 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Futurize Academy. Tous droits réservés.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        {/* Ajouter des icônes de réseaux sociaux */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;