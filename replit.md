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

## Document Conversion System

### Overview
The application now includes a comprehensive document conversion system that allows users to convert DOCX files to HTML using two different methods: Mammoth.js and Pandoc. This system supports both single file conversion and batch processing of multiple files.

### Features
- **Dual Conversion Methods**: Support for both Mammoth.js (recommended for simple formatting) and Pandoc (better for complex documents)
- **Batch Processing**: Ability to convert multiple DOCX files simultaneously
- **Job Tracking**: Real-time monitoring of conversion jobs with progress indicators
- **Routine Management**: Converted documents are automatically saved as medical routines
- **File Upload**: Drag-and-drop interface with file validation
- **Error Handling**: Comprehensive error reporting for failed conversions

### Technical Implementation

#### Backend Components
- **Conversion Service** (`server/conversion-service.ts`): Core service handling document conversion using Mammoth.js and Pandoc
- **Storage Layer**: Extended with support for routines and conversion jobs
- **API Routes**: RESTful endpoints for conversion operations, job monitoring, and routine management
- **File Handling**: Multer integration for secure file upload with validation

#### Frontend Components
- **Converter Page** (`client/src/pages/converter.tsx`): Complete interface for document conversion with real-time progress
- **Navigation Integration**: Added converter access from home page
- **State Management**: TanStack Query integration for real-time job monitoring
- **UI Components**: File upload with drag-and-drop, progress indicators, and job status tracking

#### Database Schema
- **Routines Table**: Stores converted documents with metadata and HTML content
- **Conversion Jobs Table**: Tracks batch conversion operations with progress and results
- **Relationships**: Links between conversion jobs and resulting routines

### API Endpoints
- `POST /api/convert/single` - Convert single DOCX file
- `POST /api/convert/batch` - Convert multiple DOCX files
- `GET /api/convert/jobs` - List all conversion jobs
- `GET /api/convert/job/:id` - Get specific job status
- `GET /api/routines` - List all converted routines
- `GET /api/routines/:id` - Get specific routine
- `DELETE /api/routines/:id` - Delete routine

### Usage Instructions
1. Access the converter from the home page
2. Select conversion method (Mammoth.js or Pandoc)
3. Upload DOCX files via drag-and-drop or file selection
4. Monitor conversion progress in real-time
5. View and manage converted routines
6. Access converted content as HTML in the routine viewer

### Dependencies Added
- **mammoth**: JavaScript library for converting DOCX to HTML
- **multer**: File upload handling middleware
- **pandoc**: System-level document converter (installed via Nix)

## Recent System Updates (August 18, 2025)

### PostgreSQL Implementation - Persistent Data Storage
- **Database migration**: Successfully migrated from in-memory storage to PostgreSQL
- **Data persistence**: All routine data now survives server restarts and deployments
- **Performance optimization**: Removed auto-refresh loops causing performance issues
- **Stable data layer**: 75 routines now permanently stored in database

### Complete System Reconversion - Enhanced Image Support
- **Full reconversion**: All 75 DOCX files reprocessed with enhanced image extraction system
- **Image preservation**: Implemented base64 embedding for images from DOCX documents
- **Mammoth + Pandoc**: Dual conversion system with image extraction capabilities
- **New routine added**: "Tratamento da Crise Aguda de Asma" successfully added to collection

### Advanced Conversion Features
- **Base64 image embedding**: Images automatically converted and embedded directly in HTML
- **Multi-format support**: Support for PNG, JPEG, GIF, BMP, EMF, WMF image formats
- **Automatic cleanup**: Temporary files and media directories properly managed
- **Error resilience**: Robust error handling for conversion processes

### User Preferences Updated
- **Routines page behavior**: Always reset filters and search when returning from routine pages (confirmed preference)
- **Image priority**: User specifically requested image preservation from original DOCX documents
- **Navigation flow**: Cards link directly to `/routine/:id` pages showing full HTML content

### Technical Implementation
- **Enhanced conversion service**: Updated `server/conversion-service.ts` with image extraction
- **Automated scripts**: Created complete reconversion pipeline with `scripts/reconvert-all-with-images.js`
- **Database integration**: PostgreSQL properly configured and operational
- **API endpoints**: All endpoints functioning with persistent storage

Date Updated: August 18, 2025