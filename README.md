# 🌿 Ayurveda Glow - Holistic Wellness & Beauty Platform

<div align="center">

![Ayurveda Glow Banner](https://img.shields.io/badge/Ayurveda-Glow-success?style=for-the-badge&logo=react&logoColor=white)

**Your personalized journey to holistic wellness through ancient Ayurvedic wisdom**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://ayurveda-glow-app.netlify.app) • [Report Bug](https://github.com/anjaneya-sharma-1/ayurveda-glow-app/issues) • [Request Feature](https://github.com/anjaneya-sharma-1/ayurveda-glow-app/issues)

</div>

---

## 🌟 Overview

**Ayurveda Glow** is a modern, interactive web application that bridges ancient Ayurvedic wisdom with contemporary web technologies. Built with React and TypeScript, this platform offers personalized wellness recommendations, dosha analysis, beauty routines, and holistic health guidance based on 5000-year-old Ayurvedic principles.

Whether you're seeking natural beauty solutions, personalized wellness routines, or want to understand your unique body constitution (dosha), Ayurveda Glow provides an intuitive, visually appealing interface to explore and embrace holistic health practices.

---

## ✨ Key Features

### 🧘 **Dosha Assessment & Analysis**
- Interactive questionnaire to determine your unique Prakriti (body constitution)
- Detailed analysis of Vata, Pitta, and Kapha doshas
- Personalized recommendations based on dosha type
- Visual dosha balance indicators

### 💆 **Personalized Beauty Routines**
- Custom skincare recommendations based on dosha and skin type
- Natural beauty product suggestions using Ayurvedic herbs
- Daily and seasonal beauty rituals
- DIY herbal beauty recipes

### 🌱 **Wellness Dashboard**
- Holistic health tracking and monitoring
- Dietary recommendations aligned with your dosha
- Lifestyle tips for optimal balance
- Seasonal wellness guides

### 📚 **Educational Resources**
- Comprehensive Ayurvedic knowledge base
- Herb and ingredient database
- Video tutorials and guided practices
- Articles on holistic wellness topics

### 🎨 **Modern User Experience**
- Clean, intuitive interface with smooth animations
- Fully responsive design (mobile, tablet, desktop)
- Dark/Light mode support
- Fast loading times with optimized performance

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **TypeScript 5.6.2** - Type-safe development with enhanced IDE support
- **Vite 5.4.2** - Next-generation frontend tooling with lightning-fast HMR

### **Styling & UI**
- **TailwindCSS 3.4.1** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Accessible, unstyled component primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-icons`
  - `@radix-ui/react-select`
  - `@radix-ui/react-slider`
  - `@radix-ui/react-tabs`
- **Lucide React** - Beautiful, consistent icon set
- **class-variance-authority** - CVA for component variants
- **tailwind-merge** & **tailwindcss-animate** - Enhanced Tailwind utilities

### **Routing & Navigation**
- **React Router DOM 6.26.2** - Declarative routing for React applications
- **Wouter 3.3.5** - Lightweight routing alternative

### **State Management & Data Fetching**
- **TanStack Query 5.56.2** (React Query) - Powerful async state management
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### **Development Tools**
- **ESLint 9.9.1** - Code quality and consistency
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility
- **@vitejs/plugin-react-swc** - SWC-powered React plugin for faster builds

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anjaneya-sharma-1/ayurveda-glow-app.git
   cd ayurveda-glow-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

---

## 📁 Project Structure

```
ayurveda-glow-app/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ui/           # UI primitives (buttons, cards, etc.)
│   │   └── features/     # Feature-specific components
│   ├── pages/            # Page components for routing
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   ├── styles/           # Global styles and Tailwind config
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

---

## 🎨 Customization

### Tailwind Theme

Customize colors, fonts, and design tokens in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      },
    },
  },
}
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Ayurveda Glow
```

### Component Styling

Components use Tailwind utility classes and Radix UI primitives. Modify styles directly in component files or create custom variants using CVA.

---

## 🧪 Testing

```bash
# Run tests (when test suite is set up)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Update documentation for new features
- Add tests for new functionality
- Ensure all tests pass before submitting PR
- Keep PRs focused on a single feature/fix

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Author

**Anjaneya Sharma**
- GitHub: [@anjaneya-sharma-1](https://github.com/anjaneya-sharma-1)
- Repository: [ayurveda-glow-app](https://github.com/anjaneya-sharma-1/ayurveda-glow-app)

---

## 🙏 Acknowledgments

- Ancient Ayurvedic texts and practitioners for the timeless wisdom
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TailwindCSS](https://tailwindcss.com/) for the amazing utility-first framework
- [Vite](https://vitejs.dev/) for blazing-fast build tooling
- [Lucide](https://lucide.dev/) for beautiful icons
- The open-source community for inspiration and tools

---

## 📧 Contact & Support

If you have any questions, suggestions, or need support:

- **Issues**: [Create an issue](https://github.com/anjaneya-sharma-1/ayurveda-glow-app/issues)
- **Discussions**: [Start a discussion](https://github.com/anjaneya-sharma-1/ayurveda-glow-app/discussions)

---

<div align="center">

**Made with ❤️ and 🌿 for holistic wellness**

⭐ Star this repository if you found it helpful!

</div>
