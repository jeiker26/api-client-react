import React from "react";
import { Apiclient } from "../src";
import hoistNonReactStatics from "hoist-non-react-statics";

export const connectApiClient = (apiSettings, mapApiProps = false) => {
  return WrappedComponent => {
    class ConnectApiClient extends React.Component {
      constructor(props) {
        super(props);
        this.Apiclient$ = new Apiclient(apiSettings).getApiClient();

        this.state = {
          loading: true,
          error: false,
          data: null
        };

        console.log("[ConnectApiClient] Init");
        console.log("[ConnectApiClient] Loading");
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
        console.log("[ConnectApiClient] Data");
        this.setState({ data, loading: false });
      };

      onComplete = () => {
        console.log("[ConnectApiClient] complete");
        this.setState({ loading: false });
      };

      onError = error => {
        console.log("[ConnectApiClient] error");
        this.setState({ loading: false, error });
      };

      interfaceProps = () => (mapApiProps ? mapApiProps(this.state) : this.state);

      render() {
        return <WrappedComponent {...this.interfaceProps()} {...this.props} />;
      }
    }

    hoistNonReactStatics(ConnectApiClient, WrappedComponent);

    return ConnectApiClient;
  };
};
