import { useMemo, useState } from 'react';
import type { ProductTemplate } from '../types/app';

type AddProductScreenProps = {
  templates: ProductTemplate[];
  onSchedule?: (message: string) => void;
};

const frequencyOptions = [
  'Every week',
  'Every 2 weeks',
  'Monthly',
  'Only when low',
];

export function AddProductScreen({
  templates,
  onSchedule,
}: AddProductScreenProps) {
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState(frequencyOptions[0]);
  const [productName, setProductName] = useState('Milk');
  const [unit, setUnit] = useState('item');
  const [confirmation, setConfirmation] = useState('');

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return templates;
    return templates.filter((item) =>
      item.name.toLowerCase().includes(normalized),
    );
  }, [search, templates]);

  const handleTemplateSelect = (template: ProductTemplate) => {
    setProductName(template.name);
    setUnit(template.unit);
    setQuantity(template.defaultQty);
    setFrequency(template.defaultFrequency);
  };

  const handlePlan = () => {
    const result = `${productName} · ${quantity} ${unit} · ${frequency}`;
    setConfirmation(result);
    onSchedule?.(result);
  };

  return (
    <section className="screen">
      <div className="section-heading">
        <h2>Add Product</h2>
        <p className="hint">Pick a template or start typing.</p>
      </div>

      <div className="card form-card">
        <label>
          Product name
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Type a product"
          />
        </label>
        <label>
          Quantity ({unit})
          <input
            type="range"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <span className="range-value">{quantity}</span>
        </label>
        <label>
          Refill frequency
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            {frequencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="primary-button" onClick={handlePlan}>
          Schedule Refill
        </button>
        {confirmation && <p className="success-text">Ready: {confirmation}</p>}
      </div>

      <div className="section-heading">
        <h3>Suggestions</h3>
        <div className="input-chip">
          <input
            type="search"
            placeholder="Search templates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="templates-grid">
        {filtered.map((template) => (
          <button
            type="button"
            key={template.id}
            className="template-card"
            onClick={() => handleTemplateSelect(template)}
          >
            <div>
              <h4>{template.name}</h4>
              <p className="hint">
                {template.defaultQty} {template.unit} · {template.defaultFrequency}
              </p>
            </div>
            <p className="meta-label subtle">Last {template.lastAdded}</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="hint">No templates found. Keep typing.</p>
        )}
      </div>
    </section>
  );
}

