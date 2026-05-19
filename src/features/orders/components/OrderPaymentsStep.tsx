import { Controller, useFieldArray, useWatch, type UseFormReturn } from 'react-hook-form'
import type { IOrderItem, IOrderPayment } from '@/types/IOrder'
import type { IPaymentMethod } from '@/types/IPaymentMethod'
import type { OrderFormValues } from '@/features/orders/ordersSchema'
import {
    calcInstallmentValue,
    calcOrderTotal,
    calcPaymentTotal,
    formatCurrency,
} from '@/shared/utils/formatters'
import { Alert, Button, Card, Col, Flex, InputNumber, Row, Select, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

interface OrderPaymentsStepProps {
    form: UseFormReturn<OrderFormValues>
    paymentMethods: IPaymentMethod[]
}

function OrderPaymentsStep({ form, paymentMethods }: OrderPaymentsStepProps) {
    const { control, setValue, formState } = form
    const { fields, append, remove } = useFieldArray({ control, name: 'payments' })

    const watchedItems = useWatch({ control, name: 'items' })
    const watchedPayments = useWatch({ control, name: 'payments' })
    

    const methodOptions = paymentMethods.map(pm => ({ value: pm.id, label: pm.name }))

    const handleMethodChange = (methodId: string, index: number) => {
        const method = paymentMethods.find(paymentMethod => paymentMethod.id === methodId)
        if (method && method.type !== 'credit_card') {
            setValue(`payments.${index}.installments`, 1)
        }
    }

    const total = calcOrderTotal(watchedItems as IOrderItem[])
    const informado = calcPaymentTotal(watchedPayments as IOrderPayment[])
    const diff = total - informado

    const paymentsError = formState.errors.payments
    const errorMessage =
        typeof paymentsError?.message === 'string'
            ? paymentsError.message
            : paymentsError?.root?.message

    return (
        <Row gutter={16}>
            <Col span={16}>
                {errorMessage && (
                    <Alert type="error" showIcon title={errorMessage} style={{ marginBottom: 16 }} />
                )}

                <Card title="Pagamentos">
                    {fields.length === 0 ? (
                        <Typography.Text
                            type="secondary"
                            style={{ display: 'block', textAlign: 'center', padding: 24 }}
                        >
                            Nenhum pagamento adicionado.
                        </Typography.Text>
                    ) : (
                        <>
                            <Row gutter={8} style={{ marginBottom: 8, fontWeight: 600 }}>
                                <Col span={8}>Forma de pagamento</Col>
                                <Col span={4}>Parcelas</Col>
                                <Col span={5}>Valor (R$)</Col>
                                <Col span={6}>Valor por parcela</Col>
                                <Col span={1}></Col>
                            </Row>

                            {fields.map((field, index) => {
                                const current = watchedPayments[index]
                                const method = paymentMethods.find(paymentMethod => paymentMethod.id === current?.paymentMethodId)
                                const isCreditCard = method?.type === 'credit_card'
                                const installmentValue = current
                                    ? calcInstallmentValue(current.amount ?? 0, current.installments ?? 1)
                                    : 0

                                return (
                                    <Row gutter={8} key={field.id} align="middle" style={{ marginBottom: 8 }}>
                                        <Col span={8}>
                                            <Controller
                                                name={`payments.${index}.paymentMethodId`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Select
                                                        value={field.value || undefined}
                                                        onChange={(val) => {
                                                            field.onChange(val)
                                                            handleMethodChange(val, index)
                                                        }}
                                                        options={methodOptions}
                                                        placeholder="Selecionar"
                                                        status={fieldState.error ? 'error' : undefined}
                                                        style={{ width: '100%' }}
                                                    />
                                                )}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <Controller
                                                name={`payments.${index}.installments`}
                                                control={control}
                                                render={({ field }) => (
                                                    <InputNumber
                                                        value={field.value}
                                                        onChange={(val) => field.onChange(val ?? 1)}
                                                        min={1}
                                                        max={method?.maxInstallments ?? 1}
                                                        disabled={!isCreditCard}
                                                        style={{ width: '100%' }}
                                                    />
                                                )}
                                            />
                                        </Col>
                                        <Col span={5}>
                                            <Controller
                                                name={`payments.${index}.amount`}
                                                control={control}
                                                render={({ field }) => (
                                                    <InputNumber
                                                        value={field.value}
                                                        onChange={(val) => field.onChange(val ?? 0)}
                                                        min={0}
                                                        max={9999999.99}
                                                        prefix="R$"
                                                        decimalSeparator=","
                                                        style={{ width: '100%' }}
                                                    />
                                                )}
                                            />
                                        </Col>
                                        <Col span={6}>{formatCurrency(installmentValue)}</Col>
                                        <Col span={1}>
                                            <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(index)}
                                            />
                                        </Col>
                                    </Row>
                                )
                            })}
                        </>
                    )}

                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => append({ paymentMethodId: '', installments: 1, amount: 0 })}
                        block
                        style={{ marginTop: 8 }}
                    >
                        Adicionar pagamento
                    </Button>
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Totalização">
                    <Flex vertical gap={16}>
                        <div>
                            <Typography.Text type="secondary">Total do pedido</Typography.Text>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                {formatCurrency(total)}
                            </Typography.Title>
                        </div>
                        <div>
                            <Typography.Text type="secondary">Total informado</Typography.Text>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                {formatCurrency(informado)}
                            </Typography.Title>
                        </div>
                        <div>
                            <Typography.Text type="secondary">Diferença</Typography.Text>
                            <Typography.Title
                                level={5}
                                style={{ margin: 0 }}
                                type={diff === 0 ? 'success' : 'danger'}
                            >
                                {diff > 0 ? '−' : diff < 0 ? '+' : ''}
                                {formatCurrency(Math.abs(diff))}
                            </Typography.Title>
                            {diff !== 0 && (
                                <Typography.Text type="danger" style={{ fontSize: 12 }}>
                                    {diff > 0 ? 'Valor abaixo do total do pedido' : 'Valor acima do total do pedido'}
                                </Typography.Text>
                            )}
                        </div>
                    </Flex>
                </Card>
            </Col>
        </Row>
    )
}

export default OrderPaymentsStep
