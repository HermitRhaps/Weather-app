import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
const DailyForecast = ({ daily }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} elevation={3}>
      <Grid item xs={12} className={classes.grid}>
        <Typography variant="h6">Daily forecast</Typography>
      </Grid>
      {daily.map((day, index) => (
        <Grid item xs={12} key={index + day}>
          <Accordion>
            <AccordionSummary>
              <Typography className={classes.typography} variant="body1">
                {new Date(day.dt * 1000)
                  .toDateString("yyyy-MM-dd")
                  .split(" ")[0] + ", "}
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    day.weather[0].icon +
                    ".png"
                  }
                  alt="..."
                />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                <Paper elevation={3}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                        <ListItemText
                          primary="Evening: "
                          secondary={
                            (day.temp.eve > 0
                              ? "+" + day.temp.eve + "°C / "
                              : Math.round(day.temp.eve) + "°C / ") +
                            (Math.round(day.feels_like.eve) > 0
                              ? "+" + Math.round(day.feels_like.eve)
                              : Math.round(day.feels_like.eve) + "°C")
                          }
                        />
                      </ListItem>
                      <ListItem>
                        {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                        <ListItemText
                          primary="Day: "
                          secondary={
                            (day.temp.day > 0
                              ? "+" + day.temp.day + "°C / "
                              : Math.round(day.temp.day) + "°C / ") +
                            (Math.round(day.feels_like.day) > 0
                              ? "+" + Math.round(day.feels_like.day)
                              : Math.round(day.feels_like.day) + "°C")
                          }
                        />
                      </ListItem>
                      <ListItem>
                        {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                        <ListItemText
                          primary="Night: "
                          secondary={
                            (day.temp.night > 0
                              ? "+" + day.temp.night + "°C / "
                              : Math.round(day.temp.night) + "°C / ") +
                            (Math.round(day.feels_like.night) > 0
                              ? "+" + Math.round(day.feels_like.night)
                              : Math.round(day.feels_like.night) + "°C")
                          }
                        />
                      </ListItem>
                      <ListItem>
                        {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                        <ListItemText
                          primary="Humidity: "
                          secondary={day.humidity + "%"}
                        />
                      </ListItem>
                      <ListItem>
                        {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                        <ListItemText
                          primary="Pressure: "
                          secondary={day.pressure + " mbar"}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Paper>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};
export default DailyForecast;
