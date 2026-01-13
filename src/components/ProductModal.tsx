import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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

  const extractExtraPrice = (notesArray?: string[]): number => {
    if (!notesArray) return 0;
    for (const note of notesArray) {
      const patterns = [/=?\s*(\d+)/, /for\s+(\d+)/i, /(\d+)\s+per/i];
      for (const pattern of patterns) {
        const match = note.match(pattern);
        if (match) return parseInt(match[1], 10);
      }
    }
    return 0;
  };

  const extraPrice = extractExtraPrice(notes);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* 🔧 MODIFIED: fixed height + disable outer touch scroll */}
      <DialogContent className="max-w-2xl h-[90svh] p-0 border-0 shadow-hover bg-card overflow-hidden touch-none">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-soft"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">

          {/* Image */}
          <div className="relative h-full overflow-hidden">
            <img src={product.imageUrl} alt={name} className="w-full h-full object-cover" />
            <Badge className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col h-full">

            <div className="pb-4 shrink-0">
              <h2 className="text-2xl font-semibold text-foreground">{name}</h2>
            </div>

            {/* 🔧 MODIFIED: enabled mobile scroll */}
            <div
              className="flex-1 overflow-y-auto pr-2 space-y-4 touch-pan-y overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {t('modal.description')}
                </h4>
                <p className="text-foreground leading-relaxed">{description}</p>
              </div>

              <Separator className="bg-border/50" />

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  {t('modal.options')}
                </h4>
                <div className="space-y-2">
                  {product.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <span>{option.label}</span>
                      <span className="font-semibold text-primary">
                        {(showWithExtras ? option.price + extraPrice : option.price)} {t('menu.egp')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {notes && (
                <>
                  <Separator className="bg-border/50" />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      {t('modal.notes')}
                    </h4>
                    <ul className="space-y-2">
                      {notes.map((note, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
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
