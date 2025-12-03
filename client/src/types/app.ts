export type ScreenId = 'home' | 'essentials' | 'fridge' | 'add' | 'delivery';

export type OverviewData = {
  lastScan: string;
  missingItems: string[];
  nextDelivery: string;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  accent: string;
  targetScreen?: ScreenId;
};

export type EssentialItem = {
  id: string;
  name: string;
  icon: string;
  unit: string;
  qty: number;
  targetQty: number;
  status: 'ok' | 'low' | 'missing';
};

export type FridgeItem = {
  id: string;
  name: string;
  unit: string;
  count: number;
};

export type FridgeSnapshot = {
  capturedAt: string;
  aiConfidence: number;
  placeholderLabel: string;
  items: FridgeItem[];
};

export type DeliverySettings = {
  preferredTime: string;
  deliveryDays: string[];
  urgentDelivery: boolean;
  courierNotes: string;
};

export type ProductTemplate = {
  id: string;
  name: string;
  unit: string;
  defaultQty: number;
  defaultFrequency: string;
  lastAdded: string;
};

