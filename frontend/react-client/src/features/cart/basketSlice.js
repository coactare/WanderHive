
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiUrl from '../../services/apiUrl';
import { getCookie } from "../../utils/helpers";

const initialState = {
    basket: null,
    status: "idle"
}

export const getBasket = createAsyncThunk(
    'Basket/GetBasket',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(apiUrl() + 'Basket/GetBasket/sharma');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const addItemToCart = createAsyncThunk(
    'Basket/CreateBasket',
    async (createShoppingCartCommand, { getState, dispatch }) => {

        try {
            
            const currentState = getState();
            const response = await fetch(apiUrl() + 'Basket/CreateBasket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // userName: createShoppingCartCommand.createShoppingCartCommand.userName,
                    // totalPrice: 0,
                    // items: [{
                    //     productId: createShoppingCartCommand.createShoppingCartCommand.items[0].productId,
                    //     productName: createShoppingCartCommand.createShoppingCartCommand.items[0].productName,
                    //     price: createShoppingCartCommand.createShoppingCartCommand.items[0].price,
                    //     imageFile: createShoppingCartCommand.createShoppingCartCommand.items[0].imageFile,
                    //     quantity: createShoppingCartCommand.createShoppingCartCommand.items[0].quantity
                    // }]
                    userName: currentState.basket.basket.userName,
                    //totalPrice: 0,
                    items: currentState.basket.basket.items.map(item => ({
                        productId: item.productId,
                        productName: item.productName,
                        price: item.price,
                        imageFile: item.imageFile,
                        quantity: item.quantity
                    }))
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const removeItemFromServerCart = createAsyncThunk('Basket/RemoveItemFromServerBasket',
    async (_, { getState }) => {

        try {

            const currentState = getState();
            const response = await fetch(apiUrl() + 'Basket/CreateBasket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: currentState.basket.basket.userName,
                    totalPrice: currentState.basket.basket.totalPrice,
                    items: currentState.basket.basket.items.map(item => ({
                        productId: item.productId,
                        productName: item.productName,
                        price: item.price,
                        imageFile: item.imageFile,
                        quantity: item.quantity
                    }))
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketState: (state, action) => {
            state.basket = action.payload
        },
        getBasket: (state) => {
            return state.basket;
        },
        clearBasket: (state) => {
            state.basket = null;
        },
        incrementCartItem: (state, action) => {
            
            const { productId, itemCount } = action.payload;
            const { basket } = state;
            if (basket && basket.items && productId) {
                const itemIndex = basket?.items.findIndex(i => i.productId === productId);

                if (basket.items[itemIndex].quantity <= 9) {
                    basket.items[itemIndex].quantity += itemCount;
                    basket.totalPrice = basket.items.reduce((x, y) => (y.price * y.quantity) + x, 0);
                }
            }
        },
        addItem(state, action) {

            const product = action.payload.data;
            const { basket } = state;
            
            const itemIndex = basket ? basket.items.findIndex(item => item.productId === product.id) : -1;


            if (itemIndex >= 0 && basket.items[itemIndex] && basket.items[itemIndex].quantity <= 9) {
                basket.items[itemIndex].quantity++;
            } else {

                let newItem = {
                    quantity: 1,
                    price: product.price,
                    productId: product.id,
                    imageFile: product.imageFile,
                    image: product.image,
                    productName: product.name
                }

                if (!basket || basket.items.length === 0) {
                    state.basket = { userName: 'sharma', items: [], totalPrice: newItem.price * newItem.quantity }; 
                }
                state.basket.items.push({ ...newItem, quantity: 1 });
            }
        },
        removeItemFromLocalCart(state, action) {

            const productId = action.payload.productId;
            const { basket } = state;

            const index = basket?.items.findIndex(item => item.productId === productId);

            if (index !== -1) {
                basket?.items.splice(index, 1);
            }
        },
        decrementCartItem: (state, action) => {
            
            const { productId, itemCount } = action.payload;
            const { basket } = state;
            if (basket && basket.items && productId) {
                const itemIndex = basket?.items.findIndex(i => i.productId === productId);
                if (basket.items[itemIndex].quantity >= 1) {
                    basket.items[itemIndex].quantity -= itemCount;
                    basket.totalPrice = basket.items.reduce((x, y) => (y.price * y.quantity) + x, 0);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBasket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.basket = action.payload;
            })
            .addCase(getBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            });
    },
});


export const { removeItemFromLocalCart, addItem, incrementCartItem, decrementCartItem, setBasketState } = basketSlice.actions;
export default basketSlice.reducer;
