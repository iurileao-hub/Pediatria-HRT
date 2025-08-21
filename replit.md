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
The application includes a comprehensive document conversion system that converts DOCX files to HTML using Pandoc with embedded base64 images. This system eliminates the need for separate image file management by embedding all images directly into the HTML content.

### Current Implementation (August 2025)
- **Pandoc Conversion**: Uses Pandoc with `--embed-resources --standalone` flags for complete HTML generation
- **Base64 Image Embedding**: All images from DOCX files are automatically converted to base64 and embedded in HTML
- **Batch Processing**: Converts all 75 routine DOCX files in one operation
- **No External Media**: Self-contained HTML files with no dependencies on external image files
- **Comprehensive Reporting**: Detailed conversion reports with file sizes and image counts

#### Conversion Scripts
- `scripts/convert-docx-pandoc-base64.js`: Main batch conversion script using Pandoc
  - Processes all DOCX files in `attached_assets/Rotinas/` directory
  - Outputs HTML files to `attached_assets/Rotinas/html-output/`
  - Generates comprehensive conversion report with statistics
  - Handles image embedding automatically using Pandoc's `--embed-resources` flag

#### File Structure
```
attached_assets/Rotinas/
├── [75 DOCX files] (Original medical routine documents)
└── html-output/
    ├── [75 HTML files] (Converted files with base64 images)
    └── conversion-report.json (Detailed conversion statistics)
```

#### Key Benefits
- **Self-contained files**: No external dependencies or media directories
- **Improved performance**: No network requests for images during HTML rendering
- **Simplified deployment**: Single HTML files contain everything needed
- **Better reliability**: No risk of missing or broken image links

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

### Recent Routine Updates (August 21, 2025)

#### Individual Routine Reconversion
- **Successfully updated two specific routines** from updated Word documents:
  - "OBSTRUÇÃO DE VIA AÉREA POR CORPO ESTRANHO ROTINAS HRT LUIZ ANTÔNIO"
  - "PARADA CARDIORESPIRATÓRIA ROTINAS HRT LUIZ ANTÔNIO"
- **Conversion process**: Used Pandoc with `--embed-resources --standalone` flags for complete HTML generation
- **Base64 image embedding**: All images automatically converted and embedded directly in HTML
- **Database updates**: Routines successfully updated with new HTML content, conversion method set to "pandoc"
- **Content sizes**: 300KB+ and 241KB+ respectively, indicating rich content with embedded images
- **Timestamps**: Updated to reflect latest reconversion (August 21, 2025)

#### Technical Implementation
- Created temporary script to read converted HTML files and update specific database records
- Used proper database queries to identify routines by filename patterns
- Maintained data integrity by preserving all existing metadata while updating only HTML content
- Conversion method tracking updated to reflect use of Pandoc over previous methods

#### Layout and Typography Improvements (August 21, 2025)

**Major UI Enhancements Applied:**
- **Georgia Font Implementation**: Applied Georgia serif font as primary typography throughout the application
  - Updated global CSS to use Georgia as default font family
  - Applied to all routine content, titles, and text elements
  - Enhanced readability and professional medical appearance
  
- **Header Optimization**: Reduced header bar height for better space utilization
  - Decreased padding from 2rem to 1rem on colored header background
  - Removed FileText icons from routine titles for cleaner appearance
  - Maintained essential navigation while maximizing content area
  
- **Content Area Expansion**: Increased viewing area for better content consumption
  - Expanded maximum width from 1200px to 1400px across all routine pages
  - Increased content padding from 2rem to 3rem for better typography spacing
  - Enhanced font size to 1.1rem with improved line height (1.7) for optimal readability
  
- **UI Animation Refinement**: Removed hover animations from routine cards per user request
  - Eliminated hover background effects, scaling, and color transitions
  - Maintained click functionality while providing cleaner, distraction-free experience
  - Preserved cursor pointer indication for usability
  
- **Author Data Restoration**: Successfully restored specific doctor names as authors
  - Updated 64 routines with individual doctor names (Dr. Luiz Antônio, Dra. Bárbara, etc.)
  - Only 11 routines remain with generic "HRT" where specific authorship couldn't be determined
  - Improved professional credibility and content attribution
  
- **Consistent Design Application**: Applied changes across all routine display pages
  - RoutineDynamic page (main routine viewer)
  - RoutineTemplate component (full-screen routine viewer)
  - Routines listing page (routine cards)
  
**Technical Implementation:**
- Modified `client/src/index.css` for global Georgia font application
- Updated `client/src/pages/routine-dynamic.tsx` with layout improvements
- Enhanced `client/src/pages/routines.tsx` with typography consistency and removed hover animations
- Improved `client/src/components/RoutineTemplate.tsx` content area expansion
- Database updates via SQL queries to restore doctor names from original mapping

Date Updated: August 21, 2025