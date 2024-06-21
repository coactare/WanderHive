import { createSlice } from "@reduxjs/toolkit"

// interface CounterState {
//     title: string;
//     counterValue: number;
// }

// const initialState: CounterState = {
//     title: 'Redux with redux toolkit example',
//     counterValue: 42
// }

const initialState = {
    title: 'Redux with redux toolkit example',
    counterValue: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.counterValue += action.payload;
        },
        decrement: (state, action) => {
            state.counterValue -= action.payload
        }
    }
})

export const {increment, decrement} = counterSlice.actions;