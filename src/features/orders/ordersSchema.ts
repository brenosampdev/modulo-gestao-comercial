import { z } from 'zod'
import type { IOrder } from '@/types/IOrder'
import { isPaymentComplete } from '@/shared/utils/formatters'

const orderItemSchema = z.object({
    productId: z.string().min(1, 'Selecione um produto'),
    quantity: z.number().min(1, 'Quantidade mínima é 1'),
    unitPrice: z.number().positive(),
})

const orderPaymentSchema = z.object({
    paymentMethodId: z.string().min(1),
    installments: z.number().int().min(1),
    amount: z.number().positive(),
})

const orderBaseSchema = z.object({
    customerName: z.string().min(3, 'Nome deve ter ao menos 3 caracteres').max(100, 'Nome só pode conter nó maximo 100 caracteres.'),
    status: z.enum(['pending', 'approved']),
    items: z.array(orderItemSchema).min(1, 'Adicione ao menos 1 item'),
    payments: z.array(orderPaymentSchema)
        .min(1, 'Adicione ao menos um pagamento')
        .refine(
            (payments) => new Set(payments.map(payment => payment.paymentMethodId)).size === payments.length,
            { message: 'Forma de pagamento já adicionada' }
        ),
})

export const orderStep1Schema = orderBaseSchema.pick({
    customerName: true,
    status: true,
    items: true,
})

export const orderSchema = orderBaseSchema.refine(
    (data) => isPaymentComplete(data as IOrder),
    { message: 'Valor dos pagamentos difere do total do pedido', path: ['payments'] }
)

export type OrderFormValues = z.infer<typeof orderSchema>
