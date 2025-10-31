export interface DistrictData {
  id: string;
  name: string;
  state: string;
  workdaysCreated: number;
  householdsBenefited: number;
  pendingPayments: number;
  monthlyData: MonthlyData[];
  lastUpdated: string;
}

export interface MonthlyData {
  month: string;
  workdays: number;
  households: number;
  payments: number;
}

export interface State {
  id: string;
  name: string;
  nameHi: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
  nameHi: string;
}

export type Language = 'en' | 'hi';

export const MOCK_STATES: State[] = [
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    nameHi: 'उत्तर प्रदेश',
    districts: [
      { id: 'LKO', name: 'Lucknow', nameHi: 'लखनऊ' },
      { id: 'KNP', name: 'Kanpur', nameHi: 'कानपुर' },
      { id: 'VNS', name: 'Varanasi', nameHi: 'वाराणसी' },
    ]
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    nameHi: 'महाराष्ट्र',
    districts: [
      { id: 'MUM', name: 'Mumbai', nameHi: 'मुंबई' },
      { id: 'PUN', name: 'Pune', nameHi: 'पुणे' },
      { id: 'NGP', name: 'Nagpur', nameHi: 'नागपुर' },
    ]
  },
  {
    id: 'BR',
    name: 'Bihar',
    nameHi: 'बिहार',
    districts: [
      { id: 'PAT', name: 'Patna', nameHi: 'पटना' },
      { id: 'GAY', name: 'Gaya', nameHi: 'गया' },
      { id: 'BHP', name: 'Bhagalpur', nameHi: 'भागलपुर' },
    ]
  },
];

export const generateMockDistrictData = (districtId: string, districtName: string, stateName: string): DistrictData => {
  const baseWorkdays = Math.floor(Math.random() * 10000) + 8000;
  const baseHouseholds = Math.floor(Math.random() * 5000) + 3000;
  
  const monthlyData: MonthlyData[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].map((month, index) => ({
    month,
    workdays: Math.floor(baseWorkdays * (0.8 + Math.random() * 0.4)),
    households: Math.floor(baseHouseholds * (0.7 + Math.random() * 0.5)),
    payments: Math.floor(Math.random() * 200000) + 50000,
  }));

  const currentMonth = monthlyData[new Date().getMonth()];
  
  return {
    id: districtId,
    name: districtName,
    state: stateName,
    workdaysCreated: currentMonth.workdays,
    householdsBenefited: currentMonth.households,
    pendingPayments: currentMonth.payments,
    monthlyData,
    lastUpdated: new Date().toLocaleDateString('en-IN'),
  };
};
