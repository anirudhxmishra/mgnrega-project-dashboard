import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MonthlyData } from '@/types/district';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrendChartProps {
  data: MonthlyData[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  const { t } = useLanguage();

  const formattedData = data.map(d => ({
    month: d.month,
    workdays: d.workdays,
    households: d.households,
  }));

  return (
    <Card className="animate-fade-in bg-black/40 backdrop-blur-md border-2 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg text-white drop-shadow-lg">
          {t('12-Month Performance Trend', '12 महीने का प्रदर्शन रुझान')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255, 255, 255, 0.7)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
              }}
            />
            <Legend wrapperStyle={{ color: '#ffffff' }} />
            <Line 
              type="monotone" 
              dataKey="workdays" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name={t('Workdays', 'कार्यदिवस')}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line 
              type="monotone" 
              dataKey="households" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name={t('Households', 'परिवार')}
              dot={{ fill: 'hsl(var(--accent))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
