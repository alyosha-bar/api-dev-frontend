

const Modal = ({isOpen, closeModal, children}) => {
    
    if (!isOpen) {
        return null;
    }
    
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="modal-content">{children}</div>
                <div className="modal-footer flex justify-end">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                    onClick={closeModal}
                >
                    Close
                </button>
                </div>
            </div>
        </div>
    );
}
 
export default Modal;