import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MetricCard } from '@/components/MetricCard';
import { TrendChart } from '@/components/TrendChart';
import { ComparisonView } from '@/components/ComparisonView';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Briefcase, Home, IndianRupee, ArrowLeft, MapPin } from 'lucide-react';
import { DistrictData, generateMockDistrictData } from '@/types/district';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [districtData, setDistrictData] = useState<DistrictData | null>(null);
  const [showComparison, setShowComparison] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const districtId = params.get('district');
    const districtName = params.get('name');
    const stateName = params.get('state');

    if (districtId && districtName && stateName) {
      const data = generateMockDistrictData(districtId, districtName, stateName);
      setDistrictData(data);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  if (!districtData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          {t('Loading...', 'लोड हो रहा है...')}
        </div>
      </div>
    );
  }

  const getStatus = (value: number, type: 'workdays' | 'households' | 'payments') => {
    if (type === 'payments') {
      if (value < 100000) return 'good';
      if (value < 200000) return 'average';
      return 'poor';
    }
    if (value > 10000) return 'good';
    if (value > 6000) return 'average';
    return 'poor';
  };

  const stateAverages = {
    workdays: 9500,
    households: 4200,
    payments: 120000,
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-green-900 via-yellow-900 to-green-800" />
      <div className="fixed inset-0 w-full h-full -z-5 bg-black/60" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-lg">
                  {t('Our Voice, Our Rights', 'हमारी आवाज़, हमारे अधिकार')}
                </h1>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-3 w-3" />
                  <span>{districtData.name}, {districtData.state}</span>
                </div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8 relative">
        {/* Last Updated Banner */}
        <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-4 text-sm text-white/80 shadow-xl">
          {t('Last updated on', 'अंतिम अपडेट')} {districtData.lastUpdated} • 
          {t(' Data Source: data.gov.in (MGNREGA Open API)', ' डेटा स्रोत: data.gov.in (मनरेगा ओपन API)')}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title={t('Workdays Created', 'बनाए गए कार्यदिवस')}
            value={districtData.workdaysCreated}
            icon={Briefcase}
            status={getStatus(districtData.workdaysCreated, 'workdays')}
            onCompare={() => setShowComparison('workdays')}
            compareText={t('Compare', 'तुलना करें')}
          />
          <MetricCard
            title={t('Households Benefited', 'लाभान्वित परिवार')}
            value={districtData.householdsBenefited}
            icon={Home}
            status={getStatus(districtData.householdsBenefited, 'households')}
            onCompare={() => setShowComparison('households')}
            compareText={t('Compare', 'तुलना करें')}
          />
          <MetricCard
            title={t('Pending Payments', 'लंबित भुगतान')}
            value={districtData.pendingPayments}
            icon={IndianRupee}
            status={getStatus(districtData.pendingPayments, 'payments')}
            unit="₹"
            onCompare={() => setShowComparison('payments')}
            compareText={t('Compare', 'तुलना करें')}
          />
        </div>

        {/* Trend Chart */}
        <TrendChart data={districtData.monthlyData} />

        {/* Comparison View */}
        {showComparison && (
          <div className="space-y-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                {t('District Comparison', 'जिला तुलना')}
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowComparison(null)}
                className="border-white/20 bg-black/20 text-white hover:bg-white/10"
              >
                {t('Close', 'बंद करें')}
              </Button>
            </div>
            <ComparisonView
              districtName={districtData.name}
              districtValue={
                showComparison === 'workdays'
                  ? districtData.workdaysCreated
                  : showComparison === 'households'
                  ? districtData.householdsBenefited
                  : districtData.pendingPayments
              }
              stateAverage={stateAverages[showComparison as keyof typeof stateAverages]}
              metric={
                showComparison === 'workdays'
                  ? t('Workdays', 'कार्यदिवस')
                  : showComparison === 'households'
                  ? t('Households', 'परिवार')
                  : t('Pending Payments', 'लंबित भुगतान')
              }
            />
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8 mt-12">
          <div className="text-center space-y-4">
            <p className="text-sm text-white/80">
              {t(
                'Have feedback or issues to report?',
                'प्रतिक्रिया या समस्या रिपोर्ट करनी है?'
              )}
            </p>
            <Button 
              variant="outline"
              className="border-white/20 bg-black/20 text-white hover:bg-white/10 backdrop-blur-md"
            >
              {t('Send Feedback', 'प्रतिक्रिया भेजें')}
            </Button>
            <div className="text-xs text-white/60 pt-4 drop-shadow-lg">
              © 2024 {t('Our Voice, Our Rights', 'हमारी आवाज़, हमारे अधिकार')}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
