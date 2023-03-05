import React from "react";
import { ShippingForm } from "./Checkout/Checkout";
import { Typography, Button, Divider } from "@material-ui/core";
import {
	Elements,
	CardElement,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import Review from "./Review";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from "react-query";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
interface Props {
	shippingData: ShippingForm;
	checkoutToken: CheckoutToken | undefined;
	backStep: () => void;
	nextStep: () => void;
	setCheckoutCapture: React.Dispatch<
		React.SetStateAction<CheckoutCapture | undefined>
	>;
}

const stripePromise = loadStripe(
	import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY
);
const PaymentForm: React.FC<Props> = ({
	shippingData,
	checkoutToken,
	backStep,
	nextStep,
	setCheckoutCapture,
}) => {
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		elements: StripeElements | null,
		stripe: Stripe | null
	) => {
		e.preventDefault();
		console.log("função handleSubmit chamada!");
		console.log(!!elements, !!stripe);

		if (!stripe || !elements) return;
		const cardElement = elements.getElement(CardElement);
		if (!cardElement) return;
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});
		if (error) {
			console.log(error);
			return;
		}
		const orderData: CheckoutCapture = {
			line_items: checkoutToken?.line_items,
			customer: {
				firstname: shippingData.firstName,
				lastname: shippingData.lastName,
				email: shippingData.email,
			},
			shipping: {
				name: "Primary",
				street: shippingData.address,
				town_city: shippingData.city,
				county_state: shippingData.subdivision,
				postal_zip_code: shippingData.zip,
				country: shippingData.country,
			},
			fulfillment: { shipping_method: shippingData.option },
			payment: {
				gateway: "stripe",
				stripe: {
					payment_method_id: paymentMethod.id,
				},
			},
		};
		setCheckoutCapture(orderData);
		//fetchOrder();
		nextStep();
		//@ts-ignore
		// onCaptureCheckout(checkoutToken?.id, orderData);
	};

	return (
		<>
			<Review checkoutToken={checkoutToken} />
			<Divider />
			<Typography
				variant="h6"
				gutterBottom
				style={{
					margin: "20px 0",
				}}>
				Payment method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => {
						return (
							<form
								onSubmit={(e) => {
									handleSubmit(e, elements, stripe);
								}}>
								<CardElement />
								<br />
								<br />
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}>
									<Button
										variant="outlined"
										onClick={() => {
											backStep();
										}}>
										Back
									</Button>
									<Button
										type="submit"
										variant="contained"
										disabled={!stripe}
										color={"primary"}>
										{"Pay "}
										{
											//@ts-ignore
											checkoutToken.subtotal
												.formatted_with_symbol
										}
									</Button>
								</div>
							</form>
						);
					}}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default PaymentForm;
