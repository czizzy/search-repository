import { useEffect, useState } from "react";
import type { SearchRepositoryParameters, SearchRepositoryResponse } from "./global";

export function useQueryResponse(
  searchParams: SearchRepositoryParameters,
): [SearchRepositoryResponse | null, boolean] {
  console.log("useQueryResponse", searchParams);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    const urlSearchParams = new URLSearchParams(searchParams as unknown as Record<string, string>);
    async function getGithubRepositories() {
      const response = await fetch(
        `https://api.github.com/search/repositories?${urlSearchParams.toString()}`,
        {
          signal: abortController.signal,
        },
      );
      if (!abortController.signal.aborted) {
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      }
    }

    if (searchParams.q) {
      setIsLoading(true);
      getGithubRepositories();
    } else {
      setIsLoading(false);
      setData(null);
    }

    return () => {
      abortController.abort();
    };
  }, [searchParams]);
  return [data, isLoading];
}
