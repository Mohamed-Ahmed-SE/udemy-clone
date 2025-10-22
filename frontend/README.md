# EduLearn - Modern Online Learning Platform

A comprehensive, modern online learning platform built with React, Vite, and Tailwind CSS. This project demonstrates advanced frontend development techniques with a focus on user experience, internationalization, and responsive design.

## 🚀 Features

### Core Features
- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Internationalization**: Full English and Arabic language support with RTL layout
- **Course Management**: Browse, search, and filter courses with advanced features
- **User Authentication**: Complete auth system with protected routes
- **Shopping Cart**: Add courses to cart with persistent storage
- **Wishlist**: Save favorite courses for later
- **Responsive Design**: Mobile-first approach with excellent mobile experience

### Advanced Features
- **Framer Motion**: Smooth animations and page transitions
- **Context API**: State management with React Context
- **Local Storage**: Persistent user preferences and data
- **Search & Filter**: Advanced course search with suggestions
- **Theme Toggle**: Dark/light mode with system preference detection
- **Toast Notifications**: User feedback with react-hot-toast
- **Intersection Observer**: Performance optimized animations

### Technical Features
- **Vite**: Fast development and build tooling
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Modern routing with nested routes
- **React I18next**: Internationalization framework
- **Lucide React**: Beautiful, customizable icons
- **ESLint**: Code quality and consistency

## 📁 Project Structure

```
src/
├── components/
│   ├── courses/          # Course-related components
│   ├── categories/       # Category components
│   ├── testimonials/     # Testimonial components
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── ui/              # Reusable UI components
├── contexts/            # React Context providers
├── data/               # Mock data and JSON files
├── i18n/               # Internationalization files
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   └── Dashboard/      # Dashboard pages
└── utils/              # Utility functions
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd udemy-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS with custom configuration. You can modify:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and custom utilities
- Component-specific styles using Tailwind classes

### Internationalization
Add new languages by:
1. Creating new locale files in `src/i18n/locales/`
2. Adding the language to the `resources` object in `src/i18n/index.js`
3. Updating the language switcher component

### Data
Mock data is stored in JSON files in `src/data/`. You can:
- Modify `courses.json` to add/update courses
- Update `categories.json` for different categories
- Add new data files for additional features

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality. Key rules:
- Use functional components with hooks
- Prefer TypeScript-style prop definitions
- Follow consistent naming conventions
- Use meaningful component and variable names

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### Other Platforms
The project can be deployed to any static hosting platform that supports SPA routing.

## 📊 Performance

### Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Bundle Optimization**: Vite's built-in optimizations
- **Caching**: Local storage for user preferences

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful images
- **Lucide** for the icon set
- **Tailwind CSS** for the styling framework
- **Framer Motion** for animations
- **React community** for excellent documentation

## 📞 Support

If you have any questions or need help:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Happy Learning! 🎓** 