import React from "react";
import { ShippingForm } from "./Checkout/Checkout";
interface Props {
	shippingData: ShippingForm;
}
const PaymentForm: React.FC<Props> = ({ shippingData }) => {
	return <div>PaymentForm</div>;
};

export default PaymentForm;
