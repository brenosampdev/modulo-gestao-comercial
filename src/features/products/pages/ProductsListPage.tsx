import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
    App,
    Button,
    Card,
    Flex,
    Modal,
    Typography,
} from 'antd'
import {
    PlusOutlined,
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { paths } from '@/config/paths'
import {
    selectAllProducts,
    selectProductForEdit,
    updated,
} from '@/features/products/productsSlice'
import type { IProduct } from '@/types/IProduct'
import type { ProductFormValues } from '@/features/products/productsSchema'
import ProductForm from '@/features/products/components/ProductForm'
import TableProducts from '@/features/products/components/TableProducts'

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

    return (
        <Card>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Produtos</Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate(paths.paymentMethods.new.getHref())}
                >
                    Novo produto
                </Button>
            </Flex>

            <TableProducts products={products} onEdit={setEditingId}/>

            <Modal
                open={editingId !== null}
                onCancel={() => setEditingId(null)}
                footer={null}
                title="Editar produto"
                destroyOnHidden
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
