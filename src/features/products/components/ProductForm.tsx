import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, InputNumber, Select, Switch, Button, Space } from 'antd'
import type { z } from 'zod'
import { PRODUCT_UNITS, UNIT_LABELS } from '@/types/IProduct'
import { productSchema, type ProductFormValues } from '@/features/products/productsSchema'

interface ProductFormProps {
    defaultValues: ProductFormValues
    onSubmit: (data: ProductFormValues) => void
    onCancel: () => void
}

const unitOptions = PRODUCT_UNITS.map((unit) => ({
    value: unit,
    label: `${unit} - ${UNIT_LABELS[unit]}`,
}))

type ProductFormInput = z.input<typeof productSchema>

function ProductForm({ defaultValues, onSubmit, onCancel }: ProductFormProps) {
    const { control, handleSubmit } = useForm<ProductFormInput, void, ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues,
    })

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Nome"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <Input 
                        maxLength={100}
                        showCount
                        placeholder='Digite o nome do produto'
                        {...field} />
                    </Form.Item>
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Descrição (opcional)"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <Input.TextArea
                            {...field}
                            placeholder="Descrição opcional"
                            showCount
                            maxLength={300}
                            rows={4}
                        />
                    </Form.Item>
                )}
            />

            <Controller
                name="unit"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Unidade"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <Select
                            value={field.value}
                            onChange={field.onChange}
                            options={unitOptions}
                        />
                    </Form.Item>
                )}
            />

            <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Preço unitário"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <InputNumber
                            value={field.value}
                            onChange={(val) => field.onChange(val ?? 0)}
                            prefix="R$"
                            decimalSeparator=","
                            min={0}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                )}
            />

            <Controller
                name="stock"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label="Estoque inicial"
                        validateStatus={fieldState.error ? 'error' : ''}
                        help={fieldState.error?.message}
                    >
                        <InputNumber
                            value={field.value}
                            onChange={(val) => field.onChange(val ?? 0)}
                            min={0}
                            step={1}
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
                        <Switch
                            checked={field.value}
                            onChange={field.onChange}
                        />
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

export default ProductForm
