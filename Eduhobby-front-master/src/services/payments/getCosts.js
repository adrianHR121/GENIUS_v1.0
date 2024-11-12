import fetchCosts from "./costsService";

export default async () => 
    await (await fetchCosts({}, {}, 'GET')).json()