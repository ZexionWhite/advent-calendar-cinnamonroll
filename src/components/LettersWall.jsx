import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letters } from "../data/letters";

export function LettersWall({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
      {/* Header simple de esta sección */}
      <header className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white [text-shadow:2px_2px_0px_#8EC9FF]">
          Cartitas para abrir cuando...
        </h2>
        <p className="text-xs text-white/90 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] max-w-md mx-auto mt-1">
          Usalas cuando lo sientas, cada una esta hecha con mucho amor.
        </p>

        <button
          onClick={onBack}
          className="mt-3 inline-flex items-center justify-center rounded-full border border-white/60 bg-black/20 px-3 py-1 text-[11px] text-white/90 hover:bg-black/30 transition"
        >
          ← Volver
        </button>
      </header>

      {/* Grilla de sobres */}
      <div
        className="
          grid w-full
          grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
          gap-3 sm:gap-4
          mt-2
        "
      >
        {letters.map((letter) => (
          <motion.button
            key={letter.id}
            onClick={() => setSelectedLetter(letter)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="
              group relative w-full
              rounded-2xl
              bg-[#f8fbff]/90
              border border-[#cddff7]
              shadow-[0_2px_0_#c6d7f3]
              px-2.5 pt-2 pb-2.5
              text-left
              overflow-hidden
            "
          >
            {/* Sobre ilustrado */}
            <div className="relative w-full aspect-4/3 mb-1.5">
              {/* cuerpo del sobre */}
              <div className="absolute inset-0 rounded-xl bg-[#fdfdff]" />

              {/* solapa superior */}
              <div
                className="
                  absolute inset-x-2 top-1 h-[55%]
                  rounded-t-xl
                  bg-[#e8f1ff]
                  border border-[#c8d8f4]
                  border-b-0
                "
              />

              {/* triangulito del cierre */}
              <div
                className="
                  absolute inset-x-3 bottom-6px h-[55%]
                  [clip-path:polygon(0_0,50%_100%,100%_0)]
                  bg-[#f6f8ff]
                  border-t border-[#c8d8f4]
                "
              />

              {/* corazón/cierre */}
              <div
                className="
                  absolute left-1/2 -translate-x-1/2
                  bottom-14px
                  h-4 w-4
                  rounded-full
                  bg-[#f8d7e5]
                  border border-[#e7b9ce]
                  flex items-center justify-center
                  text-[10px]
                  text-[#b2436d]
                "
              >
                ❤
              </div>
            </div>

            {/* texto debajo del sobre */}
            <p className="text-[11px] font-semibold text-sky-700 leading-tight line-clamp-2">
              Abrí cuando {letter.label}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-600/90 line-clamp-2">
              {letter.short}
            </p>

            {/* glow suave al hover */}
            <div
              className="
                pointer-events-none
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition
                bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_55%)]
              "
            />
          </motion.button>
        ))}
      </div>

      {/* MODAL: sobre abierto */}
      <AnimatePresence>
  {selectedLetter && (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-sky-900/35 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative mx-6 w-full max-w-md rounded-3xl bg-transparent"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        {/* botón cerrar */}
        <button
          onClick={() => setSelectedLetter(null)}
          className="absolute -top-1 right-1 z-10 rounded-full bg-black/30 px-2 py-1 text-xs text-white hover:bg-black/50"
        >
          ✕
        </button>

        {/* SOBRE ABIERTO */}
        <div className="relative w-full flex justify-center">
          {/* parte de atrás del sobre */}
          <div
            className="
              mx-auto
              w-[90%]
              rounded-3xl
              bg-[#e8f1ff]
              border border-[#c7d7f3]
              shadow-[0_4px_0_#c1d1ed]
              pt-10 pb-6
            "
          >
            {/* solapa abierta */}
            <div
              className="
                absolute left-1/2 top-0
                h-20 w-[78%]
                -translate-x-1/2
                -translate-y-8
                [clip-path:polygon(50%_0,0_100%,100%_100%)]
                bg-[#f6f8ff]
                border-t border-x border-[#c7d7f3]
              "
            />

            {/* hoja de carta */}
            <div
              className="
                mx-auto
                w-[82%]
                rounded-2xl
                bg-[#fdfdfd]
                border border-[#e3e6f2]
                px-4 py-3
                max-h-[230px]
                overflow-y-auto
              "
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-sky-500 mb-2">
                Para cuando {selectedLetter.label}
              </p>
              <p className="text-[14px] leading-snug text-slate-800 whitespace-pre-line">
                {selectedLetter.content}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
