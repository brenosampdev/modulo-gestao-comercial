import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm, useWatch } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IOrderItem, IOrderPayment } from '@/types/IOrder'
import { selectActiveProducts } from '@/features/products/productsSlice'
import { selectActivePaymentMethods } from '@/features/payment-methods/paymentMethodSlice'
import { added } from '@/features/orders/ordersSlice'
import { orderSchema, type OrderFormValues } from '@/features/orders/ordersSchema'
import { calcOrderTotal, formatCurrency } from '@/shared/utils/formatters'
import { paths } from '@/config/paths'
import { App, Button, Card, Flex, Steps, Typography } from 'antd'
import OrderItemsStep from '@/features/orders/components/OrderItemsStep'
import OrderPaymentsStep from '@/features/orders/components/OrderPaymentsStep'

const emptyOrder: OrderFormValues = {
    customerName: '',
    status: 'pending',
    items: [{ productId: '', quantity: 1, unitPrice: 0 }],
    payments: [],
}

function OrdersNewPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { message } = App.useApp()
    const products = useAppSelector(selectActiveProducts)
    const paymentMethods = useAppSelector(selectActivePaymentMethods)

    const [currentStep, setCurrentStep] = useState<0 | 1>(0)

    
    
    const form = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: emptyOrder,
        mode: 'onBlur',
    })
    const { control } = form
    const watchedItems = useWatch({ control, name: 'items' })
    const handleNext = async () => {
        const ok = await form.trigger(['customerName', 'status', 'items'])
        if (ok) setCurrentStep(1)
    }

    const handleBack = () => setCurrentStep(0)
    const handleCancel = () => navigate(paths.orders.list.getHref())

    const handleFinalSubmit = (formData: OrderFormValues) => {
        const items: IOrderItem[] = formData.items.map(item => {
            const product = products.find(product => product.id === item.productId)!
            return { ...item, productName: product.name, unit: product.unit }
        })
        const payments: IOrderPayment[] = formData.payments.map(pay => {
            const method = paymentMethods.find(paymentMethods => paymentMethods.id === pay.paymentMethodId)!
            return { ...pay, paymentMethodName: method.type }
        })
        dispatch(added({
            customerName: formData.customerName,
            status: formData.status,
            items,
            payments,
        }))
        message.success('Pedido criado com sucesso!')
        navigate(paths.orders.list.getHref())
    }

    return (
        <Card>
            <Typography.Title level={4} style={{ marginTop: 0 }}>Novo pedido</Typography.Title>
            <Steps
                current={currentStep}
                items={[
                    { title: 'Itens', description: 'Produtos e quantidades' },
                    { title: 'Pagamento', description: 'Formas de pagamento' },
                ]}
                style={{ marginBottom: 24 }}
            />

            <form onSubmit={form.handleSubmit(handleFinalSubmit)}>
                {currentStep === 0 && (
                    <OrderItemsStep form={form} products={products} />
                )}
                {currentStep === 1 && (
                    <OrderPaymentsStep form={form} paymentMethods={paymentMethods} />
                )}

                <Flex justify="space-between" align="center" style={{ marginTop: 24 }}>
                    {currentStep === 0 ? (
                        <>
                            <Typography.Text type="secondary">
                                Total do pedido:{' '}
                                <strong>
                                    {formatCurrency(calcOrderTotal((watchedItems || []) as IOrderItem[]))}
                                </strong>
                            </Typography.Text>
                            <Flex gap={8}>
                                <Button onClick={handleCancel}>Cancelar</Button>
                                <Button type="primary" onClick={handleNext}>Próximo →</Button>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleBack}>← Voltar</Button>
                            <Button type="primary" htmlType="submit">Finalizar pedido</Button>
                        </>
                    )}
                </Flex>
            </form>
        </Card>
    )
}

export default OrdersNewPage
