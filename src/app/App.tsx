import { BrowserRouter as Router } from 'react-router-dom';

import { ScrollToTop } from '@/app/components/ScrollToTop';
import { AppLayout } from '@/app/layouts/AppLayout';
import { AppRoutes } from '@/app/routes/AppRoutes';
import { AuthProvider } from '@/features/auth/context/AuthContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </AuthProvider>
    </Router>
  );
}
