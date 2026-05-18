import {
    createSlice,
    type PayloadAction
} from "@reduxjs/toolkit";
import type { IProduct } from "@/types/IProduct";
import type { RootState } from "@/app/store";
import type { ProductFormValues } from "./productsSchema";
import { v4 as uuid } from "uuid";
import { mockProducts } from "@/mocks/products";

const initialState: IProduct[] = [...mockProducts]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        added: {
            reducer: (state, action: PayloadAction<IProduct>) => {
                state.push(action.payload)
            },
            prepare: (input: ProductFormValues) => ({
                payload: {
                    ...input,
                    id: uuid(),
                    createdAt: new Date().toISOString()
                } as IProduct,
            }),
        },
        updated: (state, action: PayloadAction<{id: string, changes: ProductFormValues }>) => {
            const product = state.find(product => product.id === action.payload.id)
            if (product) {
                Object.assign(product, action.payload.changes)
            }
        },
        toggleActive: (state, action: PayloadAction<{id: string, active: boolean }>) => {
            const product = state.find(product => product.id === action.payload.id)
            if (product) {
                product.active = action.payload.active
            }
        }
    }
})

export const { added, updated, toggleActive } = productsSlice.actions
export default productsSlice.reducer

export const selectAllProducts = (state: RootState) => state.products
export const selectActiveProducts = (state: RootState) =>
    state.products.filter(product => product.active)
export const selectProductById = (id: string) => (state: RootState) =>
    state.products.find(product => product.id === id)
export const selectProductForEdit = (id: string | null) => (state: RootState) =>
    id ? state.products.find(product => product.id === id) : null