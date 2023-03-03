import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { Box } from "@material-ui/core";

<Box sx={{ width: "100%" }}>
	<LinearProgress />
</Box>;

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
	linear?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 60, linear = false }) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.toolbar}></div>
			<div className={classes.root}>
				{linear ? (
					<Box sx={{ width: "100%" }}>
						<LinearProgress />
					</Box>
				) : (
					<Box sx={{ display: "flex" }}>
						<CircularProgress size={size} />
					</Box>
				)}
			</div>
		</>
	);
};

export default Loading;
