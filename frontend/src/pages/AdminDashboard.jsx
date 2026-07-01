import { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, BookOpen, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [studyPlans, setStudyPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, plansRes] = await Promise.all([
        api.get('/users'),
        api.get('/study-plans')
      ]);
      setUsers(usersRes.data);
      setStudyPlans(plansRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? All their data will be lost.')) {
      try {
        await api.delete(`/users/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this study plan?')) {
      try {
        await api.delete(`/study-plans/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete plan', error);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading admin dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 bg-indigo-50 border-indigo-100 flex items-center gap-4">
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-3xl font-bold text-slate-900">{users.length}</p>
            </div>
          </div>
          <div className="card p-6 bg-blue-50 border-blue-100 flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Study Plans</p>
              <p className="text-3xl font-bold text-slate-900">{studyPlans.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Manage Users</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-medium text-slate-600">Name</th>
                <th className="p-4 font-medium text-slate-600">Email</th>
                <th className="p-4 font-medium text-slate-600">Role</th>
                <th className="p-4 font-medium text-slate-600">Joined</th>
                <th className="p-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    {user.role !== 'admin' && (
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">All Study Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyPlans.map(plan => (
            <div key={plan._id} className="card p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{plan.title}</h3>
                <button 
                  onClick={() => handleDeletePlan(plan._id)}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4">By: {plan.userId?.name || 'Unknown'}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {plan.subjects.map((sub, i) => (
                  <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded">{sub}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
