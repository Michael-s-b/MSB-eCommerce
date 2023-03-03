import React, { useEffect, useState } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { Loading } from "../../";
import {
	useFetchShippingSubdivisions,
	useFetchShippingCountries,
	useFetchShippingOptions,
} from "../../../hooks";
import { Link } from "react-router-dom";
import { ShippingForm } from "./Checkout/Checkout";
import _ from "lodash";

interface Props {
	checkoutToken: CheckoutToken | undefined;
	isCheckoutTokenLoading: boolean;
	isCheckoutTokenIdle: boolean;
	next: (data: ShippingForm) => void;
	nextStep: () => void;
}

const AddressForm: React.FC<Props> = ({
	checkoutToken,
	isCheckoutTokenLoading,
	isCheckoutTokenIdle,
	next,
	nextStep,
}) => {
	console.count("AddressForm render");
	const methods = useForm<ShippingForm>();

	const {
		isSuccess: isFetchingCountriesSuccess,
		data: shippingCountries,
		isLoading: isCountriesLoading,
		error: countriesError,
		isIdle: isCountriesIdle,
	} = useFetchShippingCountries(checkoutToken?.id);
	const [shippingCountry, setShippingCountry] = useState<string>("");
	const {
		isFetched: isSubdivisionsFetched,
		isSuccess: isFetchingSubdivisionsSuccess,
		data: shippingSubdivisions,
		isLoading: isSubdivisionsLoading,
		isIdle: isSubdivisionsIdle,
	} = useFetchShippingSubdivisions(shippingCountry);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const { data: shippingOptions, isSuccess: isFetchingOptionsSuccess } =
		useFetchShippingOptions(
			checkoutToken?.id,
			shippingCountry,
			shippingSubdivision
		);
	const [shippingOption, setShippingOption] = useState("");

	useEffect(() => {
		if (isFetchingCountriesSuccess) {
			//@ts-expect-error
			setShippingCountry(shippingCountries.at(0)?.id);
		}
	}, [isFetchingCountriesSuccess]);

	useEffect(() => {
		if (isFetchingSubdivisionsSuccess) {
			//@ts-expect-error
			setShippingSubdivision(shippingSubdivisions.at(0)?.id);
		}
	}, [isFetchingSubdivisionsSuccess, shippingCountry]);

	useEffect(() => {
		if (isFetchingOptionsSuccess) {
			//@ts-expect-error
			setShippingOption(shippingOptions.at(0)?.id);
		}
	}, [isFetchingOptionsSuccess, shippingSubdivision]);

	if (
		isCheckoutTokenLoading ||
		isCheckoutTokenIdle ||
		isCountriesIdle ||
		isCountriesLoading
	) {
		return <Loading />;
	}

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) => {
						data.country = shippingCountry;
						data.subdivision = shippingSubdivision;
						data.option = shippingOption;
						next(data);
						console.log(data);
						nextStep();
					})}>
					<Grid container spacing={3}>
						<FormInput
							required
							name="firstName"
							label="First Name"
							rules={{
								required: "This field is requiered",
								minLength: {
									value: 2,
									message: "Name is too short",
								},
								maxLength: {
									value: 50,
									message: "Name is too long",
								},
								pattern: {
									value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/i,
									message: "Must contain only letters",
								},
							}}
						/>
						<FormInput
							name="lastName"
							label="Last Name"
							rules={{
								required: "This field is requiered",
								minLength: {
									value: 2,
									message: "Name is too short",
								},
								maxLength: {
									value: 50,
									message: "Name is too long",
								},
								pattern: {
									value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/i,
									message: "Must contain only letters",
								},
							}}
						/>
						<FormInput
							name="address"
							label="Address"
							rules={{
								required: "This field is requiered",
								minLength: {
									value: 5,
									message: "Address is too short",
								},
								maxLength: {
									value: 80,
									message: "Address is too long",
								},
							}}
						/>
						<FormInput
							name="email"
							label="Email"
							rules={{
								required: "This field is requiered",
								pattern: {
									value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
									message: "Enter a valid email address",
								},
							}}
						/>
						<FormInput
							name="city"
							label="City"
							rules={{
								required: "This field is requiered",
								minLength: {
									value: 2,
									message: "City name is too short",
								},
								maxLength: {
									value: 50,
									message: "City name is too long",
								},
								pattern: {
									value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/i,
									message: "Must contain only letters",
								},
							}}
						/>
						<FormInput
							name="zip"
							label="Postal Code"
							rules={{ required: "This field is requiered" }}
						/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								required
								value={shippingCountry}
								fullWidth
								onChange={(e) => {
									setShippingCountry(
										e.target.value as string
									);
								}}>
								{shippingCountries &&
									shippingCountries.map((country) => {
										return (
											<MenuItem
												key={country.id}
												value={country.id}>
												{country.label}
											</MenuItem>
										);
									})}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(e) => {
									setShippingSubdivision(
										e.target.value as string
									);
								}}>
								{shippingSubdivisions &&
									shippingSubdivisions.map((subdivision) => {
										return (
											<MenuItem
												key={subdivision.id}
												value={subdivision.id}>
												{subdivision.label}
											</MenuItem>
										);
									})}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(e) => {
									setShippingOption(e.target.value as string);
								}}>
								{shippingOptions &&
									shippingOptions.map((option) => {
										return (
											<MenuItem
												key={option.id}
												value={option.id}>
												{option.label}
											</MenuItem>
										);
									})}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}>
						<Link to={"/cart"}>
							<Button variant="outlined">Back to Cart</Button>
						</Link>

						<Button
							type="submit"
							color="primary"
							variant="contained">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
