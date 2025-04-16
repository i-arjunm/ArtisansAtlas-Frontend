import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Account() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/auth/login');
    }
  }, [state.isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  if (!state.user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-8">My Account</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted">Name</label>
              <p className="mt-1 text-text-primary">{state.user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">Email</label>
              <p className="mt-1 text-text-primary">{state.user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;