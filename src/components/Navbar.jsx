import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-serif font-bold text-stone-900 tracking-tight">
              Fito<span className="text-emerald-600">Pedia</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              Enciclopedia
            </Link>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Guías de Cuidado
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Comunidad
            </a>
            <button className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
              Comenzar
            </button>
          </div>

          <div className="md:hidden">
            <Menu className="w-6 h-6 text-stone-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};
