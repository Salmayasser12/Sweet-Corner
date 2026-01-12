export interface ProductOption {
  label: string;
  price: number;
  currency: string;
}

export interface Product {
  id: number;
  category: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  options: ProductOption[];
  notes?: {
    en: string[];
    ar: string[];
  };
  withExtraChocolate?: ProductOption[];
}

export type Category = 'All' | 'Cookies' | 'Mini Cookies' | 'Cookies Cakes' | 'Tarts' | 'Brownies' | 'Bakeries';
