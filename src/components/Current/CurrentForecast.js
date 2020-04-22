import React from "react";

export default class CurrentForecast extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      timezone: this.props.timezone,
      current: this.props.current,
      date: "",
    };
  }
  componentDidMount() {
    let p = new Date();
    this.setState({ date: p.toString() });
  }
  render() {
    return (
      <>
        <div className="card-header bg-light text-center">
          <h4>Current forecast in {this.state.timezone}</h4>
          <h6> {this.state.date}</h6>
        </div>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-4">
              <h4>
                <span className="badge badge-pill badge-primary">
                  {this.state.current.weather[0].main}
                  <img
                    src={
                      "http://openweathermap.org/img/w/" +
                      this.props.current.weather[0].icon +
                      ".png"
                    }
                    className="card-img-top"
                    alt="..."
                  ></img>
                  {this.state.current.temp > 0
                    ? "+" + this.state.current.temp
                    : this.state.current.temp}
                </span>
              </h4>
            </div>
            <div className="col-2">
              <h6>
                Feels like:
                {this.state.current.feels_like > 0
                  ? "+" + this.state.current.feels_like
                  : this.state.current.feels_like}
              </h6>
              <h6>Humidity: {this.state.current.humidity}</h6>
              <h6>Wind speed: {this.state.current.humidity}</h6>
            </div>
          </div>
        </div>
      </>
    );
  }
}
