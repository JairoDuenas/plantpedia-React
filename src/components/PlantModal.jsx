import { motion, AnimatePresence } from "motion/react";
import { X, Droplets, Sun, Thermometer, MapPin, Sprout } from "lucide-react";

export const PlantModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-stone-50 dark:bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent md:hidden" />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">
                <Sprout className="w-4 h-4" />
                <span>{plant.family}</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-2">
                {plant.name}
              </h2>
              <p className="text-lg italic text-stone-500 dark:text-stone-400 font-serif">
                {plant.scientificName}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-3">
                  Sobre esta planta
                </h4>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {plant.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 mb-1">
                    <Droplets className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Riego
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {plant.care.water}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 mb-1">
                    <Sun className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Luz
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {plant.care.light}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 mb-1">
                    <Thermometer className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Temp
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {plant.care.temperature}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Origen
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {plant.origin}
                  </p>
                </div>
              </div>

              <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none">
                Añadir a mi Jardín
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
