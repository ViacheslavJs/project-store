//import React from 'react'; // если используются классовые компоненты
//import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { useEffect } from 'react';
//import { useMemo } from 'react';
import styles from './Fullstack.module.css';
import PopUp from '../PopUp';
import Modal from '../Modal';
import PopCart from '../PopCart';
import { images } from '../data/cardproduct.data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import FullstackBasket from './FullstackBasket';

//
function Fullstack() {   
     
  const [modalActive, setModalActive] = useState(false); // открыть/закрыть мод. окно изображений
  
  const [popActive, setPopActive] = useState(false); // открыть/закрыть поп-ап описаний
  //console.log(popActive); // начальное значение переменной popActive - 
  // оно будет изменяться при клике - либо false, либо переданный id
  
  const [selectedThumbnail, setSelectedThumbnail] = useState(null); 
  // значение этой переменной будет равно переданному id объекта из массива thumbnails
  
  const [selectedImageId, setSelectedImageId] = useState(null);
  //const pageScroll = document.getElementsByTagName('body')[0]; 
  
  const [basketItems, setBasketItems] = useState({}); //TODO
  const [cartActive, setCartActive] = useState(false); //TODO
  
  const [totalAddedItems, setTotalAddedItems] = useState(0); // Состояние для общего количества добавленных товаров

  
  //
  const [isPopUpDisplayed, setPopUpDisplayed] = useState(false);
  const [PopUpComponent, setPopUpComponent] = useState(null);
  const loadPopUpComponent = async () => {
    const loadResult = await import('../PopUp.js')
    setPopUpComponent(() => loadResult.default)
 }
 //
 
 //
  const [isPopCartDisplayed, setPopCartDisplayed] = useState(false);
  const [PopCartComponent, setPopCartComponent] = useState(null);
  const loadPopCartComponent = async () => {
    const loadResult = await import('../PopCart.js')
    setPopCartComponent(() => loadResult.default)
 }
 //
  
  function imageClose() {
    setModalActive(false);
    document.body.classList.remove('scroll');
  }
  
  function handleThumbnailClick(thumbnailId) {
    setModalActive(true);
    setSelectedImageId(thumbnailId);   
    document.body.classList.add('scroll');
  }
  
  function popClick(furniture) {
    setPopActive(furniture.id); // TODO or
    //setPopActive(true); // TODO or
    setSelectedThumbnail(furniture);
    document.body.classList.add('scroll');  
    
    // Динамический импорт с помощью async:
    setPopUpDisplayed(true);
    loadPopUpComponent();
    
    //console.log(typeof thumbnail); // object
    //console.log(thumbnail); // объект из массива thumbnails
    //console.log(thumbnail.text); // извлекаем поля - id, text и т.д.
    //console.log(thumbnail.id);
  }
  
  function popClose() {
    setPopActive(false);
    document.body.classList.remove('scroll');        
  }  
  
  function cartClick() {
    setCartActive(true);
    setPopCartDisplayed(true);
    loadPopCartComponent();
    document.body.classList.add('scroll');  
  }
  
  function cartClose() {
    setCartActive(false);
    document.body.classList.remove('scroll');  
  }
  
  //TODO
  function addBasket(id, event) {
    event.preventDefault(); // 'event' используем в случае ссылки вместо кнопки
    //console.log(id);
    //console.log(basketItems);
    setBasketItems((prevItems) => { // Используется функция обновления состояния корзины.
      const updatedItems = { ...prevItems }; // Создание копии текущего состояния корзины.
      /*
      //console.log(prevItems);
      //console.log(updatedItems);
      updatedItems[id] = id in updatedItems ? updatedItems[id] + 1 : 1;
      //console.log(updatedItems[id]);
      //console.log(updatedItems);
      //console.log(prevItems);
      return updatedItems;
      */
     
    // TODO - подсчёт количества добавленных товаров: 
    // Проверка, существует ли товар с указанным id в корзине.
    if (id in updatedItems) {
      updatedItems[id] = updatedItems[id] + 1; // Если существует, увеличиваем количество на 1.
    } else {
      updatedItems[id] = 1; // Если нет, создаем запись с начальным количеством 1.
    }       
    /*
    // or - с методом reduce:
    const totalCount = Object.values(updatedItems).reduce((sum, value) => sum + value, 0);
      setTotalAddedItems(totalCount); // Обновляем общее количество добавленных товаров
      console.log('Общее количество добавленных товаров:', totalCount);
    */    
    // or - с помощью обычного цикла:
    let totalCount = 0;
      for (const itemId in updatedItems) {
        totalCount += updatedItems[itemId];
      }
      setTotalAddedItems(totalCount); // Обновляем общее количество добавленных товаров
      console.log('Общее количество добавленных товаров:', totalCount);
    //
    
    
    return updatedItems; // Возвращение обновленного объекта корзины.
      
    });
  }
  //
  
  const clearedTotalItems = 0;
  const totalItems = clearedTotalItems > 0 ? clearedTotalItems : totalAddedItems;  
  
  //
  const initialColor = totalItems > 0 ? '#ffb328' : 'silver';
  /*
  let initialColor; 
  if (totalItems > 0) {
    initialColor = '#ffb328';
  } else {
    initialColor = 'silver';
  }
  */
  //
  
  const [furnitures, setFurnitures] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFurnitures = async () => {
      try {
        //const response = await fetch('/api'); //TODO - данные из data.json
        const response = await fetch('/api/furniture'); //TODO - данные из БД
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setFurnitures(responseData);
        //setFurnitures(responseData.furnitures); // если json вида - { "furnitures": [ {...}, {...} ] }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setFurnitures([]);
        setLoading(false); // Устанавливаем loading в false в случае ошибки.
      } finally {
        if (loading) {
          setLoading(false); // Если данные успешно загружены, устанавливаем loading в false.
        }
      }
    };

    fetchFurnitures();
  }, [loading]);
  
  const prefix = ' - ';
  
  return (
    <div>              
      <section className={styles.cardProduct}>     
        <h1>Furniture store</h1>
        <div className={styles.cart}>         
          <FontAwesomeIcon icon={faCartShopping} style={ {color: initialColor} } className={styles.cartIcon} onClick={cartClick} />
          <>
            <span> Qty: </span>
            <span className={styles.totalItems}>{`${totalItems}`}</span>
          </>
        </div>
                        
        <div className={styles.cardFlexBox}>
        
        {loading ? (
          "Loading..."
        ) : (<>
        
        {furnitures.length > 0 ? (
          furnitures.map((furniture) => (
            <div className={styles.cardPreviewBox} key={furniture.id}>
              <img className={styles.cardPreview}
                key={furniture.id}
                src={furniture.imagePath}
                alt={furniture.alt}
                text={furniture.text}
                onClick={() => { handleThumbnailClick(furniture.id); }}             
              />
              <span className={styles.cardPreviewSpan} onClick={() => { popClick(furniture); }}>
                More
              </span>
              <p>Name: {furniture.name}</p>
              <p>Price: {furniture.price ? <strong>{furniture.price}</strong> : <span>&mdash;</span>}</p>
              {<button className={styles.addCart} onClick={(event) => addBasket(furniture.id, event)}>Add to cart</button>}
              {/*'event' используем в случае ссылки вместо кнопки, добавить атрибут href="#"*/}
            </div>
          ))) : (
            "Server is not available" // Отображаем "Server is not available" при отсутствии данных.
          )}
          
          </>)}
        </div>
        <button className={styles.viewed} onClick={() => setModalActive(true)}>just viewed</button>
      </section> 
                       
      <div>
        {isPopUpDisplayed && PopUpComponent ? (
          <PopUp 
            active={popActive}
            popClose={popClose}
            key={selectedThumbnail && selectedThumbnail.id}
            content={
              <>
                <span className={styles.productName}>{selectedThumbnail && selectedThumbnail.name}</span>
                <p><span>{selectedThumbnail && selectedThumbnail.name}</span>
                  {prefix}{selectedThumbnail && selectedThumbnail.text}</p>              
              </>
            }          
          >
          <p>Furniture store</p>
        </PopUp>
        ) : null}
      </div>
                      
      
      {selectedImageId !== null && (
        <Modal 
          active={modalActive}  
          image={process.env.PUBLIC_URL + '/' + images[selectedImageId - 1].src} 
          alt={images[selectedImageId - 1].alt} 
          key={images[selectedImageId - 1].id}                              
          onClose={imageClose}       
        />        
      )}
                  
      <div>
        {isPopCartDisplayed && PopCartComponent ? (
          <PopCart 
            active={cartActive}
            popClose={cartClose}
            content={
              <>
                <FullstackBasket 
                  basketItems={basketItems} 
                  furnitures={furnitures} 
                  setBasketItems={setBasketItems} 
                  setTotalAddedItems={setTotalAddedItems}                  
                />              
              </>
            }          
          >
          <p>Cart</p>
        </PopCart>
        ) : null}
      </div>
                                    
    </div>
  );
};


//

export default Fullstack;

