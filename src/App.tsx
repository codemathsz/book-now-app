import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
