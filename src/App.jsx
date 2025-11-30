import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gifts } from "./data/gifts";
import { DayCard } from "./components/DayCard";

const STORAGE_KEY = "vale_advent_opened";

const layoutPositions = [
  // 1 – arriba a la izquierda
  "row-start-1 col-start-1",

  // 2 – arriba, ocupando columnas 2 y 3
  "row-start-1 col-start-2 col-span-2",

  // 3 – arriba, a la derecha
  "row-start-1 col-start-4",

  // 4 – columna 1, más alto (2 filas: filas 2 y 3)
  "row-start-2 col-start-1 row-span-2",

  // 5 – fila 2, columnas 2 y 3
  "row-start-2 col-start-2 col-span-2",

  // 6 – fila 2, columna 4
  "row-start-2 col-start-4",

  // 7 – fila 3, columna 2
  "row-start-3 col-start-2",

  // 8 – fila 3, columna 3
  "row-start-3 col-start-3",

  // 9 – columna 4, alto (filas 3, 4 y 5)
  "row-start-3 col-start-4 row-span-3",

  // 10 – fila 4, columna 1
  "row-start-4 col-start-1",

  // 11 – fila 4, columna 2
  "row-start-4 col-start-2",

  // 12 – fila 4, columna 3
  "row-start-4 col-start-3 row-span-2",

  "row-start-5 col-start-1 col-span-2",
];

function getTodayInfo() {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  return { month, date };
}

function isDayUnlocked(day) {
  const { month, date } = getTodayInfo();

  if (month < 11) return false;

  if (month === 11) {
    return date >= day;
  }

  return true;
}

function loadOpened() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOpened(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function App() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [openedDays, setOpenedDays] = useState([]);

  useEffect(() => {
    setOpenedDays(loadOpened());
  }, []);

  function handleDayClick(gift) {
    if (!isDayUnlocked(gift.day)) {
      alert("todavía no podés abrir este día, amor 🫣");
      return;
    }

    setSelectedGift(gift);

    if (!openedDays.includes(gift.day)) {
      const updated = [...openedDays, gift.day];
      setOpenedDays(updated);
      saveOpened(updated);
    }
  }

  function closeModal() {
    setSelectedGift(null);
  }

  function openGiftLink() {
    if (!selectedGift?.url) return;
    window.open(selectedGift.url, "_blank");
  }

  return (
    <div className="min-h-screen relative  text-sky-100 flex flex-col items-center px-4 py-6">
      {/* Header */}
      <header className="w-full max-w-md text-center mb-6 relative z-10">
        <h1 className="text-3xl font-bold mb-1 text-white [text-shadow:2px_2px_0px_#8EC9FF]">
          Cinnamondario de Adviento
        </h1>
        <p className="text-sm text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.25)]">
          Es nuestra primera navidad juntos, así que hagamosla memorable.
        </p>
      </header>

      <main className="w-full max-w-5xl relative z-10 grow">
        <div
          className="
      grid grid-cols-4
      auto-rows-[90px] md:auto-rows-[110px]
      gap-1.5 md:gap-2.5
      mt-6 md:mt-8
    "
        >
          {gifts.map((gift, index) => {
            const positionClass = layoutPositions[index];
            return (
              <DayCard
                key={gift.day}
                day={gift.day}
                unlocked={isDayUnlocked(gift.day)}
                opened={openedDays.includes(gift.day)}
                onClick={() => handleDayClick(gift)}
                imageUrl={gift.image}
                className={positionClass}
              />
            );
          })}
        </div>
      </main>
      {/* Footer chiquito */}
      <footer className="mt-6 text-xs text-sky-700/90 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] relative z-10">
        © {new Date().getFullYear()} Facundo White — All rights reserved.
      </footer>

      {/* Modal del regalo */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-sky-900/20 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
          relative mx-6 w-full max-w-sm
          rounded-3xl border border-[#bcd9f5]
          bg-[#f8fbff]
          shadow-[0_0_0_3px_#e5f1ff_inset]
          px-6 py-5
        "
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              {/* Botón cerrar simple */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-sky-400 hover:text-sky-600"
              >
                ✕
              </button>

              {/* Línea / moño decorativo arriba */}
              <div className="w-full flex justify-center mb-3">
                <img
                  src="/cinna/deco-bows.png"
                  className="h-6 opacity-90"
                  alt=""
                />
              </div>

              {/* Título estilo poster */}
              <h2
                className="
            text-center text-sky-700 text-2xl font-semibold mb-1
            [text-shadow:1px_1px_0px_#ffffff,2px_2px_0px_#d7eaff]
          "
              >
                Día #{selectedGift.day}
              </h2>

              {/* Mensaje */}
              <p className="text-center text-slate-700 text-[15px] leading-snug px-2">
                {selectedGift.message}
              </p>

              {/* Botones estilo papel */}
              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={openGiftLink}
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
                  Abrir regalo
                </button>

                <button
                  onClick={closeModal}
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
                  Ver más tarde
                </button>
              </div>

              {/* Decoración inferior estilo póster */}
              <div className="w-full flex justify-center mt-4 opacity-90">
                <img src="/cinna/deco-stars.png" className="h-5" alt="" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="snow"></div>
    </div>
  );
}

export default App;
