# QuizMaster Application

## Overview

QuizMaster is a full-stack web application built for interactive quiz-taking experiences. The application features a React frontend with TypeScript, Express.js backend, and PostgreSQL database integration using Drizzle ORM. The system supports user authentication, multiple quiz categories with varying difficulty levels, and comprehensive result tracking.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution
- **Production**: esbuild for bundling

### Data Storage
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM with type-safe queries
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon Database serverless driver

## Key Components

### Authentication System
- Local storage-based authentication simulation
- User registration and login functionality
- Session management across browser tabs
- User profile management with statistics tracking

### Quiz Engine
- Dynamic quiz loading from JSON data files
- Multiple categories: English, Geography, History, Math, Science, Technology
- Three difficulty levels: Beginner, Intermediate, Expert
- Timed quiz sessions with countdown functionality
- Answer validation and explanation system

### User Interface
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables
- Animated transitions and micro-interactions
- Toast notifications for user feedback
- Modal dialogs for authentication and difficulty selection

### Quiz Data Management
- JSON-based quiz storage in `/client/src/data/quizzes/`
- Structured quiz format with questions, options, and explanations
- Category-based organization with metadata
- Dynamic loading and caching system

## Data Flow

1. **Authentication Flow**: User registers/logs in → credentials stored in localStorage → auth state managed globally
2. **Quiz Selection**: User selects category → difficulty modal appears → quiz data loaded from JSON files
3. **Quiz Execution**: Timer starts → questions displayed sequentially → answers recorded → results calculated
4. **Result Processing**: Score calculated → statistics updated → results stored locally → redirected to results page
5. **Dashboard Updates**: User statistics aggregated → progress displayed → recent results shown

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with TypeScript support
- **Component Library**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack Query for async state
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React icon library

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Validation**: Zod for schema validation
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (implied by shadcn/ui setup)
- **Development Server**: Vite dev server with HMR

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16 module
- **Port Configuration**: Application runs on port 5000
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Database**: Local PostgreSQL instance or Neon serverless

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Static Assets**: Served by Express in production mode
- **Environment**: Production mode disables development features

### Replit Configuration
- **Autoscale Deployment**: Configured for automatic scaling
- **Build Command**: `npm run build` for production assets
- **Start Command**: `npm run start` for production server
- **Development**: `npm run dev` for development mode

## Changelog
- June 20, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.