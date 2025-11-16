import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationProvider } from './contexts/ReservationContext';

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>  
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <RouterProvider router={router} />
        </div>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;
