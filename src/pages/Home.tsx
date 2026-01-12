import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg}
            alt="Desserts background"
            className="w-full h-full object-cover"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate/80 via-chocolate/60 to-chocolate/90" />
        </div>
        
        {/* Floating Elements - hidden on mobile for cleaner look */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center">
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 md:mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-rose" />
              <span className="text-xs md:text-sm text-white/90 font-medium">Sweet Corner</span>
            </div>
            
            {/* Main Title - Reduced size on mobile */}
            <h1 className={`text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-6 leading-tight animate-fade-in ${isRTL ? 'font-arabic' : 'font-display'}`} style={{ animationDelay: '0.1s' }}>
              {t('hero.title')}
            </h1>
            
            {/* Subtitle - Reduced spacing on mobile */}
            <p className="text-sm sm:text-base md:text-xl text-white/80 mb-6 md:mb-10 max-w-xl mx-auto animate-fade-in px-2" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            
            {/* CTA Button - Smaller on mobile */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                asChild
                size="lg"
                className="h-11 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <Link to="/menu" className="flex items-center gap-2 md:gap-3">
                  {t('hero.cta')}
                  <ArrowIcon className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </div>
  );
};

export default Home;
