import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="relative w-full max-w-md">
      <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
      <Input
        type="text"
        placeholder={t('menu.search')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-12 rounded-full border-0 bg-card shadow-card focus-visible:ring-primary ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'}`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors ${isRTL ? 'left-2' : 'right-2'}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
