import { NavLink } from 'react-router-dom';
import { Dumbbell, Apple, User } from 'lucide-react';

const navItems = [
  { path: '/workouts', label: 'Тренировки', Icon: Dumbbell, color: '#FFD93D' },
  { path: '/nutrition', label: 'Питание', Icon: Apple, color: '#00D26A' },
  { path: '/profile', label: 'Профиль', Icon: User, color: '#FF6B9D' },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black">
      <div className="flex items-center justify-around px-4 py-3 gap-2">
        {navItems.map(({ path, label, Icon, color }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1.5 flex-1 py-3 border-4 border-black font-black text-xs uppercase tracking-tight transition-all ${
                isActive ? '' : 'bg-white'
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? color : 'white',
              boxShadow: isActive ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon 
                  className="w-6 h-6" 
                  strokeWidth={3}
                  style={{ color: isActive ? '#000000' : '#6B7280' }}
                />
                <span style={{ color: isActive ? '#000000' : '#6B7280' }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}