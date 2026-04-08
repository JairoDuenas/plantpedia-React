import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, X, Sun, Moon, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors ${isActive ? "text-emerald-600 font-bold" : "text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400"}`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold" : "text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
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
              Enciclopedia
            </NavLink>
            <NavLink to="/guias" className={navLinkClass}>
              Guías de Cuidado
            </NavLink>
            <NavLink to="/comunidad" className={navLinkClass}>
              Comunidad
            </NavLink>

            <div className="flex items-center gap-4 border-l border-stone-200 dark:border-stone-800 pl-8">
              {showInstallBtn && (
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-2 rounded-full transition-colors font-bold"
                >
                  <Download className="w-4 h-4" />
                  <span>Instalar</span>
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
              <button className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 dark:shadow-none">
                Comenzar
              </button>
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="p-2 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                aria-label="Install app"
              >
                <Download className="w-5 h-5" />
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
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
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
              <div className="pt-4">
                <button className="w-full bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 dark:shadow-none">
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
