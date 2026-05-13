export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number; // preço unitário
    unit: string; // "un", "kg", "cx", "m", "l"
    stock: number;
    active: boolean;
    createdAt: string; // ISO 8601
}
