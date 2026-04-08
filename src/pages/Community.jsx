import { Users, MessageSquare, Share2 } from "lucide-react";

const Community = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-serif font-bold text-stone-900 dark:text-white mb-8">
        Comunidad FitoPedia
      </h1>
      <div className="bg-emerald-900 dark:bg-emerald-950 rounded-[3rem] p-12 text-white text-center">
        <Users className="w-20 h-20 mx-auto mb-8 text-emerald-400 dark:text-emerald-500" />
        <h2 className="text-4xl font-serif font-bold mb-6">
          Conecta con otros amantes de las plantas
        </h2>
        <p className="text-emerald-100 dark:text-emerald-200 text-xl max-w-2xl mx-auto mb-10">
          Únete a miles de entusiastas, comparte fotos de tu jardín y resuelve
          tus dudas con expertos botánicos.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-white dark:bg-stone-100 text-emerald-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 dark:hover:bg-white transition-colors">
            Unirse al Foro
          </button>
          <button className="bg-emerald-800 dark:bg-emerald-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors">
            Ver Galería
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
