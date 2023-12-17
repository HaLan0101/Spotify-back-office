import Close from '../../../../public/icons/close.svg';
const Modal = ({onClose, children}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto ">
      <div className="fixed inset-0 bg-[#DCDCDC] opacity-30"></div>
      <div className="relative z-50 bg-main p-[100px]  mx-auto rounded shadow-lg w-[700px]">
        {children}
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
