import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import type { IOrder } from '@/types/IOrder'
import type { RootState } from '@/app/store'
import { mockOrders } from '@/mocks/orders'

type NewOrderInput = Omit<IOrder, 'id' | 'createdAt'>

const initialState: IOrder[] = [...mockOrders]

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        added: {
            reducer: (state, action: PayloadAction<IOrder>) => {
                state.push(action.payload)
            },
            prepare: (input: NewOrderInput) => ({
                payload: {
                    ...input,
                    id: uuid(),
                    createdAt: new Date().toISOString(),
                },
            }),
        },
    },
})

export const { added } = ordersSlice.actions
export default ordersSlice.reducer

export const selectAllOrders = (state: RootState) => state.orders
export const selectOrderById = (id: string) => (state: RootState) =>
    state.orders.find(orders => orders.id === id)