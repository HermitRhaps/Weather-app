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
// export default class HourlyForecast extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hourly: this.props.hourly,
//       i: 0,
//     };
//   }
//   countMore = () => {
//     if (this.state.i < this.state.hourly.length - 1) {
//       this.setState({
//         i: this.state.i + 1,
//       });
//     }
//   };
//   countLess = () => {
//     if (this.state.i > 0) {
//       this.setState({
//         i: this.state.i - 1,
//       });
//     }
//   };
//   render() {
//     return (
//       <>
//         <div className="card-header bg-light text-center">
//           <h4>Hourly forecast</h4>
//           <h6>
//             {new Date(this.state.hourly[this.state.i].dt * 1000).toUTCString()}
//           </h6>
//         </div>
//         <div className="card-body">
//           <div className="row justify-content-md-center">
//             <div className="col-3">
//               <button
//                 type="button"
//                 className="btn btn-outline-primary mx-auto"
//                 onClick={this.countLess}
//               >
//                 Prev
//               </button>
//             </div>
//             <div className="col-4">
//               <h4>
//                 <span className="badge badge-pill badge-primary">
//                   {this.state.hourly[this.state.i].weather[0].main}
//                   <img
//                     src={
//                       "http://openweathermap.org/img/w/" +
//                       this.state.hourly[this.state.i].weather[0].icon +
//                       ".png"
//                     }
//                     alt="..."
//                   ></img>
//                   {this.state.hourly[this.state.i].temp > 0
//                     ? "+" + this.state.hourly[this.state.i].temp
//                     : this.state.hourly[0].temp}
//                   ° C
//                 </span>
//               </h4>
//             </div>
//             <div className="col-4">
//               <h6>
//                 Feels like:
//                 {this.state.hourly[this.state.i].feels_like > 0
//                   ? "+" + this.state.hourly[this.state.i].feels_like
//                   : this.state.hourly[this.state.i].feels_like}
//                 ° C
//               </h6>
//               <h6>Humidity: {this.state.hourly[this.state.i].humidity}%</h6>
//               <h6>Pressure: {this.state.hourly[this.state.i].pressure}mbar</h6>
//             </div>
//             <div className="col-1">
//               <button
//                 type="button"
//                 className="btn btn-outline-primary"
//                 onClick={this.countMore}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
