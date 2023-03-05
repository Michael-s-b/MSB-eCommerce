import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	paper: {
		padding: theme.spacing(2),
	},
	image: {
		maxWidth: "100%",
		maxHeight: "100%",
	},
	price: {
		fontWeight: "bold",
	},
}));
