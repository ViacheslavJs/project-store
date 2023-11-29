//import React from 'react'; // если используются классовые компоненты
import './styles/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
//import ReactDOM from 'react-dom/client';

function Modal({active, image, alt, onClose}) { 
  //console.log(active);
  return ( 
       
      <div className={active ? "img-modal active" : "img-modal"} onClick={onClose}>
        <div className={active ? "img-modal-content active" : "img-modal-content"} onClick={(e) => e.stopPropagation()}>
          <img className="img-modal-image"        
            src={image} 
            alt={alt}             
          />
          <FontAwesomeIcon icon={faTimesCircle} className='icon-close' onClick={onClose} />
        </div>                        
      </div>
            
  );
};

export default Modal;

