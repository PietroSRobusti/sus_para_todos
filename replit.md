# HealHub Para Todos - Healthcare Appointment System

## Overview

HealHub Para Todos is a healthcare appointment scheduling platform designed for São Caetano do Sul's public hospital system (HealHub). The application enables citizens to book medical consultations and exams across multiple hospitals with an accessibility-first approach optimized for adult and elderly users.

**Core Purpose:** Simplify access to public healthcare services through an intuitive, government-branded web application that connects patients with hospitals, medical specialties, and health information.

**Target Users:** Brazilian citizens of all ages, with special emphasis on accessibility for elderly users requiring medical appointments in the HealHub system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript, built using Vite for development and production builds.

**Routing:** Client-side routing implemented with Wouter, a lightweight React router alternative.

**UI Component System:** 
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Material Design-inspired patterns adapted for Brazilian healthcare context
- New York style variant configured for component aesthetics

**State Management:**
- TanStack Query (React Query) for server state management and API data caching
- React Hook Form with Zod validation for form state and validation
- Local component state with React hooks

**Design System:**
- Custom color palette based on HealHub brand colors (primary green #142 65% 45%, complementary blue #210 75% 50%)
- Inter font family for high legibility
- Accessibility-first with high contrast ratios and generous spacing
- Dark mode support with theme toggle functionality
- Responsive design with mobile-first breakpoints

**Key Pages:**
- Login: Landing page with authentication (email/password validation)
- Home: Hero section with feature highlights and call-to-action buttons
- Booking: Multi-step form for appointment scheduling
- My Appointments: View, edit, and cancel scheduled appointments
- Profile: User profile management (edit email, phone, password)
- News: Health news and information articles
- Create Account: User registration page
- Forgot Password: Password recovery page
- 404: Not found page

### Backend Architecture

**Runtime:** Node.js with Express.js framework

**API Design:** RESTful API with JSON responses

**Server Structure:**
- Route handlers in `server/routes.ts` for CRUD operations
- Storage layer abstraction through `IStorage` interface
- Database operations encapsulated in storage service
- Request/response logging middleware
- Error handling middleware

**API Endpoints:**
- `/api/hospitals` - Hospital CRUD operations (GET, POST)
- `/api/specialties` - Medical specialty management (GET, POST)
- `/api/appointments` - Appointment management (GET, POST, PUT, DELETE)
  - GET /api/appointments - List all appointments
  - GET /api/appointments/:id - Get single appointment
  - POST /api/appointments - Create new appointment
  - PUT /api/appointments/:id - Update appointment (date/time)
  - DELETE /api/appointments/:id - Cancel appointment
- `/api/news` - Health news articles (GET, POST)
- `/api/auth` - Authentication and password recovery
  - POST /api/auth/register - Create new user account
  - POST /api/auth/login - Authenticate user
  - POST /api/auth/logout - End user session
  - GET /api/auth/me - Get current user info (returns id, name, email, phone)
  - PUT /api/auth/profile - Update user profile (email, phone, password with validation)
  - POST /api/auth/verify-email - Verify email exists for password recovery
  - POST /api/auth/reset-password - Reset user password (simplified flow)

**Development Server:** Vite integration in development mode with HMR (Hot Module Replacement) support

**Build Process:**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server code to `dist`
- TypeScript compilation with strict mode enabled

### Data Storage Solutions

**Primary Database:** PostgreSQL accessed via Neon serverless driver

**ORM:** Drizzle ORM for type-safe database queries and migrations

**Database Schema:**

1. **Hospitals Table**
   - ID (UUID primary key)
   - Name, address, phone contact information

2. **Specialties Table**
   - ID (UUID primary key)
   - Name (unique), optional image URL
   - AI-generated specialty icons via OpenAI integration

3. **Appointments Table**
   - ID (UUID primary key)
   - User ID (foreign key to users.id) - Links appointments to their owner
   - Foreign keys to hospitals and specialties
   - Patient information (name, CPF, birth date, phone)
   - Service type (consultation vs. exam)
   - Appointment date and time
   - Created timestamp

4. **News Table**
   - ID (UUID primary key)
   - Title, summary, full content
   - Category classification
   - Optional AI-generated images
   - Published timestamp

**Data Validation:** Zod schemas derived from Drizzle tables ensure runtime type safety

**Migration Strategy:** Drizzle Kit manages schema migrations with `db:push` command

### Authentication and Authorization

**Authentication System:** Fully implemented user authentication with secure session management.

**User Registration:**
- Strong password validation (8+ characters, uppercase, lowercase, numbers, special characters)
- Visual password strength indicators in real-time
- Email uniqueness enforcement
- bcryptjs password hashing with salt rounds of 10

**Login/Logout:**
- Session-based authentication using express-session
- Secure session storage in PostgreSQL via connect-pg-simple
- httpOnly cookies with 30-day duration
- Automatic session creation on login/registration

**Password Recovery:**
- Simplified two-step recovery flow (as per user requirements)
- Step 1: Email verification to confirm account exists
- Step 2: Set new password with strong password validation
- **Note:** This is a simplified implementation without email tokens/links, designed for ease of use. For production, consider implementing token-based recovery with email verification for enhanced security.

**Access Control and Permissions:**
- User-scoped data access: Each user can only view/modify their own appointments
- Middleware-based authentication (requireAuth) protects all appointment routes
- Storage layer enforces userId filtering using Drizzle ORM `and()` conditions
- Protected operations:
  - GET /api/appointments - Returns only user's appointments
  - GET /api/appointments/:id - Verifies ownership before returning
  - POST /api/appointments - Auto-injects userId from session
  - PUT /api/appointments/:id - Verifies ownership before updating
  - DELETE /api/appointments/:id - Verifies ownership before deleting
- Unauthorized access attempts return 401 (not authenticated) or 404 (not found/no permission)
- Data isolation tested: Users cannot access other users' appointments

**User Profile Management:**
- Dedicated profile page for viewing and editing user information
- Update email with uniqueness validation
- Update phone number (optional field)
- Change password with current password verification
- Real-time password strength indicators showing 5 requirements
- Show/hide password toggles with eye icons for all password fields
- Partial update support (can update email/phone without changing password)

**Security Features:**
- Password hashes never exposed in API responses
- All auth responses sanitized (returns only id, name, email, phone)
- Strong password enforcement on both frontend and backend (requires special characters)
- Secure session cookies (httpOnly, secure in production)
- Row-level security via userId foreign key constraint
- Current password required for any password change

**Users Table:**
- ID (UUID primary key)
- Name, email (unique), passwordHash
- Phone (optional text field)
- Created timestamp

### External Dependencies

**Database Service:**
- Neon serverless PostgreSQL (via `@neondatabase/serverless`)
- WebSocket connection for serverless environments
- Connection pooling for performance

**AI Integration (Optional):**
- OpenAI API for image generation (DALL-E 3)
- Generates medical illustrations for specialties and news articles
- Graceful degradation when API key not configured
- Uses GPT-5 model per configuration comments

**UI Component Libraries:**
- Radix UI primitives (20+ component packages)
- Provides accessible, unstyled components as foundation
- Includes accordion, dialog, dropdown, select, calendar, and more

**Styling Framework:**
- Tailwind CSS with custom configuration
- PostCSS for processing
- Class Variance Authority (CVA) for component variants
- clsx/tailwind-merge for conditional class composition

**Form Management:**
- React Hook Form for form state
- Hookform Resolvers for validation integration
- Zod for schema validation

**Date Handling:**
- date-fns for date manipulation and formatting
- Portuguese (Brazil) locale support
- React Day Picker for calendar UI

**Development Tools:**
- Replit-specific plugins for development experience
- Runtime error modal overlay
- Dev banner for development environment
- Cartographer for code navigation

**Build Tools:**
- Vite for frontend bundling and dev server
- esbuild for backend bundling
- TypeScript compiler for type checking

**Deployment Considerations:**
- Environment variable required: `DATABASE_URL` for database connection
- Optional: `OPENAI_API_KEY` for AI features
- Production mode served via Express static file serving
- Development mode uses Vite middleware integration