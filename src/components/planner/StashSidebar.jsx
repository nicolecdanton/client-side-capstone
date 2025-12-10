import React from "react"

export const StashSidebar = ({
  stash,
  selectedStashItem,
  onSelectStashItem,
  placements,
  onRemovePlacement
}) => {
  return (
    <div
      style={{
        width: "280px",
        background: "#020617",
        borderRight: "1px solid rgba(148,163,184,0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <div style={{ padding: "20px", borderBottom: "1px solid rgba(148,163,184,0.25)" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
          Garden Planner
        </h2>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
          Select a plant from your stash, then click on the grid to place it
        </p>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
          Your Stash
        </h3>
        {stash.length === 0 ? (
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>
            No plants in your stash yet. Add some from the Plant Library!
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {stash.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectStashItem(item)}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  background: item.color || "#22c55e",
                  cursor: "pointer",
                  border:
                    selectedStashItem?.id === item.id
                      ? "2px solid #f9fafb"
                      : "2px solid transparent",
                  transition: "all 150ms ease",
                  boxShadow:
                    selectedStashItem?.id === item.id
                      ? "0 4px 12px rgba(0,0,0,0.3)"
                      : "0 2px 4px rgba(0,0,0,0.2)"
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#020617",
                    marginBottom: "4px"
                  }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(2,6,23,0.7)" }}>
                  Size: {item.width} × {item.height} squares
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {placements.length > 0 && (
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(148,163,184,0.25)",
            maxHeight: "200px",
            overflow: "auto"
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Placed Plants</span>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>
              {placements.length}
            </span>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {placements.map((placement) => {
              const stashItem = stash.find((s) => s.id === placement.seedId)
              return (
                <div
                  key={placement.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    background: "rgba(15,23,42,0.8)",
                    border: "1px solid rgba(148,163,184,0.3)"
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#e5e7eb"
                      }}
                    >
                      {stashItem?.name || "Plant"}
                    </div>
                    <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                      Row {placement.row + 1}, Col {placement.col + 1}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemovePlacement(placement.id)}
                    style={{
                      background: "rgba(239,68,68,0.8)",
                      border: "none",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                      padding: "4px 8px",
                      fontSize: "10px",
                      fontWeight: 600,
                      transition: "background 150ms ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(239,68,68,1)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(239,68,68,0.8)"
                    }}
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
