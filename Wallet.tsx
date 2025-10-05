import { useState } from 'react';
import { ArrowLeft, Coins, Package, Wrench, Droplet, Leaf } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { updateUser } from '../auth';

interface WalletProps {
  onNavigate: (page: string) => void;
}

export default function Wallet({ onNavigate }: WalletProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const { user, updateCurrentUser } = useAuth();
  const [message, setMessage] = useState('');

  const text = {
    en: {
      title: 'BeejSetu Coin Wallet',
      subtitle: 'Redeem coins for seeds & tools',
      balance: 'Balance',
      earned: 'Earned via videos, quizzes, challenges',
      redeem: 'Redeem',
      redeemed: 'Redeemed!',
      insufficient: 'Insufficient coins',
      back: 'Back to Dashboard'
    },
    ml: {
      title: 'BeejSetu നാണയ വാലറ്റ്',
      subtitle: 'വിത്തുകൾക്കും ഉപകരണങ്ങൾക്കും നാണയങ്ങൾ വീണ്ടെടുക്കുക',
      balance: 'ബാലൻസ്',
      earned: 'വീഡിയോകൾ, ക്വിസുകൾ, വെല്ലുവിളികൾ വഴി നേടി',
      redeem: 'വീണ്ടെടുക്കുക',
      redeemed: 'വീണ്ടെടുത്തു!',
      insufficient: 'അപര്യാപ്തമായ നാണയങ്ങൾ',
      back: 'ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക'
    }
  };

  const t = text[language];

  const rewards = [
    {
      title: language === 'en' ? 'Organic Seed Pack' : 'ജൈവ വിത്ത് പായ്ക്ക്',
      cost: 100,
      icon: Package,
      color: 'green'
    },
    {
      title: language === 'en' ? 'Tool Kit' : 'ടൂൾ കിറ്റ്',
      cost: 150,
      icon: Wrench,
      color: 'blue'
    },
    {
      title: language === 'en' ? 'Eco Fertilizer' : 'ഇക്കോ വളം',
      cost: 80,
      icon: Leaf,
      color: 'yellow'
    },
    {
      title: language === 'en' ? 'Water Management System' : 'ജല മാനേജ്മെന്റ് സിസ്റ്റം',
      cost: 200,
      icon: Droplet,
      color: 'cyan'
    }
  ];

  const handleRedeem = (cost: number, title: string) => {
    if (!user) return;

    if (user.coins >= cost) {
      const newCoins = user.coins - cost;
      updateUser(user.id, { coins: newCoins });
      updateCurrentUser({ coins: newCoins });
      setMessage(`${t.redeemed} ${title}`);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(t.insufficient);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    cyan: 'bg-cyan-100 text-cyan-600'
  };

  const buttonColorClasses = {
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    cyan: 'bg-cyan-600 hover:bg-cyan-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Coins className="w-16 h-16 animate-pulse" />
            </div>
            <h2 className="text-5xl font-bold text-center mb-2">{user?.coins} {language === 'en' ? 'Coins' : 'നാണയങ്ങൾ'}</h2>
            <p className="text-center text-yellow-100">{t.earned}</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg text-center font-semibold ${
              message.includes(t.insufficient) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((reward, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 ${colorClasses[reward.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <reward.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{reward.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Coins className="w-5 h-5 text-yellow-600" />
                        <span className="font-bold text-yellow-600">{reward.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRedeem(reward.cost, reward.title)}
                  disabled={!user || user.coins < reward.cost}
                  className={`w-full py-3 text-white rounded-lg font-semibold transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                    buttonColorClasses[reward.color as keyof typeof buttonColorClasses]
                  }`}
                >
                  {t.redeem}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
