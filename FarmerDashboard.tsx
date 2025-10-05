import { useState } from 'react';
import { Home, Wallet, Trophy, User, Video, Brain, Users, Award, TrendingUp } from 'lucide-react';
import { useAuth } from './AuthContext';

interface FarmerDashboardProps {
  onNavigate: (page: string) => void;
}

export default function FarmerDashboard({ onNavigate }: FarmerDashboardProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const { user } = useAuth();

  const text = {
    en: {
      welcome: 'Welcome',
      village: 'Village',
      coins: 'Coins',
      leaderboard: 'Leaderboard',
      learningVideos: 'Learning Videos',
      learningDesc: 'Short localized videos with Malayalam subtitles or voiceover',
      watchNow: 'Watch Now',
      quizzes: 'Quizzes & Games',
      quizzesDesc: 'Simple multiple-choice after videos to earn coins',
      playNow: 'Play Now',
      challenges: 'Community & Seasonal Challenges',
      challengesDesc: 'Join seasonal challenges and track progress in realtime',
      continue: 'Continue',
      join: 'Join',
      wallOfFame: 'Wall of Fame',
      wallDesc: 'Top farmers celebrated here',
      cropProgress: 'Live Crop Progress',
      cropDesc: 'See how sustainable methods affect growth stages',
      updates: 'updates received',
      stages: {
        seeded: 'Seeded',
        sprouting: 'Sprouting',
        growing: 'Growing',
        harvestReady: 'Harvest Ready'
      }
    },
    ml: {
      welcome: 'സ്വാഗതം',
      village: 'ഗ്രാമം',
      coins: 'നാണയങ്ങൾ',
      leaderboard: 'ലീഡർബോർഡ്',
      learningVideos: 'പഠന വീഡിയോകൾ',
      learningDesc: 'മലയാളം സബ്‌ടൈറ്റിലുകളോ വോയ്‌സ് ഓവറോ ഉള്ള ഹ്രസ്വ പ്രാദേശികവൽക്കരിച്ച വീഡിയോകൾ',
      watchNow: 'ഇപ്പോൾ കാണുക',
      quizzes: 'ക്വിസുകളും ഗെയിമുകളും',
      quizzesDesc: 'നാണയങ്ങൾ നേടാൻ വീഡിയോകൾക്ക് ശേഷം ലളിതമായ മൾട്ടിപ്പിൾ ചോയ്‌സ്',
      playNow: 'ഇപ്പോൾ കളിക്കുക',
      challenges: 'കമ്മ്യൂണിറ്റിയും സീസണൽ വെല്ലുവിളികളും',
      challengesDesc: 'സീസണൽ വെല്ലുവിളികളിൽ ചേരുകയും തത്സമയം പുരോഗതി ട്രാക്ക് ചെയ്യുകയും ചെയ്യുക',
      continue: 'തുടരുക',
      join: 'ചേരുക',
      wallOfFame: 'വാൾ ഓഫ് ഫെയിം',
      wallDesc: 'മികച്ച കർഷകരെ ഇവിടെ ആഘോഷിക്കുന്നു',
      cropProgress: 'തത്സമയ വിള പുരോഗതി',
      cropDesc: 'സുസ്ഥിര രീതികൾ വളർച്ചാ ഘട്ടങ്ങളെ എങ്ങനെ ബാധിക്കുന്നുവെന്ന് കാണുക',
      updates: 'അപ്ഡേറ്റുകൾ ലഭിച്ചു',
      stages: {
        seeded: 'വിതച്ചു',
        sprouting: 'മുളയ്ക്കുന്നു',
        growing: 'വളരുന്നു',
        harvestReady: 'വിളവെടുപ്പ് തയ്യാർ'
      }
    }
  };

  const t = text[language];

  const videos = [
    { title: language === 'en' ? 'Organic Farming Basics' : 'ജൈവകൃഷി അടിസ്ഥാനകാര്യങ്ങൾ', icon: Video },
    { title: language === 'en' ? 'Water Management' : 'ജല മാനേജ്മെന്റ്', icon: Video }
  ];

  const quizzes = [
    { title: language === 'en' ? 'Quiz: Soil Care' : 'ക്വിസ്: മണ്ണ് സംരക്ഷണം', icon: Brain },
    { title: language === 'en' ? 'Quiz: Pest Control' : 'ക്വിസ്: കീടനിയന്ത്രണം', icon: Brain }
  ];

  const challenges = [
    { title: language === 'en' ? 'Organic Rice Trial' : 'ജൈവ നെല്ല് പരീക്ഷണം', progress: 60 },
    { title: language === 'en' ? 'Water Saving Week' : 'ജലസംരക്ഷണ ആഴ്ച', progress: 40 }
  ];

  const wallOfFameFarmers = [
    { name: 'Ravi', village: 'Palakkad', achievement: language === 'en' ? 'Reduced chemical use by 60%' : '60% രാസവസ്തുക്കൾ കുറച്ചു' }
  ];

  const cropStage = 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-50">
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                {t.welcome}, {user?.name}
              </h1>
              <p className="text-sm text-gray-600">
                {t.village}: {user?.village}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => onNavigate('/wallet')}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold hover:bg-yellow-200 transition"
              >
                <Wallet className="w-5 h-5" />
                <span>{user?.coins} {t.coins}</span>
              </button>

              <button
                onClick={() => onNavigate('/leaderboard')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                {t.leaderboard}
              </button>

              <button
                onClick={() => onNavigate('/profile')}
                className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <User className="w-6 h-6" />
              </button>

              <button
                onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition"
              >
                {language === 'en' ? 'മലയാളം' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Video className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.learningVideos}</h2>
              <p className="text-gray-600">{t.learningDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <video.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{video.title}</h3>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                    {t.watchNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.quizzes}</h2>
              <p className="text-gray-600">{t.quizzesDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <quiz.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    {t.playNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8 text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.challenges}</h2>
              <p className="text-gray-600">{t.challengesDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="font-semibold text-gray-800 mb-3">{challenge.title}</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{language === 'en' ? 'Progress' : 'പുരോഗതി'}</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-yellow-500 h-3 rounded-full transition-all"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium">
                  {challenge.progress > 0 ? t.continue : t.join}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-8 h-8 text-orange-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.wallOfFame}</h2>
              <p className="text-gray-600">{t.wallDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallOfFameFarmers.map((farmer, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 text-center text-lg">{farmer.name}</h3>
                <p className="text-gray-600 text-center text-sm mb-2">{farmer.village}</p>
                <p className="text-orange-700 text-center text-sm font-medium">{farmer.achievement}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.cropProgress}</h2>
              <p className="text-gray-600">{t.cropDesc}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              {[t.stages.seeded, t.stages.sprouting, t.stages.growing, t.stages.harvestReady].map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${
                      idx <= cropStage
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p className={`text-xs text-center font-medium ${idx <= cropStage ? 'text-green-700' : 'text-gray-400'}`}>
                    {stage}
                  </p>
                  {idx < 3 && (
                    <div className={`h-1 w-full mt-6 -mx-4 ${idx < cropStage ? 'bg-green-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                {t.updates}: 3
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
