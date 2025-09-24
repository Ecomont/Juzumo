// This file defines TypeScript types for environment variables.

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_ANALYTICS_ID?: string;
    DATABASE_URL: string;
    SECRET_KEY: string;
  }
}