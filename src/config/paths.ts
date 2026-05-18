export const paths = {
    home: {
        path: '/',
        getHref: () => '/',
    },
    products: {
        list: {
            path: '/products',
            getHref: () => '/products',
        },
        new: {
            path: '/products/new',
            getHref: () => '/products/new',
        },
    },
    paymentMethods: {
        list: {
            path: '/payment-methods',
            getHref: () => '/payment-methods',
        },
        new: {
            path: '/payment-methods/new',
            getHref: () => '/payment-methods/new',
        },
    },
    orders: {
        list: {
            path: '/orders',
            getHref: () => '/orders',
        },
        new: {
            path: '/orders/new',
            getHref: () => '/orders/new',
        },
    },
} as const
