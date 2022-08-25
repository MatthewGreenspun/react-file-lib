import React, { useState, useEffect, useCallback } from "react";

export function useResizeValue<T>(fn: () => T): T {
  const [value, setValue] = useState(fn());
  useEffect(() => {
    window.addEventListener("resize", () => setValue(fn()));
    return () => window.removeEventListener("resize", () => setValue(fn()));
  }, [fn]);
  return value;
}

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  console.log("fetching");

  const callbackMemoized = useCallback(() => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);
    fn()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, deps);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { isLoading, data, error };
}
