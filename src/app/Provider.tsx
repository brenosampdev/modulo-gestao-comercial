import type { ReactNode } from "react"
import { ConfigProvider, App as AntApp } from "antd"
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router"
import ptBR from 'antd/locale/pt_BR'
import { theme } from '@/config/theme'
import { store } from "@/app/store"

function AppProvider({ children }: { children: ReactNode}) {
    return (
        <ConfigProvider theme={theme} locale={ptBR}>
            <AntApp>
                <Provider store={store}>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </Provider>
            </AntApp>
        </ConfigProvider>
    )
}

export default AppProvider