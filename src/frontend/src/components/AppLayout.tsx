import { Outlet } from '@tanstack/react-router';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import WatermarkGuard from './WatermarkGuard';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <WatermarkGuard />
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
