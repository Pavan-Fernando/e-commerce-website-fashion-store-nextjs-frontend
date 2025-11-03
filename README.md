# TrendVibe – Online Fashion Store (Frontend)

---

## Features

| Feature | Status |
|-------|--------|
| **Responsive Design** | Mobile-first, fully responsive |
| **Dark Mode** | Toggle via header |
| **Product Grid + Filters** | Price, Size, Color, Category |
| **Shopping Cart (Sheet)** | Add/Remove, Persistent |
| **User Authentication** | Login, Profile, Logout (mock) |
| **Pages** | Home, Products, About, Contact, FAQ, Size Guide |
| **Search Bar** | Desktop & Mobile |
| **shadcn/ui + Tailwind CSS** | Beautiful, accessible components |
| **TypeScript** | Full type safety |
| **Next.js App Router** | Fast, SEO-friendly |
| **Vercel Optimized** | Edge-ready, zero-config deploy |

---

## Tech Stack

```text
Framework: Next.js 16 (App Router)
Language: TypeScript
Styling: Tailwind CSS + shadcn/ui
Icons: Lucide React
State: React Hooks + localStorage
Deployment: Vercel


Project Structure
src/
├── app/
│   ├── (layout).tsx           # Root layout
│   ├── page.tsx               # Home
│   ├── products/page.tsx      # Product listing + filters
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── size-guide/page.tsx
│   ├── login/page.tsx
│   └── profile/page.tsx
├── components/
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   ├── cart/CartSheet.tsx
│   ├── products/ProductCard.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   └── use-dark-mode.ts
├── lib/
│   └── mockData.ts
└── public/
    └── images/
