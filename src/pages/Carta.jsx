import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { menuCategories } from "../data/menu";
import { menuImages } from "../data/menuImages";

const categoryIcons = {
  desayunos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  sandwiches: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 11h18M3 11c0-4 4-8 9-8s9 4 9 8M3 11v1c0 1 .5 2 2 2h14c1.5 0 2-1 2-2v-1" /><path d="M5 14v2a3 3 0 003 3h8a3 3 0 003-3v-2" />
    </svg>
  ),
  hamburguesas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 15h16a1 1 0 011 1v0a3 3 0 01-3 3H6a3 3 0 01-3-3v0a1 1 0 011-1zM4 9h16" /><path d="M3 12h18" /><path d="M12 2C8 2 3 5 3 9h18c0-4-5-7-9-7z" />
    </svg>
  ),
  platos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 3v0M12 21v0" />
    </svg>
  ),
  variedades: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  ensaladas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M7 21h10" /><path d="M12 21V11" /><path d="M12 11C12 5 7 3 4 3c0 5 3 8 8 8z" /><path d="M12 11c0-6 5-8 8-8 0 5-3 8-8 8z" />
    </svg>
  ),
  jugos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 2h8l-1 14a2 2 0 01-2 2h-2a2 2 0 01-2-2L8 2z" /><path d="M7 2h10" /><path d="M12 18v3M8 21h8" />
    </svg>
  ),
  helados: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22l-4-12h8l-4 12z" /><circle cx="12" cy="7" r="4" /><path d="M8.5 8.5A4 4 0 0112 3a4 4 0 013.5 5.5" />
    </svg>
  ),
  cafes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 8h1a4 4 0 010 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><path d="M6 2s1 2 4 2 4-2 4-2" />
    </svg>
  ),
  postres: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 19h8a4 4 0 004-4v0H4v0a4 4 0 004 4z" /><path d="M4 15s0-6 8-6 8 6 8 6" /><path d="M12 3v6M10 5l2-2 2 2" />
    </svg>
  ),
  bebidas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M6 2l1 16a2 2 0 002 2h6a2 2 0 002-2l1-16" /><path d="M5 2h14" /><path d="M9 10h6" />
    </svg>
  ),
  cocktails: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 22h8M12 22v-7M4 3h16l-5 7.5V15a3 3 0 01-6 0V10.5L4 3z" /><path d="M16 5l2-2" />
    </svg>
  ),
};

function CategoryGrid({ onSelect }) {
  return (
    <section className="bg-cream py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brown/40 text-center mb-5">
          Explora nuestras categorias
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 lg:gap-3">
          {menuCategories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center gap-2 bg-beige rounded-xl border border-line/30 py-4 px-2 active:scale-95 transition-transform duration-150"
            >
              <div className="w-10 h-10 rounded-full bg-blue/8 text-blue flex items-center justify-center group-active:bg-blue/15 transition-colors">
                {categoryIcons[cat.id]}
              </div>
              <span className="font-body text-[11px] font-semibold text-brown/70 text-center leading-tight">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuItem({ item, index, altCard, onShowPhoto }) {
  const hasPhoto = !!menuImages[item.name];

  return (
    <div
      className={`group rounded-xl border border-line/30 px-4 py-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-fade-up ${altCard ? "bg-beige" : "bg-cream"} ${hasPhoto ? "cursor-pointer" : ""}`}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
      onClick={hasPhoto ? () => onShowPhoto(item) : undefined}
    >
      <div className="flex items-baseline gap-2">
        {hasPhoto && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue/40 shrink-0 translate-y-[1px]">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
          </svg>
        )}
        <span className="font-body text-sm font-semibold text-brown shrink-0">
          {item.name}
        </span>
        <span className="flex-1 border-b border-dotted border-brown/15 translate-y-[-3px] min-w-4" />
        <span className="font-body text-sm font-bold text-blue shrink-0 tabular-nums">
          S/{item.price.toFixed(2)}
        </span>
      </div>
      {item.description && (
        <p className="font-body text-xs text-brown/45 mt-1.5 leading-relaxed group-hover:text-brown/60 transition-colors">
          {item.description}
        </p>
      )}
    </div>
  );
}

function PhotoModal({ item, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-cream rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-square">
          <img
            src={menuImages[item.name]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brown/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-brown/60 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-heading text-xl text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {item.name}
            </h3>
            {item.description && (
              <p className="font-body text-sm text-cream/70 mt-1">{item.description}</p>
            )}
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <span className="font-body text-lg font-bold text-blue tabular-nums">
            S/{item.price.toFixed(2)}
          </span>
          <a
            href="#pide-aqui"
            onClick={onClose}
            className="bg-blue text-white font-body text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full hover:bg-blue/90 transition-colors"
          >
            Pedir
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CategorySection({ category, index, onShowPhoto }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      id={category.id}
      className={`scroll-mt-32 lg:scroll-mt-48 py-12 lg:py-16 ${isEven ? "bg-beige" : "bg-cream"}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-0.5 bg-blue rounded-full" />
            <h2 className="font-heading text-2xl md:text-3xl text-brown">
              {category.name}
            </h2>
          </div>
          {category.subtitle && (
            <p className="font-body text-sm text-brown/50 ml-11">{category.subtitle}</p>
          )}
          {category.note && (
            <p className="font-body text-xs text-brown/40 italic ml-11 mt-1">{category.note}</p>
          )}
        </motion.div>

        <div className="space-y-10">
          {category.subcategories.map((sub) => (
            <div key={sub.name}>
              {(category.subcategories.length > 1 || sub.name !== category.name) && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-px bg-brown/20" />
                  <h3 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brown/50">
                    {sub.name}
                  </h3>
                  <div className="flex-1 h-px bg-brown/8" />
                  {sub.note && (
                    <span className="font-body text-[10px] text-brown/30 italic shrink-0">{sub.note}</span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sub.items.map((item, i) => (
                  <MenuItem key={item.name} item={item} index={i} altCard={!isEven} onShowPhoto={onShowPhoto} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SearchResults({ query, onShowPhoto }) {
  const normalized = query.toLowerCase().trim();
  const results = [];

  for (const cat of menuCategories) {
    for (const sub of cat.subcategories) {
      for (const item of sub.items) {
        if (item.name.toLowerCase().includes(normalized)) {
          results.push({ ...item, category: cat.name, subcategory: sub.name });
        }
      }
    }
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-16 h-16 rounded-full bg-brown/5 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-brown/30">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-heading text-lg text-brown/60 mb-1">Sin resultados</p>
        <p className="font-body text-brown/40 text-sm">
          No encontramos platos con &ldquo;{query.trim()}&rdquo;
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <p className="font-body text-xs text-brown/40 mb-4">
        {results.length} {results.length === 1 ? "resultado" : "resultados"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {results.map((item, i) => (
          <div
            key={`${item.category}-${item.name}-${i}`}
            className={`group bg-cream rounded-xl border border-line/30 px-4 py-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-fade-up ${menuImages[item.name] ? "cursor-pointer" : ""}`}
            style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
            onClick={menuImages[item.name] ? () => onShowPhoto(item) : undefined}
          >
            <div className="flex items-baseline gap-2">
              {menuImages[item.name] && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue/40 shrink-0 translate-y-[1px]">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                </svg>
              )}
              <span className="font-body text-sm font-semibold text-brown shrink-0">
                {item.name}
              </span>
              <span className="flex-1 border-b border-dotted border-brown/15 translate-y-[-3px] min-w-4" />
              <span className="font-body text-sm font-bold text-blue shrink-0 tabular-nums">
                S/{item.price.toFixed(2)}
              </span>
            </div>
            <p className="font-body text-[10px] font-medium uppercase tracking-wider text-blue/40 mt-1">
              {item.category} &middot; {item.subcategory}
            </p>
            {item.description && (
              <p className="font-body text-xs text-brown/45 mt-1 leading-relaxed group-hover:text-brown/60 transition-colors">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const sectionPhotos = [
  null,
  null,
  { src: "/images/favorites/lomo-saltado.jpg", alt: "Lomo saltado de El Piombino" },
  null,
  { src: "/images/favorites/sandwich.jpg", alt: "Sandwich artesanal" },
  null,
  { src: "/images/favorites/cafe.jpg", alt: "Cafe de especialidad" },
  null,
  { src: "/images/favorites/tiramisu.jpg", alt: "Tiramisu de El Piombino" },
  null,
  { src: "/images/favorites/cheesecake.jpg", alt: "Cheesecake de El Piombino" },
  null,
];

function PhotoBreak({ photo }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-48 md:h-64 lg:h-80 overflow-hidden"
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-brown/20" />
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="w-12 h-px bg-line/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-blue/25" />
      <div className="w-12 h-px bg-line/50" />
    </div>
  );
}

export default function Carta() {
  const [search, setSearch] = useState("");
  const [photoItem, setPhotoItem] = useState(null);

  const scrollToCategory = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isSearching = search.trim().length > 0;

  return (
    <>
      <section className="bg-brown pt-32 pb-16 relative overflow-hidden">
        <img
          src="/images/hero/hero-2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-brown/70 md:hidden" />
        <div className="absolute inset-0 opacity-[0.03] hidden md:block" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-cream/50"
          >
            Nuestra oferta
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Carta
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-0.5 bg-blue mx-auto mt-5 rounded-full"
          />
        </div>
      </section>

      <CategoryGrid onSelect={scrollToCategory} />

      <div className="sticky top-20 lg:top-24 z-40 bg-cream/90 backdrop-blur-lg border-b border-line/60 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown/40"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en la carta..."
              className="w-full bg-beige/70 border border-line/50 rounded-xl pl-10 pr-10 py-2.5 text-brown text-sm font-body placeholder:text-brown/30 focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue focus:bg-beige transition-all duration-200"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <div>
        {isSearching ? (
          <section className="bg-beige py-12 lg:py-16">
            <div className="max-w-5xl mx-auto px-4">
              <SearchResults query={search} onShowPhoto={setPhotoItem} />
            </div>
          </section>
        ) : (
          menuCategories.map((category, i) => (
            <div key={category.id}>
              {i > 0 && (sectionPhotos[i] ? <PhotoBreak photo={sectionPhotos[i]} /> : <SectionDivider />)}
              <CategorySection category={category} index={i} onShowPhoto={setPhotoItem} />
            </div>
          ))
        )}

        <section className="bg-beige py-8">
          <div className="text-center">
            <a
              href="/carta.pdf"
              download
              className="inline-flex items-center gap-2.5 border border-brown/15 text-brown/60 font-body text-xs font-semibold uppercase tracking-wider px-7 py-2.5 rounded-full hover:bg-cream hover:text-brown hover:border-line hover:shadow-sm transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Descargar carta en PDF
            </a>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {photoItem && (
          <PhotoModal item={photoItem} onClose={() => setPhotoItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
