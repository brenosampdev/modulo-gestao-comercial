import { z } from 'zod'
import { PRODUCT_UNITS } from '@/types/IProduct'

export const productSchema = z.object({
    name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
    description: z.string().optional().default(''),
    unit: z.enum(PRODUCT_UNITS),
    price: z.number().positive('Preço deve ser maior que zero'),
    stock: z.number().min(0, 'Estoque não pode ser negativo'),
    active: z.boolean(),
})

export type ProductFormValues = z.infer<typeof productSchema>
