import { useNavigate } from 'react-router'
import { App, Card, Typography } from 'antd'
import { useAppDispatch } from '@/app/hooks'
import { paths } from '@/config/paths'
import { added } from '@/features/products/productsSlice'
import type { ProductFormValues } from '@/features/products/productsSchema'
import ProductForm from '@/features/products/components/ProductForm'

const emptyProduct: ProductFormValues = {
    name: '',
    description: '',
    unit: 'un',
    price: 0,
    stock: 0,
    active: true,
}

function ProductsNewPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { message } = App.useApp()

    const handleSubmit = (data: ProductFormValues) => {
        dispatch(added(data))
        message.success('Produto criado com sucesso')
        navigate(paths.products.list.getHref())
    }

    const handleCancel = () => navigate(paths.products.list.getHref())

    return (
        <Card>
            <Typography.Title level={4} style={{ marginTop: 0 }}>Novo produto</Typography.Title>
            <ProductForm
                defaultValues={emptyProduct}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </Card>
    )
}

export default ProductsNewPage
