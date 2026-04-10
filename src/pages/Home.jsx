import { useState } from "react";
import { Hero } from "../components/Hero";
import { SearchBar } from "../components/SearchBar";
import { PlantCard } from "../components/PlantCard";
import { PlantModal } from "../components/PlantModal";
import CategoryFilter from "../components/CategoryFilter";
import { Skeleton } from "../components/Skeleton";
import { usePlants } from "../hooks/usePlants";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, AlertCircle, RefreshCw } from "lucide-react";

const Home = () => {
  const { plants, loading, error, search } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Todas");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    const filterMap = {
      Todas: { query: "", filters: {} },
      Interior: { query: "", filters: { indoor: 1 } },
      Exterior: { query: "", filters: { indoor: 0 } },
      Suculentas: { query: "succulent", filters: {} },
      Medicinales: { query: "medicinal", filters: { edible: 1 } },
    };

    const { query, filters } = filterMap[category] || filterMap["Todas"];
    search(query, filters);
  };

  const handleSearch = (query) => {
    setActiveCategory("Todas");
    search(query);
  };

  return (
    <>
      <Hero />

      <div className="relative z-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-2">
              Colección de Especies
            </h2>
            <p className="text-stone-500 dark:text-stone-400">
              Datos botánicos curados de todo el mundo.
            </p>
          </motion.div>

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 p-6"
              >
                <Skeleton className="aspect-[4/3] w-full mb-6" />
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <div className="flex gap-4 mb-6">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-2">
              No pudimos conectar con el herbario
            </h3>
            <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-md">
              {error}. Por favor, verifica tu conexión o intenta de nuevo en
              unos momentos.
            </p>
            <button
              onClick={() => search("")}
              className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Reintentar</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onClick={setSelectedPlant}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && plants.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-24 h-24 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-12 h-12 text-stone-300 dark:text-stone-700" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-2">
              Sin hallazgos botánicos
            </h3>
            <p className="text-stone-500 dark:text-stone-400 mb-8">
              No encontramos plantas que coincidan con "
              {activeCategory === "Todas" ? "tu búsqueda" : activeCategory}".
            </p>
            <button
              onClick={() => handleCategoryChange("Todas")}
              className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline"
            >
              Ver todas las especies
            </button>
          </motion.div>
        )}
      </section>

      <PlantModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
    </>
  );
};

export default Home;
