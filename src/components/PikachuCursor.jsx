import { usePikachu } from "../hooks/usePikachu";

import sleepingGif from "../assets/gif/sleepy-pikachu.gif";
import runningRight from "../assets/gif/pikachu-right.gif";
import runningLeft from "../assets/gif/pikachu-left.gif";

export const PikachuCursor = ({ active }) => {
  const { pos, sleeping, direction } = usePikachu(active);

  if (!active) return null;

  const src = sleeping
    ? sleepingGif
    : direction === "left"
      ? runningLeft
      : runningRight;

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x + 16,
        top: pos.y + 16,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <img
        src={src}
        alt="pikachu"
        style={{
          width: sleeping ? 72 : 56,
          height: sleeping ? 72 : 56,
          transition: "width 300ms ease, height 300ms ease",
          filter: "drop-shadow(0 4px 12px rgba(250,204,21,0.4))",
        }}
      />
    </div>
  );
};
