//import React from 'react'; // если используются классовые компоненты
import './styles/PopUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
//import ReactDOM from 'react-dom/client';

function PopUp({active, popClose, content, children}) { 
  //console.log(popActive);
  return ( 
       
      <div className={active ? "pop-modal active" : "pop-modal"} onClick={popClose}>
        <div className={active ? "pop-content active" : "pop-content"} onClick={(e) => e.stopPropagation()}>
          <div className="pop-title">{children}</div>
          <div>
            {content}    
          </div>       
          <p>{/*active*/}</p>    
          <FontAwesomeIcon icon={faTimesCircle} className='icon-close' onClick={popClose} />
        </div>                        
      </div>
             
  );
};

//

export default PopUp;

