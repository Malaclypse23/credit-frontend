import "./App.scss";
import "react-input-range/lib/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DocumentTitle from "./DocumentTitle.js";
import InputRange from "react-input-range";
import NumericInput from "react-input-number";
import React from "react";
import Result from "./Result.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 50000,
      interest: 4.5, // Sollzinssatz
      initial: 20,
      years: 5, // 0 = unbegrenzt};
    }
  }

  render() {
    return (
      <>
      <DocumentTitle title="Darlehensrechner" />
      <div className="App">
        <main>
          <h1>Darlehensrechner</h1>
          <div className="container">
            <form>
              <div className="form-group">
                <label>Darlehensbetrag</label>
                <InputRange
                  className="form-control"
                  maxValue={300000}
                  minValue={1000}
                  value={this.state.amount}
                  onChange={(amount) => this.setState({
                    ...this.state,
                    amount: amount,
                  })}
                  formatLabel={(value) => `${value} EUR`}
                />
              </div>
              <div className="form-group number">
                <label>Zins (%)</label>
                <NumericInput
                  type="number"
                  enableMobileNumericKeyboard
                  className="form-control"
                  step={0.1}
                  precision={2}
                  min={1.0}
                  max={25.0}
                  value={this.state.interest}
                  onChange={(interest) => this.setState({
                    ...this.state,
                    interest: interest,
                  })}
                />
                <label>Tilgung (%)</label>
                <NumericInput
                  type="number"
                  enableMobileNumericKeyboard
                  className="form-control"
                  min={2.0}
                  max={80.0}
                  value={this.state.initial}
                  onChange={(initial) => this.setState({
                    ...this.state,
                    initial: initial,
                  })}
                />
                <label>Zinsbindung (Jahre)</label>
                <NumericInput
                  type="number"
                  enableMobileNumericKeyboard
                  className="form-control"
                  step={1}
                  min={0}
                  max={30.0}
                  value={this.state.years}
                  onChange={(years) => this.setState({
                    ...this.state,
                    years: years,
                  })}
                />
              </div>
            </form>
          </div>
  
          <Result
            amount={this.state.amount}
            interest={this.state.interest}
            initial={this.state.initial}
            years={this.state.years}
          ></Result>
        </main>
      </div>
      </>
    );
  }
}


export default App;
