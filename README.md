# Sweet Corner 🧁
A modern, bilingual (Arabic/English) responsive web application designed to showcase dessert menus for bakeries and dessert shops. Sweet Corner provides an elegant, user-friendly interface for customers to browse products, view details, and explore categories—all without the complexity of e-commerce features.

## 📖 Overview
Sweet Corner is a browse-only menu website that allows bakery owners to present their products professionally online. The application focuses on simplicity and accessibility, offering a seamless experience across all devices with full support for both Arabic and English languages, including proper RTL (Right-to-Left) and LTR (Left-to-Right) layouts.

## ✨ Features
- **Fully Responsive Design** – Optimized viewing experience on desktop, tablet, and mobile devices
- **Bilingual Support** – Seamless switching between Arabic and English with proper RTL/LTR text direction
- **Smart Search** – Search products by name in both languages
- **Category Filtering** – Easy navigation with a dedicated category sidebar
- **Product Cards** – Clean display of product images, names, categories, and starting prices
- **Detailed Product View** – Modal/page showing full descriptions and size/piece options
- **Friendly Empty States** – Helpful messages when search or filter returns no results
- **Pastel Bakery Theme** – Warm, inviting UI design tailored for dessert businesses
- **Fast Performance** – Static data architecture ensures quick load times

## 🍪 Available Categories
- Cookies
- Mini Cookies
- Cookies Cakes
- Tarts
- Brownies
- Bakeries

## 🛠️ Tech Stack
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Data Source:** Static JSON file (`products.json`)
- **Hosting:** Vercel
- **Version Control:** Git & GitHub

## 📁 Project Structure
```
sweet-corner/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React Context (Language/Theme)
│   ├── data/            # products.json
│   └── App.tsx          # Main application component
├── index.html           # Entry HTML file
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## 🎯 Use Case
Sweet Corner is ideal for:
- Small bakeries wanting an online presence
- Dessert shops looking to showcase their products
- Pastry chefs building a portfolio
- Food businesses needing a simple, maintenance-free menu display
- Freelancers delivering quick menu solutions to clients

**Note:** This is a display-only website. It does not include shopping cart, checkout, payment processing, or backend functionality. For full e-commerce features, additional development would be required.

### Styling
Tailwind CSS configuration can be customized in `tailwind.config.js` to match your brand colors and design preferences.

## 📄 License
This project is available for personal and commercial use. Feel free to customize it for your clients or business needs.

## 👤 Author
**Salma Yasser**

---

**Sweet Corner** – Making dessert menus delightful, one click at a time. 🍰
