import { motion } from "motion/react";
import { Droplets, Sun, ArrowRight } from "lucide-react";

export const PlantCard = ({ plant, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl dark:hover:shadow-emerald-900/10 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(plant)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
          {plant.family}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white mb-1">
            {plant.name}
          </h3>
          <p className="text-sm italic text-stone-500 dark:text-stone-400">
            {plant.scientificName}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1 text-stone-400 dark:text-stone-500">
            <Droplets className="w-4 h-4" />
            <span className="text-xs">{plant.care.water}</span>
          </div>
          <div className="flex items-center gap-1 text-stone-400 dark:text-stone-500">
            <Sun className="w-4 h-4" />
            <span className="text-xs">{plant.care.light}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-50 dark:border-stone-800">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
            Ver Detalles
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-500 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
