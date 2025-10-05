import { useState } from 'react';
import { Sprout, Users, Trophy, TrendingUp } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const text = {
    en: {
      logo: 'BeejSetu',
      nav: ['Home', 'About', 'How It Works'],
      title: 'BeejSetu — Seed Your Knowledge',
      subtitle: 'Learn sustainable farming — earn coins — join community challenges',
      getStarted: 'Get Started',
      features: {
        learn: {
          title: 'Learn & Earn',
          desc: 'Watch videos, take quizzes, earn coins'
        },
        community: {
          title: 'Community Challenges',
          desc: 'Join seasonal farming challenges'
        },
        rewards: {
          title: 'Redeem Rewards',
          desc: 'Exchange coins for seeds & tools'
        },
        growth: {
          title: 'Track Growth',
          desc: 'Monitor crop progress in real-time'
        }
      }
    },
    ml: {
      logo: 'BeejSetu',
      nav: ['ഹോം', 'പരിചയം', 'എങ്ങനെ പ്രവർത്തിക്കുന്നു'],
      title: 'BeejSetu — നിങ്ങളുടെ അറിവ് വിതയ്ക്കുക',
      subtitle: 'സുസ്ഥിര കൃഷി പഠിക്കുക — നാണയങ്ങൾ നേടുക — കമ്മ്യൂണിറ്റി വെല്ലുവിളികളിൽ ചേരുക',
      getStarted: 'ആരംഭിക്കുക',
      features: {
        learn: {
          title: 'പഠിക്കുക & നേടുക',
          desc: 'വീഡിയോകൾ കാണുക, ക്വിസ് എടുക്കുക, നാണയങ്ങൾ നേടുക'
        },
        community: {
          title: 'കമ്മ്യൂണിറ്റി വെല്ലുവിളികൾ',
          desc: 'സീസണൽ കൃഷി വെല്ലുവിളികളിൽ ചേരുക'
        },
        rewards: {
          title: 'പുരസ്കാരങ്ങൾ വീണ്ടെടുക്കുക',
          desc: 'വിത്തുകൾക്കും ഉപകരണങ്ങൾക്കും നാണയങ്ങൾ മാറ്റുക'
        },
        growth: {
          title: 'വളർച്ച ട്രാക്ക് ചെയ്യുക',
          desc: 'തത്സമയം വിള പുരോഗതി നിരീക്ഷിക്കുക'
        }
      }
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">{t.logo}</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {t.nav.map((item, idx) => (
                <a key={idx} href="#" className="text-gray-700 hover:text-green-600 font-medium transition">
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200 transition"
            >
              {language === 'en' ? 'മലയാളം' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            {t.subtitle}
          </p>
          <button
            onClick={() => onNavigate('/auth')}
            className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transform hover:scale-105 transition shadow-lg"
          >
            {t.getStarted}
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.features.learn.title}</h3>
            <p className="text-gray-600">{t.features.learn.desc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.features.community.title}</h3>
            <p className="text-gray-600">{t.features.community.desc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.features.rewards.title}</h3>
            <p className="text-gray-600">{t.features.rewards.desc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.features.growth.title}</h3>
            <p className="text-gray-600">{t.features.growth.desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
