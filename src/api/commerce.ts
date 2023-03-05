import Commerce from "@chec/commerce.js";

const checAPIKey: string = import.meta.env.VITE_REACT_APP_CHEC_PUBLIC_KEY;
const devEnviroment: boolean =
	import.meta.env.VITE_REACT_APP_CHEC_DEV_ENV === "development";
if (devEnviroment && !checAPIKey) {
	throw Error(
		"Your public API key must be provided as an environment variable. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami"
	);
}
export const commerce = new Commerce(checAPIKey, devEnviroment);
