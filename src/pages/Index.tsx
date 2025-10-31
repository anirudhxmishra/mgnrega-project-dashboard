import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LanguageToggle } from '@/components/LanguageToggle';
import { MapPin, Locate, TrendingUp, Users, DollarSign } from 'lucide-react';
import { MOCK_STATES, State, District } from '@/types/district';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleAutoDetect = () => {
    toast({
      title: t('Detecting location...', 'स्थान का पता लगा रहा है...'),
      description: t(
        'This feature requires location permission',
        'इस सुविधा के लिए स्थान अनुमति की आवश्यकता है'
      ),
    });

    // Simulate auto-detection
    setTimeout(() => {
      const randomState = MOCK_STATES[Math.floor(Math.random() * MOCK_STATES.length)];
      const randomDistrict = randomState.districts[Math.floor(Math.random() * randomState.districts.length)];
      navigate(`/dashboard?district=${randomDistrict.id}&name=${randomDistrict.name}&state=${randomState.name}`);
    }, 1500);
  };

  const handleViewDashboard = () => {
    if (selectedState && selectedDistrict) {
      navigate(`/dashboard?district=${selectedDistrict.id}&name=${selectedDistrict.name}&state=${selectedState.name}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fallback Background */}
      <div className="fixed inset-0 w-full h-full -z-20 bg-gradient-to-br from-green-900 via-yellow-900 to-green-800" />

      {/* YouTube Background with smooth loader */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full scale-150 transition-opacity duration-700"
          src="https://www.youtube.com/embed/5sfbSTcXfps?autoplay=1&mute=1&loop=1&playlist=5sfbSTcXfps&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
          title="Background Video"
          allow="autoplay; encrypted-media"
          frameBorder="0"
          style={{
            pointerEvents: 'none',
            transformOrigin: 'center center',
            opacity: isVideoLoaded ? 1 : 0,
          }}
          onLoad={() => setIsVideoLoaded(true)}
        />

        {/* Smooth fade overlay during load */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 backdrop-blur-[1px]">
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-end">
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-block p-4 bg-primary/20 backdrop-blur-sm rounded-full mb-4 shadow-lg">
                <MapPin className="h-12 w-12 text-white drop-shadow-lg" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl">
                {t('Our Voice, Our Rights', 'हमारी आवाज़, हमारे अधिकार')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
                {t(
                  'Understand how your district is performing under MGNREGA',
                  'मनरेगा के तहत आपका जिला कैसा प्रदर्शन कर रहा है, यह समझें'
                )}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in">
              {[
                {
                  icon: <TrendingUp className="h-8 w-8 text-primary mb-2 drop-shadow-lg" />,
                  title: t('Track Performance', 'प्रदर्शन ट्रैक करें'),
                  desc: t('Monitor workdays created and trends over time', 'समय के साथ बनाए गए कार्यदिवसों की निगरानी करें'),
                },
                {
                  icon: <Users className="h-8 w-8 text-accent mb-2 drop-shadow-lg" />,
                  title: t('Households Reached', 'परिवारों तक पहुंच'),
                  desc: t('See how many families benefited from the scheme', 'देखें कितने परिवारों को योजना से लाभ मिला'),
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-success mb-2 drop-shadow-lg" />,
                  title: t('Payment Status', 'भुगतान स्थिति'),
                  desc: t('Track pending payments and disbursements', 'लंबित भुगतान और वितरण को ट्रैक करें'),
                },
              ].map((card, i) => (
                <Card
                  key={i}
                  className="border-2 border-white/20 bg-black/40 backdrop-blur-md hover:bg-black/50 hover:shadow-2xl transition-all hover:scale-105"
                >
                  <CardHeader>{card.icon}<CardTitle className="text-lg text-white">{card.title}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-white/80">{card.desc}</p></CardContent>
                </Card>
              ))}
            </div>

            {/* District Selection */}
            <Card className="max-w-2xl mx-auto shadow-2xl animate-fade-in bg-black/50 backdrop-blur-lg border-2 border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {t('Select Your District', 'अपना जिला चुनें')}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {t('Choose your state and district to view performance data', 'प्रदर्शन डेटा देखने के लिए अपना राज्य और जिला चुनें')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button onClick={handleAutoDetect} className="w-full h-12 text-lg gap-3" size="lg">
                  <Locate className="h-5 w-5" /> {t('Detect My District', 'मेरे जिले का पता लगाएं')}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {t('Or select manually', 'या मैन्युअल रूप से चुनें')}
                    </span>
                  </div>
                </div>

                {/* Manual Selection */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">{t('State', 'राज्य')}</label>
                    <Select
                      value={selectedState?.id}
                      onValueChange={(value) => {
                        const state = MOCK_STATES.find((s) => s.id === value);
                        setSelectedState(state || null);
                        setSelectedDistrict(null);
                      }}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t('Select state', 'राज्य चुनें')} />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_STATES.map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {language === 'en' ? state.name : state.nameHi}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">{t('District', 'जिला')}</label>
                    <Select
                      value={selectedDistrict?.id}
                      onValueChange={(value) => {
                        const district = selectedState?.districts.find((d) => d.id === value);
                        setSelectedDistrict(district || null);
                      }}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t('Select district', 'जिला चुनें')} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedState?.districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {language === 'en' ? district.name : district.nameHi}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleViewDashboard}
                    disabled={!selectedState || !selectedDistrict}
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    {t('View Dashboard', 'डैशबोर्ड देखें')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-white/70 space-y-2 drop-shadow-lg">
              <p>{t('Data sourced from data.gov.in (MGNREGA Open API)', 'डेटा data.gov.in (मनरेगा ओपन API) से प्राप्त किया गया')}</p>
              <p>{t('Built for transparency and accountability', 'पारदर्शिता और जवाबदेही के लिए बनाया गया')}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
