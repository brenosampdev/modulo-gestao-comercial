export type IPaymentMethodType =
    'money' | 'credit_card' | 'debit_card' | 'pix' | 'boleto';

 export interface IPaymentMethod {
    id: string;
    name: string;
    type: IPaymentMethodType;
    maxInstallments: number; // 1 = à vista
    active: boolean;
}
