import type { IOrder, IOrderItem } from "../types/IOrder";

function formatDate(date: string) {
    // TODO
}

function calcOrderTotal(items: IOrderItem[]) {
    // TODO
}

function formatCurrency(value: number) {
    // TODO
}

function calcInstallmentValue(value: number, installment: number) {
    // TODO
}

function isPaymentCompleted(order: IOrder) {
    // TODO
}

export {
    formatDate,
    calcOrderTotal,
    formatCurrency,
    calcInstallmentValue,
    isPaymentCompleted
}