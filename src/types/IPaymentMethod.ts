export type EnumPaymentMethodType =
    'money' | 'credit_card' | 'debit_card' | 'pix' | 'boleto';

 export interface IPaymentMethod {
    id: string;
    name: string;
    type: EnumPaymentMethodType;
    maxInstallments: number; // 1 = à vista
    active: boolean;
}
