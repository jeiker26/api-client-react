import React from "react";
import ReactDOM from "react-dom";
import { connectApiClient } from "../src";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.getData("books");
  }

  getData = section => {
    this.props.apiClient.fetch(
      {
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users"
      },
      section
    );
  };

  getMoreBooks = () => {
    this.getData("moreBooks");
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Books</h2>
          <ol>
            {this.props.books.loading ? (
              <p>loading</p>
            ) : (
              this.props.books.data &&
              this.props.books.data.map(b => <li key={b.name}>{b.name}</li>)
            )}

            {this.props.moreBooks.loading ? (
              <p>loading</p>
            ) : (
              this.props.moreBooks.data &&
              this.props.moreBooks.data.map(b => <li key={b.name}>{b.name}</li>)
            )}
          </ol>

          {/** Button */}
          {!this.props.moreBooks.data && (
            <li>
              <button onClick={this.getMoreBooks}>Get more books</button>
            </li>
          )}
        </div>

        <div>
          <h2>Photos</h2>
          <ol>
            {this.props.photos.loading ? (
              <p>loading</p>
            ) : (
              this.props.photos.data &&
              this.props.photos.data.map(b => <li key={b.title}>{b.title}</li>)
            )}
          </ol>
        </div>
      </div>
    );
  }
}

// Same object: https://github.com/axios/axios#axios-api
//  option 2
const config = {
  apiConfig: {
    method: "get",
    url: "https://jsonplaceholder.typicode.com/photos"
  },
  section: "photos"
};

const componentSections = ["books", "moreBooks", "photos"];

const TestConnected = connectApiClient(componentSections, config)(Test);

ReactDOM.render(<TestConnected />, document.getElementById("root"));

module.hot.accept();
