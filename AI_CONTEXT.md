# ZineSave App - Project Context

This document provides essential information for AI agents and developers working on the ZineSave App codebase.

## Project Overview
ZineSave is a modern web application that converts web articles into optimized formats (like ePub) for reading on devices like Kindle and Kobo. It features direct integration with cloud storage services (Google Drive, Dropbox, OneDrive) for seamless document management.

- **Primary URL**: https://zinesave.io
- **Backend**: FastAPI (Python) service (communicates via `NEXT_PUBLIC_API_URL`).

## Architecture & Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com) with custom brand colors.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with persistence).
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com).
- **Validation**: [Zod](https://zod.dev) for API boundary validation.
- **Testing**: [Vitest](https://vitest.dev) & React Testing Library.
- **Internationalization**: [react-i18next](https://react.i18next.com) (Supports English and Spanish).
- **Icons**: [Lucide React](https://lucide.dev).
- **Feedback**: [Sonner](https://sonner.emilkowal.ski) for toast notifications.

## Project Structure (Feature-Sliced Design)
The project strictly follows Feature-Sliced Design (FSD):
- `src/app/`: Next.js pages, layouts, and route groups. Acts purely as the routing layer.
- `src/widgets/`: Complex UI blocks that integrate features and entities (e.g., `DashboardHeader`, `JobProcessor`).
- `src/features/`: User actions and domain logic decoupled from UI (e.g., `useJobProcessor`, `useDashboardStats`).
- `src/entities/`: Core domain stores and models (e.g., `auth/model/store.ts`).
- `src/shared/`: Generic UI components, configuration (`i18n.ts`), API clients (`api.ts`), utilities (`logger.ts`), and schemas.

## Core Conventions
- **Domain Logic Separation**: Domain logic must never live directly in a component. Always use custom hooks in the `features` layer.
- **API Communication**: Always use the central axios instance from `@/shared/api/api`. It includes interceptors for Bearer token authentication, structured logging, and automatic logout on 401 errors.
- **Validation**: All API responses must be validated using Zod schemas defined in `src/shared/types/schemas.ts` before reaching application state.
- **Observability**: Avoid raw `console.error`. Use the structured JSON logger defined in `src/shared/lib/logger.ts`.
- **Authentication**: Managed via `useAuthStore` in `@/entities/auth/model/store`. Tokens are persisted in local storage.
- **Internationalization**: Use the `useTranslation` hook for all user-facing text. Keys are nested in `src/shared/locales/`.

## Building and Testing
The project uses `pnpm` as the package manager.

- **Development**: `pnpm dev` (starts the development server with Turbo).
- **Testing**: `pnpm test` (runs the Vitest test suite).
- **Test Coverage**: `pnpm coverage`
- **Production Build**: `pnpm build`.
- **Production Start**: `pnpm start`.
- **Linting**: `pnpm lint`.
