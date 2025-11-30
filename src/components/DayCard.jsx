import { motion } from "framer-motion";

export function DayCard({
  day,
  unlocked,
  opened,
  onClick,
  imageUrl,
  className = "",
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={unlocked ? { scale: 0.97 } : { scale: 1 }}
      whileHover={unlocked ? { scale: 1.02 } : {}}
      className={`
        relative w-full h-full overflow-hidden
        rounded-md shadow-md
        ${unlocked ? "shadow-sky-200" : "shadow-slate-900/20"}
        ${className}
      `}
    >
      {/* Fondo de imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        }}
      />

      {/* Capa de color según estado (bloqueado / desbloqueado / abierto) */}
      <div
        className={`
          absolute inset-0 transition
          ${!unlocked && "bg-slate-900/25"}
          ${unlocked && !opened && "bg-white/25"}
          ${opened && "bg-white/0"}
        `}
      />

      {/* Contenido encima */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-2">
        {/* Número del día */}
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center justify-center rounded-full bg-cyan-200/80 px-2 py-0.5 text-[11px] font-semibold text-white">
            #{day}
          </span>

          {/* Etiqueta “visto” si ya se abrió */}
          {opened && (
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-pink-200/80 px-2 py-0.5 text-[10px] font-semibold text-white">
              ✓
            </span>
          )}
        </div>

        {/* Mensaje pequeño abajo si está bloqueado */}
        {!unlocked && (
          <span className="bg-slate-900/70">
          </span>
        )}
      </div>
    </motion.button>
  );
}