# Overview

This is a pediatric medical protocols web application for Hospital Regional de Taguatinga (HRT) pediatric department. The app provides healthcare professionals with access to medical routines, protocols, and guidelines specific to pediatric care. It features a modern glass-morphism UI design with a sunset theme and serves as a digital reference system for medical staff.

## User Preferences

Preferred communication style: Simple, everyday language.
Routines page behavior: Always reset to initial state (no filters/search preserved) when returning from routine pages.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing with pages for home, routines, and 404 handling
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom glass-morphism effects and sunset-themed design system
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation resolvers
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server Framework**: Express.js with TypeScript support
- **Architecture Pattern**: RESTful API design with modular route registration
- **Development**: Hot reloading with Vite integration in development mode
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) for development
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Logging**: Request/response logging with performance metrics

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory
- **Database**: PostgreSQL (configured via Neon Database serverless)
- **Migrations**: Drizzle Kit for database schema migrations
- **Validation**: Zod schemas for runtime type validation integrated with Drizzle

### External Dependencies

#### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with `@neondatabase/serverless` driver
- **Session Management**: PostgreSQL session storage using `connect-pg-simple`

#### UI & Design System
- **Component Library**: Complete shadcn/ui implementation with Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS with PostCSS processing
- **Fonts**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)

#### Development Tools
- **Type Safety**: Full TypeScript configuration across client, server, and shared code
- **Code Quality**: ESBuild for production bundling
- **Development Experience**: Replit-specific plugins for enhanced development workflow
- **Form Handling**: React Hook Form with Hookform resolvers for validation

#### Runtime & Utilities
- **Date Handling**: date-fns for date manipulation and formatting
- **Class Management**: clsx and class-variance-authority for conditional styling
- **Command Interface**: cmdk for command palette functionality
- **Carousel**: Embla Carousel React for image/content carousels

The architecture follows a full-stack TypeScript approach with clear separation between client, server, and shared code. The system is designed for scalability with abstracted storage interfaces and modular component architecture.