import React from "react";
import { Box, Typography } from "@material-ui/core";
interface Props {}
import checLogo from "../../../assets/powered.by.chec.dark.png";
import { useTheme } from "@material-ui/core/styles";

const Footer: React.FC<Props> = ({}) => {
	const theme = useTheme();
	return (
		<Box
			bgcolor={theme.palette.background.default}
			style={{ textAlign: "center", margin: "100px 0 50px 0" }}>
			<Typography color="textSecondary">
				© Copyright 2023 Michael S. B. <br /> All rights reserved.{" "}
				<br />
				<a href="https://chec.io" target="blank">
					<img
						src={checLogo}
						alt="Chec - Sell anything, anywhere."
						className="light"
						width="182"></img>
				</a>
			</Typography>
		</Box>
	);
};

export default Footer;
