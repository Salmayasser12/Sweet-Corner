import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation & General
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.menu': { ar: 'المنيو', en: 'Menu' },
  'brand.name': { ar: 'سويت كورنر', en: 'Sweet Corner' },
  
  // Hero Section
  'hero.title': { ar: 'اكتشفي منيو الحلويات', en: 'Explore our dessert menu' },
  'hero.subtitle': { ar: 'أشهى الحلويات الطازجة المخبوزة بحب', en: 'Freshly baked sweets made with love' },
  'hero.cta': { ar: 'تصفحي المنيو', en: 'Browse Menu' },
  
  // Menu Page
  'menu.search': { ar: 'ابحثي باسم المنتج...', en: 'Search by dessert name...' },
  'menu.startingFrom': { ar: 'يبدأ من', en: 'Starting from' },
  'menu.egp': { ar: 'ج.م', en: 'EGP' },
  
  // Categories
  'category.all': { ar: 'الكل', en: 'All' },
  'category.cookies': { ar: 'كوكيز', en: 'Cookies' },
  'category.miniCookies': { ar: 'ميني كوكيز', en: 'Mini Cookies' },
  'category.cookiesCakes': { ar: 'كيكات كوكيز', en: 'Cookies Cakes' },
  'category.tarts': { ar: 'تارت', en: 'Tarts' },
  'category.brownies': { ar: 'براونيز', en: 'Brownies' },
  'category.bakeries': { ar: 'مخبوزات', en: 'Bakeries' },
  
  // Product Modal
  'modal.options': { ar: 'الأحجام والأسعار', en: 'Sizes & Prices' },
  'modal.description': { ar: 'الوصف', en: 'Description' },
  'modal.notes': { ar: 'ملاحظات', en: 'Notes' },
  'modal.noNotes': { ar: 'لا توجد ملاحظات إضافية لهذا المنتج.', en: 'No additional notes for this product.' },
  'modal.extrasButton': { ar: 'عرض السعر بعد الإضافات', en: 'View price with extras' },
  'modal.basePriceButton': { ar: 'عرض السعر الأساسي', en: 'View base price' },
  'modal.close': { ar: 'إغلاق', en: 'Close' },
  
  // Empty State
  'empty.title': { ar: 'لا توجد نتائج', en: 'No desserts found' },
  'empty.subtitle': { ar: 'بنخبز حاجات جديدة قريب 😄', en: '...but we are baking more.' },
  
  // Language Toggle
  'lang.switch': { ar: 'English', en: 'عربي' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
