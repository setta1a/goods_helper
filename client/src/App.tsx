import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { HomeScreen } from './screens/HomeScreen';
import { EssentialsScreen } from './screens/EssentialsScreen';
import { FridgeViewScreen } from './screens/FridgeViewScreen';
import { AddProductScreen } from './screens/AddProductScreen';
import { DeliverySettingsScreen } from './screens/DeliverySettingsScreen';
import {
  addProductTemplates,
  deliverySettingsData,
  essentialsData,
  fridgeSnapshot,
  overviewData,
  quickActions,
} from './data/mockData';
import type { EssentialItem, QuickAction, ScreenId } from './types/app';

type NavItem = {
  id: ScreenId;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'essentials', label: 'Essentials' },
  { id: 'fridge', label: 'Fridge View' },
  { id: 'add', label: 'Add Product' },
  { id: 'delivery', label: 'Delivery' },
];

function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [essentials, setEssentials] =
    useState<EssentialItem[]>(essentialsData);
  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (action: QuickAction) => {
    setToast(`${action.label} is queued.`);
    if (action.targetScreen) {
      setActiveScreen(action.targetScreen);
    }
  };

  const handleSchedule = (summary: string) => {
    setToast(`Scheduled: ${summary}`);
    setActiveScreen('home');
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).format(new Date()),
    [],
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="meta-label">Goods Helper</p>
          <h1>Kitchen Control Center</h1>
        </div>
        <p className="hint">{todayLabel}</p>
      </header>

      <nav className="tab-bar">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeScreen ? 'active' : ''}
            onClick={() => setActiveScreen(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {toast && <div className="toast">{toast}</div>}

      <main className="screen-area">
        {activeScreen === 'home' && (
          <HomeScreen
            overview={overviewData}
            quickActions={quickActions}
            essentials={essentials}
            onAction={handleAction}
          />
        )}
        {activeScreen === 'essentials' && (
          <EssentialsScreen
            items={essentials}
            onUpdate={(items) => setEssentials(items)}
          />
        )}
        {activeScreen === 'fridge' && (
          <FridgeViewScreen snapshot={fridgeSnapshot} />
        )}
        {activeScreen === 'add' && (
          <AddProductScreen
            templates={addProductTemplates}
            onSchedule={handleSchedule}
          />
        )}
        {activeScreen === 'delivery' && (
          <DeliverySettingsScreen settings={deliverySettingsData} />
        )}
      </main>
    </div>
  );
}

export default App;
