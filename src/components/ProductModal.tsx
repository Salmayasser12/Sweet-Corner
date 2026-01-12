import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { language, t } = useLanguage();

  if (!product) return null;

  const name = product.name[language];
  const description = product.description[language];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 shadow-hover bg-card">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-soft"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto">
            <img 
              src={product.imageUrl} 
              alt={name}
              className="w-full h-full object-cover"
            />
            <Badge 
              variant="secondary" 
              className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>
          
          {/* Details Section */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-semibold text-foreground">
                {name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="mt-4 space-y-4 flex-1">
              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {t('modal.description')}
                </h4>
                <p className="text-foreground leading-relaxed">
                  {description}
                </p>
              </div>
              
              <Separator className="bg-border/50" />
              
              {/* Options */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  {t('modal.options')}
                </h4>
                <div className="space-y-2">
                  {product.options.map((option, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <span className="text-foreground font-medium">
                        {option.label}
                      </span>
                      <span className="text-primary font-semibold">
                        {option.price} {t('menu.egp')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
