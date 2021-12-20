import { Grid, Typography, Link } from "@mui/material";
import { version } from "react";

const Footer = () => {
  return (
    <Grid my={6}>
      <Typography
        fontWeight={600}
        textAlign="center"
        color="primary"
        variant="subtitle2"
      >
        Version {version} (
        <Link
          href="https://github.com/StefMTP/encounter-initiative-tracker/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noreferrer"
          fontWeight={500}
          color="secondary"
          underline="hover"
        >
          Check out the changelog
        </Link>
        )
      </Typography>
      <Typography
        textAlign="center"
        color="primary"
        variant="body2"
      ></Typography>
      <Typography textAlign="center" color="primary" variant="body1">
        <Link
          href="https://www.paypal.com/paypalme/stefmich69"
          target="_blank"
          rel="noreferrer"
        >
          Support me!
        </Link>
      </Typography>
    </Grid>
  );
};

export default Footer;
