import { BookOpen, Droplets, Sun, Thermometer } from "lucide-react";

const CareGuides = () => {
  const guides = [
    {
      title: "Riego para Principiantes",
      icon: Droplets,
      desc: "Aprende a identificar cuándo tus plantas realmente necesitan agua.",
    },
    {
      title: "Luz y Ubicación",
      icon: Sun,
      desc: "Guía completa sobre luz directa, indirecta y sombra.",
    },
    {
      title: "Control de Temperatura",
      icon: Thermometer,
      desc: "Cómo proteger tus plantas de las heladas y el calor extremo.",
    },
    {
      title: "Propagación 101",
      icon: BookOpen,
      desc: "Multiplica tus plantas favoritas de forma sencilla.",
    },
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-serif font-bold text-stone-900 dark:text-white mb-8">
        Guías de Cuidado
      </h1>
      <p className="text-xl text-stone-600 dark:text-stone-400 mb-12 max-w-2xl">
        Domina el arte de la jardinería con nuestras guías detalladas paso a
        paso.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, i) => (
          <div
            key={i}
            className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <guide.icon className="w-12 h-12 text-emerald-600 dark:text-emerald-500 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-4">
              {guide.title}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              {guide.desc}
            </p>
            <button className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline">
              Leer guía completa →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareGuides;
