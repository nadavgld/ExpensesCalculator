import React from "react";
import Log from "./Log";
import CategoryFilter from "./CategoryFilter";
import "../App.css";
import {
  getSignByAmount,
  getStyleBySign,
  formatAmount
} from "../utils/currency";

export default function Calculator(props) {
  const Logs = props.Logs;
  const removeLog = props.removeLog;
  const setNewFilter = props.setNewFilter;
  const filter = props.filter;

  let totalBalance, totalBalanceSign;

  totalBalance = Logs.reduce((tot, item) => tot + parseInt(item.amount), 0);

  totalBalanceSign = getSignByAmount(totalBalance);

  return (
    <div style={{ marginBottom: "15px" }}>
      <CategoryFilter filter={filter} setNewFilter={setNewFilter} />
      <div className="total-balance" style={getStyleBySign(totalBalanceSign)}>
        {formatAmount(totalBalance, totalBalanceSign)}
      </div>
      {Logs.map(log => (
        <Log removeLog={removeLog} key={log._id} log={log} />
      ))}
    </div>
  );
}
