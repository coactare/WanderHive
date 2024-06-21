import { Basket } from "./basket";
//import { setBasketState } from '../features/cart/basketSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/configureStore';
import apiUrl from '../services/apiUrl';

let basketSource = [{}];

//const { counterValue, title } = useAppSelector(state => state.basket);


export async function getBasket(userName) {

  try {
    const url = apiUrl() + '/Basket/GetBasket/sharma';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json();

    return jsonData;
  }
  catch (error) {

    console.error('Error fetching catalogs:', error);
    throw error;
  }
}

function getCurrentBasket() {

  const { initialState: basketSource } = useAppSelector(state => state.basket);

  return basketSource;
}

export async function incrementItemQuantity(productId) {
  const basket = this.getCurrentBasket();
  if (!basket) return;
  const founItemIndex = basket.items.findIndex((x) => x.productId === item.productId);
  basket.items[founItemIndex].quantity++;
  this.setBasket(basket);
}

export async function setBasket(basket) {

  const dispatch = useDispatch();
  const formData = new FormData();
  
  formData.append('userName', 'sharma');
  formData.append('items.quantity', 3);
  formData.append('items.imageFile', "images/products/adidas_shoe-1.png");
  formData.append('items.price', 3500.0);
  formData.append('items.productId', "602d2149e773f2a3990b47f5");
  formData.append('items.productName', "Adidas Quick Force Indoor Badminton Shoes");
  formData.append('totalPrice', 3500.0);


  url = apiUrl() + 'Catalog/CreateBasket';
  const response = await fetch("", {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to create basket');
  }
  const data = await response.json();

  dispatch(setBasketState(formData));

  return data;
}

export async function checkoutBasket(basket) {
  const formData = new FormData();

  formData.append('Name', catalogItem.productname);
  formData.append('Summary', catalogItem.productsummary);
  formData.append('Description', catalogItem.productdescription);
  formData.append('Price', catalogItem.price);
  formData.append('Image', catalogItem.image[0]);
  formData.append('Brands.Name', catalogItem.brandname);
  formData.append('Types.Name', catalogItem.producttype);

  url = apiUrl() + 'Basket/Checkout';

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to create/edit product');
  }

  const data = await response.json();
  return data;

}

export async function deleteBasket(userName) {
  try {
    const url = apiUrl() + `/Basket/DeleteBasket/${userName}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json();

    localStorage.removeItem('basket_username');
    basketSource = null;

    ////// this.basketTotal.next(null);

    return jsonData;
  }
  catch (error) {

    console.error('Error fetching catalogs:', error);
    throw error;
  }
}

export async function addItemToBasket(item, quantity = 1) {

  const basket = this.getCurrentBasket() ?? this.createBasket();

  basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  this.setBasket(basket);
}

export async function removeItemFromBasket(item) {
  const basket = this.getCurrentBasket();
  if (!basket) return;
  if (basket.items.some((x) => x.productId === item.productId)) {
    basket.items = basket.items.filter((x) => x.productId !== item.productId)
    if (basket.items.length > 0) {
      this.setBasket(basket);
    } else {
      this.deleteBasket(basket.userName);
    }
  }
}

export async function decrementItemQuantity(item) {
  const basket = this.getCurrentBasket();

  if (!basket) return;

  const founItemIndex = basket.items.findIndex((x) => x.productId === item.productId);

  if (basket.items[founItemIndex].quantity > 1) {
    basket.items[founItemIndex].quantity--;
    this.setBasket(basket);
  } else {
    this.removeItemFromBasket(item);
  }
}

/////////////////////

function createBasket() {
  const basket = new Basket();
  localStorage.setItem('basket_username', 'r'); //TODO: r can be replaced with LoggedIn User
  return basket;
}

function calculateBasketTotal() {
  const basket = this.getCurrentBasket();
  if (!basket) return;
  //We are going to loop over in array and calculate total
  const total = basket.items.reduce((x, y) => (y.price * y.quantity) + x, 0);
  this.basketTotal.next({ total });
}

function addOrUpdateItem(items, itemToAdd, quantity) {
  const item = items.find(x => x.productId == itemToAdd.productId);
  if (item) {
    item.quantity += quantity;

  } else {
    itemToAdd.quantity = quantity;
    items.push(itemToAdd);
  }
  return items;
}
