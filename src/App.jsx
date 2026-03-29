import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsApp/WhatsAppButton'
import FloatingSubscribeButton from './components/FloatingSubscribe/FloatingSubscribeButton'
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton'
import FloatingChatButton from './components/FloatingChat/FloatingChatButton'
import './App.css'

// Page Components
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import NewsPage from './pages/NewsPage'
import ArticlesPage from './pages/ArticlesPage'
import LibraryPage from './pages/LibraryPage'
import ContactPage from './pages/ContactPage'
import SearchResultsPage from './pages/SearchResultsPage'
import BlogPage from './pages/BlogPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import LegalMemosPage from './pages/LegalMemosPage'
import CaseManagementPage from './pages/CaseManagementPage'
import LegalConsultPage from './pages/LegalConsultPage'
import ContractDraftingPage from './pages/ContractDraftingPage'
import EnglishContractsPage from './pages/EnglishContractsPage'
import FamilyLawPage from './pages/FamilyLawPage'
import CriminalLawPage from './pages/CriminalLawPage'
import CivilCommercialPage from './pages/CivilCommercialPage'
import CompanyFormationPage from './pages/CompanyFormationPage'
import AdminLaborPage from './pages/AdminLaborPage'
import LegalNewsPage from './pages/LegalNewsPage'
import FAQPage from './pages/FAQPage'

// Library subpages
import LegalBooksPage from './pages/library/LegalBooksPage'
import EgyptianLawsPage from './pages/library/EgyptianLawsPage'
import UAELawsPage from './pages/library/UAELawsPage'
import KuwaitiLawsPage from './pages/library/KuwaitiLawsPage'
import CassationRulingsPage from './pages/library/CassationRulingsPage'
import AdminCourtPage from './pages/library/AdminCourtPage'
import ConstitutionalCourtPage from './pages/library/ConstitutionalCourtPage'
import LawsuitFormsPage from './pages/library/LawsuitFormsPage'
import ContractFormsPage from './pages/library/ContractFormsPage'
import NoticesFormsPage from './pages/library/NoticesFormsPage'
import LegalTopicsPage from './pages/library/LegalTopicsPage'
import DefenseMemosPage from './pages/library/DefenseMemosPage'
import BookDetailPage from './pages/library/BookDetailPage'

// Guide pages
import EgyptianLawCodesPage from './pages/guide/EgyptianLawCodesPage'
import CaseInquiryPage from './pages/guide/CaseInquiryPage'
import InsuranceInquiryPage from './pages/guide/InsuranceInquiryPage'
import EgyptianCourtsPage from './pages/guide/EgyptianCourtsPage'
import UAECourtsPage from './pages/guide/UAECourtsPage'

// Scroll to top on every route change
function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function App() {
  useEffect(() => {
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
  }, [])

  return (
    <Router>
      <ScrollToTopOnNav />
      <div className="bg-white" dir="rtl" lang="ar">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/article" element={<ArticleDetailPage />} />
          <Route path="/services/legal-memos" element={<LegalMemosPage />} />
          <Route path="/services/case-management" element={<CaseManagementPage />} />
          <Route path="/services/consultation" element={<LegalConsultPage />} />
          <Route path="/services/contracts" element={<ContractDraftingPage />} />
          <Route path="/services/contracts-english" element={<EnglishContractsPage />} />
          <Route path="/services/family-law" element={<FamilyLawPage />} />
          <Route path="/services/criminal-law" element={<CriminalLawPage />} />
          <Route path="/services/civil-commercial" element={<CivilCommercialPage />} />
          <Route path="/services/company-formation" element={<CompanyFormationPage />} />
          <Route path="/services/admin-labor" element={<AdminLaborPage />} />
          <Route path="/legal-news" element={<LegalNewsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/library/legal-books" element={<LegalBooksPage />} />
          <Route path="/library/legal-books/:id" element={<BookDetailPage />} />
          <Route path="/library/egyptian-laws" element={<EgyptianLawsPage />} />
          <Route path="/library/uae-laws" element={<UAELawsPage />} />
          <Route path="/library/kuwaiti-laws" element={<KuwaitiLawsPage />} />
          <Route path="/library/cassation-rulings" element={<CassationRulingsPage />} />
          <Route path="/library/admin-court" element={<AdminCourtPage />} />
          <Route path="/library/constitutional-court" element={<ConstitutionalCourtPage />} />
          <Route path="/library/lawsuit-forms" element={<LawsuitFormsPage />} />
          <Route path="/library/contract-forms" element={<ContractFormsPage />} />
          <Route path="/library/notices-forms" element={<NoticesFormsPage />} />
          <Route path="/library/legal-topics" element={<LegalTopicsPage />} />
          <Route path="/library/defense-memos" element={<DefenseMemosPage />} />
          {/* Guide pages */}
          <Route path="/guide/egyptian-law-codes" element={<EgyptianLawCodesPage />} />
          <Route path="/guide/case-inquiry" element={<CaseInquiryPage />} />
          <Route path="/guide/insurance-inquiry" element={<InsuranceInquiryPage />} />
          <Route path="/guide/egyptian-courts" element={<EgyptianCourtsPage />} />
          <Route path="/guide/uae-courts" element={<UAECourtsPage />} />
        </Routes>
        <WhatsAppButton />
        <FloatingSubscribeButton />
        <FloatingChatButton />
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  )
}

export default App
