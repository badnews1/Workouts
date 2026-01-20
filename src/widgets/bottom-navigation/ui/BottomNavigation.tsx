import { NavLink } from 'react-router';
import { NAV_ITEMS } from '../config';

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t-4 border-black">
      <div className="flex items-stretch">
        {NAV_ITEMS.map(({ path, label, Icon, color }) => (
          <NavLink
            key={path}
            to={path}
            className="flex items-center justify-center flex-1 h-16 border-r-4 border-black last:border-r-0 transition-all"
            style={({ isActive }) => ({
              backgroundColor: isActive ? color : 'white',
            })}
          >
            {({ isActive }) => (
              <Icon 
                className="w-8 h-8" 
                strokeWidth={2.5}
                style={{ color: 'var(--brand-black)' }}
              />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}