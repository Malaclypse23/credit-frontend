import "./App.scss";

import React from "react";

function Result(props) {
  function getDarlehenssumme() {
    let result =
      parseFloat(props.amount.toFixed(2)) +
      parseFloat(props.totalInterest?.toFixed(2)) -
      parseFloat(props.rates[props.rates.length - 1]?.rest?.toFixed(2));
    return result.toFixed(2) + " EUR";
  }

  if (props.isLoading) {
    return <div>Loading...</div>;
  } else if (props.isError) {
    return <div>Server Error - please try to reload!</div>;
  }

  return (
    <>
      <h2>Übersicht</h2>
      <div>
        Monatliche Rate: <b>{props.monthly?.toFixed(2)} EUR</b>
      </div>
      <div className={props.rates?.length === 0 ? "hidden" : null}>
        Darlehen:&nbsp;
        <b>{getDarlehenssumme()}</b>
      </div>
      <div>
        Gesamtzinsen: <b>{props.totalInterest?.toFixed(2)} EUR</b>
      </div>
      <div className={props.rates.length === 0 ? "hidden" : null}>
        Restschuld:&nbsp;
        <b>{props.rates[props.rates.length - 1]?.rest?.toFixed(2)} EUR</b>
      </div>
      <br />
      <h2>Tilgungsplan: </h2>
      <table>
        <tr>
          <th>Jahr</th>
          <th>Zins</th>
          <th>Tilgung</th>
          <th>Rest</th>
        </tr>
        {props.rates.map((row) => (
          <tr>
            <td>{row.rate}</td>
            <td>{row.zins.toFixed(2)} €</td>
            <td>{row.tilgung.toFixed(2)} €</td>
            <td>{row.rest.toFixed(2)} €</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default Result;
