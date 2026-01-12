import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Cookie } from 'lucide-react';

const Header = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? 'bg-transparent' : 'bg-card/90 backdrop-blur-md shadow-soft'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <span className={`text-lg md:text-xl font-semibold ${isHome ? 'text-white' : 'text-foreground'} ${isRTL ? 'font-arabic' : 'font-display'}`}>
              {t('brand.name')}
            </span>
          </Link>

          {/* Navigation */}
          <nav className={`flex items-center gap-3 md:gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link 
              to="/" 
              className={`text-sm md:text-base font-medium transition-colors hover:text-primary ${
                isHome ? 'text-white/90 hover:text-white' : 'text-foreground'
              } ${location.pathname === '/' ? 'text-primary' : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/menu" 
              className={`text-sm md:text-base font-medium transition-colors hover:text-primary ${
                isHome ? 'text-white/90 hover:text-white' : 'text-foreground'
              } ${location.pathname === '/menu' ? 'text-primary' : ''}`}
            >
              {t('nav.menu')}
            </Link>
            <LanguageToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
