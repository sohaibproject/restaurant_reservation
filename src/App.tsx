import { lazy, Suspense } from 'react';
import GlobalLoading from './views/components/shared/loading/Globalloading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const NotFound = lazy(() => import('./views/pages/not-found'));
const ReservationApp = lazy(() => import('./views/pages/reservationApp'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoading />}>
        <Routes>
          <Route path='/' element={<ReservationApp />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
