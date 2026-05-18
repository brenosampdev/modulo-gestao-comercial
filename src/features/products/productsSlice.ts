import type { IProduct } from "@/types/IProduct"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IProduct[] = []

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
})

export default productsSlice.reducer
