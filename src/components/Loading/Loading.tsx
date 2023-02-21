import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
		},
		toolbar: theme.mixins.toolbar,
	})
);

interface LoadingProps {
	size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 300 }) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.toolbar}></div>
			<div className={classes.root}>
				<CircularProgress size={size} />
			</div>
		</>
	);
};

export default Loading;
