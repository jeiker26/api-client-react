import { Observable } from "rxjs";
import axios from "axios";

export class Apiclient {
  constructor() {
    this.client$;
    this.fetch();
  }

  fetch = () => {
    this.client$ = Observable.create(observer => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
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
