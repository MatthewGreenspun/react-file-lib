import { useState, useEffect, useLayoutEffect, useCallback } from "react";

/**
 *	recalculates value when window size changes
 * @param fn
 * @returns
 */
export function useResizeValue<T>(fn: () => T): T {
  const [value, setValue] = useState(fn());
  useEffect(() => {
    window.addEventListener("resize", () => setValue(fn()));
    return () => window.removeEventListener("resize", () => setValue(fn()));
  }, []);
  return value;
}

interface Options {
  dataType: "json" | "arrayBuffer" | "blob";
}

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

export function useFetch(url: string, opts: Options = { dataType: "json" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<
    Blob | Record<string, Json> | ArrayBuffer | string
  >();
  const [error, setError] = useState<Error>();

  const makeRequest = useCallback(async () => {
    try {
      const res = await fetch(url);
      // const data = await res[opts.dataType]();
      const data = await res.blob();
      const dataUrl = URL.createObjectURL(data);
      setIsLoading(false);
      setData(dataUrl);
      return data;
    } catch (err: any) {
      setIsLoading(false);
      setError(err);
    }
  }, [url]);

  useEffect(() => {
    makeRequest();
  }, [makeRequest]);

  return { isLoading, data, error };
}
