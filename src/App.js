import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    employees: [],
    isChecked: false,
    checkedValues: [],
    searchResult: []
  };

  componentDidMount = () => {
    axios.get("http://dummy.restapiexample.com/api/v1/employees").then(res => {
      if ((res.data.status = "success")) {
        this.setState({
          employees: res.data.data
        });
      }
    });
  };

  handleCheckboxClick = e => {
    this.setState({
      isChecked: !this.state.isChecked
    });
    let value = e.target.value;
    if (e.target.checked) {
      this.setState({
        checkedValues: [...this.state.checkedValues, value]
      });
    } else {
      let array = this.state.checkedValues;
      let index = array.indexOf(e.target.value);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ checkedValues: array });
      }
    }
  };

  filterList = event => {
    let item = event.target.value;
    item.toLowerCase();
    const values = this.state.checkedValues.filter(value => {
      return value.toLowerCase().search(item) !== -1;
    });
    this.setState({
      searchResult: values
    });
  };

  render() {
    return (
      <div className="container main__container">
        <div className="row">
          <div className="col s12">
            <input
              type="text"
              placeholder="search"
              onChange={this.filterList}
            />
            <div>
              {this.state.searchResult.map(value => {
                return <p>{value}</p>;
              })}
            </div>
            <form>
              <div className="card-panel teal">
                <div className="main__container">
                  {this.state.employees.map((employee, i) => {
                    return (
                      <p key={employee.id}>
                        <label>
                          <input
                            type="checkbox"
                            value={employee.employee_name}
                            defaultChecked={this.state.checked}
                            onClick={e => this.handleCheckboxClick(e)}
                          />
                          <span className="white-text">
                            {employee.employee_name}
                          </span>
                        </label>
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="card-panel">
                {this.state.checkedValues &&
                  this.state.checkedValues.map(val => {
                    return (
                      <div>
                        <p>{val}</p>
                        <button className="btn">Approve</button>
                        <button className="btn">Reject</button>
                      </div>
                    );
                  })}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
