import React, { useState, useEffect } from "react"
import { getStashbyUserId } from "../../services/stashService"
import { BedSizeControls } from "./BedSizeControls"
import { GardenGrid } from "./GardenGrid"
import { StashSidebar } from "./StashSidebar"

export const GardenPlanner = ({ currentUser }) => {
  const [rows, setRows] = useState(12)
  const [cols, setCols] = useState(12)
  const [stash, setStash] = useState([])
  const [placements, setPlacements] = useState([])
  const [selectedStashItem, setSelectedStashItem] = useState(null)
  const [hoverCell, setHoverCell] = useState(null)

  useEffect(() => {
    if (currentUser.id) {
      getStashbyUserId(currentUser.id).then((data) => {
        const formattedStash = data.map((item) => ({
          id: item.id,
          name: `${item.plant.plant_type_name} ${item.plant.varietal_name}`,
          width: Math.ceil(item.plant.spacing_width / 2),
          height: Math.ceil(item.plant.spacing_height / 2),
          color: item.plant.color
        }))
        setStash(formattedStash)
      })
    }
  }, [currentUser.id])

  const buildGrid = () => {
    const grid = []
    for (let r = 0; r < rows; r++) {
      const rowCells = []
      for (let c = 0; c < cols; c++) {
        rowCells.push({ row: r, col: c })
      }
      grid.push(rowCells)
    }
    return grid
  }

  const grid = buildGrid()

  const getPlantAtCell = (row, col) => {
    return placements.find(
      (p) =>
        row >= p.row &&
        row < p.row + p.height &&
        col >= p.col &&
        col < p.col + p.width
    )
  }

  const canPlaceSeedAt = (seed, baseRow, baseCol) => {
    if (baseRow + seed.height > rows || baseCol + seed.width > cols) {
      return false
    }

    for (let r = baseRow; r < baseRow + seed.height; r++) {
      for (let c = baseCol; c < baseCol + seed.width; c++) {
        if (getPlantAtCell(r, c)) {
          return false
        }
      }
    }
    return true
  }

  const handleCellClick = (row, col) => {
    if (!selectedStashItem) return

    if (canPlaceSeedAt(selectedStashItem, row, col)) {
      setPlacements([
        ...placements,
        {
          id: Date.now(),
          seedId: selectedStashItem.id,
          row,
          col,
          width: selectedStashItem.width,
          height: selectedStashItem.height
        }
      ])
      setSelectedStashItem(null)
    }
  }

  const handleRemovePlacement = (placementId) => {
    setPlacements(placements.filter((p) => p.id !== placementId))
  }

  const handleUpdateBedSize = (newRows, newCols) => {
    setRows(newRows)
    setCols(newCols)
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden"
      }}
    >
      <StashSidebar
        stash={stash}
        selectedStashItem={selectedStashItem}
        onSelectStashItem={setSelectedStashItem}
        placements={placements}
        onRemovePlacement={handleRemovePlacement}
      />

      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        <BedSizeControls
          rows={rows}
          cols={cols}
          onUpdateBedSize={handleUpdateBedSize}
        />
        <GardenGrid
          rows={rows}
          cols={cols}
          grid={grid}
          stash={stash}
          selectedStashItem={selectedStashItem}
          hoverCell={hoverCell}
          getPlantAtCell={getPlantAtCell}
          canPlaceSeedAt={canPlaceSeedAt}
          onCellClick={handleCellClick}
          onCellMouseEnter={(row, col) => setHoverCell({ row, col })}
          onCellMouseLeave={() => setHoverCell(null)}
          placements={placements}
        />
      </div>
    </div>
  )
}
