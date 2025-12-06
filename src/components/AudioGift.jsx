import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioGift({ onBack }) {
  const [step, setStep] = useState(0);

  const goNext = () => setStep((s) => s + 1);

  return (
    <div className="w-full max-w-lg mx-auto text-center text-sky-900 relative z-10">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-[#f8fbff] border border-[#bcd9f5] shadow-[0_0_0_3px_#e5f1ff_inset] rounded-3xl p-6"
          >
            <h2 className="text-2xl font-bold mb-3 text-sky-700 [text-shadow:1px_1px_0px_#ffffff,2px_2px_0px_#d7eaff]">
              Un mensaje desde quien me amó primero
            </h2>

            <p className="text-slate-700 leading-snug mb-5">
              Mi mamá no llegó a conocerte… pero si lo hubiera hecho,
              te hubiese querido con el corazón entero.
              <br/><br/>
              En su dia grabo dos audios
              Nunca los escuche, se para quien estan dirigidos
              Hoy esos audios son tuyos
            </p>

            <button
              onClick={goNext}
              className="mt-2 w-full rounded-xl bg-[#dbefff] border border-[#b2d5f0] text-sky-700 font-medium py-2.5 shadow-[0_2px_0_#b2d5f0] active:translate-y-1px"
            >
              Estoy lista
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="audio1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-[#f8fbff] border border-[#bcd9f5] shadow-[0_0_0_3px_#e5f1ff_inset] rounded-3xl p-6"
          >
            <h2 className="text-xl font-bold mb-3 text-sky-700 [text-shadow:1px_1px_0px_#ffffff]">
              Para la mujer que ame mi hijo
            </h2>

            <audio controls className="w-full my-4">
              <source src="/audios/mama-1.mp3" type="audio/mpeg" />
              Tu navegador no soporta este audio.
            </audio>

            <button
              onClick={goNext}
              className="mt-2 w-full rounded-xl bg-[#dbefff] border border-[#b2d5f0] text-sky-700 font-medium py-2.5 shadow-[0_2px_0_#b2d5f0]"
            >
              Siguiente
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="audio2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-[#f8fbff] border border-[#bcd9f5] shadow-[0_0_0_3px_#e5f1ff_inset] rounded-3xl p-6"
          >
            <h2 className="text-xl font-bold mb-3 text-sky-700 [text-shadow:1px_1px_0px_#ffffff]">
              Para nuestros hijos algún día
            </h2>

            <audio controls className="w-full my-4">
              <source src="/audios/mama-2.mp3" type="audio/mpeg" />
              Tu navegador no soporta este audio.
            </audio>

            <button
              onClick={goNext}
              className="mt-2 w-full rounded-xl bg-[#dbefff] border border-[#b2d5f0] text-sky-700 font-medium py-2.5 shadow-[0_2px_0_#b2d5f0]"
            >
              Siguiente
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="bg-[#f8fbff] border border-[#bcd9f5] shadow-[0_0_0_3px_#e5f1ff_inset] rounded-3xl p-7"
          >
            <p className="text-slate-700 leading-snug text-center mb-6">
              Mamá nunca llego a conocerte
              pero te habló desde su corazón intentando dejarte unas palabras.
              <br/><br/>
              Gracias por ser vos esa persona
              que ella tanto queria llegara a mi vida.
              <br/><br/>
              Si mi vieja te hubiese conocido,
              te adoptaba en dos semanas como si fueras su propia hija.
              <br/><br/>
              Gracias por quedarte,
              por ser vos,
              por ayudarme
              a seguir siendo yo.
            </p>

            <button
              onClick={onBack}
              className="mt-2 w-full rounded-xl bg-[#dbefff] border border-[#b2d5f0] text-sky-700 font-medium py-2.5 shadow-[0_2px_0_#b2d5f0]"
            >
              Volver
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
