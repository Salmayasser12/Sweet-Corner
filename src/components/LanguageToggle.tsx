import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-secondary/50 backdrop-blur-sm">
      <span className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-foreground' : 'text-muted-foreground'}`}>
        EN
      </span>
      <Switch
        checked={language === 'ar'}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary"
      />
      <span className={`text-sm font-medium transition-colors font-arabic ${language === 'ar' ? 'text-foreground' : 'text-muted-foreground'}`}>
        عربي
      </span>
    </div>
  );
};

export default LanguageToggle;
