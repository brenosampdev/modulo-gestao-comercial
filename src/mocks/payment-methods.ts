import type { IPaymentMethod } from "@/types/IPaymentMethod";

export const mockPaymentMethods: IPaymentMethod[] = [
    {
        id: '37760a68-71ed-4a40-9b70-9ff88860bc8d',
        name: 'Cartão de Crédito',
        type: 'credit_card',
        maxInstallments: 12,
        active: true
    },
    {
        id: '3b7b54d3-393e-4174-91f6-698135b0d05f',
        name: 'Cartão de Débito',
        type: 'debit_card',
        maxInstallments: 1,
        active: true
    },
    {
        id: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
        name: 'PIX',
        type: 'pix',
        maxInstallments: 1,
        active: true
    },
    {
        id: '445eb2af-b330-42c9-b27e-79cc62fd369d',
        name: 'Boleto Bancário',
        type: 'boleto',
        maxInstallments: 1,
        active: false
    },
    {
        id: 'c1e5ea10-d6c2-4b9b-b954-fd2b438ed793',
        name: 'Dinheiro',
        type: 'money',
        maxInstallments: 1,
        active: true
    }
]
