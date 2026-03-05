import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import { favorites } from "../data/favorites";

function FavoriteCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-line cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">
            {item.category}
          </span>
          <h3 className="font-heading text-lg text-white mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">{item.name}</h3>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-20 z-20 bg-white rounded-xl shadow-xl border border-line/40 overflow-hidden min-w-[160px]"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href="#pide-aqui"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 font-body text-sm text-brown hover:bg-beige transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue shrink-0">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              Pedir online
            </a>
            <div className="h-px bg-line/30" />
            <Link
              to="/carta"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 font-body text-sm text-brown hover:bg-beige transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue shrink-0">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              Ver en carta
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Favorites() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-brown/50">
            Nuestros favoritos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-brown mt-3">
            Lo que nos hace especiales
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {favorites.map((item, idx) => (
            <FavoriteCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
