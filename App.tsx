import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ClubPage from './pages/ClubPage';
import SubscribePage from './pages/SubscribePage';
import SponsorshipPage from './pages/SponsorshipPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import RosterPage from './pages/RosterPage';
import LegalPage from './pages/LegalPage';
import FacilitiesPage from './pages/FacilitiesPage';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#0a192f]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/noticias/:newsSlug" element={<NewsDetailPage />} />
            <Route path="/el-club" element={<ClubPage />} />
            <Route path="/instalaciones" element={<FacilitiesPage />} />
            <Route path="/plantilla" element={<RosterPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/galeria/:gallerySlug" element={<GalleryDetailPage />} />
            <Route path="/abonate" element={<SubscribePage />} />
            <Route path="/patrocinio" element={<SponsorshipPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;