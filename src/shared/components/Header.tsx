import { Layout, Button, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface HeaderProps {
    title: string
    isCollapsed: boolean
    onToggleCollapse: () => void
}

function AppHeader({ title, isCollapsed, onToggleCollapse }: HeaderProps) {
    return (
        <Header
            style={{
                padding: '0 16px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderBottom: '1px solid #f0f0f0',
            }}
        >
            <Button
                type="text"
                icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={onToggleCollapse}
                style={{ fontSize: 18 }}
            />
            <Typography.Title level={4} style={{ margin: 0 }}>
                {title}
            </Typography.Title>
        </Header>
    )
}

export default AppHeader
