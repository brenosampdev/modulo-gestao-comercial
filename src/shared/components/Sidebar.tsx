import { useLocation, useNavigate } from "react-router"
import { paths } from "@/config/paths"
import { theme } from "@/config/theme"
import Sider from "antd/es/layout/Sider"
import { Menu, Typography } from "antd"
import { CreditCardOutlined, FileTextOutlined, ShoppingOutlined } from "@ant-design/icons"

interface SidebarProps {
    isCollapsed: boolean
}

function Sidebar({isCollapsed}: SidebarProps) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
            <Typography.Title style={{
                    fontSize: 20,
                    color: theme.token.colorPrimary,
                    letterSpacing: -0.2,
                    paddingInline: 20,
                    marginBlock: 20,
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                }}>
                {isCollapsed ? 'EC' : 'ERP Comercial'}
            </Typography.Title>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={({ key }) => navigate(key)}
                items={[
                    {
                        key: paths.products.list.path,
                        icon: <ShoppingOutlined />,
                        label: 'Produtos'
                    },
                    {
                        key: paths.paymentMethods.list.path,
                        icon: <CreditCardOutlined />,
                        label: 'Formas de Pagamento'
                    },
                    {
                        key: paths.orders.list.path,
                        icon: <FileTextOutlined />,
                        label: 'Pedidos'
                    },
                ]}
            />
        </Sider>
    )
}

export default Sidebar