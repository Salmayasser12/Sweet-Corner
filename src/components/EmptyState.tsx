import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie } from 'lucide-react';

const EmptyState = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center mb-6 animate-float">
        <Cookie className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {t('empty.title')}
      </h3>
      <p className="text-muted-foreground">
        {t('empty.subtitle')}
      </p>
    </div>
  );
};

export default EmptyState;
