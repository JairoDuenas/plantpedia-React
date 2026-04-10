import { motion } from "motion/react";
import { Sprout, ArrowDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 dark:bg-emerald-900/10 -skew-x-12 transform translate-x-1/2" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] mb-6"
          >
            <Sprout className="w-5 h-5" />
            <span>Descubre el Mundo Botánico</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif font-bold text-stone-900 dark:text-white leading-[0.9] mb-8"
          >
            La Enciclopedia <br />
            <span className="text-emerald-600 dark:text-emerald-500 italic">
              Viva de la Naturaleza.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-10 max-w-xl"
          >
            Explora miles de especies, aprende técnicas de cuidado profesional y
            transforma tu espacio en un santuario exuberante.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 dark:shadow-none">
              Explorar Especies
            </button>
            <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 text-sm font-medium">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>Desliza para buscar</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
