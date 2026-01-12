import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import EmptyState from '@/components/EmptyState';
import { Product, Category } from '@/types/product';

const Menu = () => {
  const { language, isRTL } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate product counts per category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameEn = product.name.en.toLowerCase();
        const nameAr = product.name.ar.toLowerCase();
        return nameEn.includes(query) || nameAr.includes(query);
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Bar */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-40 md:pt-44 pb-12">
        <div className={`flex flex-col lg:flex-row gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Product Grid */}
          <div className="flex-1 order-2 lg:order-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard
                      product={product}
                      onClick={() => handleProductClick(product)}
                      searchQuery={searchQuery}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Category Sidebar */}
          <div className={`order-1 lg:order-2 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              productCounts={productCounts}
            />
          </div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Menu;
