import { useMemo } from 'react';
import type { EssentialItem } from '../types/app';

type EssentialsScreenProps = {
  items: EssentialItem[];
  onUpdate: (items: EssentialItem[]) => void;
};

const updateStatus = (item: EssentialItem, qty: number): EssentialItem => {
  const ratio = qty / item.targetQty;
  let status: EssentialItem['status'] = 'ok';
  if (qty === 0) status = 'missing';
  else if (ratio <= 0.3) status = 'low';
  return { ...item, qty, status };
};

export function EssentialsScreen({ items, onUpdate }: EssentialsScreenProps) {
  const totals = useMemo(() => {
    const total = items.reduce((acc, item) => acc + item.targetQty, 0);
    const have = items.reduce((acc, item) => acc + item.qty, 0);
    return { total, have };
  }, [items]);

  const handleChange = (id: string, delta: number) => {
    const next = items.map((item) => {
      if (item.id !== id) return item;
      const qty = Math.max(0, item.qty + delta);
      return updateStatus(item, qty);
    });
    onUpdate(next);
  };

  return (
    <section className="screen">
      <div className="section-heading">
        <h2>Essentials</h2>
        <p className="hint">
          {totals.have} of {totals.total} planned units at home.
        </p>
      </div>
      <div className="essentials-grid">
        {items.map((item) => {
          const progress = Math.min((item.qty / item.targetQty) * 100, 100);
          return (
            <article
              key={item.id}
              className={`essential-card ${item.status}`}
            >
              <div className="essential-icon" aria-hidden>
                {item.icon}
              </div>
              <div className="essential-body">
                <div>
                  <h3>{item.name}</h3>
                  <p className="hint">
                    {item.qty} / {item.targetQty} {item.unit}
                  </p>
                </div>
                <div className="progress">
                  <div className="progress-value" style={{ width: `${progress}%` }} />
                </div>
                <div className="qty-controls">
                  <button type="button" onClick={() => handleChange(item.id, -1)}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => handleChange(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <button type="button" className="ghost-button">
        + Add another essential
      </button>
    </section>
  );
}

