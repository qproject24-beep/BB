import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>StudyPlanner</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="text-slate-600 hover:text-indigo-600 font-medium"
                >
                  Dashboard
                </Link>
                <Link to="/profile" className="text-slate-600 hover:text-indigo-600">
                  <UserIcon className="h-5 w-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
