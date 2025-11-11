# ScamShield+ (守骗者) - Scam Education Platform

## Overview

ScamShield+ is a multilingual, accessibility-first web application designed to empower elderly users in Singapore to recognize, resist, and report scams. The application provides educational content through seven core modules (Learn, Videos, Simulation, Quiz, HelpLines, Tips, and Scam News) with support for English, Chinese, and Malay languages. The platform emphasizes audio narration, touch-friendly interfaces, and high-contrast visual design to ensure maximum accessibility for senior users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for component-based UI development
- Vite as the build tool and development server
- Wouter for client-side routing
- TanStack Query for data fetching and state management
- Tailwind CSS with custom design tokens for styling

**UI Component System:**
- Shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Custom design system following Material Design principles with elderly-first adaptations
- Touch-optimized interfaces with large tap targets (minimum 44px)
- Responsive grid layouts: 1-column (mobile), 2-column (tablet), 3-column (desktop)

**State Management:**
- React Context API (AppContext) manages global application state:
  - Language selection (English/Chinese/Malay)
  - Accessibility preferences (narration, font size, contrast, animation speed)
  - Session-based storage (no persistent user data)
- Session storage for quiz progress preservation across page refreshes

**Accessibility Features:**
- Web Speech API integration for text-to-speech narration in multiple languages
- Toggleable accessibility toolbar: narration, large fonts, high contrast, slow animations
- Keyboard navigation and ARIA labels throughout
- Touch-first design with generous spacing (Tailwind units: 4, 6, 8, 12, 16)

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- HTTP server creation for middleware and route handling
- Vite integration in development mode with HMR support

**Storage Layer:**
- In-memory storage implementation (MemStorage class)
- Interface-based design (IStorage) allows for future database integration
- Currently implements basic user CRUD operations as foundation
- No persistent user data per application requirements (session resets on refresh)

**API Design:**
- RESTful API structure with `/api` prefix for all endpoints
- JSON request/response bodies
- Request logging middleware for debugging

### Data Storage Solutions

**Current Implementation:**
- In-memory Map-based storage for demonstration purposes
- No database dependency in production (content is static and embedded)

**Schema Design:**
- Drizzle ORM configured for PostgreSQL (via @neondatabase/serverless)
- Schema definitions in `shared/schema.ts` using Zod for validation
- Prepared for future user progress tracking if requirements change

**Content Management:**
- Static multilingual content stored in TypeScript modules (`shared/data/content.ts`)
- TranslatedText interface structure: `{ en: string; zh: string; ms: string }`
- Content includes: scam types, quiz questions, simulation steps, tips, news items, chatbot responses

### Authentication and Authorization

**Current State:**
- No authentication system implemented
- Application is publicly accessible
- Session-based language and accessibility preferences (not tied to user accounts)

**Rationale:**
- Target demographic (elderly users) benefits from zero-friction access
- Educational content does not require user login
- Privacy-focused: no personal data collection or storage

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives (@radix-ui/*) for accessible headless components
- Lucide React for consistent iconography
- Embla Carousel for touch-friendly content carousels
- Class Variance Authority (CVA) for component variant management

**Styling:**
- Tailwind CSS for utility-first styling
- PostCSS with Autoprefixer for browser compatibility
- Custom CSS variables for theming (light/dark mode support)
- Noto Sans font family (Google Fonts) for multilingual typography

**Development Tools:**
- TypeScript for type safety across client and server
- TSX for server-side TypeScript execution
- ESBuild for production builds
- Replit-specific plugins for development experience

**Database (Configured but Not Active):**
- Drizzle ORM with PostgreSQL dialect
- Neon serverless PostgreSQL driver
- Migration system prepared but not currently utilized

**Form Management:**
- React Hook Form with Zod resolvers for future form implementations
- Currently minimal form usage (chat input, quiz selections)

**Utility Libraries:**
- date-fns for date formatting in news items
- clsx and tailwind-merge for conditional className handling
- nanoid for unique ID generation

**Speech Synthesis:**
- Browser-native Web Speech API (no external dependency)
- Language-specific voice selection for English, Chinese (zh-CN), and Malay (ms-MY)

## Recent Changes (November 2025)

### Bug Fixes
- **Fixed Scam Reporting Feature**: Migrated from database-dependent storage to in-memory storage (MemStorage)
  - Resolved database connection errors that caused scam reporting to lag or fail
  - Implemented full MemStorage class with all CRUD operations
  - Fixed upvote functionality to properly increment vote counts
  - All community features now work smoothly without database dependencies

### GitHub Integration

**Repository**: `https://github.com/lilianzhu1977-hub/scamshield4.7`

**Important Note**: Replit manages Git operations automatically for safety. To sync your changes with GitHub:

1. **Use Replit's Git UI**: Click the "Version Control" panel in the left sidebar (or use the Git icon)
2. **Stage Changes**: Review your changes and stage the files you want to commit
3. **Commit**: Write a commit message describing your changes
4. **Push**: Click "Push" to sync with your GitHub repository

**Do NOT use manual Git commands** - Replit's safety system prevents direct command-line Git operations to protect your repository from accidental issues.

**GitHub Integration Option**: You can also set up the GitHub connector integration through Replit's integrations panel for enhanced features, though it's optional since Git is already configured.