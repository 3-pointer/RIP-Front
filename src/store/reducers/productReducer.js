import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    product: {},
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload;
        },
        setProduct: (state, { payload }) => {
            state.product = payload;
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setProduct, setProducts } = productSlice.actions;
