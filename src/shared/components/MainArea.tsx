import { Outlet, useLocation } from 'react-router'
import { paths } from '@/config/paths'
import { Layout } from 'antd'
import Header from '@/shared/components/Header'

const { Content } = Layout
const pageTitles: Record<string, string> = {
    [paths.products.list.path]: 'Produtos',
    [paths.products.new.path]: 'Novo produto',
    [paths.paymentMethods.list.path]: 'Formas de Pagamento',
    [paths.paymentMethods.new.path]: 'Nova forma de pagamento',
    [paths.orders.list.path]: 'Pedidos',
    [paths.orders.new.path]: 'Novo pedido',
}

interface MainAreaProps {
    isCollapsed: boolean
    onToggleCollapse: () => void
}

function MainArea({ isCollapsed, onToggleCollapse }: MainAreaProps) {
    const { pathname } = useLocation()
    const title = pageTitles[pathname] ?? ''

    return (
        <Layout>
            <Header
                title={title}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
            />
            <Content style={{ padding: 24, overflow: 'auto' }}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default MainArea
