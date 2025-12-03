import { useState } from 'react';
import type { FridgeSnapshot } from '../types/app';

type FridgeViewScreenProps = {
  snapshot: FridgeSnapshot;
};

export function FridgeViewScreen({ snapshot }: FridgeViewScreenProps) {
  const [items, setItems] = useState(snapshot.items);

  const handleAdjust = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, count: Math.max(0, item.count + delta) };
      }),
    );
  };

  return (
    <section className="screen">
      <div className="section-heading">
        <h2>Fridge View</h2>
        <p className="hint">
          {snapshot.capturedAt} · AI confidence {snapshot.aiConfidence}%
        </p>
      </div>
      <div className="fridge-photo">
        <div className="grid-overlay" aria-hidden />
        <p>{snapshot.placeholderLabel}</p>
      </div>
      <div className="card list-card">
        {items.map((item) => (
          <article key={item.id} className="list-row">
            <div>
              <p className="meta-label">{item.name}</p>
              <p className="hint">
                {item.count} {item.unit}
              </p>
            </div>
            <div className="qty-controls compact">
              <button type="button" onClick={() => handleAdjust(item.id, -1)}>
                −
              </button>
              <span>{item.count}</span>
              <button type="button" onClick={() => handleAdjust(item.id, 1)}>
                +
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

