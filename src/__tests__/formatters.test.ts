import { calcInstallmentValue, calcOrderTotal, calcPaymentTotal, formatCurrency, formatDate, isPaymentComplete } from '../shared/utils/formatters';
import type { IOrder, IOrderItem, IOrderPayment } from '../types/IOrder';

const makeOrder = (items: IOrderItem[], payments: IOrderPayment[]): IOrder => ({
    id: 'test-id',
    customerName: 'Test Customer',
    status: 'pending',
    items,
    payments,
    createdAt: '2026-05-12T09:23:47'
})

describe('formatters', () => {
    describe('formatDate', () => {
        it('should return formatted date when input is valid ISO', () => {
            // Assert
            const input = '2026-05-12T09:23:47'
            const expected = '12/05/2026 às 09:23'
            // Act
            const result = formatDate(input)
            // Assert
            expect(result).toBe(expected)
        });
        it('should return sanatization date', () => {
            const input = '        2026-05-12T09:23:47        '
            const expected = '12/05/2026 às 09:23'

            const result = formatDate(input)

            expect(result).toBe(expected)
        });
        it('should return invalid date when date < 19 chars', () => {
            const input = '2026-05-12T09:23'
            const expected = 'Data inválida'

            const result = formatDate(input)

            expect(result).toBe(expected)
        });
        it('should return invalid date when date > 19 chars', () => {
            const input = '2026-05-12T09:23:47.123'
            const expected = 'Data inválida'

            const result = formatDate(input)

            expect(result).toBe(expected)
        });
        it('should return "Data inválida" when input is non-date string', () => {
            const input = 'abc'
            const expected = 'Data inválida'

            const result = formatDate(input)

            expect(result).toBe(expected)
        });
        it('should return "Data inválida" when input is empty', () => {
            const input = ''
            const expected = 'Data inválida'

            const result = formatDate(input)

            expect(result).toBe(expected)
        });
    })

    describe('calcOrderTotal', () => {
        it('should return quantity × unitPrice when items has one element', () => {
            const input: IOrderItem[] = [{
                productId: '1d2523f7-7808-4ea4-8c22-24d238df7286',
                productName: 'Caneta BIC Azul',
                unit: 'un',
                quantity: 30,
                unitPrice: 20
            }]
            const expected = 600

            const result = calcOrderTotal(input)

            expect(result).toBe(expected)
        });
        it('should return 0 when items is empty', () => {
            const input: IOrderItem[] = []
            const expected = 0

            const result = calcOrderTotal(input)

            expect(result).toBe(expected)
        });
        it('should check if items is a valid items', () => {
            const input: IOrderItem[] = [{
                productId: '1d2523f7-7808-4ea4-8c22-24d238df7286',
                productName: 'Caneta BIC Azul',
                unit: 'un',
                quantity: 3,
                unitPrice: 0.1
            }]
            const expected = 0.30

            const result = calcOrderTotal(input)

            expect(result).toBe(expected)
        });
        it('should sum quantity x unitPrice when items has elements', () => {
            const input: IOrderItem[] = [
                {
                    productId: '1',
                    productName: 'Caneta BIC Azul',
                    unit: 'un',
                    quantity: 10,
                    unitPrice: 25
                },
                {
                    productId: '2',
                    productName: 'Cerveja Heineken',
                    unit: 'cx',
                    quantity: 4,
                    unitPrice: 50
                },
                {
                    productId: '3',
                    productName: 'Cabo Elétrico',
                    unit: 'm',
                    quantity: 2,
                    unitPrice: 100
                }
            ]
            const expected = 650

            const result = calcOrderTotal(input)

            expect(result).toBe(expected)
        });
    })

    describe('calcPaymentTotal', () => {
        it('should return amount when has one payment', () => {
            const input: IOrderPayment[] = [{
                paymentMethodId: '1',
                paymentMethodName: 'credit_card',
                installments: 4,
                amount: 569.6
            }]
            const expected = 569.6

            const result = calcPaymentTotal(input)

            expect(result).toBe(expected)
        });
        it('should sum multiple payments', () => {
            const input: IOrderPayment[] = [
                {
                    paymentMethodId: 'c3962388-0ca6-4dfa-b138-9e808f2ad038',
                    paymentMethodName: 'pix',
                    installments: 1,
                    amount: 100
                },
                {
                    paymentMethodId: 'c1e5ea10-d6c2-4b9b-b954-fd2b438ed793',
                    paymentMethodName: 'money',
                    installments: 1,
                    amount: 200.50
                },
                {
                    paymentMethodId: '37760a68-71ed-4a40-9b70-9ff88860bc8d',
                    paymentMethodName: 'credit_card',
                    installments: 3,
                    amount: 50
                }
            ]
            const expected = 350.50

            const result = calcPaymentTotal(input)

            expect(result).toBe(expected)
        });
        it('should return 0 when payments is empty', () => {
            const input: IOrderPayment[] = []
            const expected = 0

            const result = calcPaymentTotal(input)

            expect(result).toBe(expected)
        });
    })

    describe('formatCurrency', () => {
        it('should format currency from spec', () => {
            const input = 1250.5
            const expected = /^R\$\s1\.250,50$/

            const result = formatCurrency(input)

            expect(result).toMatch(expected)
        });
        it('should format zero', () => {
            const input = 0
            const expected = /^R\$\s0,00$/

            const result = formatCurrency(input)

            expect(result).toMatch(expected)
        });
        it('should format negative value', () => {
            const input = -50
            const expected = /^-R\$\s50,00$/

            const result = formatCurrency(input)

            expect(result).toMatch(expected)
        });
        it('should format large value with thousand separator', () => {
            const input = 1234567.89
            const expected = /^R\$\s1\.234\.567,89$/

            const result = formatCurrency(input)

            expect(result).toMatch(expected)
        });
    })

    
    describe('calcInstallmentValue', () => {
        it('should calculate installment from spec', () => {
            const total = 1000
            const installments = 3
            const expected = 333.33

            const result = calcInstallmentValue(total, installments)

            expect(result).toBe(expected)
        });
        it('should calculate exact division', () => {
            const total = 1200
            const installments = 4
            const expected = 300

            const result = calcInstallmentValue(total, installments)

            expect(result).toBe(expected)
        });
        it('should return total when one installment', () => {
            const total = 1000
            const installments = 1
            const expected = 1000

            const result = calcInstallmentValue(total, installments)

            expect(result).toBe(expected)
        });
    })

    describe('isPaymentComplete', () => {
        it('should return true when payment covers total with one method', () => {
            const items: IOrderItem[] = [{
                productId: '1',
                productName: 'Caneta',
                unit: 'un',
                quantity: 10,
                unitPrice: 2.50
            }]
            const payments: IOrderPayment[] = [{
                paymentMethodId: '1',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 25
            }]
            const input = makeOrder(items, payments)
            const expected = true

            const result = isPaymentComplete(input)

            expect(result).toBe(expected)
        });
        it('should return false when payment is less than total', () => {
            const items: IOrderItem[] = [{
                productId: '1',
                productName: 'Caneta',
                unit: 'un',
                quantity: 10,
                unitPrice: 20
            }]
            const payments: IOrderPayment[] = [{
                paymentMethodId: '1',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 100
            }]
            const input = makeOrder(items, payments)
            const expected = false

            const result = isPaymentComplete(input)

            expect(result).toBe(expected)
        });
        it('should return true when payment is split across methods', () => {
            const items: IOrderItem[] = [{
                productId: '1',
                productName: 'Cabo',
                unit: 'm',
                quantity: 100,
                unitPrice: 5
            }]
            const payments: IOrderPayment[] = [
                {
                    paymentMethodId: '1',
                    paymentMethodName: 'pix',
                    installments: 1,
                    amount: 200
                },
                {
                    paymentMethodId: '2',
                    paymentMethodName: 'money',
                    installments: 1,
                    amount: 300
                }
            ]
            const input = makeOrder(items, payments)
            const expected = true

            const result = isPaymentComplete(input)

            expect(result).toBe(expected)
        });
        it('should return true with floating point imprecision', () => {
            const items: IOrderItem[] = [{
                productId: '1',
                productName: 'Item',
                unit: 'un',
                quantity: 3,
                unitPrice: 0.1
            }]
            const payments: IOrderPayment[] = [{
                paymentMethodId: '1',
                paymentMethodName: 'pix',
                installments: 1,
                amount: 0.30
            }]
            const input = makeOrder(items, payments)
            const expected = true

            const result = isPaymentComplete(input)

            expect(result).toBe(expected)
        });
    })
})
