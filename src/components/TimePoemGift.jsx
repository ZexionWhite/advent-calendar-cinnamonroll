import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// Equivalentes de 1 año
const STATS = [
  { id: "years", singular: "Año", plural: "Años", value: 1 },
  { id: "months", singular: "Mes", plural: "Meses", value: 12 },
  { id: "weeks", singular: "Semana", plural: "Semanas", value: 52 },
  { id: "days", singular: "Día", plural: "Días", value: 365 },
  { id: "hours", singular: "Hora", plural: "Horas", value: 8760 },
  { id: "minutes", singular: "Minuto", plural: "Minutos", value: 525600 },
  { id: "seconds", singular: "Segundo", plural: "Segundos", value: 31536000 },
];

const ANIMATION_DURATION = 2000; // ms por barra

// Poema dividido en líneas / párrafos para animar de a poco
const POEM_LINES = [
  "Aunque yo creo que no es suficiente, porque para mí este año no fueron solo 365 días más, fueron 365 días de tus risas, tus enojos tiernos, tus sueños, tus alegrías, tus berrinches, tus miedos, tus besos, tus orgasmos, tu calor, tu compañía.",
  "Fueron 12 meses de amarnos, de sentirnos, de pensarnos, de arriesgarnos, de afrontar miedos, de crecer y de aprender, pero sobre todo de complementarnos.",
  "Porque ¿qué son 52 semanas cuando nuestras madrugadas han roto con la distancia, haciendo de esta poco más que un chiste? Donde nuestras mañanas se han adornado de tus besos, donde nuestras tardes se acompañan de risas cómplices luego de soltar alguna barbaridad.",
  "Porque sí, un año tiene millones de segundos, pero ¿sabés una cosa? Los mejores son los que compartí con vos, todos aquellos que me regalaste sin darte cuenta, todos esos pequeños segundos que hicieron que lo demás no importase y esto valiera la pena.",
  "Los minutos y las horas se van, pero para lo que siento, para lo que sentís, no hay unidad de tiempo que lo pueda definir. Porque si algo aprendimos este año es que definir es limitar, y nuestro amor no tiene límites: es simplemente atemporal. Ya que no me alcanzarían vidas suficientes para dedicarte todo mi amor.",
  "Solo mirá todo lo que nos queda aún por disfrutar: todas las metas por cumplir, lugares a donde ir, abrazos, besos, caricias que darnos, orgasmos que causarnos y, por sobre todo...",
  "Queda toda una vida para nosotros.",
  "Así que gracias por este año a mi lado, gracias por existir en el mío, y espero que siempre mi corazón esté lleno de vos, y más pronto que tarde, de nuestra propia familia.",
];

export function TimePoemGift({ onBack }) {
  const [progresses, setProgresses] = useState(STATS.map(() => 0)); // 0..1
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRevealButton, setShowRevealButton] = useState(false);
  const [showPoem, setShowPoem] = useState(false);

  const startSoundRef = useRef(null);
  const completeSoundRef = useRef(null);
  const finalSoundRef = useRef(null);

  // Animación secuencial de barras
  useEffect(() => {
    if (currentIndex >= STATS.length) {
      // cuando termina la última barra mostramos el botón para ver el poema
      setShowRevealButton(true);
      return;
    }

    const startTime = performance.now();
    let frameId;

    // sonido de inicio
    if (startSoundRef.current) {
      startSoundRef.current.currentTime = 0;
      startSoundRef.current.play().catch(() => {});
    }

    const animate = (now) => {
      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / ANIMATION_DURATION);
      // easing suave
      const t = rawT * rawT * (3 - 2 * rawT);

      setProgresses((prev) => {
        const copy = [...prev];
        copy[currentIndex] = t;
        return copy;
      });

      if (rawT < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // barra terminada
        if (currentIndex === STATS.length - 1) {
          if (finalSoundRef.current) {
            finalSoundRef.current.currentTime = 0;
            finalSoundRef.current.play().catch(() => {});
          }
        } else if (completeSoundRef.current) {
          completeSoundRef.current.currentTime = 0;
          completeSoundRef.current.play().catch(() => {});
        }

        setCurrentIndex((i) => i + 1);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [currentIndex]);

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      {/* Header tipo Cinnamondario */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-1 text-white [text-shadow:2px_2px_0px_#8EC9FF]">
          Nuestro tiempo juntos
        </h1>
        <p className="text-xs text-white/90 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] max-w-xs mx-auto">
          El año ya va a terminar, pero quisiera que te tomaras un momento para pensar en cuánto dura realmente un año.
        </p>

        <button
          onClick={onBack}
          className="mt-3 inline-flex items-center rounded-full border border-white/70 bg-black/30 px-3 py-1 text-[11px] text-white/90 hover:bg-black/40"
        >
          ← Volver
        </button>
      </header>

      {/* Tarjeta */}
      <motion.div
        className="rounded-3xl border border-[#bcd9f5] bg-[#f8fbff] shadow-[0_0_0_3px_#e5f1ff_inset] px-6 py-5"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <div className="w-full flex justify-center mb-3">
          <img src="/cinna/deco-bows.png" className="h-6 opacity-90" alt="" />
        </div>

        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-sky-500 mb-3">
          Porque todo este tiempo equivale a
        </p>

        {/* BARRAS */}
        <div className="space-y-5">
          {STATS.map((stat, index) => {
            const p = progresses[index];
            const currentValue = Math.round(p * stat.value);
            const done = p >= 0.999;

            const label = currentValue === 1 ? stat.singular : stat.plural;

            return (
              <div key={stat.id} className="relative">
                {/* barra de fondo */}
                <div className="h-3 rounded-full bg-[#e3f0ff]">
                  {/* barra de progreso */}
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#9fd6ff] via-[#bfe0ff] to-[#f7cfff]"
                    style={{ width: `${p * 100}%` }}
                  />
                </div>

                {/* numerito + label al costado de la barra, moviéndose con ella */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 flex items-center"
                  style={{
                    left:
                      p < 0.1
                        ? "0%"
                        : p > 0.9
                        ? "100%"
                        : `${p * 100}%`,
                    transform:
                      p < 0.1
                        ? "translate(0, -50%)"
                        : p > 0.9
                        ? "translate(-100%, -50%)"
                        : "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className={`px-2 py-2px rounded-full bg-white border border-[#cfe1ff] text-[10px] text-sky-700 shadow-[0_1px_0_#d1e3ff] whitespace-nowrap ${
                      done ? "" : "opacity-95"
                    }`}
                    initial={false}
                    animate={
                      done
                        ? { scale: [1, 1.18, 1] } // mini pop al completar
                        : { scale: 1 }
                    }
                    transition={
                      done
                        ? { duration: 0.3, ease: "easeOut" }
                        : { duration: 0 }
                    }
                  >
                    {currentValue.toLocaleString("es-AR")} {label}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje / “loading” mientras carga */}
        {!showRevealButton && !showPoem && (
  <div className="mt-4 text-[14px] flex justify-center items-center gap-1">
    
    {/* TEXTO ESTILO POP-KAWAII */}
    <span
      className="
        font-semibold
        bg-linear-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent
        drop-shadow-[0_0_2px_#ffffffdd]
        [text-shadow:
          0px_0px_2px_#ffffff,
          0px_0px_6px_#8ec9ff,
          0px_0px_12px_#8ec9ff]
      "
    >
      Calculando todo lo que vivimos este año
    </span>

    {/* PUNTITOS CON EL MISMO ESTILO */}
    <motion.span
      className="
        inline-block font-semibold
        bg-linear-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent
        drop-shadow-[0_0_2px_#ffffffdd]
        [text-shadow:
          0px_0px_2px_#ffffff,
          0px_0px_6px_#8ec9ff,
          0px_0px_12px_#8ec9ff]
      "
      animate={{ y: [0, -2, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 0.5,
      }}
    >
      .
    </motion.span>

    <motion.span
      className="
        inline-block font-semibold
        bg-linear-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent
        drop-shadow-[0_0_2px_#ffffffdd]
        [text-shadow:
          0px_0px_2px_#ffffff,
          0px_0px_6px_#8ec9ff,
          0px_0px_12px_#8ec9ff]
      "
      animate={{ y: [0, -2, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 0.5,
        delay: 0.15,
      }}
    >
      .
    </motion.span>

    <motion.span
      className="
        inline-block font-semibold
        bg-linear-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent
        drop-shadow-[0_0_2px_#ffffffdd]
        [text-shadow:
          0px_0px_2px_#ffffff,
          0px_0px_6px_#8ec9ff,
          0px_0px_12px_#8ec9ff]
      "
      animate={{ y: [0, -2, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 0.5,
        delay: 0.3,
      }}
    >
      .
    </motion.span>
  </div>
)}




        {/* Botón para revelar el poema */}
        {showRevealButton && !showPoem && (
          <div className="mt-5 flex justify-center">
            <motion.button
              onClick={() => {
                // pequeño fade-out del botón antes de mostrar el poema
                setShowRevealButton(false);
                setTimeout(() => setShowPoem(true), 250);
              }}
              className="
                rounded-full px-4 py-2 text-[12px] font-medium
                bg-[#dbefff] border border-[#b2d5f0]
                text-sky-700 shadow-[0_2px_0_#b2d5f0]
                active:translate-y-1px active:shadow-none
              "
              whileTap={{ scale: 0.96 }}
            >
              ¿Estás lista para descubrir tu regalo?
            </motion.button>
          </div>
        )}

        {/* Poema */}
        <AnimatePresence>
          {showPoem && (
            <motion.div
              className="mt-5 border-t border-[#dbe7f9] pt-4"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 0.61, 0.36, 1], // bien smooth
              }}
            >
              <p className="text-center text-[11px] uppercase tracking-[0.16em] text-sky-500 mb-3">
                Y es que visto así, es mucho tiempo, ¿no?
              </p>

              <div className="space-y-3 text-[14px] leading-snug text-slate-800 text-center">
                {POEM_LINES.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + idx * 0.6, // más pausado, va entrando línea por línea
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex justify-center mt-4 opacity-90">
          <img src="/cinna/deco-stars.png" className="h-5" alt="" />
        </div>
      </motion.div>

      {/* sonidos (opcionales) */}
      <audio ref={startSoundRef} src="/sounds/bar-start.mp3" />
      <audio ref={completeSoundRef} src="/sounds/bar-complete.mp3" />
      <audio ref={finalSoundRef} src="/sounds/bar-final.mp3" />
    </div>
  );
}
