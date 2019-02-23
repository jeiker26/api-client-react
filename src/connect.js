import React from "react";
import { Apiclient } from "../src";
import hoistNonReactStatics from "hoist-non-react-statics";

export const connectApiClient = (apiSettings = false, mapApiProps = false) => {
  return WrappedComponent => {
    class ConnectApiClient extends React.Component {
      constructor(props) {
        super(props);
        this.config;
        this.state = {
          loading: true,
          error: false,
          data: null
        };

        apiSettings && this.setConfig();
      }

      setConfig = settings => {
        this.config = settings;
        this.getApiClient();
      };

      getApiClient = () => {
        this.Apiclient$ = new Apiclient(this.config).getApiClient();
        this.initSubcribe();
      };

      initSubcribe = () => {
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
      interfaceMethods = () => {
        return {
          fetch: settings => this.setConfig(settings)
        };
      };

      render() {
        return (
          <WrappedComponent
            {...this.interfaceProps()}
            apiClient={this.interfaceMethods()}
            {...this.props}
          />
        );
      }
    }

    hoistNonReactStatics(ConnectApiClient, WrappedComponent);

    return ConnectApiClient;
  };
};
