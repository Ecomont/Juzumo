# My Next.js 14 App

This is a Next.js 14 application built with TypeScript and styled using TailwindCSS. The project is structured to support both marketing and dashboard functionalities, with a focus on SEO and performance.

## Project Structure

```
my-next14-app
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── (marketing)
│   │   ├── layout.tsx
│   │   ├── about
│   │   │   └── page.tsx
│   │   └── pricing
│   │       └── page.tsx
│   ├── (dashboard)
│   │   ├── layout.tsx
│   │   └── dashboard
│   │       ├── page.tsx
│   │       └── settings
│   │           └── page.tsx
│   ├── api
│   │   └── health
│   │       └── route.ts
│   ├── robots.ts
│   ├── sitemap.ts
│   └── manifest.ts
├── components
│   ├── layout
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui
│   │   ├── button.tsx
│   │   └── input.tsx
│   └── theme-toggle.tsx
├── lib
│   ├── env.ts
│   ├── seo.ts
│   └── utils.ts
├── types
│   └── env.d.ts
├── public
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── package.json
├── tsconfig.json
├── .env.example
├── .eslintrc.json
├── .prettierrc
└── README.md
```

## Features

- **TypeScript**: Strongly typed code for better maintainability and developer experience.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **SEO Optimization**: Built-in support for SEO with metadata management.
- **API Routes**: Simple API route for health checks.
- **Responsive Design**: Mobile-friendly layouts for both marketing and dashboard sections.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-next14-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in the required values.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.
- `type-check`: Runs TypeScript type checks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.