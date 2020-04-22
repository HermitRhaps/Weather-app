import React from "react";
import "../style.css";

export default class HourlyForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourly: this.props.hourly,
      i: 0,
    };
  }
  countMore = () => {
    if (this.state.i < this.state.hourly.length - 1) {
      this.setState({
        i: this.state.i + 1,
      });
    }
  };
  countLess = () => {
    if (this.state.i > 0) {
      this.setState({
        i: this.state.i - 1,
      });
    }
  };
  render() {
    return (
      <>
        <div className="card-header bg-light text-center">
          <h4>Hourly forecast</h4>
          <h6>
            {new Date(this.state.hourly[this.state.i].dt * 1000).toUTCString()}
          </h6>
        </div>
        <div className="card-body">
          <div className="row justify-content-md-center">
            <div className="col-3">
              <button
                type="button"
                className="btn btn-outline-primary mx-auto"
                onClick={this.countLess}
              >
                Prev
              </button>
            </div>
            <div className="col-4">
              <h4>
                <span className="badge badge-pill badge-primary">
                  {this.state.hourly[this.state.i].weather[0].main}
                  <img
                    src={
                      "http://openweathermap.org/img/w/" +
                      this.state.hourly[this.state.i].weather[0].icon +
                      ".png"
                    }
                    alt="..."
                  ></img>
                  {this.state.hourly[this.state.i].temp > 0
                    ? "+" + this.state.hourly[this.state.i].temp
                    : this.state.hourly[0].temp}
                </span>
              </h4>
            </div>
            <div className="col-4">
              <h6>
                Feels like:
                {this.state.hourly[this.state.i].feels_like > 0
                  ? "+" + this.state.hourly[this.state.i].feels_like
                  : this.state.hourly[this.state.i].feels_like}
              </h6>
              <h6>Humidity: {this.state.hourly[this.state.i].humidity}</h6>
              <h6>Wind speed: {this.state.hourly[this.state.i].humidity}</h6>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.countMore}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
