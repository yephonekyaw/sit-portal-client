# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript check and Vite build)
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Architecture

This is a **Student Certificate Verification System** built with React 19, TypeScript, and Vite. The application has two main user interfaces:

### Core Structure
- **Dual App Architecture**: Separate apps for students (`student-app.tsx`) and staff (`staff-app.tsx`)
- **Route Structure**: 
  - Student routes: Root path (`/`)
  - Staff routes: `/staff/*`
  - Login: `/login`
- **State Management**: Zustand for client state, TanStack Query for server state
- **UI Framework**: Radix UI components with Tailwind CSS v4
- **File Processing**: Supports Excel/CSV uploads with `papaparse` and `read-excel-file`

### Key Directories
- `src/apps/`: Main application entry points for student/staff interfaces
- `src/components/`: Organized by feature (staff/, student/, ui/, nav/, login/)
- `src/pages/`: Page-level components with base layouts
- `src/routes/`: Router configuration split by user type
- `src/stores/`: Zustand stores for state management
- `src/schemas/`: Zod validation schemas
- `src/mock/`: Mock data for development
- `src/utils/`: Utility functions organized by feature

### Student Features
- Certificate submission and status tracking
- Program-specific requirements (CS, DSI, IT)
- File upload and download capabilities
- Notification center for submission updates

### Staff Features
- Student data import (Excel/CSV with drag & drop)
- Certificate verification workflow
- Dashboard with submission analytics
- Manual verification workspace
- Program and schedule management

### Technical Stack
- **React 19** with React Router v7
- **TypeScript** with strict configuration
- **Tailwind CSS v4** with custom design system
- **Radix UI** for accessible components
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation
- **Drag & Drop**: @dnd-kit for sortable interfaces
- **Motion**: Animation library for smooth transitions

### Import Paths
Uses `@/` alias for `src/` directory (configured in `vite.config.ts`)