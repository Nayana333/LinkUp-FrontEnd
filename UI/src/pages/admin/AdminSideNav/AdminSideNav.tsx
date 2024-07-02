import React from 'react';
import { 
  PieChart, 
  Users, 
  FileText, 
  MessageCircle, 
  CheckSquare, 
  Briefcase, 
  DollarSign, 
  File 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSideNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="flex flex-col w-64 bg-white border-r shadow-lg p-4 rounded-lg ms-6 mt-5">
        <ul className="mt-4 flex-col">
          <span className="text-green-600 font-bold flex pb-8 px-4">Overview</span>
          <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <PieChart strokeWidth={1.5} size={16} />
              <span className="text-xs">Dashboard</span>
            </a>
          </li>
          <li className="mb-1 group">
          <a
            onClick={() => navigate('/admin/users')}
            className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
              location.pathname === '/admin/users' ? 'bg-gray-950 text-gray-100' : ''
            }`}
          >
            <Users strokeWidth={1.5} size={16} />
            <span className="text-xs">Users</span>
          </a>
        </li>
          {/* <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin/job-category')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin/job-category' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <CheckSquare strokeWidth={1.5} size={16} />
              <span className="text-xs">Jobs category</span>
            </a>
          </li> */}
          <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin/jobs')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin/jobs' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <FileText strokeWidth={1.5} size={16} />
              <span className="text-xs">Jobs</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin/posts')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin/posts' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <MessageCircle strokeWidth={1.5} size={16} />
              <span className="text-xs">Posts</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin/reports')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin/reports' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <File strokeWidth={1.5} size={16} />
              <span className="text-xs">Reports</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin/transactions')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin/transactions' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <DollarSign strokeWidth={1.5} size={16} />
              <span className="text-xs">Transactions</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              onClick={() => navigate('/admin/notifications')}
              className={`flex font-semibold items-center gap-1 py-3 px-4 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                location.pathname === '/admin/notifications' ? 'bg-gray-950 text-gray-100' : ''
              }`}
            >
              <MessageCircle strokeWidth={1.5} size={16} />
              <span className="text-xs">Notifications</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSideNav;
