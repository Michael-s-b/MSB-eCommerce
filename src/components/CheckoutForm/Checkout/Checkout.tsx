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
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useQuery } from "react-query";
import { fetchCheckoutToken } from "../../../lib/reactQuery";
import Loading from "../../Loading/Loading";
interface Props {
	cart: CartType | undefined;
	isCartLoading: boolean;
	refetchCart: Function;
}
const steps = ["Shipping address", "Payment details"];
const Checkout: React.FC<Props> = ({ cart, isCartLoading, refetchCart }) => {
	const classes = useStyles();

	const {
		data: checkoutToken,
		isLoading: isCheckoutTokenLoading,
		isIdle: isCheckoutTokenIdle,
		error: checkoutTokenError,
	} = useQuery<CheckoutToken>(
		["checkoutToken", cart?.id],
		() => {
			return fetchCheckoutToken(cart?.id);
		},
		{
			enabled: !!cart?.id,
		}
	);

	const [activeStep, setActiveStep] = useState(0);
	const Form = () => {
		return activeStep === 0 ? (
			<AddressForm
				isCheckoutTokenLoading={isCheckoutTokenLoading}
				checkoutToken={checkoutToken}
				isCheckoutTokenIdle={isCheckoutTokenIdle}
			/>
		) : (
			<PaymentForm />
		);
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
