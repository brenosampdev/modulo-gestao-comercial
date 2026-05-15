import { format, isValid, parseISO } from 'date-fns'
import type { IOrder, IOrderItem, IOrderPayment } from "../../types/IOrder";

function formatDate(date: string): string {
    const normalizeDate = date.trim()
    
    if (!isValid(parseISO(normalizeDate)) || normalizeDate.length < 19) {
        return 'Data inválida'
    }
    
    return format(normalizeDate, "dd/MM/yyyy 'às' HH:mm")
}

function calcOrderTotal(items: IOrderItem[]): number {
    const total = items.reduce((totalAmount: number, item: IOrderItem) => {
        return totalAmount + (item.quantity * item.unitPrice);
    }, 0);
    
    return total
}

function calcPaymentTotal(payment: IOrderPayment[]): number {
    const sumPayments = payment.reduce((total: number, amount: IOrderPayment) => {
        return total + amount.amount
    }, 0)
    
    return sumPayments
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

function calcInstallmentValue(total: number, installments: number): number {
    if (installments < 1) {
        return 1
    }

    return Math.round((total / installments) * 100) / 100;
}

function isPaymentComplete(order: IOrder): boolean {
    const sumItems = calcOrderTotal(order.items)
    const sumPayments = calcPaymentTotal(order.payments)
    
    if (sumItems === sumPayments) {
        return true
    }

    return false
}

export {
    formatDate,
    calcOrderTotal,
    formatCurrency,
    calcInstallmentValue,
    isPaymentComplete
}