import { useEffect, useState } from "react";

export function useMemoryState<T>(defaultValue: T, key: string) {
  const deserialize = (value: string): T => {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === typeof defaultValue) {
        return parsed;
      } else if (defaultValue instanceof Date && typeof parsed === "string") {
        return new Date(parsed) as unknown as T;
      }
      return defaultValue;
    } catch {
      if (typeof defaultValue === "number") {
        return Number(value) as unknown as T;
      } else if (typeof defaultValue === "boolean") {
        return (value === "true") as unknown as T;
      } else {
        return value as unknown as T;
      }
    }
  };

  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? deserialize(storedValue) : defaultValue;

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
