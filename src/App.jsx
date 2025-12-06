import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gifts } from "./data/gifts";
import { DayCard } from "./components/DayCard";
import { LettersWall } from "./components/LettersWall";
import { DrawingGift } from "./components/DrawingGift";
import { TimePoemGift } from "./components/TimePoemGift";
import { AudioGift } from "./components/AudioGift"; // 👈 NUEVO

const STORAGE_KEY = "vale_advent_opened";

const layoutPositions = [
  "row-start-1 col-start-1",
  "row-start-1 col-start-2 col-span-2",
  "row-start-1 col-start-4",
  "row-start-2 col-start-1 row-span-2",
  "row-start-2 col-start-2 col-span-2",
  "row-start-2 col-start-4",
  "row-start-3 col-start-2",
  "row-start-3 col-start-3",
  "row-start-3 col-start-4 row-span-3",
  "row-start-4 col-start-1",
  "row-start-4 col-start-2",
  "row-start-4 col-start-3 row-span-2",
  "row-start-5 col-start-1 col-span-2",
];

function getTodayInfo() {
  const now = new Date();
  return { month: now.getMonth(), date: now.getDate() };
}

function isDayUnlocked(day) {
  const { month, date } = getTodayInfo();
  // if (month < 11) return false;
  // if (month === 11) return date >= day;
  return true;
}

function loadOpened() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
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
  const [view, setView] = useState("calendar");
  // opciones: "calendar" | "letters" | "drawing" | "poem" | "audio" 👈 NUEVA

  useEffect(() => {
    setOpenedDays(loadOpened());
  }, []);

  function handleDayClick(gift) {
    if (!isDayUnlocked(gift.day)) {
      alert("No seas ansiosa, que todavía no podés abrir ese. 😠✨");
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

    if (selectedGift.url === "internal:letters") {
      setSelectedGift(null);
      setView("letters");
      return;
    }

    if (selectedGift.url === "internal:drawing") {
      setSelectedGift(null);
      setView("drawing");
      return;
    }

    if (selectedGift.url === "internal:poem") {
      setSelectedGift(null);
      setView("poem");
      return;
    }

    if (selectedGift.url === "internal:audio") {
      setSelectedGift(null);
      setView("audio");
      return;
    }

    window.open(selectedGift.url, "_blank");
  }

  return (
    <div className="min-h-screen relative text-sky-100 flex flex-col items-center px-4 py-6">
      <div className="snow" />

      {/* CALENDARIO */}
      {view === "calendar" && (
        <>
          <header className="w-full max-w-md text-center mb-6 relative z-10">
            <h1 className="text-3xl font-bold mb-1 text-white [text-shadow:2px_2px_0px_#8EC9FF]">
              Cinnamondario de Adviento
            </h1>
            <p className="text-sm text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.25)]">
              Es nuestra primera navidad juntos, así que hagámosla memorable.
            </p>
          </header>

          <main className="w-full max-w-5xl relative z-10 grow">
            <div className="grid grid-cols-4 auto-rows-[90px] md:auto-rows-[110px] gap-1.5 md:gap-2.5 mt-6 md:mt-8">
              {gifts.map((gift, index) => (
                <DayCard
                  key={gift.day}
                  day={gift.day}
                  unlocked={isDayUnlocked(gift.day)}
                  opened={openedDays.includes(gift.day)}
                  onClick={() => handleDayClick(gift)}
                  imageUrl={gift.image}
                  className={layoutPositions[index]}
                />
              ))}
            </div>
          </main>
        </>
      )}

      {/* VISTAS INTERNAS */}
      {view === "letters" && (
        <main className="w-full max-w-5xl grow relative z-10">
          <LettersWall onBack={() => setView("calendar")} />
        </main>
      )}

      {view === "drawing" && (
        <main className="w-full max-w-5xl grow relative z-10 flex justify-center mt-4">
          <DrawingGift onBack={() => setView("calendar")} />
        </main>
      )}

      {view === "poem" && (
        <main className="w-full max-w-5xl grow relative z-10 flex justify-center mt-4">
          <TimePoemGift onBack={() => setView("calendar")} />
        </main>
      )}

      {view === "audio" && (
        <main className="w-full max-w-5xl grow relative z-10 flex justify-center mt-4">
          <AudioGift onBack={() => setView("calendar")} />
        </main>
      )}

      {/* FOOTER */}
      <footer className="mt-6 text-xs text-sky-700/90 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] relative z-10">
        © {new Date().getFullYear()} Facundo White — All rights reserved.
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {view === "calendar" && selectedGift && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-sky-900/20 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative mx-6 w-full max-w-sm rounded-3xl border border-[#bcd9f5] bg-[#f8fbff] shadow-[0_0_0_3px_#e5f1ff_inset] px-6 py-5"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            >
              <button className="absolute top-3 right-3 text-sky-400 hover:text-sky-600" onClick={closeModal}>
                ✕
              </button>

              <div className="w-full flex justify-center mb-3">

              </div>

              <h2 className="text-center text-sky-700 text-2xl font-semibold mb-1 [text-shadow:1px_1px_0px_#ffffff,2px_2px_0px_#d7eaff]">
                Día #{selectedGift.day}
              </h2>

              <p className="text-center text-slate-700 text-[15px] leading-snug px-2">
                {selectedGift.message}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={openGiftLink}
                  className="w-full rounded-xl bg-[#dbefff] border border-[#b2d5f0] text-sky-700 font-medium py-2.5 shadow-[0_2px_0_#b2d5f0]"
                >
                  Abrir regalo
                </button>

                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-white border border-[#d9e7f7] text-sky-500 text-sm py-2 shadow-[0_2px_0_#d9e7f7]"
                >
                  Ver más tarde
                </button>
              </div>

              <div className="w-full flex justify-center mt-4 opacity-90">
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
