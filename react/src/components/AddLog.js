import React, { useState } from "react";
import { EXPENSE_TYPES_DISPLAY } from "../utils/types";
import "./AddLog.css";

export default function AddLog(props) {
  const addNewLog = props.addNewLog;
  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState(0);
  const amountRef = React.createRef();

  const [category, setCategory] = useState(
    Object.keys(EXPENSE_TYPES_DISPLAY)[0]
  );

  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    setTitle("");
    setAmount(0);
    setCategory(Object.keys(EXPENSE_TYPES_DISPLAY)[0]);
  };

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  const onCategoryChange = e => {
    setCategory(e.target.value);
  };

  const onAmountChange = e => {
    const value = e.target.value.match(/^[-]?\d*$/);
    if (value !== null) {
      setAmount(value[0]);
    }
  };

  const addLog = () => {
    if (showForm === false) {
      setShowForm(true);
      return;
    }

    const newLog = {
      title: title || "Untitled",
      amount: +amount || 0,
      category,
      timestamp: new Date()
    };

    addNewLog(newLog);
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="add-container">
      <div
        className={showForm === false ? "inputs" : "btn btn-reverse"}
        onClick={() => setShowForm(false)}
      >
        X
      </div>
      <div className={showForm === false ? "inputs" : "inputs show-inputs"}>
        <input
          type="text"
          className="log-input"
          value={title}
          placeholder="Title"
          onChange={onTitleChange.bind(this)}
        />
        <select
          className="log-input"
          value={category}
          onChange={onCategoryChange.bind(this)}
        >
          {Object.keys(EXPENSE_TYPES_DISPLAY).map(t => (
            <option key={t} value={t}>
              {EXPENSE_TYPES_DISPLAY[t]}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="log-input"
          ref={amountRef}
          onClick={() => amountRef.current.select()}
          value={amount}
          onChange={onAmountChange}
        />
      </div>
      <button
        onMouseOver={() => setShowForm(true)}
        className="btn"
        onClick={addLog}
        style={showForm === false ? { borderRadius: "50%" } : {}}
      >
        <i className="fas fa-plus"></i>
        {showForm && "Add"}
      </button>
    </div>
  );
}
