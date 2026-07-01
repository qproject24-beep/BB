import { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar, Trash2, Edit } from 'lucide-react';

const StudyPlanner = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subjects: '',
    schedule: '',
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get('/study-plans');
      setPlans(res.data);
    } catch (error) {
      console.error('Failed to fetch plans', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert comma separated string to array
      const subjectsArray = formData.subjects.split(',').map(s => s.trim());
      await api.post('/study-plans', {
        ...formData,
        subjects: subjectsArray
      });
      setIsModalOpen(false);
      setFormData({ title: '', subjects: '', schedule: '' });
      fetchPlans();
    } catch (error) {
      console.error('Failed to create plan', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await api.delete(`/study-plans/${id}`);
        fetchPlans();
      } catch (error) {
        console.error('Failed to delete plan', error);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading plans...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Study Planner</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          Create Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500 mb-4">You don't have any study plans yet.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            Create Your First Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className="card p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900">{plan.title}</h3>
                <button 
                  onClick={() => handleDelete(plan._id)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.subjects.map((sub, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Due: {new Date(plan.schedule).toLocaleDateString()}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Create Study Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="input-field"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Final Exams Prep"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subjects (comma separated)</label>
                <input
                  type="text"
                  name="subjects"
                  required
                  className="input-field"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  placeholder="Math, Physics, Chemistry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="schedule"
                  required
                  className="input-field"
                  value={formData.schedule}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">Create</button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
