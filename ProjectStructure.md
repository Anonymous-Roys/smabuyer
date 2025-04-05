smartgritrade/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (marketing)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── crowdfunding/
│   │   │   └── page.tsx
│   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── customer/
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── farmer/
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── sales/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── investor/
│   │   │   ├── investments/
│   │   │   │   └── page.tsx
│   │   │   ├── opportunities/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── transit/
│   │   │   ├── deliveries/
│   │   │   │   └── page.tsx
│   │   │   ├── routes/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── onboarding/
│   │   ├── farmer/
│   │   │   └── page.tsx
│   │   └── kyc/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── kyc/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── ... (other shadcn components)
│   ├── common/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── meta.tsx
│   ├── auth/
│   │   ├── signin-form.tsx
│   │   └── signup-form.tsx
│   ├── landing/
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── testimonials.tsx
│   │   └── role-sections.tsx
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   └── role-specific/
│   │       ├── customer/
│   │       ├── farmer/
│   │       ├── investor/
│   │       └── transit/
│   ├── onboarding/
│   │   ├── kyc-form.tsx
│   │   ├── farmer-form.tsx
│   │   └── stepper.tsx
│   ├── marketing/
│   │   ├── contact-form.tsx
│   │   └── blog-card.tsx
│   └── animations/
│       ├── fade-in.tsx
│       └── slide-in.tsx
├── lib/
│   ├── types/
│   │   ├── user.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── investment.ts
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-roles.ts
│   │   └── use-form.ts
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth-service.ts
│   │   └── product-service.ts
│   └── constants/
│       ├── routes.ts
│       ├── roles.ts
│       └── form-schemas.ts
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json