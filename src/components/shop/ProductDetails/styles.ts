import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	descriptionPaper: {
		padding: theme.spacing(2),
		margin: "auto",
		width: "90%",
		// height: "500px",
	},
	imgPaper: {
		padding: theme.spacing(2),
		margin: "auto",
		width: "90%",
		height: "500px",
		display: "flex",
		justifyContent: "center",
	},
	image: {
		width: "100%",
		maxHeight: "100%",
		objectFit: "contain",
	},
	price: {
		fontWeight: "bold",
	},
}));
