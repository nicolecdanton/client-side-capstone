import React from "react";
import { GridCell } from "./GridCell";

export const GardenGrid = ({
  rows,
  cols,
  grid,
  stash,
  selectedStashItem,
  hoverCell,
  getPlantAtCell,
  canPlaceSeedAt,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
  placements
}) =>{
  const isCellInPreview = (row, col) => {
    if (!selectedStashItem || !hoverCell) return false;
    const { row: baseRow, col: baseCol } = hoverCell;

    if (baseRow + selectedStashItem.height > rows || baseCol + selectedStashItem.width > cols) {
      return false;
    }

    return (
      row >= baseRow &&
      row < baseRow + selectedStashItem.height &&
      col >= baseCol &&
      col < baseCol + selectedStashItem.width
    );
  };

  return (
    <div
      style={{
        background: "#020617",
        borderRadius: "18px",
        padding: "16px 18px",
        boxShadow: "0 18px 40px rgba(15,23,42,0.6)",
        border: "1px solid rgba(148,163,184,0.25)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline"
        }}
      >
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Garden bed</h2>
          <p style={{ fontSize: "11px", color: "#9ca3af" }}>
            Squares with color are planted and locked. Hover to preview placement.
          </p>
        </div>
        <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "right" }}>
          Planted:{" "}
          <strong style={{ color: "#e5e7eb" }}>{placements.length}</strong> plants
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${rows}, 22px)`,
            gridTemplateColumns: `repeat(${cols}, 22px)`,
            gap: "2px",
            padding: "10px",
            borderRadius: "14px",
            backgroundImage:
              "linear-gradient(135deg, rgba(6,95,70,0.8), rgba(5,46,22,0.9))",
            border: "1px solid rgba(21,128,61,0.8)",
            boxShadow: "0 12px 40px rgba(15,23,42,0.7)"
          }}
        >
          {grid.map((rowCells) =>
            rowCells.map(({ row, col }) => {
              const plant = getPlantAtCell(row, col);
              const isTopLeft = plant && plant.row === row && plant.col === col;
              const preview = isCellInPreview(row, col);
              const previewValid =
                preview && selectedStashItem && hoverCell
                  ? canPlaceSeedAt(selectedStashItem, hoverCell.row, hoverCell.col)
                  : false;

              const stashItem = plant
                ? stash.find((s) => s.id === plant.seedId)
                : null;

              return (
                <GridCell
                  key={`${row}-${col}`}
                  row={row}
                  col={col}
                  plant={plant}
                  stashItem={stashItem}
                  isTopLeft={isTopLeft}
                  preview={preview}
                  previewValid={previewValid}
                  onClick={() => onCellClick(row, col)}
                  onMouseEnter={() => onCellMouseEnter(row, col)}
                  onMouseLeave={onCellMouseLeave}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
