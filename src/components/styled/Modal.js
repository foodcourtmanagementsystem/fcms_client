import './Modal.css';
import {useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Modal({closeModal, children}) {

  const modalContainerRef = useRef();
  const handleClick = e => {
      if(e.target === modalContainerRef.current)
      {
          closeModal();
      }
  }


  return (
      <div className="modal_container" ref={modalContainerRef} onClick={handleClick}>
          <div className="modal_content">
            <span className="modal_close" onClick={closeModal}>
                <CloseIcon className="icon" />
            </span>
            {children}
          </div>
      </div>
  );
}

export default Modal;