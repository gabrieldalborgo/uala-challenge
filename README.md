# Ualá Challenge - Transaction Management Dashboard

A modern, responsive web application for managing and filtering financial transactions. Built as part of a technical assessment for Ualá, this project demonstrates proficiency in React development, TypeScript, and modern web technologies.

## 🚀 Features

- **Transaction Management**: View and filter financial transactions with real-time data
- **Advanced Filtering**: Multiple filter options including date ranges, payment methods, card types, and amount ranges
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Custom sliders, switches, and form controls
- **Real-time Updates**: Dynamic filtering with immediate visual feedback
- **Accessibility**: Built with accessibility best practices in mind

## 📦 Installation and Execution Instructions

### Prerequisites
- Node.js (v22 or higher)
- npm package manager

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gabrieldalborgo/uala-challenge
   cd uala-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint for code quality checks
- `npm run test:visual` - Run visual regression tests

## 🏗️ Architecture Explanation

### Project Structure
```
src/
├── api/                 # Data layer and services
│   ├── index.tsx       # React Query hooks for API
│   └── types.ts        # TypeScript types for API
├── components/         # Reusable components
│   ├── common/         # Common layout components
│   ├── layout/         # Structure components
│   └── ui/             # Base UI components
├── features/           # Feature-based modules
│   ├── collections/    # Collections management
│   └── transactions/   # Transaction filtering and management
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Application pages
```

### Architectural Patterns

#### 1. **Feature-Based Architecture**
- Organization by functionality instead of file types
- Each feature contains its own components, hooks, and types
- Clear separation of responsibilities

#### 2. **Custom Hooks Pattern**
- Business logic encapsulated in custom hooks
- Logic reuse between components
- Separation of concerns between UI and logic

#### 3. **Component Composition**
- Small and reusable components
- Minimized props drilling
- Use of React Context when necessary

#### 4. **Data Fetching with React Query**
- Centralized server state management
- Automatic caching and revalidation
- Loading and error state handling

## 🔧 Technical Decisions Made

### 1. **Technology Stack**

**Frontend Framework: React 19 + TypeScript**
- React 19 for latest performance optimizations
- TypeScript for type safety and better DX
- Vite as bundler for its speed and simple configuration

**Styling: Tailwind CSS v4**
- Utility-first CSS for rapid development
- Optimized configuration with path aliases
- Consistent design system

**UI Components: Radix UI + Custom Components**
- Radix UI for accessible base components
- Custom components for specific cases
- Variant system with class-variance-authority

### 2. **State Management**

**React Query (TanStack Query)**
- Server state management
- Automatic caching with 1-minute staleTime
- Automatic revalidation every minute
- Client-side data transformation to avoid multiple requests

**Local State with React Hooks**
- useState for simple component state
- useMemo for performance optimizations
- Custom hooks for reusable logic

### 3. **Data Handling**

**API Integration**
- Single endpoint with client-side transformation
- Frontend filtering to avoid multiple requests
- CORS proxy (allorigins.win) for development
- Client-side data formatting (dates, amounts)

**Date Handling**
- Luxon for date manipulation
- Consistent formatting for Argentina (es-AR)
- Timezone handling and validations

### 4. **Testing Strategy**

**Playwright for E2E Testing**
- Automated visual regression tests
- Cross-browser testing (Chrome, Firefox, Safari)
- Responsive testing on different viewports
- Snapshots for visual comparison

### 5. **Performance Optimizations**

**Code Splitting**
- Vite for automatic optimizations

**Memoization**
- useMemo for expensive calculations

## 🚀 Future Improvements

### 1. **Additional Features**

**Transaction Management**
- Export filtered data (CSV, PDF)
- Saved filter history
- Text search in descriptions
- Transaction grouping by categories

**Analytics and Reports**
- Expense trend charts
- Dashboard with key metrics
- Period comparison
- Alerts and notifications

### 2. **Technical Improvements**

**Backend Integration**
- Real API with database
- Authentication and authorization
- WebSockets for real-time updates
- Pagination for large data volumes

**Performance**
- Virtualization for long lists
- Service Workers for offline support
- Progressive Web App (PWA)
- Lazy loading of images

**Testing**
- Unit tests with Jest/Vitest
- Integration tests
- Performance testing
- Automated accessibility testing

### 3. **UX/UI Improvements**

**Accessibility**
- Complete keyboard navigation
- Screen reader optimizations
- High contrast mode
- Motion reduction for sensitive users

**Mobile Experience**
- Native touch gestures
- Pull-to-refresh
- Infinite scroll
- Offline-first approach

### 4. **DevOps and Deployment**

**CI/CD Pipeline**
- GitHub Actions for automation
- Automatic quality gates
- Automatic deployment to staging/production
- Automatic rollback on errors

**Monitoring**
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- A/B testing framework

### 5. **Scalable Architecture**

**Micro-frontends**
- Division into independent applications
- Module Federation for component sharing
- Independent deployments

**State Management**
- Zustand or Redux Toolkit for global state
- State persistence in localStorage
- Tab synchronization

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict type checking
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Type-safe component variants

### Data Management
- **React Query (TanStack Query)** - Server state management
- **Luxon** - Date manipulation and formatting

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **Playwright** - End-to-end testing and visual regression testing
- **TypeScript** - Static type checking

### Deployment
- **Netlify** - Static site hosting with automatic deployments

## 🧪 Testing

The project includes comprehensive testing:
- **Visual Regression Tests**: Automated screenshot comparisons across browsers
- **End-to-End Tests**: Full user journey testing with Playwright
- **Cross-browser Testing**: Support for Chrome, Firefox, Safari, and mobile browsers

## 🚀 Deployment

### Manual Deployment with Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy to Netlify**
   ```bash
   # Deploy to preview (optional)
   netlify deploy
   
   # Deploy to production
   netlify deploy --prod
   ```

3. **Follow the CLI prompts**
   - Login to your Netlify account if not already logged in
   - Choose to create a new site or link to existing site
   - Confirm deployment settings

### Alternative: One-liner deployment
```bash
netlify deploy --prod
```

## 📄 License

This project is part of a technical assessment and is not intended for commercial use.