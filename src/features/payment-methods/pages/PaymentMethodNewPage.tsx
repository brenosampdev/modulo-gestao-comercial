import { useNavigate } from 'react-router'
import { App, Card, Typography } from 'antd'
import { useAppDispatch } from '@/app/hooks'
import { paths } from '@/config/paths'
import { added } from '@/features/payment-methods/paymentMethodSlice'
import type { PaymentMethodFormValues } from '@/features/payment-methods/paymentMethodSchema'
import PaymentMethodForm from '@/features/payment-methods/components/PaymentMethodForm'

const emptyPayment: PaymentMethodFormValues = {
    name: '',
    type: 'money',
    maxInstallments: 1,
    active: true,
}

function PaymentMethodNewPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { message } = App.useApp()

    const handleSubmit = (data: PaymentMethodFormValues) => {
        dispatch(added(data))
        message.success('Forma de pagamento criada com sucesso')
        navigate(paths.paymentMethods.list.getHref())
    }

    const handleCancel = () => navigate(paths.paymentMethods.list.getHref())

    return (
        <Card>
            <Typography.Title level={4} style={{ marginTop: 0 }}>Nova forma de pagamento</Typography.Title>
            <PaymentMethodForm
                defaultValues={emptyPayment}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </Card>
    )
}

export default PaymentMethodNewPage
