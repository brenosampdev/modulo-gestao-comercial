import type { IProduct } from "@/types/IProduct";

export const mockProducts: IProduct[] = [
    {
        id: '1d2523f7-7808-4ea4-8c22-24d238df7286',
        name: 'Caneta BIC Azul',
        description: 'Caneta esferográfica azul, ponta média 1.0mm',
        price: 2.50,
        unit: 'un',
        stock: 250,
        active: true,
        createdAt: '2026-01-10T09:00:00'
    },
    {
        id: '2a8f4b1c-9d3e-4a7b-8c5f-1e2d3f4a5b6c',
        name: 'Arroz Branco Tipo 1',
        description: 'Arroz branco tipo 1, vendido a granel',
        price: 6.90,
        unit: 'kg',
        stock: 120,
        active: true,
        createdAt: '2026-01-15T10:30:00'
    },
    {
        id: '3b9e5c2d-1a4f-4b8c-9d6e-2f3a4b5c6d7e',
        name: 'Cerveja Heineken Long Neck',
        description: 'Caixa com 12 garrafas long neck 330ml',
        price: 89.90,
        unit: 'cx',
        stock: 35,
        active: true,
        createdAt: '2026-02-01T14:20:00'
    },
    {
        id: '4c0f6d3e-2b5a-4c9d-8e7f-3a4b5c6d7e8f',
        name: 'Cabo Elétrico 2,5mm',
        description: 'Cabo flexível 2,5mm² para instalações elétricas',
        price: 4.20,
        unit: 'm',
        stock: 500,
        active: true,
        createdAt: '2026-02-12T08:15:00'
    },
    {
        id: '5d1a7e4f-3c6b-4d0e-9f8a-4b5c6d7e8f9a',
        name: 'Óleo de Soja Soya',
        description: 'Óleo de soja refinado, garrafa de 900ml',
        price: 7.50,
        unit: 'l',
        stock: 80,
        active: true,
        createdAt: '2026-02-20T11:45:00'
    },
    {
        id: '6e2b8f5a-4d7c-4e1f-8a9b-5c6d7e8f9a0b',
        name: 'Caderno Universitário 200fls',
        description: 'Caderno espiral 200 folhas pautadas, capa dura',
        price: 24.90,
        unit: 'un',
        stock: 60,
        active: true,
        createdAt: '2026-03-05T16:00:00'
    },
    {
        id: '7f3c9a6b-5e8d-4f2a-9b0c-6d7e8f9a0b1c',
        name: 'Feijão Carioca',
        description: 'Feijão carioca tipo 1, embalagem a granel',
        price: 8.90,
        unit: 'kg',
        stock: 0,
        active: false,
        createdAt: '2025-12-18T13:30:00'
    },
    {
        id: '8a4d0b7c-6f9e-4a3b-8c1d-7e8f9a0b1c2d',
        name: 'Detergente Concentrado',
        description: 'Detergente líquido neutro concentrado, frasco 5L',
        price: 12.90,
        unit: 'l',
        stock: 45,
        active: true,
        createdAt: '2026-03-22T10:00:00'
    }
]
