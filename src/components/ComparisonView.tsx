import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonViewProps {
  districtName: string;
  districtValue: number;
  stateAverage: number;
  metric: string;
}

export const ComparisonView = ({
  districtName,
  districtValue,
  stateAverage,
  metric,
}: ComparisonViewProps) => {
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
    <Card
      className="
        bg-gradient-to-br from-black/60 via-emerald-950/60 to-amber-950/40 
        border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl 
        text-white transition-all duration-500
      "
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold text-white drop-shadow-md">
          {t(`Comparison: ${metric}`, `तुलना: ${metric}`)}
        </CardTitle>
        <p className="text-sm text-white/70">
          {districtName} {t('vs State Average', 'बनाम राज्य औसत')}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Highlight Box */}
        <div
          className={`p-4 rounded-xl border backdrop-blur-md shadow-inner transition-all duration-300 ${
            isAboveAverage
              ? 'bg-green-900/30 border-green-400/40'
              : 'bg-amber-900/30 border-amber-400/40'
          }`}
        >
          <p className="text-sm text-white/90 leading-relaxed">
            {isAboveAverage
              ? t('Your district is performing', 'आपका जिला प्रदर्शन कर रहा है')
              : t('Your district is', 'आपका जिला है')}{' '}
            <span
              className={`font-bold ${
                isAboveAverage ? 'text-green-400' : 'text-amber-400'
              }`}
            >
              {Math.abs(Number(percentDiff))}%
            </span>{' '}
            {isAboveAverage
              ? t('above', 'ऊपर')
              : t('below', 'नीचे')}{' '}
            {t('state average', 'राज्य औसत')}
          </p>
        </div>

        {/* Chart */}
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={60}>
              <defs>
                <linearGradient id="districtGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="stateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#facc15" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#facc15" stopOpacity={0.3} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="rgba(255, 255, 255, 0.08)" />
              <XAxis
                dataKey="name"
                stroke="rgba(255, 255, 255, 0.7)"
                style={{ fontSize: '13px', fontWeight: 500 }}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  color: '#fff',
                  backdropFilter: 'blur(12px)',
                }}
              />
              <Legend
                wrapperStyle={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '12px',
                  paddingTop: '10px',
                }}
              />
              <Bar
                dataKey="value"
                name={t('Value', 'मान')}
                fill={`url(#districtGradient)`}
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="stateAverage"
                name={t('State Average', 'राज्य औसत')}
                fill={`url(#stateGradient)`}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
