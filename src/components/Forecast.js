import React, { useEffect, useState } from "react";

import {
  makeStyles,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CurrentForecast from "./Current/CurrentForecast";
import HourlyForecast from "./Hourly/HourlyForecast";
import DailyForecast from "./Daily/DailyForecast";
import Countries from "/Users/hermitrhaps/Documents/development/Weather-app/node_modules/countries-list/dist/continents.json";
import Cities from "/Users/hermitrhaps/Documents/development/Weather-app/node_modules/cities.json/cities.json";

const API_URL = "https://api.openweathermap.org/data/2.5/";
const REQUEST_TYPE = "onecall?";
const USR_KEY = "&appid=83c6ba4dd07d83514536821a8a51d6d5";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: "1rem",
    margin: "auto",
    minWidth: "15rem",
    maxWidth: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: "0",
    margin: "0",
    borderRadius: "4px",
    width: "25rem",
  },
}));

const Forecast = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [coordinate, setCoordinate] = useState({
    status: false,
    lat: "",
    lng: "",
  });
  const [forecast, setForecast] = useState();
  const classes = useStyles();
  const search = (e) => {
    e.preventDefault();
    Object.entries(Cities)
      .filter(([index, info]) => info.name === city)
      .map(([index, info]) => {
        fetch(
          API_URL +
            REQUEST_TYPE +
            "lat=" +
            info.lat +
            "&lon=" +
            info.lng +
            "&units=metric" +
            USR_KEY
        )
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            setForecast(data);
          })
          .catch((error) => console.log(error));
      });
  };
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form
              onSubmit={(e) => {
                search(e);
              }}
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    options={Object.entries(Countries).map(
                      ([key, value]) => key + ": " + value
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select country"
                        margin="normal"
                        variant="outlined"
                        className={classes.input}
                        onSelect={(e) =>
                          setCountry(e.target.value.split(":")[0] || "")
                        }
                      />
                    )}
                  />
                </Grid>
                {country ? (
                  <Grid item xs={12}>
                    <Autocomplete
                      options={Object.entries(Cities)
                        .filter(([index, info]) => info.country === country)
                        .map(([index, info]) => info.name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select country"
                          margin="normal"
                          variant="outlined"
                          className={classes.input}
                          onSelect={(e) => setCity(e.target.value || "")}
                        />
                      )}
                    />
                  </Grid>
                ) : (
                  false
                )}
                {city ? (
                  <Grid item xs={12}>
                    <Button type="submit" variant="outlined">
                      Submit
                    </Button>
                  </Grid>
                ) : (
                  false
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
        {forecast ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CurrentForecast
                  // timezone={this.state.timezone}
                  current={forecast.current}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <HourlyForecast hourly={forecast.hourly} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DailyForecast daily={forecast.daily} />
              </Paper>
            </Grid>
          </Grid>
        ) : (
          false
        )}
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
// fetch(
//   API_URL +
//     REQUEST_TYPE +
//     "lat=" +
//     position.coords.latitude +
//     "&lon=" +
//     position.coords.longitude +
//     "&units=metric" +
//     USR_KEY
// )
//   .then((response) => {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     this.setState({
//       timezone: data.timezone,
//       current: data.current,
//       hourly: data.hourly,
//       daily: data.daily,
//       searched: true,
//       coords: {
//         lat: data.lat,
//         lon: data.lon,
//       },
//     });
//   })
//   .catch((error) => this.setState({ error, searched: false }));
//     });
//   }
//   render() {
//     return (
//       <section>
//         {this.state.searched ? (
//           <div className="container">
//             <div className="card shadow p-3 mb-5 bg-white rounded">
// <CurrentForecast
//   timezone={this.state.timezone}
//   current={this.state.current}
// />
//             </div>
//             <div className="card shadow p-3 mb-5 bg-white rounded">
// <HourlyForecast hourly={this.state.hourly} />
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
