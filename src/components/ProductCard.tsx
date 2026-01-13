import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  searchQuery?: string;
}

const ProductCard = ({ product, searchQuery }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const name = product.name[language];
  const minPrice = Math.min(...product.options.map(o => o.price));

  // Highlight search query in product name
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/30 text-foreground rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card animate-fade-in"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-xs font-medium"
        >
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {highlightText(name, searchQuery || '')}
        </h3>
        
        <div className="flex items-center gap-1 text-primary font-medium">
          <span className="text-sm text-muted-foreground">{t('menu.startingFrom')}</span>
          <span className="text-lg">{minPrice}</span>
          <span className="text-sm">{t('menu.egp')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
