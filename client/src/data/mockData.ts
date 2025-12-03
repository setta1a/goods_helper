import type {
  DeliverySettings,
  EssentialItem,
  FridgeSnapshot,
  OverviewData,
  ProductTemplate,
  QuickAction,
} from '../types/app';

export const overviewData: OverviewData = {
  lastScan: 'Today · 08:45',
  missingItems: ['Milk', 'Eggs', 'Blueberries'],
  nextDelivery: 'Tomorrow · 18:30',
};

export const quickActions: QuickAction[] = [
  {
    id: 'scan',
    label: 'Scan Now',
    description: 'Wake up the fridge camera',
    accent: '#9b8bf5',
    targetScreen: 'fridge',
  },
  {
    id: 'add',
    label: 'Add Product',
    description: 'Schedule a product refill',
    accent: '#fab448',
    targetScreen: 'add',
  },
  {
    id: 'essentials',
    label: 'Essentials List',
    description: 'See your must-have items',
    accent: '#58c6b3',
    targetScreen: 'essentials',
  },
];

export const essentialsData: EssentialItem[] = [
  {
    id: 'milk',
    name: 'Organic Milk',
    icon: '🥛',
    unit: 'bottle',
    qty: 1,
    targetQty: 4,
    status: 'low',
  },
  {
    id: 'eggs',
    name: 'Farm Eggs',
    icon: '🥚',
    unit: 'pcs',
    qty: 6,
    targetQty: 12,
    status: 'ok',
  },
  {
    id: 'greens',
    name: 'Mixed Greens',
    icon: '🥬',
    unit: 'pack',
    qty: 0,
    targetQty: 3,
    status: 'missing',
  },
  {
    id: 'sparkling',
    name: 'Sparkling Water',
    icon: '💧',
    unit: 'bottle',
    qty: 3,
    targetQty: 6,
    status: 'ok',
  },
  {
    id: 'yogurt',
    name: 'Greek Yogurt',
    icon: '🥣',
    unit: 'cup',
    qty: 1,
    targetQty: 5,
    status: 'low',
  },
];

export const fridgeSnapshot: FridgeSnapshot = {
  capturedAt: '08:45 · Fresh scan',
  aiConfidence: 92,
  placeholderLabel: 'Latest fridge snapshot',
  items: [
    { id: 'milk', name: 'Milk', unit: 'bottle', count: 1 },
    { id: 'eggs', name: 'Eggs', unit: 'pcs', count: 6 },
    { id: 'berries', name: 'Blueberries', unit: 'box', count: 0 },
    { id: 'salad', name: 'Salad mix', unit: 'pack', count: 1 },
  ],
};

export const addProductTemplates: ProductTemplate[] = [
  {
    id: 'coffee',
    name: 'Coffee Beans',
    unit: 'bag',
    defaultQty: 1,
    defaultFrequency: 'Every 2 weeks',
    lastAdded: '2 days ago',
  },
  {
    id: 'pasta',
    name: 'Italian Pasta',
    unit: 'pack',
    defaultQty: 4,
    defaultFrequency: 'Monthly',
    lastAdded: '1 week ago',
  },
  {
    id: 'detergent',
    name: 'Laundry Detergent',
    unit: 'bottle',
    defaultQty: 1,
    defaultFrequency: 'Monthly',
    lastAdded: '3 weeks ago',
  },
];

export const deliverySettingsData: DeliverySettings = {
  preferredTime: '18:00 - 20:00',
  deliveryDays: ['Mon', 'Wed', 'Fri'],
  urgentDelivery: false,
  courierNotes: 'Leave at the front desk if nobody answers.',
};


