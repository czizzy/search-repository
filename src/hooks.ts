import { useEffect, useState } from "react";
import type { SearchRepositoryResponse } from "./global";

export function useQueryResponse(query: URLSearchParams): SearchRepositoryResponse | null {
  console.log("useQueryResponse", query.toString());
  const [data, setData] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();

    async function getGithubRepositories() {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
        signal: abortController.signal,
      });
      if (!abortController.signal.aborted) {
        const json = await response.json();
        setData(json);
      }
    }

    if (query.has("q")) {
      getGithubRepositories();
    } else {
      setData(null);
    }

    return () => {
      abortController.abort();
    };
  }, [query]);
  return data;
}
