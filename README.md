# Next.js Boilerplate

A modern, production-ready Next.js boilerplate with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- ⚡ **Next.js 16** - Latest App Router with React Server Components
- 🔷 **TypeScript** - Type-safe development with full IntelliSense
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🎯 **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- 📦 **ESLint** - Code quality and consistency tooling
- 🎭 **Dark Mode** - Built-in dark mode support
- 📱 **Responsive** - Mobile-first responsive design

## 📦 What's Included

### Pre-installed shadcn/ui Components
- Button
- Card
- Input
- Label

### Project Structure
```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # shadcn/ui components
└── lib/
    └── utils.ts         # Utility functions (cn helper)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

The project is already set up! Just run:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 🎨 Adding More Components

shadcn/ui provides many more components. Add them using:

```bash
npx shadcn@latest add [component-name]
```

### Popular Components to Add:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add toast
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add switch
npx shadcn@latest add tabs
npx shadcn@latest add table
```

Browse all components at [ui.shadcn.com](https://ui.shadcn.com)

## 📁 Key Files

- `src/app/page.tsx` - Main landing page
- `src/app/layout.tsx` - Root layout component
- `src/app/globals.css` - Global styles and CSS variables
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🎯 Customization

### Theme Colors

Edit CSS variables in `src/app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... more variables */
  }
}
```

### Tailwind Configuration

Customize Tailwind in `tailwind.config.ts` or use the `@import` in `src/app/globals.css` for Tailwind v4.

### Component Customization

All shadcn/ui components are in your `src/components/ui/` directory. You own the code and can modify them freely!

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com)

### Other Platforms

- **Netlify**: Deploy via Git integration
- **Railway**: Connect your GitHub repository
- **AWS Amplify**: Use the Amplify console
- **Docker**: Build with `docker build -t nextjs-app .`

## 💡 Tips

1. **Code Organization**: Create feature-based folders in `src/` (e.g., `features/auth/`)
2. **API Routes**: Add API routes in `src/app/api/`
3. **Server Actions**: Use Server Actions for form handling
4. **Environment Variables**: Create `.env.local` for local environment variables
5. **Fonts**: Next.js automatically optimizes fonts defined in `layout.tsx`

## 🤝 Contributing

This is a boilerplate template. Feel free to customize it for your needs!

## 📝 License

MIT License - feel free to use this for personal or commercial projects.

---

Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui
