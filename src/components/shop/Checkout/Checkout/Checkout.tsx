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
import { useFetchCheckoutToken } from "../../../../hooks";
import { z } from "zod";
interface Props {
	cart: CartType | undefined;
	isCartLoading: boolean;
}
const steps = ["Shipping address", "Payment details"];
const Checkout: React.FC<Props> = ({ cart, isCartLoading }) => {
	console.count("Checkout render");
	const classes = useStyles();
	const [shippingData, setShippingData] = useState<ShippingForm>(
		{} as ShippingForm
	);
	const {
		data: checkoutToken,
		isLoading: isCheckoutTokenLoading,
		isIdle: isCheckoutTokenIdle,
		error: checkoutTokenError,
	} = useFetchCheckoutToken(cart?.id);

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
			<PaymentForm shippingData={shippingData} />
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
		return <div>Confirmation</div>;
	};
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
	zip: number;
	country: string;
	subdivision: string;
	option: string;
}
