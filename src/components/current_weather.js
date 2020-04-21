import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import View from "./view";
import Hourly from "./hourly";
import "./style.css";

const API_URL = "https://api.openweathermap.org/data/2.5/";
const REQUEST_TYPE = "onecall?";
const USR_KEY = "&appid=83c6ba4dd07d83514536821a8a51d6d5";

export default class Current extends React.Component {
  constructor() {
    super();
    this.state = {
      timezone: "",
      current: {},
      hourly: {},
      daily: {},
      searched: false,
      error: null,
      coords: { lat: null, lon: null },
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        API_URL +
          REQUEST_TYPE +
          "lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude +
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
          this.setState({
            timezone: data.timezone,
            current: data.current,
            hourly: data.hourly,
            daily: data.daily,
            searched: true,
            coords: {
              lat: data.lat,
              lon: data.lon,
            },
          });
        })
        .then(
          setTimeout(() => {
            console.log(this.state.hourly);
          }, 1000)
        )
        .catch((error) => this.setState({ error, searched: false }));
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.searched ? (
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <View timezone={this.state.timezone} current={this.state.current} />
          </div>
        ) : (
          <></>
        )}
        {this.state.searched ? (
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <Hourly hourly={this.state.hourly} />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
