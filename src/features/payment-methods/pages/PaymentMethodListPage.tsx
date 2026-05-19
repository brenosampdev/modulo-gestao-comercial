import { useNavigate } from 'react-router'
import { Button, Card, Flex, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/app/hooks'
import { paths } from '@/config/paths'
import { selectAllPaymentMethods } from '@/features/payment-methods/paymentMethodSlice'
import TablePayment from '@/features/payment-methods/components/TablePayment'

function PaymentMethodListPage() {
    const navigate = useNavigate()
    const payments = useAppSelector(selectAllPaymentMethods)

    return (
        <Card>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Formas de Pagamento</Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate(paths.paymentMethods.new.getHref())}
                >
                    Nova forma de pagamento
                </Button>
            </Flex>
            <TablePayment payments={payments}/>
        </Card>
    )
}

export default PaymentMethodListPage
