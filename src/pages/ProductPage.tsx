import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Product } from '@/types/product';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [showWithExtras, setShowWithExtras] = useState(false);
  const [showExtraChocolate, setShowExtraChocolate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        const products: Product[] = await response.json();
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/menu')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const name = product.name[language];
  const description = product.description[language];
  const notes = product.notes?.[language];

  // Extract extra price from notes
  const extractExtraPrice = (notesArray?: string[]): number => {
    if (!notesArray) return 0;
    for (const note of notesArray) {
      const patterns = [
        /=?\s*(\d+)/,
        /for\s+(\d+)/i,
        /(\d+)\s+per/i,
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back') || 'Back'}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {name}
              </h1>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-muted-foreground mb-2">
                {t('modal.description')}
              </h2>
              <p className="text-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <Separator />

            {/* Options */}
            <div>
              <h2 className="text-lg font-semibold text-muted-foreground mb-3">
                {t('modal.options')}
              </h2>
              <div className="space-y-2">
                {product.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
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
                <Separator />
                <div>
                  <h2 className="text-lg font-semibold text-muted-foreground mb-3">
                    {t('modal.notes')}
                  </h2>
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
                <Separator />
                <div>
                  <h2 className="text-lg font-semibold text-muted-foreground mb-3">
                    {language === 'ar' ? 'مع شوكولاتة إضافية' : 'With Extra Chocolate'}
                  </h2>
                  <div className="space-y-2">
                    {product.withExtraChocolate.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
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
    </div>
  );
};

export default ProductPage;