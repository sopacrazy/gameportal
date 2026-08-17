import { Route, Routes, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Header from "./components/Header.jsx";
import MobileBottomNav from "./components/MobileBottomNav.jsx";
import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import { useI18n } from "./i18n.jsx";

function App() {
  const { t } = useI18n();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [homeResetSignal, setHomeResetSignal] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const clearSearch = useCallback(() => setQuery(""), []);

  useEffect(() => {
    document.title = t("app.title");
  }, [t]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 620);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogoClick() {
    clearSearch();
    setHomeResetSignal((signal) => signal + 1);
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <Header
        query={query}
        onSearch={setQuery}
        onLogoClick={handleLogoClick}
        onMenuToggle={() => setIsMobileMenuOpen((value) => !value)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                query={query}
                onClearSearch={clearSearch}
                resetSignal={homeResetSignal}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
            }
          />
          <Route
            path="/category/:filter"
            element={
              <HomePage
                query={query}
                onClearSearch={clearSearch}
                resetSignal={homeResetSignal}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
            }
          />
          <Route
            path="/game/:slug"
            element={
              <GamePage
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
            }
          />
        </Routes>
      </main>
      {showScrollTop && (
        <button type="button" className="scroll-top-button" onClick={scrollToTop} aria-label={t("app.scrollTop")}>
          <ArrowUp size={20} />
        </button>
      )}
      <MobileBottomNav />
    </div>
  );
}

export default App;
