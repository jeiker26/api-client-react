export default class ApiClient {
  constructor(x) {
    this.name = x;
  }
  view() {
    console.log("loading..." + this.name);
  }
}
