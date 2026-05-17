import type { EnumPaymentMethodType } from "@/types/IPaymentMethod";
import type { EnumProductUnit } from "@/types/IProduct";

export type EnumOrderStatus = 'pending' | 'approved' | 'shipped' | 'cancelled';

export interface IOrderItem {
    productId: string; 
    productName: string; 
    unit: EnumProductUnit;
    quantity: number; 
    unitPrice: number;
}

export interface IOrderPayment {
    paymentMethodId: string; 
    paymentMethodName: EnumPaymentMethodType;
    installments: number; 
    amount: number;
}

export interface IOrder {
    id: string; 
    customerName: string; 
    status: EnumOrderStatus;
    items: IOrderItem[]; 
    payments: IOrderPayment[]; 
    createdAt: string;
}