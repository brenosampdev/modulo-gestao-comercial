import type { EnumPaymentMethodType } from "@/types/IPaymentMethod";
import type { EnumProductUnit } from "@/types/IProduct";

export type EnumOrderStatus = 'pending' | 'approved' | 'shipped' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<EnumOrderStatus, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    shipped: 'Enviado',
    cancelled: 'Cancelado',
}

export const ORDER_STATUS_COLORS: Record<EnumOrderStatus, string> = {
    pending: 'orange',
    approved: 'blue',
    shipped: 'green',
    cancelled: 'red',
}

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