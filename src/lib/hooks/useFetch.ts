import useSWR, { type SWRResponse } from "swr";

export const fetcher = (url: string) =>
  fetch(url, {
    referrerPolicy: "unsafe-url",
  }).then((res) => res.json());

/** A custom hook built on top a fetch library.
 * Why? This abstraction not only makes code readable but
 * also get makes code look cleaner in the codebase.
 *
 * @example
 * // Without abstraction.
 * import { useEffect, useState } from 'react';
 *
 * const [data, setData] = useState();
 *
 * // Fetch data after initial page loaded
 * useEffect(() => {
 *  (async () => {
 *    let response = await fetch(...);
 *    let data_ = await response.json();
 *
 *    setData(data_)
 *  })();
 * }, []);
 *
 * // With abstraction.
 * import { useFetch } from '..';
 *
 * const { data, isLoading } = useFetch<MyType>(...);
 *
 * if (isLoading) return // Skeleton ;
 * return // <MyCompoNent data={data} />;
 */
export const useFetch = <T extends Response>(
  url: string
): SWRResponse<ObjectType<T>> => {
  return useSWR(url, fetcher);
};

export enum Response {
  Universities,
  University,
}

type ObjectType<T> = T extends Response.Universities
  ? Universities
  : Universities;

export type Universities = University[];

export interface University {
  alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  web_pages: string[];
  "state-province"?: string;
}
