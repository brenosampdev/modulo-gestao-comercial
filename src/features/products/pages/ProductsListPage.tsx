import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
    App,
    Button,
    Card,
    Flex,
    Modal,
    Popconfirm,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
    CheckCircleOutlined,
    EditOutlined,
    PlusOutlined,
    StopOutlined,
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { paths } from '@/config/paths'
import { formatCurrency } from '@/shared/utils/formatters'
import {
    selectAllProducts,
    selectProductForEdit,
    toggleActive,
    updated,
} from '@/features/products/productsSlice'
import type { IProduct } from '@/types/IProduct'
import type { ProductFormValues } from '@/features/products/productsSchema'
import ProductForm from '@/features/products/components/ProductForm'

function extractFormValues({name, description, unit, price, stock, active}: IProduct): ProductFormValues {
    return { name, description, unit, price, stock, active }
}

function ProductsListPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { message } = App.useApp()
    const products = useAppSelector(selectAllProducts)
    const [editingId, setEditingId] = useState<string | null>(null)
    const editingProduct = useAppSelector(selectProductForEdit(editingId))

    const handleUpdate = (data: ProductFormValues) => {
        if (!editingId)  {
            return
        }
        dispatch(updated({
            id: editingId,
            changes: data 
        })
    )
        message.success('Produto atualizado com sucesso')
        setEditingId(null)
    }

    const handleToggle = (id: string, active: boolean) => {
        dispatch(toggleActive({
            id,
            active 
        }))
    }

    const dataColumns: ColumnsType<IProduct> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <>
                    <div>{record.name}</div>
                    <Typography.Text type="secondary">{record.description}</Typography.Text>
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
                        onClick={() => setEditingId(record.id)}
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
        <Card>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Produtos</Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate(paths.products.new.getHref())}
                >
                    Novo produto
                </Button>
            </Flex>

            <Table<IProduct>
                dataSource={products}
                rowKey="id"
                columns={dataColumns}
                pagination={{ showTotal: (total) => `${total} produtos` }}
            />

            <Modal
                open={editingId !== null}
                onCancel={() => setEditingId(null)}
                footer={null}
                title="Editar produto"
                destroyOnClose
            >
                {editingProduct && (
                    <ProductForm
                        defaultValues={extractFormValues(editingProduct)}
                        onSubmit={handleUpdate}
                        onCancel={() => setEditingId(null)}
                    />
                )}
            </Modal>
        </Card>
    )
}

export default ProductsListPage
