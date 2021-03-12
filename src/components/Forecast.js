import React, { useEffect, useState } from "react";

import {
  makeStyles,
  Container,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CurrentForecast from "./Current/CurrentForecast";
import HourlyForecast from "./Hourly/HourlyForecast";
import DailyForecast from "./Daily/DailyForecast";
import Countries from "/Users/hermitrhaps/Documents/development/Weather-app/node_modules/countries-list/dist/continents.json";
const API_URL = "https://api.openweathermap.org/data/2.5/";
const REQUEST_TYPE = "onecall?";
const USR_KEY = "&appid=83c6ba4dd07d83514536821a8a51d6d5";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
    margin: "auto",
    minWidth: "15rem",
    maxWidth: "25rem",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    minWidth: "15rem",
    maxWidth: "20rem",
  },
}));
const Forecast = () => {
  // useEffect(() => {
  //   Object.entries(Countries).map(([key, value]) => {
  //     console.log(key);
  //   });
  // }, []);
  const [country, setCountry] = useState("");
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <Autocomplete
                className={classes.input}
                options={Object.entries(Countries).map(
                  ([key, value]) => key + ": " + value
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select country"
                    margin="normal"
                    variant="outlined"
                    onSelect={(e) =>
                      setCountry(e.target.value.split(":")[0] || "")
                    }
                  />
                )}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
// export default class Forecast extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       timezone: "",
//       current: {},
//       hourly: {},
//       daily: {},
//       searched: false,
//       error: null,
//       coords: { lat: null, lon: null },
//     };
//   }
//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition((position) => {
//       fetch(
//         API_URL +
//           REQUEST_TYPE +
//           "lat=" +
//           position.coords.latitude +
//           "&lon=" +
//           position.coords.longitude +
//           "&units=metric" +
//           USR_KEY
//       )
//         .then((response) => {
//           if (!response.ok) {
//             throw Error(response.statusText);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           this.setState({
//             timezone: data.timezone,
//             current: data.current,
//             hourly: data.hourly,
//             daily: data.daily,
//             searched: true,
//             coords: {
//               lat: data.lat,
//               lon: data.lon,
//             },
//           });
//         })
//         .catch((error) => this.setState({ error, searched: false }));
//     });
//   }
//   render() {
//     return (
//       <section>
//         {this.state.searched ? (
//           <div className="container">
//             <div className="card shadow p-3 mb-5 bg-white rounded">
//               <CurrentForecast
//                 timezone={this.state.timezone}
//                 current={this.state.current}
//               />
//             </div>
//             <div className="card shadow p-3 mb-5 bg-white rounded">
//               <HourlyForecast hourly={this.state.hourly} />
//             </div>
//             <div className="card shadow p-3 mb-5 bg-white rounded">
//               <DailyForecast daily={this.state.daily} />
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//       </section>
//     );
//   }
// }
export default Forecast;
