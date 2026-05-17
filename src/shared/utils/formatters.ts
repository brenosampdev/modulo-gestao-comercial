import { format, isValid, parseISO } from 'date-fns'
import type { IOrder, IOrderItem, IOrderPayment } from "../../types/IOrder";

function formatDate(date: string): string {
    const normalizeDate = date.trim()
    
    if (!isValid(parseISO(normalizeDate)) || normalizeDate.length !== 19) {
        return 'Data inválida'
    }
    
    return format(normalizeDate, "dd/MM/yyyy 'às' HH:mm")
}

function calcOrderTotal(items: IOrderItem[]): number {
    const total = items.reduce((totalAmount: number, item: IOrderItem) => {
        return totalAmount + item.quantity * item.unitPrice
    }, 0);
    
    return Math.round(total * 100) / 100;
}

function calcPaymentTotal(payment: IOrderPayment[]): number {
    const sumPayments = payment.reduce((total: number, amount: IOrderPayment) => {
        return (total + amount.amount)
    }, 0)
    
     return Math.round(sumPayments * 100) / 100
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

function calcInstallmentValue(total: number, installments: number): number {
    return Math.round((total / installments) * 100) / 100;
}

function isPaymentComplete(order: IOrder): boolean {
    const sumItems = calcOrderTotal(order.items)
    const sumPayments = calcPaymentTotal(order.payments)

    if (sumItems == sumPayments) {
        return true
    }

    return false
}

export {
    formatDate,
    calcOrderTotal,
    calcPaymentTotal,
    formatCurrency,
    calcInstallmentValue,
    isPaymentComplete
}