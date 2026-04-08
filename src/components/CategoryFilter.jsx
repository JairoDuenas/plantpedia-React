const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "Todas", label: "Todas" },
    { id: "Interior", label: "Interior" },
    { id: "Exterior", label: "Exterior" },
    { id: "Suculentas", label: "Suculentas" },
    { id: "Medicinales", label: "Medicinales" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
            activeCategory === cat.id
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
