export const PRODUCT_UNITS = ['un', 'kg', 'cx', 'm', 'l'] as const

export type EnumProductUnit = (typeof PRODUCT_UNITS)[number]

export const UNIT_LABELS: Record<EnumProductUnit, string> = {
    un: 'Unidade',
    kg: 'Quilograma',
    cx: 'Caixa',
    m: 'Metro',
    l: 'Litro',
}

export interface IProduct {
    id: string
    name: string
    description: string
    price: number
    unit: EnumProductUnit
    stock: number
    active: boolean
    createdAt: string
}
