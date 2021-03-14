import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  typography: {
    maxWidth: "15rem",
    display: "flex",
    alignItems: "center",
  },
}));
const CurrentForecast = ({ current }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.grid}>
        <Typography variant="h6">Current forecast</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.grid}>
          <Typography className={classes.typography} variant="body1">
            {current.weather[0].main}
            <img
              src={
                "http://openweathermap.org/img/w/" +
                current.weather[0].icon +
                ".png"
              }
              alt="..."
            />
            {current.temp > 0
              ? "+" + Math.round(current.temp)
              : Math.round(current.temp)}
            °C
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
              <ListItemText
                primary="Feels like:"
                secondary={
                  current.feels_like > 0
                    ? "+" + Math.round(current.feels_like)
                    : Math.round(current.feels_like) + "°C"
                }
              />
            </ListItem>
            <ListItem>
              {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
              <ListItemText
                primary="Humidity:"
                secondary={current.humidity + "%"}
              />
            </ListItem>
            <ListItem>
              {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
              <ListItemText
                primary="Pressure:"
                secondary={current.pressure + " mbar"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CurrentForecast;
