export type EnumOrderStatus = 'pending' | 'approved' | 'shipped' | 'cancelled';

export interface IOrderItem {
    productId: string; 
    productName: string; 
    unit: string;
    quantity: number; 
    unitPrice: number;
}

export interface IOrderPayment {
    paymentMethodId: string; 
    paymentMethodName: string;
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