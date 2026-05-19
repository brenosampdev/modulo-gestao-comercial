import { Navigate, Route, Routes } from "react-router"
import AppLayout from "@/shared/components/AppLayout"
import { paths } from "@/config/paths"
import ProductsListPage from "@/features/products/pages/ProductsListPage"
import ProductsNewPage from "@/features/products/pages/ProductsNewPage"
import PaymentMethodListPage from "@/features/payment-methods/pages/PaymentMethodListPage"
import PaymentMethodNewPage from "@/features/payment-methods/pages/PaymentMethodNewPage"
import OrdersListPage from "@/features/orders/pages/OrdersListPage"
import OrdersNewPage from "@/features/orders/pages/OrdersNewPage"

function AppRoutes() {
    return (
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path={paths.home.path} element={<Navigate to={paths.orders.list.getHref()} replace/>}/>
          <Route path={paths.products.list.path} element={<ProductsListPage/>}/>
          <Route path={paths.products.new.path} element={<ProductsNewPage/>}/>
          <Route path={paths.paymentMethods.list.path} element={<PaymentMethodListPage/>}/>
          <Route path={paths.paymentMethods.new.path} element={<PaymentMethodNewPage/>}/>
          <Route path={paths.orders.list.path} element={<OrdersListPage/>}/>
          <Route path={paths.orders.new.path} element={<OrdersNewPage/>}/>
        </Route>
      </Routes>
    )
}

export default AppRoutes
