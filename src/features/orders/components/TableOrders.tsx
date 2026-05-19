import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, type IOrder } from '@/types/IOrder'
import { calcOrderTotal, formatCurrency, formatDate, isPaymentComplete } from '@/shared/utils/formatters'
import { Button, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface TableOrdersProps {
    orders: IOrder[]
    onView: (id: string) => void
}

function TableOrders({ orders, onView }: TableOrdersProps) {
    const columns: ColumnsType<IOrder> = [
        {
            title: '# Pedido',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => <Typography.Text code>{id.slice(0, 8)}</Typography.Text>,
        },
        {
            title: 'Cliente',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Data',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => formatDate(createdAt),
        },
        {
            title: 'Total',
            key: 'total',
            align: 'right',
            render: (_, record) => formatCurrency(calcOrderTotal(record.items)),
        },
        {
            title: 'Pagamento',
            key: 'paymentStatus',
            render: (_, record) => {
                const complete = isPaymentComplete(record)
                return (
                    <Tag color={complete ? 'green' : 'orange'}>
                        {complete ? 'Completo' : 'Pendente'}
                    </Tag>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: IOrder['status']) => (
                <Tag color={ORDER_STATUS_COLORS[status]}>{ORDER_STATUS_LABELS[status]}</Tag>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => onView(record.id)}>Ver detalhes</Button>
            ),
        },
    ]

    return (
        <Table<IOrder>
            dataSource={orders}
            rowKey="id"
            columns={columns}
            pagination={{ showTotal: (total) => `${total} pedidos` }}
        />
    )
}

export default TableOrders
