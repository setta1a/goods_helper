import type { EssentialItem, OverviewData, QuickAction } from '../types/app';

type HomeScreenProps = {
  overview: OverviewData;
  quickActions: QuickAction[];
  essentials: EssentialItem[];
  onAction: (action: QuickAction) => void;
};

export function HomeScreen({
  overview,
  quickActions,
  essentials,
  onAction,
}: HomeScreenProps) {
  const lowItems = essentials.filter(
    (item) => item.status === 'low' || item.status === 'missing',
  );

  return (
    <section className="screen">
      <section className="stat-grid">
        <article className="stat-card">
          <p className="meta-label">Last fridge scan</p>
          <h3>{overview.lastScan}</h3>
          <p className="meta-label subtle">
            AI refreshed the list {overview.lastScan.toLowerCase().includes('today') ? 'this morning' : 'recently'}.
          </p>
        </article>
        <article className="stat-card">
          <p className="meta-label">Next delivery</p>
          <h3>{overview.nextDelivery}</h3>
          <p className="meta-label subtle">Courier: FridgeFlow</p>
        </article>
      </section>

      <section>
        <div className="section-heading">
          <h2>Quick Actions</h2>
          <p className="hint">One tap to keep the kitchen synced.</p>
        </div>
        <div className="action-grid">
          {quickActions.map((action) => (
            <button
              type="button"
              className="action-card"
              key={action.id}
              style={{ background: action.accent }}
              onClick={() => onAction(action)}
            >
              <span>{action.label}</span>
              <p>{action.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Low or Missing</h2>
          <p className="hint">Goods Helper will refill these first.</p>
        </div>
        <div className="chip-row">
          {lowItems.map((item) => (
            <div
              key={item.id}
              className={`status-chip ${item.status === 'missing' ? 'danger' : ''}`}
            >
              {item.name}
            </div>
          ))}
          {lowItems.length === 0 && (
            <p className="hint">You are fully stocked ✨</p>
          )}
        </div>
      </section>
    </section>
  );
}

