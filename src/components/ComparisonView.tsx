import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonViewProps {
  districtName: string;
  districtValue: number;
  stateAverage: number;
  metric: string;
}

export const ComparisonView = ({ districtName, districtValue, stateAverage, metric }: ComparisonViewProps) => {
  const { t, language } = useLanguage();

  const data = [
    {
      name: language === 'en' ? 'Your District' : 'आपका जिला',
      value: districtValue,
    },
    {
      name: language === 'en' ? 'State Average' : 'राज्य औसत',
      value: stateAverage,
    },
  ];

  const percentDiff = ((districtValue - stateAverage) / stateAverage * 100).toFixed(1);
  const isAboveAverage = districtValue > stateAverage;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg text-white drop-shadow-lg">
          {t(`Comparison: ${metric}`, `तुलना: ${metric}`)}
        </CardTitle>
        <p className="text-sm text-white/70">
          {districtName} {t('vs State Average', 'बनाम राज्य औसत')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg backdrop-blur-md ${isAboveAverage ? 'bg-success/20 border border-success/30' : 'bg-warning/20 border border-warning/30'}`}>
          <p className="text-sm font-medium text-white">
            {isAboveAverage
              ? t('Your district is performing', 'आपका जिला प्रदर्शन कर रहा है')
              : t('Your district is', 'आपका जिला है')
            }{' '}
            <span className={`font-bold ${isAboveAverage ? 'text-success' : 'text-warning'}`}>
              {Math.abs(Number(percentDiff))}%
            </span>{' '}
            {isAboveAverage
              ? t('above', 'ऊपर')
              : t('below', 'नीचे')
            }{' '}
            {t('state average', 'राज्य औसत')}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="name" 
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
            <Bar 
              dataKey="value" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
