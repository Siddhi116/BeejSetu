import { useState } from 'react';
import { Home, Video, Brain, Users as UsersIcon, MapPin, TrendingUp, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { getAllUsers } from '../auth';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const { user, logout } = useAuth();
  const [contentType, setContentType] = useState<'video' | 'quiz' | 'challenge'>('video');
  const [showSuccess, setShowSuccess] = useState(false);

  const text = {
    en: {
      title: 'Admin Dashboard',
      subtitle: 'Monitor villages & farmer progress',
      overview: 'Villages Overview',
      village: 'Village',
      farmers: 'Farmers Registered',
      sustainability: 'Sustainability Score',
      addContent: 'Add Content',
      videoTitle: 'Video Title',
      description: 'Description',
      uploadLink: 'Upload Link',
      type: 'Type',
      types: {
        video: 'Video',
        quiz: 'Quiz',
        challenge: 'Challenge'
      },
      submit: 'Add Content',
      motivation: 'Motivation Wall',
      quote: 'Sustainable seeds, prosperous fields!',
      contentAdded: 'Content added successfully!',
      logout: 'Logout'
    },
    ml: {
      title: 'അഡ്മിൻ ഡാഷ്‌ബോർഡ്',
      subtitle: 'ഗ്രാമങ്ങളും കർഷക പുരോഗതിയും നിരീക്ഷിക്കുക',
      overview: 'ഗ്രാമങ്ങളുടെ അവലോകനം',
      village: 'ഗ്രാമം',
      farmers: 'രജിസ്റ്റർ ചെയ്ത കർഷകർ',
      sustainability: 'സുസ്ഥിരത സ്കോർ',
      addContent: 'ഉള്ളടക്കം ചേർക്കുക',
      videoTitle: 'വീഡിയോ ശീർഷകം',
      description: 'വിവരണം',
      uploadLink: 'അപ്‌ലോഡ് ലിങ്ക്',
      type: 'തരം',
      types: {
        video: 'വീഡിയോ',
        quiz: 'ക്വിസ്',
        challenge: 'വെല്ലുവിളി'
      },
      submit: 'ഉള്ളടക്കം ചേർക്കുക',
      motivation: 'പ്രചോദന മതിൽ',
      quote: 'സുസ്ഥിര വിത്തുകൾ, സമൃദ്ധമായ വയലുകൾ!',
      contentAdded: 'ഉള്ളടക്കം വിജയകരമായി ചേർത്തു!',
      logout: 'ലോഗൗട്ട്'
    }
  };

  const t = text[language];

  const allUsers = getAllUsers();
  const farmers = allUsers.filter(u => u.role === 'farmer');

  const villages = [
    { name: 'Thrissur', count: farmers.filter(f => f.village === 'Thrissur').length, score: 85 },
    { name: 'Palakkad', count: farmers.filter(f => f.village === 'Palakkad').length, score: 78 },
    { name: 'Ernakulam', count: farmers.filter(f => f.village === 'Ernakulam').length, score: 82 },
    { name: 'Kannur', count: farmers.filter(f => f.village === 'Kannur').length, score: 75 }
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ title: '', description: '', link: '' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    onNavigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition"
            >
              <Home className="w-6 h-6" />
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t.title}</h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition"
              >
                {language === 'en' ? 'മലയാളം' : 'EN'}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t.overview}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">{t.village}</th>
                    <th className="px-6 py-4 text-left font-semibold">{t.farmers}</th>
                    <th className="px-6 py-4 text-left font-semibold">{t.sustainability}</th>
                  </tr>
                </thead>
                <tbody>
                  {villages.map((village, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{village.name}</td>
                      <td className="px-6 py-4 text-gray-700">{village.count}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-xs">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{ width: `${village.score}%` }}
                            />
                          </div>
                          <span className="font-semibold text-green-600">{village.score}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Video className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t.addContent}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setContentType('video')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  contentType === 'video'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Video className="w-5 h-5 mx-auto mb-1" />
                {t.types.video}
              </button>
              <button
                onClick={() => setContentType('quiz')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  contentType === 'quiz'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Brain className="w-5 h-5 mx-auto mb-1" />
                {t.types.quiz}
              </button>
              <button
                onClick={() => setContentType('challenge')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  contentType === 'challenge'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <UsersIcon className="w-5 h-5 mx-auto mb-1" />
                {t.types.challenge}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.videoTitle}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.description}
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.uploadLink}
                </label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                />
              </div>

              {showSuccess && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold">
                  {t.contentAdded}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-blue-700 transition shadow-lg transform hover:scale-[1.02]"
              >
                {t.submit}
              </button>
            </form>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <MessageSquare className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t.motivation}</h2>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-lg p-8 text-center">
            <p className="text-2xl font-bold text-gray-800 italic">"{t.quote}"</p>
          </div>
        </section>
      </main>
    </div>
  );
}
