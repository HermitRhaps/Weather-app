import React from "react";

export default class DailyForecast extends React.Component {
  constructor(probs) {
    super(probs);
    this.state = {
      daily: this.props.daily,
    };
  }
  render() {
    return (
      <div>
        <div className="card-header bg-light text-center">
          <h4>Daily forecast</h4>
        </div>
        <div className="card-body">
          {this.state.daily.map((day) => (
            <div key={day.dt} className="card shadow p-3 mb-2">
              <div className="row justify-content-center">
                <div className="col-3">
                  <h6>{new Date(day.dt * 1000).toDateString("yyyy-MM-dd")}</h6>
                </div>
                <div className="col-3">
                  <h5>
                    <span className="badge badge-pill badge-primary">
                      {day.weather[0].main}
                      <img
                        src={
                          "http://openweathermap.org/img/w/" +
                          day.weather[0].icon +
                          ".png"
                        }
                        alt="..."
                      ></img>
                    </span>
                  </h5>
                </div>
                <div className="col-3">
                  <h6>
                    Evening:
                    {day.temp.eve > 0 ? "+" + day.temp.eve : day.temp.eve}° C (
                    {day.feels_like.eve > 0
                      ? "+" + day.feels_like.eve
                      : day.feels_like.eve}
                    ° C)
                  </h6>
                  <h6>
                    Day:
                    {day.temp.day > 0 ? "+" + day.temp.day : day.temp.day}° C (
                    {day.feels_like.day > 0
                      ? "+" + day.feels_like.day
                      : day.feels_like.day}
                    ° C)
                  </h6>
                  <h6>
                    Night:
                    {day.temp.night > 0 ? "+" + day.temp.night : day.temp.night}
                    ° C (
                    {day.feels_like.night > 0
                      ? "+" + day.feels_like.night
                      : day.feels_like.night}
                    ° C)
                  </h6>
                </div>
                <div className="col-3">
                  <h6>
                    Humidity:
                    {day.humidity}%
                  </h6>
                  <h6>Pressure: {day.pressure}mbar</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
