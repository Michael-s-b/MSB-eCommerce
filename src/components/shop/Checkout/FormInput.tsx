import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
// Define the props that will be passed to the component
interface Props {
	name: string;
	label: string;
	required?: boolean;
	rules?: FieldRules;
}
interface FieldRules {
	required?: boolean | string;
	minLength?: number | { value: number; message: string };
	maxLength?: number | { value: number; message: string };
	min?: number | { value: number; message: string };
	max?: number | { value: number; message: string };
	pattern?: RegExp | { value: RegExp; message: string };
	validate?: (value: string | number) => boolean | string;
}

// Define the component as a functional component that receives props of the defined interface
const FormInput: React.FC<Props> = ({ name, label, required, rules }) => {
	// Get the form control instance from the form context using the useFormContext hook
	const {
		control,
		formState: { errors },
	} = useFormContext();

	// Render a Grid component from the Material-UI library with a TextField inside
	return (
		<Grid item xs={12} sm={6}>
			{/* The Controller component from the react-hook-form library */}
			<Controller
				name={name} // The name of the field, used to connect it to the form state
				control={control} // The form control instance
				rules={rules} // Validation rules for the field
				render={({ field }) => (
					// The TextField component from the Material-UI library
					<TextField
						{...field} // Spread the onChange, onBlur, and value props from the Controller's field object
						fullWidth // Make the field take up the full width of its container
						label={label} // The label for the field
						//required={required} // Whether the field is required or not
						error={!!errors[name]} // Set error prop if there are errors for this field
						//@ts-ignore
						helperText={errors[name]?.message}
					/>
				)}
			/>
		</Grid>
	);
};

export default FormInput;
