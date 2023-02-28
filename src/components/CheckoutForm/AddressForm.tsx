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
import { commerce } from "../../lib/commerce";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useQuery } from "react-query";
import { fetchShippingCountries } from "../../lib/reactQuery";
import { LocaleListCountriesResponse } from "@chec/commerce.js/features/services";
import Loading from "../Loading/Loading";
interface Props {
	checkoutToken: CheckoutToken | undefined;
	isCheckoutTokenLoading: boolean;
	isCheckoutTokenIdle: boolean;
}
const AddressForm: React.FC<Props> = ({
	checkoutToken,
	isCheckoutTokenLoading,
	isCheckoutTokenIdle,
}) => {
	const methods = useForm();
	if (isCheckoutTokenLoading || isCheckoutTokenIdle) {
		return <Loading />;
	}
	const {
		data: { countries, html } = {},
		isLoading: isCountriesLoading,
		error: countriesError,
		isIdle: isCountriesIdle,
	} = useQuery<LocaleListCountriesResponse>(
		["countries"],
		() => {
			return fetchShippingCountries(checkoutToken?.id);
		},
		{ enabled: !!checkoutToken?.id }
	);
	const [shippingCountries, setShippingCountries] = useState<{
		[name: string]: string;
	}>();
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");

	// const fetchShippingCountries = async (checkoutToken: CheckoutToken) => {
	// 	const { countries } =
	// 		await commerce.services.localeListShippingCountries(
	// 			checkoutToken.id
	// 		);
	// 	console.log(countries);
	// 	setShippingCountries(countries);
	// 	setShippingCountry(Object.keys(countries)[0]);
	// };
	// useEffect(() => {
	// 	if (checkoutToken) {
	// 		fetchShippingCountries(checkoutToken);
	// 	}
	// 	console.log("Fetching countries with cart token");
	// }, []);
	const formatedCountries =
		countries &&
		Object.entries(countries).map(([code, name]) => {
			return {
				id: code,
				label: name,
			};
		});
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit={() => {}}>
					<Grid container spacing={3}>
						<FormInput
							required
							name="firstName"
							label="First Name"
						/>
						<FormInput required name="lastName" label="Last Name" />
						<FormInput required name="address1" label="Address" />
						<FormInput required name="email" label="Email" />
						<FormInput required name="city" label="City" />
						<FormInput required name="zip" label="Postal Code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(e) => {
									setShippingCountry(
										e.target.value as string
									);
								}}>
								{formatedCountries &&
									formatedCountries.map((country) => {
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
						{/* <Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value={} fullWidth onChange={() => {}}>
								<MenuItem key={} value={}>
									Select Me
								</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={} fullWidth onChange={() => {}}>
								<MenuItem key={} value={}>
									Select Me
								</MenuItem>
							</Select>
						</Grid> */}
					</Grid>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
