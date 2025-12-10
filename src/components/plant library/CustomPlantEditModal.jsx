import "./CustomPlantEditModal.css";

export const CustomPlantEditModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (

    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
           &times; {/*this is the x on the button */}
        </button>
        {children} {/* basically read this as <AddToStashForm with its props />*/}
      </div>
    </div>
  )
}