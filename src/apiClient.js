import { Observable } from "rxjs";
import axios from "axios";

export class Apiclient {
  constructor(apiSettings) {
    this.client$;
    this.fetch();

    this.settings = apiSettings;
  }

  fetch = () => {
    this.client$ = Observable.create(observer => {
      axios(this.settings)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  };

  getApiClient = () => this.client$;
}
