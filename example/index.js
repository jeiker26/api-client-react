import ApiClient from "../src";

const api = new ApiClient({ apiUrl: "https://pokeapi.co/api/v2/" });
const res = api.get("https://pokeapi.co/api/v2/pokemon/ditto/").then(x => console.log(x));
console.log(res);
