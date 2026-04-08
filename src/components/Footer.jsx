import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-400 dark:text-stone-500 py-20 border-t border-stone-800 dark:border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Fito<span className="text-emerald-500">Pedia</span>
              </span>
            </div>
            <p className="max-w-sm leading-relaxed">
              Empoderando a los amantes de las plantas con conocimiento botánico
              preciso impulsado por IA. Únete a nuestra misión de verdecer el
              mundo, hoja por hoja.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Recursos
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Base de Datos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Guías de Cuidado
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Glosario Botánico
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Compañía
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 dark:border-stone-900 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © 2026 FitoPedia Enciclopedia Botánica. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
