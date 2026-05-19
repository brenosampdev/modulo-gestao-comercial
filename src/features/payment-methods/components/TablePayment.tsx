import { App, Switch, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAppDispatch } from '@/app/hooks'
import { PAYMENT_TYPE_COLORS, PAYMENT_TYPE_LABELS, type EnumPaymentMethodType, type IPaymentMethod } from '@/types/IPaymentMethod'
import { switchStatus } from '@/features/payment-methods/paymentMethodSlice'

interface TablePaymentProps {
    payments: IPaymentMethod[]
}

function TablePayment({ payments }: TablePaymentProps) {
    const dispatch = useAppDispatch()
    const { message } = App.useApp()

    const handleToggle = (id: string, active: boolean) => {
        dispatch(switchStatus({ id, active }))
        if (active) {
            return message.success('Forma de pagamento ativada')
        }
        return message.info('Forma de pagamento inativada')
    }

    const dataColumns: ColumnsType<IPaymentMethod> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (type: EnumPaymentMethodType) => (
                <Tag color={PAYMENT_TYPE_COLORS[type]}>{PAYMENT_TYPE_LABELS[type]}</Tag>
            ),
        },
        {
            title: 'Máx. parcelas',
            dataIndex: 'maxInstallments',
            key: 'maxInstallments',
            render: (max: number) => (max === 1 ? 'À vista' : `${max}x`),
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            render: (_, record) => (
                <Switch
                    checked={record.active}
                    onChange={(checked) => handleToggle(record.id, checked)}
                />
            ),
        },
    ]

    return (
        <Table<IPaymentMethod>
            dataSource={payments}
            rowKey="id"
            columns={dataColumns}
            pagination={{ showTotal: (total) => `${total} formas de pagamento` }}
        />
    )
}

export default TablePayment
