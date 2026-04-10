import { motion } from "motion/react";

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "Todas", label: "Todas" },
    { id: "Interior", label: "Interior" },
    { id: "Exterior", label: "Exterior" },
    { id: "Suculentas", label: "Suculentas" },
    { id: "Medicinales", label: "Medicinales" },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className="relative group"
        >
          <span
            className={`block px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${
              activeCategory === cat.id
                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-none"
                : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-900"
            }`}
          >
            {cat.label}
          </span>
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
