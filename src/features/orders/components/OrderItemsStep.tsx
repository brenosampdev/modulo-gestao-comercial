import { Controller, useFieldArray, useWatch, type UseFormReturn } from 'react-hook-form'
import { ORDER_STATUS_LABELS } from '@/types/IOrder'
import type { IProduct } from '@/types/IProduct'
import type { OrderFormValues } from '@/features/orders/ordersSchema'
import { formatCurrency } from '@/shared/utils/formatters'
import { Alert, Button, Card, Col, Form, Input, InputNumber, Row, Select, Tag, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

interface OrderItemsStepProps {
    form: UseFormReturn<OrderFormValues>
    products: IProduct[]
}

const statusOptions = [
    { value: 'pending', label: ORDER_STATUS_LABELS.pending },
    { value: 'approved', label: ORDER_STATUS_LABELS.approved },
]

function OrderItemsStep({ form, products }: OrderItemsStepProps) {
    const { control, setValue, formState } = form
    const { fields, append, remove } = useFieldArray({ control, name: 'items' })
    const watchedItems = useWatch({ control, name: 'items' })

    const productOptions = products.map(product => ({
        value: product.id,
        label: `${product.name} (${product.unit})`,
    }))

    const handleProductChange = (productId: string, index: number) => {
        const product = products.find(product => product.id === productId)
        if (product) {
            setValue(`items.${index}.unitPrice`, product.price)
        }
    }

    const itemsError = formState.errors.items
    const errorMessage =
        itemsError?.message ??
        itemsError?.root?.message ??
        itemsError?.[0]?.productId?.message

    return (
        <>
            {errorMessage && (
                <Alert type="error" showIcon title={errorMessage} style={{ marginBottom: 16 }} />
            )}

            <Card title="Dados do pedido" style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                    <Col span={18}>
                        <Controller
                            name="customerName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Nome do cliente"
                                    required
                                    validateStatus={fieldState.error ? 'error' : ''}
                                    help={fieldState.error?.message}
                                >
                                    <Input 
                                        {...field}
                                        placeholder="Digite o nome do cliente" 
                                        maxLength={75}
                                        />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={6}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Status inicial"
                                    validateStatus={fieldState.error ? 'error' : ''}
                                    help={fieldState.error?.message}
                                >
                                    <Select
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={statusOptions}
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Card>

            <Card title="Itens do pedido">
                <Row gutter={8} style={{ marginBottom: 8, fontWeight: 600 }}>
                    <Col span={9}>Produto</Col>
                    <Col span={3}>Qtd.</Col>
                    <Col span={3}>Unidade</Col>
                    <Col span={4} style={{ textAlign: 'right' }}>Preço unit.</Col>
                    <Col span={4} style={{ textAlign: 'right' }}>Subtotal</Col>
                    <Col span={1}></Col>
                </Row>

                {fields.map((field, index) => {
                    const currentItem = watchedItems[index]
                    const product = products.find(product => product.id === currentItem?.productId)
                    const subtotal = (currentItem?.quantity ?? 0) * (currentItem?.unitPrice ?? 0)

                    return (
                        <Row gutter={8} key={field.id} align="middle" style={{ marginBottom: 8 }}>
                            <Col span={9}>
                                <Controller
                                    name={`items.${index}.productId`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Select
                                            value={field.value || undefined}
                                            onChange={(val) => {
                                                field.onChange(val)
                                                handleProductChange(val, index)
                                            }}
                                            options={productOptions}
                                            placeholder="Selecionar produto"
                                            status={fieldState.error ? 'error' : undefined}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                />
                            </Col>
                            <Col span={3}>
                                <Controller
                                    name={`items.${index}.quantity`}
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            value={field.value}
                                            onChange={(val) => field.onChange(val ?? 1)}
                                            min={1}
                                            max={9999999.99}
                                            step={1}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                />
                            </Col>
                            <Col span={3}>
                                {product ? <Tag>{product.unit}</Tag> : <Typography.Text type="secondary">—</Typography.Text>}
                            </Col>
                            <Col span={4} style={{ textAlign: 'right' }}>
                                {product ? formatCurrency(product.price) : <Typography.Text type="secondary">—</Typography.Text>}
                            </Col>
                            <Col span={4} style={{ textAlign: 'right' }}>
                                {product ? formatCurrency(subtotal) : <Typography.Text type="secondary">—</Typography.Text>}
                            </Col>
                            <Col span={1}>
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                />
                            </Col>
                        </Row>
                    )
                })}

                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => append({ productId: '', quantity: 1, unitPrice: 0 })}
                    block
                    style={{ marginTop: 8 }}
                >
                    Adicionar item
                </Button>
            </Card>
        </>
    )
}

export default OrderItemsStep
