import React, { useEffect, useState } from "react";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from "@material-ui/core";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import {
	useCaptureCheckout,
	useFetchCheckoutToken,
	useRefreshCart,
} from "../../../../hooks";
import { z } from "zod";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { Link } from "react-router-dom";
import { Order } from "@stripe/stripe-js";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
interface Props {
	cart: CartType | undefined;
	isCartLoading: boolean;
	//order: CheckoutCaptureResponse;
	// onCaptureCheckout: (
	// 	checkoutTokenId: string,
	// 	newOrder: CheckoutCapture
	// ) => Promise<void>;
	// error: string;
}
const steps = ["Shipping address", "Payment details"];
const Checkout: React.FC<Props> = ({
	cart,
	isCartLoading,
	// order,
	// onCaptureCheckout,
	// error,
}) => {
	console.count("Checkout render");
	const classes = useStyles();
	const refreshCartMutation = useRefreshCart();

	const [shippingData, setShippingData] = useState<ShippingForm>(
		{} as ShippingForm
	);
	const {
		data: checkoutToken,
		isLoading: isCheckoutTokenLoading,
		isIdle: isCheckoutTokenIdle,
		error: checkoutTokenError,
	} = useFetchCheckoutToken(cart?.id);
	const [checkoutCapture, setCheckoutCapture] = useState<
		CheckoutCapture | undefined
	>(() => {
		return undefined;
	});
	const {
		data: order,
		error: orderError,
		isSuccess: isOrderSuccess,
	} = useCaptureCheckout(checkoutToken?.id, checkoutCapture, () => {
		refreshCartMutation.mutateAsync();
	});
	const [activeStep, setActiveStep] = useState(0);
	const Form = () => {
		return activeStep === 0 ? (
			<AddressForm
				isCheckoutTokenLoading={isCheckoutTokenLoading}
				checkoutToken={checkoutToken}
				isCheckoutTokenIdle={isCheckoutTokenIdle}
				next={next}
				nextStep={nextStep}
			/>
		) : (
			<PaymentForm
				shippingData={shippingData}
				checkoutToken={checkoutToken}
				backStep={backStep}
				setCheckoutCapture={setCheckoutCapture}
				nextStep={nextStep}
			/>
		);
	};
	const nextStep = () => {
		setActiveStep((prevActiveStep) => {
			return prevActiveStep + 1;
		});
	};
	const backStep = () => {
		setActiveStep((prevActiveStep) => {
			return prevActiveStep - 1;
		});
	};

	const next = (data: ShippingForm) => {
		setShippingData(data);
	};

	const Confirmation = () => {
		return order ? (
			<>
				<div>
					<Typography variant="h5">
						{`Thank you for your purchase, ${order.customer.firstname} ${order.customer.lastname}`}
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">{`Order ref: ${order.customer_reference}`}</Typography>
					<br />
					<Link to={"/"}>
						<Button variant="outlined" type="button">
							Back to Home
						</Button>
					</Link>
				</div>
			</>
		) : (
			<>
				<div className={classes.spinner}>
					<CircularProgress />
				</div>
			</>
		);
	};

	if (orderError) {
		return (
			<>
				<Typography variant="h5">{`Error: ${orderError}`}</Typography>
				<br />
				<Link to={"/"}>
					<Button variant="outlined" type="button">
						Back to Home
					</Button>
				</Link>
			</>
		);
	}

	return (
		<div>
			<div className={classes.toolbar}></div>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography align="center" variant="h4">
						Checkout
					</Typography>
					<Stepper
						activeStep={activeStep}
						className={classes.stepper}>
						{steps.map((step) => {
							return (
								<Step key={step}>
									<StepLabel>{step}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					{activeStep === steps.length && !isCartLoading ? (
						<Confirmation />
					) : (
						<Form />
					)}
				</Paper>
			</main>
		</div>
	);
};

export default Checkout;

export interface ShippingForm {
	firstName: string;
	lastName: string;
	address: string;
	email: string;
	city: string;
	zip: string;
	country: string;
	subdivision: string;
	option: string;
}
