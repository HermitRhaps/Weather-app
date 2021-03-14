import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
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
const HourlyForecast = ({ hourly }) => {
  const [hourlyData, setHourlyData] = useState({
    index: 0,
    data: hourly,
  });

  const switchValidation = (e) => {
    switch (e.currentTarget.getAttribute("data-type")) {
      case "prev":
        return hourlyData.index > 0
          ? setHourlyData({ ...hourlyData, index: hourlyData.index - 1 })
          : false;
      case "next":
        return hourlyData.index < hourlyData.data.length - 1
          ? setHourlyData({ ...hourlyData, index: hourlyData.index + 1 })
          : false;
      default:
        break;
    }
  };
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.grid}>
        <Typography variant="h6">Hourly forecast</Typography>
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button data-type="prev" onClick={switchValidation}>
            Prev
          </Button>
          <Button data-type="next" onClick={switchValidation}>
            Next
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={12} className={classes.grid}>
          <Typography className={classes.typography} variant="body1">
            {new Date(hourlyData.data[hourlyData.index].dt * 1000)
              .toUTCString()
              .split(" ")[4]
              .split(":")[0] + ":00, "}
            {hourlyData.data[hourlyData.index].weather[0].main}
            <img
              src={
                "http://openweathermap.org/img/w/" +
                hourlyData.data[hourlyData.index].weather[0].icon +
                ".png"
              }
              alt="..."
            />
            {hourlyData.data[hourlyData.index].temp > 0
              ? "+" + Math.round(hourlyData.data[hourlyData.index].temp)
              : Math.round(hourlyData.data[hourlyData.index].temp)}
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
                  hourlyData.data[hourlyData.index].feels_like > 0
                    ? "+" +
                      Math.round(hourlyData.data[hourlyData.index].feels_like)
                    : Math.round(hourlyData.data[hourlyData.index].feels_like) +
                      "°C"
                }
              />
            </ListItem>
            <ListItem>
              {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
              <ListItemText
                primary="Humidity:"
                secondary={hourlyData.data[hourlyData.index].humidity + "%"}
              />
            </ListItem>
            <ListItem>
              {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
              <ListItemText
                primary="Pressure:"
                secondary={hourlyData.data[hourlyData.index].pressure + " mbar"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HourlyForecast;
