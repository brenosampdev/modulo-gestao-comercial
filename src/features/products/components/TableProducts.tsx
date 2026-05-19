import { useAppDispatch } from "@/app/hooks"
import { formatCurrency } from "@/shared/utils/formatters"
import type { IProduct } from "@/types/IProduct"
import { CheckCircleOutlined, EditOutlined, StopOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Space, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import { toggleActive } from "@/features/products/productsSlice"


interface TableProductsProps {
    products: IProduct[]
    onEdit: (id: string) => void
}

function TableProducts({products, onEdit}: TableProductsProps) {
    const dispatch = useAppDispatch()
    const handleToggle = (id: string, active: boolean) => {
        dispatch(toggleActive({id, active}))
    }
    const dataColumns: ColumnsType<IProduct> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <>
                    <div>{record.name}</div>
                </>
            ),
        },
        {
            title: 'Unidade',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => formatCurrency(price),
        },
        {
            title: 'Estoque',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock: number) =>
                stock === 0 ? <span style={{ color: 'red' }}>0</span> : stock,
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => (
                <Tag color={active ? 'green' : 'default'}>
                    {active ? 'Ativo' : 'Inativo'}
                </Tag>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record.id)}
                    />
                    <Popconfirm
                        title={record.active ? 'Inativar este produto?' : 'Ativar este produto?'}
                        okText="Sim"
                        cancelText="Não"
                        onConfirm={() => handleToggle(record.id, !record.active)}
                    >
                        <Button
                            type="text"
                            icon={record.active ? <StopOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    return (
        <Table<IProduct>
            dataSource={products}
            rowKey="id"
            columns={dataColumns}
            pagination={{ showTotal: (total) => `${total} produtos` }}
        />
    )
}

export default TableProducts