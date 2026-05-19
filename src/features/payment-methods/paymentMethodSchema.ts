import { z } from 'zod'
import { PAYMENT_METHOD_TYPES } from '@/types/IPaymentMethod'

export const paymentMethodSchema = z.object({
    name: z.string().min(3, 'Método de Pagamento deve ter ao menos 3 caracteres'),
    type: z.enum(PAYMENT_METHOD_TYPES),
    maxInstallments: z.number().int().min(1).max(24),
    active: z.boolean().default(true),
})

export type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>
