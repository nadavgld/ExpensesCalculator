import React from "react";
import "./Log.css";
import { timestampToDateString } from "../utils/time";
import { EXPENSE_ICONS } from "../utils/types";
import {
  getSignByAmount,
  getStyleBySign,
  formatAmount
} from "../utils/currency";

export default function Log(props) {
  const log = props.log;
  const removeLog = props.removeLog;
  const SIGN = getSignByAmount(log.amount);

  return (
    <div className="log">
      <div className="log-icon">
        <i className={EXPENSE_ICONS[log.category]}></i>
      </div>
      <div className="log-description">
        <h3>{log.title}</h3>
        <span>{timestampToDateString(log.timestamp)}</span>
      </div>
      <div className="log-amount" style={getStyleBySign(SIGN)}>
        <span>{formatAmount(log.amount, SIGN)}</span>
      </div>
      <div className="log-action" onClick={() => removeLog(log._id)}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}
