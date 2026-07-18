import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const activities = [
  { 
    id: 1, 
    type: 'success', 
    title: 'Passed "ES6 Features" Quiz', 
    time: '2 hours ago', 
    score: '95%',
    icon: <CheckCircle2 className="text-green-400" />
  },
  { 
    id: 2, 
    type: 'fail', 
    title: 'Failed "DOM Manipulation"', 
    time: '5 hours ago', 
    score: '42%',
    icon: <XCircle className="text-red-400" />
  },
  { 
    id: 3, 
    type: 'pending', 
    title: 'Started "React Hooks"', 
    time: 'Yesterday', 
    score: 'In Progress',
    icon: <Clock className="text-blue-400" />
  },
];

export default function RecentActivity() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="mt-1">
              {activity.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                {activity.title}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <span className={`text-xs font-bold ${
                  activity.type === 'success' ? 'text-green-400' : 
                  activity.type === 'fail' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {activity.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Link to="/quiz" className="block w-full mt-6 text-sm text-gray-500 hover:text-white transition-colors text-center">
        View All Activity
      </Link>
    </div>
  );
}
