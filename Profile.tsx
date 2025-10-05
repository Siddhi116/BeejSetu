import { useState } from 'react';
import { ArrowLeft, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { updateUser } from '../auth';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const { user, updateCurrentUser } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || {
    hairstyle: 'Short',
    skinTone: 'default',
    clothing: 'Shirt',
    accessory: 'None'
  });

  const text = {
    en: {
      profile: 'Profile',
      name: 'Name',
      username: 'Username',
      village: 'Village',
      coins: 'Coins',
      avatar: 'Avatar',
      liveStatus: 'Status',
      online: 'Online',
      customizer: 'Avatar Customizer',
      hairstyle: 'Hairstyle',
      skinTone: 'Skin Tone',
      clothing: 'Clothing',
      accessory: 'Accessory',
      save: 'Save Avatar',
      saved: 'Avatar saved!',
      back: 'Back'
    },
    ml: {
      profile: 'പ്രൊഫൈൽ',
      name: 'പേര്',
      username: 'ഉപയോക്തൃനാമം',
      village: 'ഗ്രാമം',
      coins: 'നാണയങ്ങൾ',
      avatar: 'അവതാർ',
      liveStatus: 'സ്റ്റാറ്റസ്',
      online: 'ഓൺലൈൻ',
      customizer: 'അവതാർ കസ്റ്റമൈസർ',
      hairstyle: 'ഹെയർസ്റ്റൈൽ',
      skinTone: 'ത്വക്ക് ടോൺ',
      clothing: 'വസ്ത്രം',
      accessory: 'ആക്സസറി',
      save: 'അവതാർ സേവ് ചെയ്യുക',
      saved: 'അവതാർ സേവ് ചെയ്തു!',
      back: 'മടങ്ങുക'
    }
  };

  const t = text[language];

  const options = {
    hairstyle: ['Short', 'Long', 'Bun', 'Hat'],
    skinTone: ['Fair', 'Light', 'Medium', 'Tan', 'Dark'],
    clothing: ['Shirt', 'Kurta', 'Jacket'],
    accessory: ['None', 'Glasses', 'Scarf']
  };

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!user) return;

    updateUser(user.id, { avatar });
    updateCurrentUser({ avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getAvatarColor = (skinTone: string) => {
    const colors = {
      Fair: 'bg-orange-100',
      Light: 'bg-orange-200',
      Medium: 'bg-orange-300',
      Tan: 'bg-orange-400',
      Dark: 'bg-orange-500',
      default: 'bg-orange-300'
    };
    return colors[skinTone as keyof typeof colors] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition"
              >
                {language === 'en' ? 'മലയാളം' : 'EN'}
              </button>

              <button
                onClick={() => onNavigate('/farmer-dashboard')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t.back}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className={`w-24 h-24 ${getAvatarColor(avatar.skinTone)} rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg`}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">{t.online}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{t.name}</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
                  {user?.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{t.username}</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
                  {user?.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{t.village}</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
                  {user?.village}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{t.coins}</label>
                <div className="px-4 py-3 bg-yellow-50 rounded-lg text-yellow-800 font-bold">
                  {user?.coins}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">{t.customizer}</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t.hairstyle}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {options.hairstyle.map((style) => (
                    <button
                      key={style}
                      onClick={() => setAvatar({ ...avatar, hairstyle: style })}
                      className={`py-3 px-4 rounded-lg font-medium transition transform hover:scale-105 ${
                        avatar.hairstyle === style
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t.skinTone}</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {options.skinTone.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setAvatar({ ...avatar, skinTone: tone })}
                      className={`py-3 px-4 rounded-lg font-medium transition transform hover:scale-105 ${
                        avatar.skinTone === tone
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t.clothing}</label>
                <div className="grid grid-cols-3 gap-3">
                  {options.clothing.map((item) => (
                    <button
                      key={item}
                      onClick={() => setAvatar({ ...avatar, clothing: item })}
                      className={`py-3 px-4 rounded-lg font-medium transition transform hover:scale-105 ${
                        avatar.clothing === item
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t.accessory}</label>
                <div className="grid grid-cols-3 gap-3">
                  {options.accessory.map((item) => (
                    <button
                      key={item}
                      onClick={() => setAvatar({ ...avatar, accessory: item })}
                      className={`py-3 px-4 rounded-lg font-medium transition transform hover:scale-105 ${
                        avatar.accessory === item
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {saved && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold">
                  {t.saved}
                </div>
              )}

              <button
                onClick={handleSave}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition shadow-lg transform hover:scale-[1.02]"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
