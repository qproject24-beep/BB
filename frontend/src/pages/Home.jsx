import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          The Ultimate MERN Stack Project
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Master Your Time with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">StudyPlanner</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Organize your subjects, track your tasks, and achieve your academic goals with our comprehensive and intuitive study management platform.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-primary text-lg px-8 py-3 h-auto">
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn-primary text-lg px-8 py-3 h-auto">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3 h-auto">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 text-left">
          <div className="card p-6 bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Create Study Plans</h3>
            <p className="text-slate-600">Organize your subjects into structured study plans with deadlines and track overall progress.</p>
          </div>
          <div className="card p-6 bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Manage Tasks</h3>
            <p className="text-slate-600">Break down plans into actionable tasks. Mark them as complete and stay on top of your workload.</p>
          </div>
          <div className="card p-6 bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Track Deadlines</h3>
            <p className="text-slate-600">Never miss a submission again. Keep an eye on approaching due dates for all your tasks and plans.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
