import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, type IOrderItem, type IOrderPayment } from '@/types/IOrder'
import { PAYMENT_TYPE_LABELS } from '@/types/IPaymentMethod'
import { useAppSelector } from '@/app/hooks'
import { selectOrderById } from '@/features/orders/ordersSlice'
import {
    calcInstallmentValue,
    calcOrderTotal,
    calcPaymentTotal,
    formatCurrency,
    formatDate,
} from '@/shared/utils/formatters'
import { Descriptions, Modal, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface OrderDetailsModalProps {
    orderId: string | null
    onClose: () => void
}

const itemColumns: ColumnsType<IOrderItem> = [
    { title: 'Produto', dataIndex: 'productName', key: 'productName' },
    { title: 'Unidade', dataIndex: 'unit', key: 'unit' },
    { title: 'Qtd.', dataIndex: 'quantity', key: 'quantity', align: 'right' },
    { title: 'Preço unit.', dataIndex: 'unitPrice', key: 'unitPrice', align: 'right', render: (unitPrice: number) => formatCurrency(unitPrice) },
    { title: 'Subtotal', key: 'subtotal', align: 'right', render: (_, subTotal) => formatCurrency(subTotal.quantity * subTotal.unitPrice) },
]

const paymentColumns: ColumnsType<IOrderPayment> = [
    {
        title: 'Forma de pagamento',
        dataIndex: 'paymentMethodName',
        key: 'paymentMethodName',
        render: (paymentType: IOrderPayment['paymentMethodName']) => PAYMENT_TYPE_LABELS[paymentType],
    },
    { title: 'Parcelas', dataIndex: 'installments', key: 'installments', align: 'right' },
    { title: 'Valor', dataIndex: 'amount', key: 'amount', align: 'right', render: (value: number) => formatCurrency(value) },
    { title: 'Valor/parcela', key: 'installmentValue', align: 'right', render: (_, total) => formatCurrency(calcInstallmentValue(total.amount, total.installments)) },
]

function OrderDetailsModal({ orderId, onClose }: OrderDetailsModalProps) {
    const order = useAppSelector(selectOrderById(orderId ?? ''))

    const total = order ? calcOrderTotal(order.items) : 0
    const paid = order ? calcPaymentTotal(order.payments) : 0
    const diff = total - paid

    return (
        <Modal
            open={orderId !== null && !!order}
            onCancel={onClose}
            footer={null}
            title="Detalhes do pedido"
            width={720}
            destroyOnHidden
        >
            {order && (
                <>
                    <Descriptions column={2} size="small" style={{ marginBottom: 16 }}>
                        <Descriptions.Item label="# Pedido">
                            <Typography.Text code>{order.id.slice(0, 8)}</Typography.Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Cliente">{order.customerName}</Descriptions.Item>
                        <Descriptions.Item label="Data">{formatDate(order.createdAt)}</Descriptions.Item>
                    </Descriptions>

                    <Typography.Title level={5}>Itens</Typography.Title>
                    <Table<IOrderItem>
                        dataSource={order.items}
                        rowKey={(row) => row.productId}
                        columns={itemColumns}
                        pagination={false}
                        size="small"
                        style={{ marginBottom: 16 }}
                    />

                    <Typography.Title level={5}>Pagamentos</Typography.Title>
                    <Table<IOrderPayment>
                        dataSource={order.payments}
                        rowKey={(row, idx) => `${row.paymentMethodId}-${idx}`}
                        columns={paymentColumns}
                        pagination={false}
                        size="small"
                        style={{ marginBottom: 16 }}
                    />

                    <Descriptions column={3} size="small" bordered>
                        <Descriptions.Item label="Total do pedido">{formatCurrency(total)}</Descriptions.Item>
                        <Descriptions.Item label="Total pago">{formatCurrency(paid)}</Descriptions.Item>
                        <Descriptions.Item label="Diferença">
                            <Typography.Text type={diff === 0 ? 'success' : 'danger'}>
                                {formatCurrency(diff)}
                            </Typography.Text>
                        </Descriptions.Item>
                    </Descriptions>
                </>
            )}
        </Modal>
    )
}

export default OrderDetailsModal
