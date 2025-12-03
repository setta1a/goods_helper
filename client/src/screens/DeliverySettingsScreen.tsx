import { useState } from 'react';
import type { DeliverySettings } from '../types/app';

type DeliverySettingsScreenProps = {
  settings: DeliverySettings;
};

const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DeliverySettingsScreen({
  settings,
}: DeliverySettingsScreenProps) {
  const [days, setDays] = useState(settings.deliveryDays);
  const [urgent, setUrgent] = useState(settings.urgentDelivery);
  const [notes, setNotes] = useState(settings.courierNotes);
  const [time, setTime] = useState(settings.preferredTime);

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((entry) => entry !== day) : [...prev, day],
    );
  };

  return (
    <section className="screen">
      <div className="section-heading">
        <h2>Delivery Settings</h2>
        <p className="hint">Control when your groceries arrive.</p>
      </div>
      <div className="card form-card">
        <label>
          Preferred time
          <input value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <div className="days-grid">
          {dayOrder.map((day) => (
            <button
              type="button"
              key={day}
              className={`day-chip ${days.includes(day) ? 'active' : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
          />
          <span>Urgent delivery if items go missing</span>
        </label>
        <label>
          Courier notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </label>
        <p className="hint">
          Goods Helper automatically syncs these settings with your courier.
        </p>
      </div>
    </section>
  );
}

