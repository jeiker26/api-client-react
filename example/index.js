import React from "react";
import ReactDOM from "react-dom";
import { connectApiClient } from "../dist";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  // option 1
  getData() {
    this.props.apiClient.fetch({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users"
    });
  }

  render() {
    if (this.props.loading) {
      return <p>loading</p>;
    }
    return (
      <ol>
        {this.props.books.map(b => (
          <li key={b.name}>{b.name}</li>
        ))}
      </ol>
    );
  }
}

// Same object: https://github.com/axios/axios#axios-api
/**  option 2
const apiSettings = {
  method: "get",
  url: "https://jsonplaceholder.typicode.com/users"
}; */

const mapApiProps = ({ loading, data, error }) => ({
  loading,
  books: data,
  error,
  complete: !loading && data && !error ? "true" : "false"
});

const TestConnected = connectApiClient(false, mapApiProps)(Test);

ReactDOM.render(<TestConnected />, document.getElementById("root"));

module.hot.accept();
