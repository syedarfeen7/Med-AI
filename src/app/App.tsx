import { BrowserRouter as Router } from 'react-router-dom';

import { ScrollToTop } from '@/app/components/ScrollToTop';
import { AppLayout } from '@/app/layouts/AppLayout';
import { AppRoutes } from '@/app/routes/AppRoutes';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
}
