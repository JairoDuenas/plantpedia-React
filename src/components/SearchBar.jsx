import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-2xl mx-auto -mt-8 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca cualquier planta (ej. Monstera, Lavanda...)"
          className="w-full bg-white dark:bg-stone-900 border-none h-16 pl-14 pr-24 rounded-2xl shadow-2xl shadow-stone-200/50 dark:shadow-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-lg"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400 group-focus-within:text-emerald-500 transition-colors" />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={clearSearch}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95"
          >
            Buscar
          </button>
        </div>
      </motion.div>
    </form>
  );
};
