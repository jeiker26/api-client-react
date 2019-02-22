import React from "react";
import ReactDOM from "react-dom";
import { connectApiClient } from "../src/connect";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return <p>loading</p>;
    }
    return <p>Test</p>;
  }
}

export const mapApiProps = ({ loading, data, error }) => ({
  loading,
  books: data,
  error,
  complete: !loading && data && !error ? "true" : "false"
});

const TestConnected = connectApiClient(mapApiProps)(Test);

ReactDOM.render(<TestConnected />, document.getElementById("root"));

module.hot.accept();
