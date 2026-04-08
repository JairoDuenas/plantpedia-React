import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { SearchBar } from "../components/SearchBar";
import { PlantCard } from "../components/PlantCard";
import { PlantModal } from "../components/PlantModal";
import { usePlants } from "../hooks/usePlants";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Leaf } from "lucide-react";

const Home = () => {
  const { plants, loading, error, search } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState(null);

  return (
    <>
      <Hero />

      <div className="relative z-10">
        <SearchBar onSearch={search} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">
              Colección de Especies
            </h2>
            <p className="text-stone-500">
              Datos botánicos curados de todo el mundo.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {["Todas", "Interior", "Exterior", "Suculentas", "Medicinales"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    cat === "Todas"
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
            <p className="text-stone-400 font-medium animate-pulse">
              Consultando los archivos botánicos...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => search("")}
              className="mt-4 text-emerald-600 font-bold hover:underline"
            >
              Reintentar
            </button>
          </div>
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

        {!loading && plants.length === 0 && (
          <div className="text-center py-32">
            <Leaf className="w-16 h-16 text-stone-200 mx-auto mb-4" />
            <p className="text-stone-400 font-medium">
              No se encontraron plantas que coincidan con tu búsqueda.
            </p>
          </div>
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
