import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "¿Estás lista para abrir tu regalo?",
  "¿Segura, segura?",
  "¿Muy segura de verdad?",
  "¿No te vas a arrepentir después?",
  "Esta es la última oportunidad para decir que no... ¿abrimos?",
];

const noReplies = [
  "Mentira, sí querés.",
  "JA, sabía que ibas a poner que no.",
  "Ok, lo dejamos para el 2047 entonces.",
  "No te hagas la difícil, Valerina Capuccina.",
  "Bueno, cuando digas que sí seguimos, señora ansiosa.",
];

export function DrawingGift({ onBack, imageUrl }) {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [noMessage, setNoMessage] = useState("");
  const [showFullImage, setShowFullImage] = useState(false);

  function handleYes() {
    setNoMessage("");
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setFinished(true);
    }
  }

  function handleNo() {
    const idx = Math.floor(Math.random() * noReplies.length);
    setNoMessage(noReplies[idx]);
  }

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      {/* header tipo Cinnamondario */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-1 text-white [text-shadow:2px_2px_0px_#8EC9FF]">
          Tu regalito
        </h1>
        <p className="text-xs text-white/90 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] max-w-xs mx-auto">
          Hecho a mano para vos, con mucho amor, pero antes... ¿Segura que queres verlo?
        </p>

        <button
          onClick={onBack}
          className="mt-3 inline-flex items-center rounded-full border border-white/70 bg-black/30 px-3 py-1 text-[11px] text-white/90 hover:bg-black/40"
        >
          ← Volver
        </button>
      </header>

      {/* tarjeta principal */}
      {!finished ? (
        <motion.div
          className="
            rounded-3xl border border-[#bcd9f5]
            bg-[#f8fbff]
            shadow-[0_0_0_3px_#e5f1ff_inset]
            px-6 py-5
          "
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="w-full flex justify-center mb-3">
            <img
              src="/cinna/deco-bows.png"
              className="h-6 opacity-90"
              alt=""
            />
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-sky-500 mb-1">
            Elegi una opción
          </p>

          <h2
            className="
              text-center text-sky-700 text-xl font-semibold mb-4
              [text-shadow:1px_1px_0px_#ffffff,2px_2px_0px_#d7eaff]
            "
          >
            {questions[step]}
          </h2>

          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={handleYes}
              className="
                w-full rounded-xl
                bg-[#dbefff]
                border border-[#b2d5f0]
                text-sky-700 font-medium
                py-2.5
                shadow-[0_2px_0_#b2d5f0]
                active:translate-y-1px active:shadow-none
              "
            >
              Sí
            </button>
            <button
              onClick={handleNo}
              className="
                w-full rounded-xl
                bg-white
                border border-[#d9e7f7]
                text-sky-500 text-sm
                py-2
                shadow-[0_2px_0_#d9e7f7]
                active:translate-y-1px active:shadow-none
              "
            >
              No
            </button>
          </div>

          {noMessage && (
            <p className="mt-3 text-center text-[11px] text-slate-700">
              {noMessage}
            </p>
          )}

          <div className="w-full flex justify-center mt-4 opacity-90">
            <img src="/cinna/deco-stars.png" className="h-5" alt="" />
          </div>
        </motion.div>
      ) : (
        // vista final: dibujo + carta
        <motion.div
          className="
            rounded-3xl border border-[#bcd9f5]
            bg-[#f8fbff]
            shadow-[0_0_0_3px_#e5f1ff_inset]
            px-6 py-5
          "
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="w-full flex justify-center mb-3">
            <img
              src="/cinna/deco-bows.png"
              className="h-6 opacity-90"
              alt=""
            />
          </div>

          {/* dibujo */}
          <div className="w-full flex flex-col items-center mb-3">
            <button
              onClick={() => setShowFullImage(true)}
              className="focus:outline-none"
            >
              <img
                src={imageUrl}
                alt="Dibujo para Vale"
                className="max-h-64 rounded-2xl border border-[#d9e7f7] shadow-md"
              />
            </button>
            <p className="mt-1 text-[10px] text-slate-600">
              Toca el dibujo para verlo en grande.
            </p>
          </div>

          {/* carta: cambiá este texto por el tuyo */}
          <p className="text-[14px] leading-snug text-slate-800 text-center whitespace-pre-line">
            {`¿Sabías que me encantan tus ojos? Bueno, seguro que si, porque a fin de cuentas te lo he dicho cientos de veces, ¿no?
            \n\nEs por eso que quise hacerte como segundo regalo, algo sencillo pero con mucho amor, incluyendo diferentes versiones de vos, para que siempre tengas un recuerdo de quien sos y en quién te estás convirtiendo.
            \nQuiero que nunca te olvides lo maravillosa que sos Valeria, que sos una mujer increible y que así como vos yo tambien estoy dispuesto a acompañarte toda la vida, creciendo juntos y construyendo una vida con vos.
            \nPorque te amo, y sos lo mas bello que me paso en la vida, así que no puedo esperar a que me des una hija con tus preciosos ojos, para que le demos todo nuestro amor.
            `}
          </p>

          {/* botón de descarga */}
          <div className="mt-4 flex justify-center">
            <a
              href={imageUrl}
              download
              className="
                inline-flex items-center justify-center
                rounded-xl
                bg-white
                border border-[#d9e7f7]
                text-sky-600 text-sm
                px-4 py-2
                shadow-[0_2px_0_#d9e7f7]
                active:translate-y-1px active:shadow-none
              "
            >
              Descargar
            </a>
          </div>

          <div className="w-full flex justify-center mt-4 opacity-90">
            <img src="/cinna/deco-stars.png" className="h-5" alt="" />
          </div>
        </motion.div>
      )}

      {/* MODAL para ver la imagen en grande */}
      <AnimatePresence>
        {showFullImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullImage(false)}
          >
            <motion.div
              className="relative max-w-[95vw] max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowFullImage(false)}
                className="absolute -top-3 -right-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
              >
                ✕
              </button>
              <img
                src={imageUrl}
                alt="Dibujo para Vale grande"
                className="max-h-[90vh] max-w-[95vw] rounded-3xl border border-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
