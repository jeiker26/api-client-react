import React from "react";
import { Apiclient } from "../src";
import hoistNonReactStatics from "hoist-non-react-statics";

export const connectApiClient = mapApiProps => {
  return WrappedComponent => {
    class ConnectApiClient extends React.Component {
      constructor(props) {
        super(props);

        console.log(mapApiProps(props));

        this.Apiclient$ = new Apiclient().getApiClient();

        this.state = {
          loading: true,
          error: false,
          data: null
        };

        this.defaultInit();
      }

      defaultInit = () => {
        this.Apiclient$.subscribe({
          next: this.onNext,
          complete: this.onComplete,
          error: this.onError
        });
      };

      onNext = data => {
        console.log("[data]");
        this.setState({ data, loading: false });
      };

      onComplete = () => {
        console.log("[complete]");
        this.setState({ loading: false });
      };

      onError = error => {
        console.log("[error]");
        this.setState({ loading: false, error });
      };

      render() {
        return <WrappedComponent {...mapApiProps(this.state)} {...this.props} />;
      }
    }

    hoistNonReactStatics(ConnectApiClient, WrappedComponent);

    return ConnectApiClient;
  };
};
