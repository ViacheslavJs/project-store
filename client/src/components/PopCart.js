//import React from 'react'; // если используются классовые компоненты
import './styles/PopCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
//import ReactDOM from 'react-dom/client';

function PopCart({active, popClose, content, children}) { 
  //console.log(popActive);
  return ( 
       
      <div className={active ? "pop-cart active" : "pop-cart"} onClick={popClose}>
        <div className={active ? "pop-cart-content active" : "pop-cart-content"} onClick={(e) => e.stopPropagation()}>
          <div className="pop-title">{children}</div>
          <div className="cart-content">
            {content}    
          </div>       
          <p>{/*active*/}</p>    
          <FontAwesomeIcon icon={faTimesCircle} className='icon-close' onClick={popClose} />
        </div>                        
      </div>
             
  );
};

//

export default PopCart;

