import { useEffect } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Form, Input, InputNumber, Select, Space, Switch } from 'antd'
import type { z } from 'zod'
import { PAYMENT_METHOD_TYPES, PAYMENT_TYPE_LABELS } from '@/types/IPaymentMethod'
import { paymentMethodSchema, type PaymentMethodFormValues } from '@/features/payment-methods/paymentMethodSchema'

interface PaymentMethodFormProps {
    defaultValues: PaymentMethodFormValues
    onSubmit: (data: PaymentMethodFormValues) => void
    onCancel: () => void
}

const typeOptions = PAYMENT_METHOD_TYPES.map(t => ({
    value: t,
    label: PAYMENT_TYPE_LABELS[t],
}))

type PaymentMethodFormInput = z.input<typeof paymentMethodSchema>

function PaymentMethodForm({ defaultValues, onSubmit, onCancel }: PaymentMethodFormProps) {
    const { control, handleSubmit, setValue } = useForm<PaymentMethodFormInput, void, PaymentMethodFormValues>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues,
    })

    const selectedType = useWatch({ control, name: 'type' })
    const isCreditCard = selectedType === 'credit_card'

    useEffect(() => {
        if (!isCreditCard) {
            setValue('maxInstallments', 1)
        }
    }, [isCreditCard, setValue])

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {!isCreditCard && (
                <Alert
                    type="info"
                    showIcon
                    message="Tipo selecionado não permite parcelamento. 'Máx. parcelas' fixado em 1."
                    style={{ marginBottom: 16 }}
                />
            )}

            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Nome"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <Input {...field} placeholder="Digite o nome da forma de pagamento" />
                    </Form.Item>
                )}
            />

            <Controller
                name="type"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Tipo"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <Select
                            value={field.value}
                            onChange={field.onChange}
                            options={typeOptions}
                        />
                    </Form.Item>
                )}
            />

            <Controller
                name="maxInstallments"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Máx. parcelas"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={
                            fieldState.error?.message ??
                            (!isCreditCard ? 'Disponível apenas para Cartão de Crédito.' : undefined)
                        }
                    >
                        <InputNumber
                            value={field.value}
                            onChange={(val) => field.onChange(val ?? 1)}
                            min={1}
                            max={24}
                            step={1}
                            disabled={!isCreditCard}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                )}
            />

            <Controller
                name="active"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Ativo (opcional)"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <Switch checked={field.value} onChange={field.onChange} />
                    </Form.Item>
                )}
            />

            <Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button type="primary" htmlType="submit">Salvar</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default PaymentMethodForm
