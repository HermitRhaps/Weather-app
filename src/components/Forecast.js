import React, { useState } from "react";

import {
  makeStyles,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CurrentForecast from "./Current/CurrentForecast";
import HourlyForecast from "./Hourly/HourlyForecast";
import DailyForecast from "./Daily/DailyForecast";
import Cities from "/Users/hermitrhaps/Documents/development/Weather-app/node_modules/cities.json/cities.json";
import CountriesData from "/Users/hermitrhaps/Documents/development/Weather-app/node_modules/countries-list/dist/countries.emoji.json";
const API_URL = "https://api.openweathermap.org/data/2.5/";
const REQUEST_TYPE = "onecall?";
const USR_KEY = "&appid=83c6ba4dd07d83514536821a8a51d6d5";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
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
    minWidth: "15rem",
  },
  image: {
    width: "3rem",
    height: "auto",
  },
}));

const Forecast = () => {
  const [country, setCountry] = useState({ i: "", name: "", flag: "" });
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState();

  const classes = useStyles();
  const countryValidate = (e) => {
    Object.entries(CountriesData)
      .filter(([key, value]) => key === e.target.value.split(":")[0])
      .forEach(([key, value]) =>
        setCountry({
          i: e.target.value.split(":")[0],
          name: value.name,
          flag: value.emoji,
        })
      );
  };
  const search = (e) => {
    e.preventDefault();
    Object.entries(Cities)
      .filter(([index, info]) => info.name === city)
      .forEach(([index, info]) => {
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
          <Paper className={classes.paper} elevation={3}>
            <a href="https://github.com/HermitRhaps">
              <Avatar
                className={classes.image}
                alt="Nemov Dmitry"
                src="https://avatars.githubusercontent.com/u/46109398?s=460&u=53e6aa2093c30bd8b847e22acea76a6b2ce370b4&v=4"
              />
            </a>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={3}>
            <form
              onSubmit={(e) => {
                search(e);
              }}
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    options={Object.entries(CountriesData).map(
                      ([key, value]) => key + ": " + value.name
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select country"
                        margin="normal"
                        variant="outlined"
                        className={classes.input}
                        onSelect={countryValidate}
                      />
                    )}
                  />
                </Grid>
                {country.i ? (
                  <Grid item xs={12}>
                    <Autocomplete
                      options={Object.entries(Cities)
                        .filter(([index, info]) => info.country === country.i)
                        .map(([index, info]) => info.name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select city"
                          margin="normal"
                          variant="outlined"
                          className={classes.input}
                          onSelect={(e) => {
                            setCity(e.target.value || "");
                          }}
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
                      Search
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
          <>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <Typography variant="h6">
                  Forecast in {city} {country.flag}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <CurrentForecast current={forecast.current} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <HourlyForecast hourly={forecast.hourly} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <DailyForecast daily={forecast.daily} />
              </Paper>
            </Grid>
          </>
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
