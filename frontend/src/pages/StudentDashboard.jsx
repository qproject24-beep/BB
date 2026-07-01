import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Calendar } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [studyPlans, setStudyPlans] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, tasksRes] = await Promise.all([
          api.get('/study-plans'),
          api.get('/tasks')
        ]);
        setStudyPlans(plansRes.data);
        setTasks(tasksRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 bg-indigo-50 border-indigo-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Active Plans</p>
              <p className="text-2xl font-bold text-slate-900">{studyPlans.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6 bg-blue-50 border-blue-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-slate-900">{pendingTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-emerald-50 border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-slate-900">{completedTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-violet-50 border-violet-100 flex items-center justify-center">
          <Link to="/study-planner" className="btn-primary w-full">
            + New Study Plan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Recent Study Plans</h2>
            <Link to="/study-planner" className="text-sm text-indigo-600 hover:underline">View All</Link>
          </div>
          {studyPlans.length === 0 ? (
            <p className="text-slate-500 py-4 text-center">No study plans yet. Create one to get started!</p>
          ) : (
            <div className="space-y-4">
              {studyPlans.slice(0, 3).map(plan => (
                <div key={plan._id} className="p-4 border border-slate-100 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-900">{plan.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(plan.schedule).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium px-2 py-1 bg-indigo-50 text-indigo-700 rounded">
                    {plan.progress}% Complete
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Tasks</h2>
            <Link to="/tasks" className="text-sm text-indigo-600 hover:underline">View All</Link>
          </div>
          {pendingTasks.length === 0 ? (
            <p className="text-slate-500 py-4 text-center">No pending tasks. You're all caught up!</p>
          ) : (
            <div className="space-y-4">
              {pendingTasks.slice(0, 4).map(task => (
                <div key={task._id} className="p-4 border border-slate-100 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-900">{task.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to="/tasks" className="btn-secondary text-xs h-8">
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
