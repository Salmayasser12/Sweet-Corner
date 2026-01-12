import { useLanguage } from '@/contexts/LanguageContext';
import { Category } from '@/types/product';
import { cn } from '@/lib/utils';
import { Cookie, Cake, CircleDot, Square, Croissant, ChefHat, LayoutGrid } from 'lucide-react';

interface CategorySidebarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  productCounts: Record<string, number>;
}

const categories: { id: Category; icon: React.ElementType; translationKey: string }[] = [
  { id: 'All', icon: LayoutGrid, translationKey: 'category.all' },
  { id: 'Cookies', icon: Cookie, translationKey: 'category.cookies' },
  { id: 'Mini Cookies', icon: CircleDot, translationKey: 'category.miniCookies' },
  { id: 'Cookies Cakes', icon: Cake, translationKey: 'category.cookiesCakes' },
  { id: 'Tarts', icon: Square, translationKey: 'category.tarts' },
  { id: 'Brownies', icon: Croissant, translationKey: 'category.brownies' },
  { id: 'Bakeries', icon: ChefHat, translationKey: 'category.bakeries' },
];

const CategorySidebar = ({ selectedCategory, onSelectCategory, productCounts }: CategorySidebarProps) => {
  const { t } = useLanguage();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-24 bg-card rounded-2xl shadow-card p-4 lg:p-5">
        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            const count = category.id === 'All' 
              ? Object.values(productCounts).reduce((a, b) => a + b, 0)
              : productCounts[category.id] || 0;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap",
                  "hover:bg-accent hover:text-accent-foreground",
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "bg-secondary/50 text-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{t(category.translationKey)}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full ms-auto",
                  isSelected ? "bg-primary-foreground/20" : "bg-muted"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default CategorySidebar;
