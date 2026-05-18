import { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '@/shared/components/Sidebar.tsx';
import MainArea from '@/shared/components/MainArea';

function AppLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const handleCollapsed = () => {
        setIsCollapsed((event) => !event)
    }
    return (
        <Layout className='h-screen'>
            <Sidebar isCollapsed={isCollapsed}/>
            <MainArea isCollapsed={isCollapsed} onToggleCollapse={handleCollapsed}/>
        </Layout>
    )
}

export default AppLayout