import { useState, useEffect } from 'react';
import api from '../services/api';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    studyPlanId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, plansRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/study-plans')
      ]);
      setTasks(tasksRes.data);
      setPlans(plansRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
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
      await api.post('/tasks', formData);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', dueDate: '', studyPlanId: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading tasks...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          Add Task
        </button>
      </div>

      <div className="card overflow-hidden">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No tasks found. Create one to get started!
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {tasks.map((task) => (
              <li key={task._id} className={`p-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${task.status === 'completed' ? 'opacity-75' : ''}`}>
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => toggleStatus(task)}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <Circle className="h-6 w-6" />
                    )}
                  </button>
                  <div>
                    <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                    <div className="flex gap-4 mt-1 text-sm text-slate-500">
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      {task.studyPlanId && (
                        <span className="text-indigo-600 bg-indigo-50 px-2 rounded">
                          {task.studyPlanId.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="text-slate-400 hover:text-red-600 p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  className="input-field min-h-[80px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  required
                  className="input-field"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Link to Study Plan (Optional)</label>
                <select
                  name="studyPlanId"
                  className="input-field"
                  value={formData.studyPlanId}
                  onChange={handleInputChange}
                >
                  <option value="">None</option>
                  {plans.map(plan => (
                    <option key={plan._id} value={plan._id}>{plan.title}</option>
                  ))}
                </select>
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

export default TaskManagement;
