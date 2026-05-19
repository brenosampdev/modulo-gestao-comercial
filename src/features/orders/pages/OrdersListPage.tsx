import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ORDER_STATUS_LABELS, type EnumOrderStatus } from '@/types/IOrder'
import { useAppSelector } from '@/app/hooks'
import { selectAllOrders } from '@/features/orders/ordersSlice'
import { paths } from '@/config/paths'
import { Button, Card, Flex, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TableOrders from '@/features/orders/components/TableOrders'
import OrderDetailsModal from '@/features/orders/components/OrderDetailsModal'

const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    ...(Object.entries(ORDER_STATUS_LABELS) as [EnumOrderStatus, string][]).map(([value, label]) => ({
        value,
        label,
    })),
]

function OrdersListPage() {
    const navigate = useNavigate()
    const orders = useAppSelector(selectAllOrders)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<EnumOrderStatus | 'all'>('all')
    const [viewingId, setViewingId] = useState<string | null>(null)

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || o.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <Card>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Pedidos</Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate(paths.orders.new.getHref())}
                >
                    Novo pedido
                </Button>
            </Flex>

            <Flex gap={12} style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="Buscar por cliente..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                    style={{ maxWidth: 320 }}
                />
                <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                    style={{ width: 200 }}
                />
            </Flex>

            <TableOrders orders={filteredOrders} onView={setViewingId} />

            <OrderDetailsModal orderId={viewingId} onClose={() => setViewingId(null)} />
        </Card>
    )
}

export default OrdersListPage
