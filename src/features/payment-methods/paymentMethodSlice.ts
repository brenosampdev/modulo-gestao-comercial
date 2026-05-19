import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import type { IPaymentMethod } from '@/types/IPaymentMethod'
import type { RootState } from '@/app/store'
import type { PaymentMethodFormValues } from '@/features/payment-methods/paymentMethodSchema'
import { mockPaymentMethods } from '@/mocks/payment-methods'

const initialState: IPaymentMethod[] = [...mockPaymentMethods]

const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {
        added: {
            reducer: (state, action: PayloadAction<IPaymentMethod>) => {
                state.push(action.payload)
            },
            prepare: (input: PaymentMethodFormValues) => ({
                payload: { ...input, id: uuid() } as IPaymentMethod,
            }),
        },
        switchStatus: (state, action: PayloadAction<{ id: string, active: boolean }>) => {
            const payment = state.find(paymentMethod => paymentMethod.id === action.payload.id)
            if (!payment) return
            payment.active = !payment.active
        },
    },
})

export const { added, switchStatus } = paymentMethodsSlice.actions
export default paymentMethodsSlice.reducer

export const selectAllPaymentMethods = (state: RootState) => state.paymentMethods
export const selectActivePaymentMethods = (state: RootState) =>
    state.paymentMethods.filter(payment => payment.active)
export const selectPaymentMethodById = (id: string) => (state: RootState) =>
    state.paymentMethods.find(payment => payment.id === id)
