import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">My Profile</h1>
      
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-32"></div>
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-12 bg-white p-2 rounded-full shadow-lg">
            <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <User className="h-10 w-10" />
            </div>
          </div>
          
          <div className="pt-12">
            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500 capitalize">{user.role}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg">
              <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Address</p>
                <p className="font-medium text-slate-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg">
              <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Account Role</p>
                <p className="font-medium text-slate-900 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
