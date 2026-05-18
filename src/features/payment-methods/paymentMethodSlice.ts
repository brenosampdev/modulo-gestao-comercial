import type { IPaymentMethod } from "@/types/IPaymentMethod"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IPaymentMethod[] = []

const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {},
})

export default paymentMethodsSlice.reducer