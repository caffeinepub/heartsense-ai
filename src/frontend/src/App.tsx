import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import AppLayout from './components/AppLayout';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const assessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessment',
  component: AssessmentPage,
});

const routeTree = rootRoute.addChildren([indexRoute, assessmentRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
