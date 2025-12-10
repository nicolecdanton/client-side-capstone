import React from "react";

export function BedSizeControls({ rows, cols, onUpdateBedSize }) {
  return (
    <div
      style={{
        marginBottom: "16px",
        padding: "10px 12px",
        borderRadius: "12px",
        background: "#020617",
        border: "1px solid rgba(148,163,184,0.35)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          fontSize: "13px",
          fontWeight: 600
        }}
      >
        <span>Bed size</span>
        <span style={{ color: "#9ca3af" }}>
          {rows} × {cols} squares
        </span>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <label style={{ flex: 1, fontSize: "12px" }}>
          Rows
          <input
            type="number"
            min={1}
            max={30}
            value={rows}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value) || 1);
              onUpdateBedSize(value, cols);
            }}
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "4px 6px",
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.5)",
              background: "#020617",
              color: "#e5e7eb",
              fontSize: "12px"
            }}
          />
        </label>
        <label style={{ flex: 1, fontSize: "12px" }}>
          Columns
          <input
            type="number"
            min={1}
            max={30}
            value={cols}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value) || 1);
              onUpdateBedSize(rows, value);
            }}
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "4px 6px",
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.5)",
              background: "#020617",
              color: "#e5e7eb",
              fontSize: "12px"
            }}
          />
        </label>
      </div>
    </div>
  );
}
