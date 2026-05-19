export const PAYMENT_METHOD_TYPES = [
    'money',
    'credit_card',
    'debit_card',
    'pix',
    'boleto',
] as const

export type EnumPaymentMethodType = (typeof PAYMENT_METHOD_TYPES)[number]

export const PAYMENT_TYPE_LABELS: Record<EnumPaymentMethodType, string> = {
    money: 'Dinheiro',
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    pix: 'PIX',
    boleto: 'Boleto Bancário',
}

export const PAYMENT_TYPE_COLORS: Record<EnumPaymentMethodType, string> = {
    money: 'green',
    credit_card: 'blue',
    debit_card: 'cyan',
    pix: 'geekblue',
    boleto: 'orange',
}

export interface IPaymentMethod {
    id: string
    name: string
    type: EnumPaymentMethodType
    maxInstallments: number
    active: boolean
}
