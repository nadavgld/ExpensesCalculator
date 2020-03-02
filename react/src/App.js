import React from "react";
import { LogApi } from "./utils/api";
import Calculator from "./components/Calculator.js";
import AddLog from "./components/AddLog.js";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      Logs: [],
      Filter: null,
      LogsToShow: []
    };

    LogApi.get()
      .then(logs => {
        this.setLogs(logs);
        this.updateFilteredLogs(logs);
      })
      .catch(e => {
        this.setLogs([]);
      });
  }

  setLogs = Logs => {
    this.setState(state => {
      return { ...state, Logs };
    });
  };

  setFilter = Filter => {
    this.setState(state => {
      return { ...state, Filter };
    });
  };

  setLogsToShow = Logs => {
    this.setState(state => {
      return { ...state, LogsToShow: Logs };
    });
  };

  removeLog = id => {
    LogApi.delete(id)
      .then(response => {
        if (!response.success) return;

        const _tmpLogs = this.state.Logs.filter(l => l._id !== id);
        this.setLogs(_tmpLogs);
        this.updateFilteredLogs(_tmpLogs);
      })
      .catch(e => {
        console.log(e);
      });
  };

  addNewLog = log => {
    LogApi.add(log)
      .then(newLog => {
        const _logs = [newLog, ...this.state.Logs];

        this.setLogs(_logs);
        this.updateFilteredLogs(_logs);
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateFilteredLogs = logs => {
    this.setLogsToShow(
      logs.filter(l =>
        this.state.Filter === null ? l : l.category === this.state.Filter
      )
    );
  };

  setNewFilter = filter => {
    const filterToShow =
      filter == null
        ? this.state.Filter
        : this.state.Filter === filter
        ? null
        : filter;

    this.setFilter(filterToShow);

    this.setLogsToShow(
      this.state.Logs.filter(l =>
        filterToShow === null ? l : l.category === filter
      )
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Expenses Calculator</h1>
        <AddLog addNewLog={this.addNewLog} />
        <Calculator
          removeLog={this.removeLog}
          filter={this.state.Filter}
          setNewFilter={this.setNewFilter}
          Logs={this.state.LogsToShow}
        />
      </div>
    );
  }
}

export default App;
