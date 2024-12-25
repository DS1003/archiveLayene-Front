import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import Alert from './ui/Alert';
import logo2 from "../assets/logo21.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const scaleVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (formData.username === 'seydiop@07' && formData.password === 'admin') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ username: formData.username }));
        navigate('/dashboard');
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisitorAccess = () => {
    navigate('/home');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center items-center min-h-screen p-4"
    >
      <motion.div 
        className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl"
        variants={itemVariants}
      >
        {/* Section gauche */}
        <motion.div 
          className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#006C5F] to-[#004A42] text-white relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="relative z-10">
            <motion.div 
              className="bg-white backdrop-blur-sm p-4 rounded-xl inline-block mb-6 md:mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={logo2} 
                alt="Logo Farlu ci Diiné dji" 
                className="w-32 md:w-6/12 object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 mb-4 md:mb-6"
              variants={itemVariants}
            >
              <div>
                <motion.h1 
                  className="text-3xl md:text-5xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  BIENVENUE <br />
                  <motion.span 
                    className="text-[#FFB400]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Laye Maxtar
                  </motion.span>
                </motion.h1>
              </div>
            </motion.div>

            <motion.p 
              className="text-sm md:text-base text-gray-100 leading-relaxed mb-6 md:mb-8 bg-black/10 p-4 rounded-lg backdrop-blur-sm"
              variants={itemVariants}
              whileHover={scaleVariants.hover}
            >
              Une plateforme dédiée à la préservation et au partage du patrimoine spirituel de la communauté Layène. 
              Explorez, apprenez et connectez-vous à votre héritage.
            </motion.p>

            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl text-center flex-1 border border-white/10"
                whileHover={scaleVariants.hover}
              >
                <h3 className="font-bold text-lg md:text-xl">+500</h3>
                <p className="text-xs md:text-sm">Documents</p>
              </motion.div>
              <motion.div 
                className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl text-center flex-1 border border-white/10"
                whileHover={scaleVariants.hover}
              >
                <h3 className="font-bold text-lg md:text-xl">+10</h3>
                <p className="text-xs md:text-sm">Manuscrits</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section droite */}
        <motion.div 
          className="w-full md:w-2/5 p-6 md:p-12 bg-white flex items-center"
          variants={itemVariants}
        >
          <div className="w-full">
            <motion.h2 
              className="text-xl md:text-2xl mb-2 font-semibold text-[#004a54]"
              variants={itemVariants}
            >
              Farlu ci Diiné dji, OHIO Colombus
            </motion.h2>
            <motion.p 
              className="text-sm md:text-base text-gray-500 mb-6 md:mb-8"
              variants={itemVariants}
            >
              Connectez-vous pour accéder à votre espace
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="error" className="mb-6">
                  {error}
                </Alert>
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.div 
                className="relative"
                variants={itemVariants}
                whileHover={scaleVariants.hover}
              >
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Téléphone ou email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#006C5F] focus:ring-2 focus:ring-[#006C5F]/30 outline-none text-sm md:text-base"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div 
                className="relative"
                variants={itemVariants}
                whileHover={scaleVariants.hover}
              >
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:border-[#006C5F] focus:ring-2 focus:ring-[#006C5F]/30 outline-none text-sm md:text-base"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </motion.div>

              <motion.div 
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="mr-2 rounded text-[#006C5F] focus:ring-[#006C5F]"
                  />
                  <label htmlFor="remember" className="text-xs md:text-sm text-gray-600">
                    Se souvenir de moi
                  </label>
                </div>
                <Link to="/forgot-password" className="text-xs md:text-sm text-[#006C5F] hover:text-[#004A42]">
                  Mot de passe oublié ?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full p-3 bg-[#006C5F] text-white font-semibold rounded-lg hover:bg-[#004A42] disabled:opacity-50 flex items-center justify-center text-sm md:text-base"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.svg 
                      className="-ml-1 mr-3 h-5 w-5 text-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} /> Se connecter
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.button
              onClick={handleVisitorAccess}
              className="w-full p-3 mt-4 bg-[#FFB400] text-white font-semibold rounded-lg hover:bg-[#ffc339] disabled:opacity-50 flex items-center justify-center text-sm md:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="mr-2" size={20} /> 
              Accéder en tant que visiteur
            </motion.button>

            {/* <motion.p 
              className="text-center text-xs md:text-sm text-gray-500 mt-6"
              variants={itemVariants}
            >
              Pas de compte ? {' '}
              <Link to="/register" className="text-[#006C5F] hover:text-[#004A42] font-semibold">
                Inscrivez-vous
              </Link>
            </motion.p> */}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;