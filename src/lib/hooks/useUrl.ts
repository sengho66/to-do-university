import { useEffect, useMemo, useRef, useState } from "react";

const BASE_URL = "http://universities.hipolabs.com/search?limit=10";

export const useUrl = () => {
  const [offset, setOffset] = useState(0);
  const [country, setCountry] = useState<string | undefined>();

  const prevCountry = usePrevious(country);

  const url = useMemo(() => {
    if (country) {
      if (prevCountry !== country) {
        setOffset(0);
      }
      return `${BASE_URL}&offset=${offset}&country=${country}`;
    }
    return `${BASE_URL}&offset=${offset}`;
  }, [country, prevCountry, offset]);

  return { offset, setOffset, country, setCountry, url };
};

const usePrevious = (value: string | undefined) => {
  const ref = useRef<string | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
