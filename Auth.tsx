import { useState } from 'react';
import { Sprout, Home } from 'lucide-react';
import { useAuth } from '../AuthContext';

interface AuthProps {
  onNavigate: (page: string) => void;
}

export default function Auth({ onNavigate }: AuthProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [activeTab, setActiveTab] = useState<'farmer' | 'admin'>('farmer');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    village: '',
    adminRole: 'admin' as 'admin' | 'extension_officer'
  });

  const text = {
    en: {
      title: 'Login or Register',
      subtitle: 'Farmers and Admins can sign in',
      farmerTab: 'Farmer',
      adminTab: 'Admin',
      login: 'Login',
      register: 'Register',
      name: 'Name',
      username: 'Username',
      password: 'Password',
      village: 'Village',
      role: 'Role',
      submit: 'Submit',
      switchToRegister: "Don't have an account? Register",
      switchToLogin: 'Already have an account? Login',
      adminRoles: {
        admin: 'Admin',
        extension_officer: 'Extension Officer'
      }
    },
    ml: {
      title: 'ലോഗിൻ അല്ലെങ്കിൽ രജിസ്റ്റർ',
      subtitle: 'കർഷകർക്കും അഡ്മിനുകൾക്കും സൈൻ ഇൻ ചെയ്യാം',
      farmerTab: 'കർഷകൻ',
      adminTab: 'അഡ്മിൻ',
      login: 'ലോഗിൻ',
      register: 'രജിസ്റ്റർ',
      name: 'പേര്',
      username: 'ഉപയോക്തൃനാമം',
      password: 'പാസ്‌വേഡ്',
      village: 'ഗ്രാമം',
      role: 'റോൾ',
      submit: 'സമർപ്പിക്കുക',
      switchToRegister: 'അക്കൗണ്ട് ഇല്ലേ? രജിസ്റ്റർ ചെയ്യുക',
      switchToLogin: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ ചെയ്യുക',
      adminRoles: {
        admin: 'അഡ്മിൻ',
        extension_officer: 'എക്സ്റ്റൻഷൻ ഓഫീസർ'
      }
    }
  };

  const t = text[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        const user = await login(formData.username, formData.password);
        if (!user) {
          setError('Invalid username or password');
          return;
        }
        if (user.role !== activeTab) {
          setError(`This is a ${activeTab} login. Please use the correct tab.`);
          return;
        }
        onNavigate(user.role === 'farmer' ? '/farmer-dashboard' : '/admin-dashboard');
      } else {
        const user = await register({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          role: activeTab,
          village: activeTab === 'farmer' ? formData.village : undefined,
          adminRole: activeTab === 'admin' ? formData.adminRole : undefined
        });
        if (!user) {
          setError('Username already exists');
          return;
        }
        onNavigate(user.role === 'farmer' ? '/farmer-dashboard' : '/admin-dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition"
          >
            <Home className="w-6 h-6" />
            <span className="font-medium">Home</span>
          </button>

          <button
            onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
            className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200 transition"
          >
            {language === 'en' ? 'മലയാളം' : 'English'}
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sprout className="w-12 h-12 text-green-600" />
              <span className="text-3xl font-bold text-green-700">BeejSetu</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('farmer')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  activeTab === 'farmer'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t.farmerTab}
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  activeTab === 'admin'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t.adminTab}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.username}
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                />
              </div>

              {mode === 'register' && activeTab === 'farmer' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.village}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                  />
                </div>
              )}

              {mode === 'register' && activeTab === 'admin' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.role}
                  </label>
                  <select
                    value={formData.adminRole}
                    onChange={(e) => setFormData({ ...formData, adminRole: e.target.value as 'admin' | 'extension_officer' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                  >
                    <option value="admin">{t.adminRoles.admin}</option>
                    <option value="extension_officer">{t.adminRoles.extension_officer}</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.password}
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg transform hover:scale-[1.02]"
              >
                {mode === 'login' ? t.login : t.register}
              </button>
            </form>

            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="w-full mt-4 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              {mode === 'login' ? t.switchToRegister : t.switchToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
