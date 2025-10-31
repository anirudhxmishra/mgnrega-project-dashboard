import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  status: 'good' | 'average' | 'poor';
  unit?: string;
  onCompare?: () => void;
  compareText?: string;
}

const statusStyles = {
  good: 'bg-success text-success-foreground',
  average: 'bg-warning text-warning-foreground',
  poor: 'bg-destructive text-destructive-foreground',
};

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  status,
  unit = '',
  onCompare,
  compareText = 'Compare',
}: MetricCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in bg-black/40 backdrop-blur-md border-2 border-white/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2 text-white">
          <div className={cn('p-2 rounded-lg', statusStyles[status])}>
            <Icon className="h-4 w-4" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
            {value.toLocaleString('en-IN')}
            {unit && <span className="text-xl font-normal text-white/70 ml-1">{unit}</span>}
          </div>
          <div className="flex items-center gap-1 text-sm text-white/70">
            <TrendingUp className="h-3 w-3" />
            <span>This month</span>
          </div>
        </div>
        {onCompare && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCompare}
            className="w-full border-white/20 bg-black/20 text-white hover:bg-white/10"
          >
            {compareText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
