import { useState } from 'react';
import { ArrowLeft, Trophy, Medal } from 'lucide-react';
import { getAllUsers } from '../auth';

interface LeaderboardProps {
  onNavigate: (page: string) => void;
}

export default function Leaderboard({ onNavigate }: LeaderboardProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const text = {
    en: {
      title: 'BeejSetu Leaderboard',
      subtitle: 'Top farmers leading sustainable farming',
      rank: 'Rank',
      farmer: 'Farmer',
      village: 'Village',
      coins: 'Coins',
      challenges: 'Challenges',
      back: 'Back to Dashboard'
    },
    ml: {
      title: 'BeejSetu ലീഡർബോർഡ്',
      subtitle: 'സുസ്ഥിര കൃഷിയിൽ മുന്നിൽ നിൽക്കുന്ന കർഷകർ',
      rank: 'റാങ്ക്',
      farmer: 'കർഷകൻ',
      village: 'ഗ്രാമം',
      coins: 'നാണയങ്ങൾ',
      challenges: 'വെല്ലുവിളികൾ',
      back: 'ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക'
    }
  };

  const t = text[language];

  const allUsers = getAllUsers();
  const farmers = allUsers
    .filter(u => u.role === 'farmer')
    .sort((a, b) => b.coins - a.coins)
    .map((farmer, idx) => ({
      rank: idx + 1,
      name: farmer.name,
      village: farmer.village || 'N/A',
      coins: farmer.coins,
      challenges: Math.floor(farmer.coins / 50)
    }));

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="font-bold text-gray-600">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300';
    return 'bg-white border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
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
          {farmers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {language === 'en' ? 'No farmers registered yet' : 'ഇതുവരെ കർഷകർ രജിസ്റ്റർ ചെയ്തിട്ടില്ല'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {farmers.map((farmer) => (
                <div
                  key={farmer.rank}
                  className={`${getRankBg(farmer.rank)} border-2 rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-6 flex-1 min-w-0">
                      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                        {getRankIcon(farmer.rank)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-lg truncate">{farmer.name}</h3>
                        <p className="text-sm text-gray-600">{farmer.village}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">{farmer.coins}</p>
                        <p className="text-xs text-gray-600">{t.coins}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{farmer.challenges}</p>
                        <p className="text-xs text-gray-600">{t.challenges}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
