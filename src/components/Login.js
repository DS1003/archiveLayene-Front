import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Alert from './ui/Alert';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate network delay
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex w-11/12 max-w-6xl rounded-2xl overflow-hidden bg-white shadow-lg">
        {/* Section gauche */}
        <div className="w-3/5 p-10 flex flex-col justify-center bg-[#fafafa]">
          <img src="/assets/logo.png" alt="Logo Farlu ci Diiné dji" className="w-32 mb-6" />
          <h1 className="text-4xl font-semibold text-[#004a54]">
            BIENVENUE <br />
            <span className="text-[#ffb400]">Laye Maxtar</span>
          </h1>
          <p className="text-sm text-gray-600 mt-5 leading-relaxed">
            Explorez une collection unique de documents dédiés à la communauté Layène. Cette plateforme est conçue pour préserver, valoriser et partager le riche patrimoine spirituel de la communauté Layène. Découvrez des manuscrits, des textes sacrés, des documents historiques, et bien plus encore, rassemblés pour vous permettre d'approfondir vos connaissances et votre foi. Que vous soyez membre de la communauté, chercheur ou passionné par la spiritualité Layène, notre plateforme est une ressource précieuse pour explorer et honorer cet héritage unique.
          </p>
          <div className="mt-8 text-sm text-gray-500">
            Copyright © 2024. Powered with ❤️ & 🥤 by Saphir Afia
          </div>
        </div>

        {/* Section droite */}
        <div className="w-2/5 p-10 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl mb-4">
              Bienvenue sur <span className="text-[#ffb400]">Farlu ci Diiné dji</span>
            </h2>
            <h1 className="text-2xl font-semibold mb-6">Se connecter</h1>

            <button
              type="button"
              className="flex items-center justify-center w-full p-3 mb-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => setError('La connexion avec Google sera disponible prochainement.')}
            >
              <img src="/assets/google-logo.png" alt="Google" className="w-5 h-5 mr-3" />
              Sign in with Google
            </button>

            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Téléphone ou email
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Téléphone ou email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#007952] focus:ring-1 focus:ring-[#007952] outline-none"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#007952] focus:ring-1 focus:ring-[#007952] outline-none"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-[#009678] hover:text-[#007952]">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-3 bg-[#007952] text-white font-semibold rounded-lg hover:bg-[#005c3f] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;