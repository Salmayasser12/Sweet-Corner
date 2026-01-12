import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X, Calculator } from 'lucide-react';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { language, t } = useLanguage();
  const [showWithExtras, setShowWithExtras] = useState(false);
  const [showExtraChocolate, setShowExtraChocolate] = useState(false);

  if (!product) return null;

  const name = product.name[language];
  const description = product.description[language];
  const notes = product.notes?.[language];

  // Extract extra price from notes (looks for patterns like "= 40", "for 25", etc.)
  const extractExtraPrice = (notesArray?: string[]): number => {
    if (!notesArray) return 0;
    for (const note of notesArray) {
      // Try different patterns: "= 40", "for 25", "25 per", etc.
      const patterns = [
        /=?\s*(\d+)/,  // "= 40" or "40"
        /for\s+(\d+)/i,  // "for 25"
        /(\d+)\s+per/i,  // "25 per"
      ];
      for (const pattern of patterns) {
        const match = note.match(pattern);
        if (match) {
          return parseInt(match[1], 10);
        }
      }
    }
    return 0;
  };

  const extraPrice = extractExtraPrice(notes);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 border-0 shadow-hover bg-card overflow-hidden h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-soft"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-0 h-full">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto overflow-hidden">
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
            <div className="p-6 flex flex-col h-full">
              <div className="pb-4 flex-shrink-0">
                <h2 className="text-2xl font-semibold text-foreground">
                  {name}
                </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
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
                          {showWithExtras && extraPrice > 0 ? (option.price + extraPrice) : option.price} {t('menu.egp')}
                          {showWithExtras && extraPrice > 0 && (
                            <span className="text-xs text-muted-foreground ml-1">
                              (+{extraPrice})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Extras Price Button */}
                {notes && notes.some(note => 
                  note.includes('=') || 
                  note.includes('إضافات') || 
                  note.includes('Extra') || 
                  note.includes('for') || 
                  /\d+/.test(note)
                ) && extraPrice > 0 && (
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowWithExtras(!showWithExtras)}
                      className="text-xs h-8 px-3 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                    >
                      <Calculator className="w-3 h-3 mr-1" />
                      {showWithExtras 
                        ? t('modal.basePriceButton')
                        : t('modal.extrasButton')
                      }
                    </Button>
                  </div>
                )}
                
                {/* Notes */}
                {notes && notes.length > 0 && (
                  <>
                    <Separator className="bg-border/50" />
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        {t('modal.notes')}
                      </h4>
                      <div className="rounded-lg bg-secondary/30 p-4">
                        <ul className="space-y-2">
                          {notes.map((note, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Extra Chocolate Button */}
                {product.withExtraChocolate && product.withExtraChocolate.length > 0 && (
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExtraChocolate(!showExtraChocolate)}
                      className="text-xs h-8 px-3 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                    >
                      {showExtraChocolate 
                        ? (language === 'ar' ? 'إخفاء أسعار الشوكولاتة الإضافية' : 'Hide extra chocolate prices')
                        : (language === 'ar' ? 'مع شوكولاتة إضافية' : 'With extra chocolate')
                      }
                    </Button>
                  </div>
                )}
                
                {/* Extra Chocolate Options */}
                {showExtraChocolate && product.withExtraChocolate && (
                  <>
                    <Separator className="bg-border/50" />
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        {language === 'ar' ? 'مع شوكولاتة إضافية' : 'With Extra Chocolate'}
                      </h4>
                      <div className="space-y-2">
                        {product.withExtraChocolate.map((option, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <span className="text-foreground font-medium">
                              {option.label}
                            </span>
                            <span className="text-primary font-semibold">
                              {option.price ? `${option.price} ${t('menu.egp')}` : 'TBD'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
