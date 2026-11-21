import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import DatasetSection from './components/DatasetSection';
import FeaturesSection from './components/FeaturesSection';
import PreprocessingSection from './components/PreprocessingSection';
import EdaSection from './components/EdaSection';
import ModelsSection from './components/ModelsSection';
import ModelComparisonSection from './components/ModelComparisonSection';
import BestModelSection from './components/BestModelSection';
import ConclusionSection from './components/ConclusionSection';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';

export default function App() {
  const [zoomedImage, setZoomedImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#34354A]">
      <Navbar />
      <main>
        <HeroSection />
        <IntroductionSection />
        <DatasetSection />
        <FeaturesSection />
        <PreprocessingSection />
        <EdaSection onOpenImage={setZoomedImage} />
        <ModelsSection />
        <ModelComparisonSection onOpenImage={setZoomedImage} />
        <BestModelSection onOpenImage={setZoomedImage} />
        <ConclusionSection />
      </main>
      <Footer />
      <ImageModal image={zoomedImage} onClose={() => setZoomedImage(null)} />
    </div>
  );
}
