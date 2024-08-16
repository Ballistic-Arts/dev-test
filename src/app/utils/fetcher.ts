import axios, { AxiosResponse } from "axios";

// Fetches data from the given URL using an HTTP GET request.

const fetcher = async <T>(url: string): Promise<T> => {
  const { data }: AxiosResponse<T> = await axios.get<T>(url);
  return data;
};

export default fetcher;
