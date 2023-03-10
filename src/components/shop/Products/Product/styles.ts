import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		maxWidth: "100%",
		// minWidth: 360,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		objectFit: "contain",
	},
	cardActions: {
		display: "flex",
		justifyContent: "flex-end",
	},
	cardContent: {
		display: "flex",
		justifyContent: "space-between",
	},
	price: {
		color: theme.palette.success.main,
	},
	grow: {
		flexGrow: 0.9,
	},
}));
