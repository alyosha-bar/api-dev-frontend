import First from "./flow/First";
import Second from "./flow/Second";


const Modal = ({isOpen, closeModal, children, index}) => {
    
    if (!isOpen) {
        return null;
    }

    // check each index and return a prebuild modal component
    switch (index) {
        case 0:
            // pass into children the component i want?
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-4/5">
                        <div className="modal-content">
                            <First />
                            {children}
                        </div>
                        <div className="modal-footer flex justify-end">
                        {/* <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                            onClick={closeModal}
                        >
                            Close
                        </button> */}
                        </div>
                    </div>
                </div>
            )
        case 1:
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <div className="modal-content">
                            <Second />
                            {children}    
                        </div>
                        <div className="modal-footer flex justify-end">
                        </div>
                    </div>
                </div>
            )
        case 2:
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
            )
        case 3:
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <div className="modal-content">{children}</div>
                        <div className="modal-footer flex justify-end">
                        </div>
                    </div>
                </div>
            )
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