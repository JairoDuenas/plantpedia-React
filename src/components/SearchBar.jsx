import { useState } from "react";
import { Search } from "lucide-react";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-2xl mx-auto -mt-8 px-4"
    >
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca cualquier planta (ej. Monstera, Lavanda...)"
          className="w-full bg-white dark:bg-stone-900 border-none h-16 pl-14 pr-6 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400 group-focus-within:text-emerald-500 transition-colors" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
