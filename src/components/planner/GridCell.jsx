import React from "react";

export function GridCell({
  plant,
  stashItem,
  isTopLeft,
  preview,
  previewValid,
  onClick,
  onMouseEnter,
  onMouseLeave
}) {
  // 1️⃣ Base styles for an empty cell
  let background = "rgba(15,23,42,0.35)";
  let border = "1px solid rgba(15,23,42,0.8)";
  let outline = "none";
  let opacity = 1;

  // 2️⃣ If there is a plant in this cell
  if (plant) {
    background = stashItem && stashItem.color ? stashItem.color : "#22c55e";
    border = "1px solid rgba(15,23,42,0.6)";
  }

  // 3️⃣ If we're previewing a plant here (and there is no plant yet)
  if (!plant && preview) {
    if (previewValid) {
      // green preview = valid spot
      background = "rgba(34,197,94,0.5)";
      border = "1px solid rgba(34,197,94,0.9)";
      outline = "1px dashed rgba(22,163,74,0.9)";
    } else {
      // red preview = invalid spot
      background = "rgba(248,113,113,0.4)";
      border = "1px solid rgba(248,113,113,0.9)";
      outline = "1px dashed rgba(248,113,113,0.9)";
    }

    opacity = 0.9;
  }

   // 4️⃣ Decide what the mouse cursor should look like
  // If there is already a plant here, you can't place another one
  const cursor = plant ? "not-allowed" : "pointer";

  // 5️⃣ Decide what label to show in the top-left cell
  let label = "PLT"; // default label

  if (stashItem && stashItem.name) {
    const firstWord = stashItem.name.split(" ")[0]; // e.g. "Tomato Cherry" → "Tomato"
    label = firstWord.slice(0, 3).toUpperCase(); // "Tomato" → "TOM"
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: "22px",
        height: "22px",
        borderRadius: "6px",
        background,
        border,
        outline,
        boxSizing: "border-box",
        cursor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        color: "#020617",
        fontWeight: 600,
        opacity,
        transition:
          "background 80ms ease, transform 80ms ease, box-shadow 80ms ease"
      }}
    >
      {isTopLeft && (
        <span
          style={{
            padding: "1px 3px",
            borderRadius: "999px",
            background: "rgba(15,23,42,0.7)",
            color: "#f9fafb",
            fontSize: "8px",
            maxWidth: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
          title={stashItem?.name || "Plant"}
        >
          {label}
        </span>
      )}
    </div>
  );
}