import React from "react";
import { Apiclient } from "./apiClient";
import hoistNonReactStatics from "hoist-non-react-statics";

const initialSection = {
  loading: false,
  error: false,
  complete: false,
  data: null,
  _subscription: null
};

export const connectApiClient = (componentSections = [], apiSettings = false) => {
  return WrappedComponent => {
    class ConnectApiClient extends React.Component {
      constructor(props) {
        super(props);

        if (apiSettings && apiSettings.apiConfig && apiSettings.section) {
          let sections = this.generateSections(componentSections);

          sections[apiSettings.section].loading = true;
          sections[apiSettings.section]._subscription = this._fetch(
            apiSettings.apiConfig,
            apiSettings.section
          );

          this.state = {
            response: sections
          };
        } else {
          this.state = {
            response: this.generateSections(componentSections)
          };
        }
      }

      generateSections = sections => {
        let sectionInitialState = [];

        sections.forEach(s => {
          sectionInitialState[s] = { ...initialSection };
        });

        return sectionInitialState;
      };

      _fetch = (settings, section) => {
        const apiClient = new Apiclient(settings).getApiClient();

        return apiClient.subscribe({
          next: data => this.onNext(data, section),
          complete: () => this.onComplete(section),
          error: error => this.onError(error, section)
        });
      };

      onNext = (data, section) => {
        console.log("[ConnectApiClient] Data");
        this.setState(preState => {
          let { response } = preState;

          response[section].data = data;
          response[section].loading = false;

          return {
            response
          };
        });
      };

      onComplete = section => {
        console.log("[ConnectApiClient] complete");
        this.setState(preState => {
          let { response } = preState;

          response[section].loading = false;
          response[section].complete = true;

          return {
            response
          };
        });
      };

      onError = (error, section) => {
        console.log("[ConnectApiClient] error");
        this.setState(preState => {
          let { response } = preState;

          response[section].error = error;
          response[section].loading = false;

          return {
            response
          };
        });
      };

      fetch = (settings, section) => {
        this.setState(preState => {
          let { response } = preState;

          response[section].loading = true;
          response[section].complete = false;
          response[section]._subscription = this._fetch(settings, section);

          return {
            response
          };
        });
      };

      interfaceProps = () => ({ ...this.state.response });
      interfaceMethods = () => {
        return {
          fetch: this.fetch
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
