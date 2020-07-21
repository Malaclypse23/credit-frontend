import "./App.scss";
import "react-input-range/lib/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import InputRange from "react-input-range";
import NumericInput from "react-input-number";
import Result from "./Result.js";
import useFetch from "./useFetch";

function App() {
  const [credit, setCredit] = useState({
    amount: 50000,
    interest: 4.5, // Sollzinssatz
    initial: 5,
    years: 3, // 0 = unbegrenzt
  });

  const [result, setResult] = useState({
    monthly: 0,
    totalInterest: 0,
    rates: [],
  });

  useEffect(() => {
    document.title = "Darlehensrechner";
  }, []);

  const [{ data, isLoading, isError }, fetchData] = useFetch(
    `/calculate?amount=${credit.amount}&interest=${credit.interest}&initial=${credit.initial}&years=${credit.years}`
  );

  const calculate = async () => {
    const result = await fetchData(
      `/calculate?amount=${credit.amount}&interest=${credit.interest}&initial=${credit.initial}&years=${credit.years}`
    );

    setResult({
      ...result,
      rates: data?.rates,
      monthly: data?.monthly,
      totalInterest: data?.totalInterest,
    });
  };

  const handleChange = (e, name) => {
    setCredit({ ...credit, [name]: e[name] });
    calculate(); // TODO changing year and amount calculates old values, click on button calculation is correct.
  };

  return (
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
                value={credit.amount}
                onChange={(amount) => handleChange({ amount }, "amount")}
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
                value={credit.interest}
                onChange={(interest) => handleChange({ interest }, "interest")}
              />
              <label>Tilgung (%)</label>
              <NumericInput
                type="number"
                enableMobileNumericKeyboard
                className="form-control"
                min={2.0}
                max={80.0}
                value={credit.initial}
                onChange={(initial) => handleChange({ initial }, "initial")}
              />
              <label>Zinsbindung (Jahre)</label>
              <NumericInput
                type="number"
                enableMobileNumericKeyboard
                className="form-control"
                step={1}
                min={0}
                max={30.0}
                value={credit.years}
                onChange={(years) => handleChange({ years }, "years")}
              />
            </div>
          </form>
          <Button variant="primary" className="calculate" onClick={calculate}>
            Darlehen berechnen
          </Button>
        </div>

        <Result
          rates={result.rates}
          monthly={result.monthly}
          totalInterest={result.totalInterest}
          amount={credit.amount}
          isLoading={isLoading}
          isError={isError}
        ></Result>
      </main>
    </div>
  );
}

export default App;
