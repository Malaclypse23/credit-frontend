import "./App.scss";

import Button from "react-bootstrap/Button";
import React from "react";
import useFetch from "./useFetch";

function Result(props) {
  let [{ data, isLoading, isError }, fetchData] = useFetch(
    `/calculate?amount=${props.amount}&interest=${props.interest}&initial=${props.initial}&years=${props.years}`
  );
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Server Error - please try to reload!</div>;
  }

  const calculate = async () => {
    data = await fetchData(
      `/calculate?amount=${props.amount}&interest=${props.interest}&initial=${props.initial}&years=${props.years}`
    );
  };

  return (
    <>
      <Button variant="primary" className="calculate" onClick={calculate}>
        Darlehen berechnen
      </Button>
            
      <h2>Übersicht</h2>
      <div>
        Monatliche Rate: <b>{data?.monthly?.toFixed(2)} EUR</b>
      </div>
      <div className={!data?.loan || data?.rates.length === 0 ? "hidden" : null}>
        Darlehen:&nbsp;
        <b>{data?.loan.toFixed(2)} EUR</b>
      </div>
      <div>
        Gesamtzinsen: <b>{data?.totalInterest?.toFixed(2)} EUR</b>
      </div>
      <div className={data?.rates?.length === 0 ? "hidden" : null}>
        Restschuld:&nbsp;
        <b>{data?.rates[data?.rates?.length - 1]?.rest?.toFixed(2)} EUR</b>
      </div>
      <br />
      <h2>Tilgungsplan: </h2>
      <table>
        <thead>
          <tr>
            <th>Jahr</th>
            <th>Zins</th>
            <th>Tilgung</th>
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          {data?.rates.map((row, id) => (
            <tr key={id}>
              <td>{row.rate}</td>
              <td>{row.zins.toFixed(2)} €</td>
              <td>{row.tilgung.toFixed(2)} €</td>
              <td>{row.rest.toFixed(2)} €</td>
            </tr>
          ))}
          </tbody>
      </table>
    </>
  );
}

export default Result;
