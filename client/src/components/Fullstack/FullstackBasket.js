import { useEffect } from 'react';
import styles from './FullstackBasket.module.css';

// TODO - basket:
function FullstackBasket(props) {
  const basketItems = props.basketItems;
  const setBasketItems = props.setBasketItems;
  const setTotalAddedItems = props.setTotalAddedItems;
  const furnitures = props.furnitures;
  let totalAmount = 0;

  const basketItemElements = [];
  
  const deleteBasketItem = (id, event) => {
    event.preventDefault(); 
    setBasketItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      
      // TODO - подсчёт количества добавленных товаров при удалении:
      let totalCount = 0;
      for (const itemId in updatedItems) {
        totalCount += updatedItems[itemId];
      }
      setTotalAddedItems(totalCount); // Обновляем общее количество добавленных товаров
      console.log('Общее количество добавленных товаров:', totalCount);
      //
      
      return updatedItems;
    });
  };
  
  /*
  //TODO не правильно - пустой объект вернётся только при повторном клике 'очистить'
  const clearBasket = () => {
    setBasketItems({}); // React запланирует обновление состояния, но это обновление происходит асинхронно
    const remainder = 0;
    setTotalAddedItems(0); // Обнуляем общее количество добавленных товаров
    console.log('Общее количество оставшихся товаров:', remainder);
    console.log(basketItems); // после вызова setBasketItems({}), значение basketItems здесь ещё не будет обновлено.
    //console.log(clearedTotalItems);
  };
  //
  */
  
  
  //TODO правильно - useEffect предназначен для обработки эффектов и выполнения кода после(!) обновления состояния
  // использование useEffect для действий вроде очистки корзины - рекомендуемая практика.
  const clearBasket = () => {
    setBasketItems({}); 
  };

  useEffect(() => {
    if (Object.keys(basketItems).length === 0) {
      setTotalAddedItems(0); // Обнуляем общее количество добавленных товаров, если корзина пуста
      let remainder = basketItems;
      console.log(`Общее количество оставшихся товаров: ${Object.keys(basketItems).length}`);
      console.log(remainder);
    }
  }, [basketItems]);
  //
  

  for (let id in basketItems) {
    const itemValue = basketItems[id];
    const parsedId = parseInt(id, 10);

    if (!isNaN(parsedId) && itemValue !== undefined && itemValue !== null) {
      for (let i = 0; i < furnitures.length; i++) {
        const furniture = furnitures[i];
        if (furniture.id === parsedId) {
          const itemTotal = (furniture.price || 0) * itemValue;
          totalAmount += itemTotal;

          basketItemElements.push(
            <div className={styles.basketItem} key={furniture.id}>
              <span>{furniture.name} - {itemValue} pc.</span>
              <button 
                className={styles.basketItemDelete} 
                onClick={(event) => deleteBasketItem(id, event)}>Delete
              </button>
           
            </div>
          );
          //console.log(thumbnail.name);
          //console.log(basketItemElements);
          console.log(basketItems);

          break;
        }
      }
    }
  }

  return (
    <div className={styles.basket}>
      <div className={styles.basketItemBox}>
        {basketItemElements}
      </div>
      <div className={styles.basketTotal}>
        <span>Total</span>
        <span><strong>{totalAmount} UAH.</strong></span>
      </div>
      <button className={styles.basketClear} onClick={clearBasket}>Clear</button>
    </div>
  );
}
    
export default FullstackBasket;

