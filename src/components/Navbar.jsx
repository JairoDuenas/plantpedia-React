import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Leaf, Menu, X, Sun, Moon, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PWA Logic
  const [deferredPrompt, setDeferredPrompt] = useState(
    window.deferredPWAEvent || null,
  );
  const [isInstallable, setIsInstallable] = useState(!!window.deferredPWAEvent);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const standalone = !!(
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone
      );
      setIsStandalone(standalone);
      if (standalone) setIsInstalled(true);
    };

    checkStatus();

    const updatePWAState = (e) => {
      const promptEvent = e || window.deferredPWAEvent;
      if (promptEvent) {
        setDeferredPrompt(promptEvent);
        setIsInstallable(true);
      }
    };

    updatePWAState();

    const handleBeforeInstallPrompt = (e) => {
      updatePWAState(e);
    };

    const handlePWAReady = () => {
      updatePWAState();
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("pwa-ready", handlePWAReady);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("pwa-ready", handlePWAReady);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstallable(false);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error("PWA Install Error:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 transition-colors ${
      isActive
        ? "text-emerald-600 font-bold"
        : "text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-4 rounded-2xl transition-all ${
      isActive
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold translate-x-2"
        : "text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 py-2 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={scrollToTop}
          >
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl group-hover:rotate-12 transition-transform">
              <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <span className="text-xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
              Fito
              <span className="text-emerald-600 dark:text-emerald-500">
                Pedia
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink to="/" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Enciclopedia
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/guias" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Guías de Cuidado
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/comunidad" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Comunidad
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            <div className="flex items-center gap-4 border-l border-stone-200 dark:border-stone-800 pl-8">
              {isInstallable && !isStandalone && !isInstalled && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={installPWA}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 dark:shadow-none font-bold"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Instalar App</span>
                </motion.button>
              )}
              <button
                onClick={toggleTheme}
                className="p-2.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
              <button className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-2.5 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95">
                Comenzar
              </button>
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {isInstallable && !isStandalone && !isInstalled && (
              <button
                onClick={installPWA}
                className="p-2 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                aria-label="Install app"
              >
                <Smartphone className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-8 space-y-2">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={scrollToTop}
              >
                Enciclopedia
              </NavLink>
              <NavLink
                to="/guias"
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Guías de Cuidado
              </NavLink>
              <NavLink
                to="/comunidad"
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Comunidad
              </NavLink>

              {isInstallable && !isStandalone && !isInstalled && (
                <button
                  onClick={() => {
                    installPWA();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-4 rounded-2xl font-bold mt-6 shadow-lg shadow-emerald-100 dark:shadow-none"
                >
                  <Smartphone className="w-5 h-5" />
                  Instalar Aplicación
                </button>
              )}

              <div className="pt-6">
                <button className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
                  Comenzar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
