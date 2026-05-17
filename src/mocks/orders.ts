import type { IOrder } from "@/types/IOrder";

export const mockOrders: IOrder[] = [
    {
        id: '420afe5c-18cf-4e23-9052-5932c3ec7f5e',
        customerName: 'Breno Sampaio',
        status: 'pending',
        items: [
            {
                productId: '1d2523f7-7808-4ea4-8c22-24d238df7286',
                productName: 'Caneta BIC Azul',
                unit: 'un',
                quantity: 10,
                unitPrice: 2.50
            },
            {
                productId: '3b9e5c2d-1a4f-4b8c-9d6e-2f3a4b5c6d7e',
                productName: 'Cerveja Heineken Long Neck',
                unit: 'cx',
                quantity: 2,
                unitPrice: 89.90
            },
        ],
        payments: [
            {
                paymentMethodId: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 4.8
            },
            {
                paymentMethodId: '37760a68-71ed-4a40-9b70-9ff88860bc8d',
                paymentMethodName: 'credit_card',
                installments: 2,
                amount: 200
            },

        ],
        createdAt: '2026-05-12T09:23:47'
    },
    {
        id: '7f75a285-b2b4-435f-a0d6-ceac3ae08215',
        customerName: 'Welington Brajan',
        status: 'approved',
        items: [
            {
                productId: '3b9e5c2d-1a4f-4b8c-9d6e-2f3a4b5c6d7e',
                productName: 'Cerveja Heineken Long Neck',
                unit: 'cx',
                quantity: 4,
                unitPrice:  89.90
            },
            {
                productId: '4c0f6d3e-2b5a-4c9d-8e7f-3a4b5c6d7e8f',
                productName: 'Cabo Elétrico 2,5mm',
                unit: 'm',
                quantity: 50,
                unitPrice: 4.20
            }
        ],
        payments: [
            {
                paymentMethodId: '37760a68-71ed-4a40-9b70-9ff88860bc8d',
                paymentMethodName: 'credit_card',
                installments: 4,
                amount: 569.6
            }
        ],
        createdAt: '2026-04-28T16:47:12'
    },
    {
        id: 'c2a4b8d6-3e5f-4a1b-9c8d-7e2f3a5b6c4d',
        customerName: 'Rodrigo Brajan',
        status: 'approved',
        items: [
            {
                productId: '2a8f4b1c-9d3e-4a7b-8c5f-1e2d3f4a5b6c',
                productName: 'Arroz Branco Tipo 1',
                unit: 'kg',
                quantity: 4,
                unitPrice: 6.90
            }
        ],
        payments: [
            {
                paymentMethodId: '3b7b54d3-393e-4174-91f6-698135b0d05f',
                paymentMethodName: 'debit_card',
                installments: 1,
                amount: 27.6
            }
        ],
        createdAt: '2026-04-15T11:05:38'
    },
    {
        id: '9b3e1f7c-5a2d-4b8e-9f3c-6a7b9d5c2e8f',
        customerName: 'Ada Lovelace',
        status: 'shipped',
        items: [
            {
                productId: '6e2b8f5a-4d7c-4e1f-8a9b-5c6d7e8f9a0b',
                productName: 'Caderno Universitário 200fls',
                unit: 'un',
                quantity: 1,
                unitPrice: 24.90
            },
            {
                productId: '1d2523f7-7808-4ea4-8c22-24d238df7286',
                productName: 'Caneta BIC Azul',
                unit: 'un',
                quantity: 5,
                unitPrice: 2.50
            }
        ],
        payments: [
            {
                paymentMethodId: '3b7b54d3-393e-4174-91f6-698135b0d05f',
                paymentMethodName: 'debit_card',
                installments: 1,
                amount: 37.40
            }
        ],
        createdAt: '2026-03-08T08:30:21'
    },
    {
        id: 'e6c4d8a2-1b3f-4e5d-9a7c-2f8b3e6c1d4a',
        customerName: 'Gustavo Guanabará',
        status: 'cancelled',
        items: [
            {
                productId: '7f3c9a6b-5e8d-4f2a-9b0c-6d7e8f9a0b1c',
                productName: 'Feijão Carioca',
                unit: 'kg',
                quantity: 3,
                unitPrice: 8.90
            }
        ],
        payments: [
            {
                paymentMethodId: '445eb2af-b330-42c9-b27e-79cc62fd369d',
                paymentMethodName: 'boleto',
                installments: 1,
                amount: 26.7
            }
        ],
        createdAt: '2026-04-02T17:55:59'
    },
    {
        id: '4d8a2b6e-9c3f-4d1a-9b7e-8c2a3d6f9e1b',
        customerName: 'Fernanda Kipper',
        status: 'shipped',
        items: [
            {
                productId: '3b9e5c2d-1a4f-4b8c-9d6e-2f3a4b5c6d7e',
                productName: 'Cerveja Heineken Long Neck',
                unit: 'cx',
                quantity: 10,
                unitPrice: 89.90
            }
        ],
        payments: [
            {
                paymentMethodId: 'c1e5ea10-d6c2-4b9b-b954-fd2b438ed793',
                paymentMethodName: 'money',
                installments: 1,
                amount: 500
            },
            {
                paymentMethodId: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 399
            }
        ],
        createdAt: '2026-02-19T10:12:03'
    },
    {
        id: 'f3b9d5c1-7a2e-4b6f-9c8a-1d9e5f2b7c4a',
        customerName: 'Mayk Brito',
        status: 'pending',
        items: [
            {
                productId: '8a4d0b7c-6f9e-4a3b-8c1d-7e8f9a0b1c2d',
                productName: 'Detergente Concentrado',
                unit: 'l',
                quantity: 15,
                unitPrice: 12.90
            },
            {
                productId: '6e2b8f5a-4d7c-4e1f-8a9b-5c6d7e8f9a0b',
                productName: 'Caderno Universitário 200fls',
                unit: 'un',
                quantity: 5,
                unitPrice: 24.90
            }
        ],
        payments: [
            {
                paymentMethodId: '37760a68-71ed-4a40-9b70-9ff88860bc8d',
                paymentMethodName: 'credit_card',
                installments: 2,
                amount: 318.00
            }
        ],
        createdAt: '2026-05-13T15:40:26'
    },
    {
        id: '1c5e9a3d-8b4f-4c7d-9a6e-5b3c1f8d9a2e',
        customerName: 'Linus Torvalds',
        status: 'approved',
        items: [
            {
                productId: '4c0f6d3e-2b5a-4c9d-8e7f-3a4b5c6d7e8f',
                productName: 'Cabo Elétrico 2,5mm',
                unit: 'm',
                quantity: 100,
                unitPrice: 4.20
            }
        ],
        payments: [
            {
                paymentMethodId: '445eb2af-b330-42c9-b27e-79cc62fd369d',
                paymentMethodName: 'boleto',
                installments: 1,
                amount: 220
            },
            {
                paymentMethodId: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 200
            }
        ],
        createdAt: '2026-04-22T13:18:54'
    },
    {
        id: '8e2c4a9b-3f5d-4e1c-9a7b-9d2f5c8e3a4b',
        customerName: 'Robert C Martin',
        status: 'approved',
        items: [
            {
                productId: '1d2523f7-7808-4ea4-8c22-24d238df7286',
                productName: 'Caneta BIC Azul',
                unit: 'un',
                quantity: 200,
                unitPrice: 2.50
            }
        ],
        payments: [
            {
                paymentMethodId: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 300
            },
            {
                paymentMethodId: 'c1e5ea10-d6c2-4b9b-b954-fd2b438ed793',
                paymentMethodName: 'money',
                installments: 1,
                amount: 200
            }
        ],
        createdAt: '2026-03-30T11:50:09'
    },
    {
        id: 'a7d3c1f8-5b9e-4a4d-9c2f-3e8b9d1a5c4f',
        customerName: 'Fabio Akita',
        status: 'pending',
        items: [
            {
                productId: '4c0f6d3e-2b5a-4c9d-8e7f-3a4b5c6d7e8f',
                productName: 'Cabo Elétrico 2,5mm',
                unit: 'm',
                quantity: 300,
                unitPrice: 4.20
            }
        ],
        payments: [
            {
                paymentMethodId: '37760a68-71ed-4a40-9b70-9ff88860bc8d',
                paymentMethodName: 'credit_card',
                installments: 6,
                amount: 1260
            }
        ],
        createdAt: '2026-05-10T19:25:42'
    },
    {
        id: '2f8c4d6a-9e1b-4f3a-9c7d-8a4b1e6f9c3d',
        customerName: 'Alan Turing',
        status: 'cancelled',
        items: [
            {
                productId: '5d1a7e4f-3c6b-4d0e-9f8a-4b5c6d7e8f9a',
                productName: 'Óleo de Soja Soya',
                unit: 'l',
                quantity: 5,
                unitPrice: 7.50
            }
        ],
        payments: [
            {
                paymentMethodId: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 37.5
            }
        ],
        createdAt: '2026-03-17T14:08:31'
    }
]
