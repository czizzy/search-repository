import { useEffect, useState } from "react";
import type { SearchRepositoryParameters, SearchRepositoryResponse } from "./global";

export function useQueryResponse(
  searchParams: SearchRepositoryParameters,
): [SearchRepositoryResponse | string | null, boolean] {
  const [data, setData] = useState<SearchRepositoryResponse | null>(null);
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
        setIsLoading(false);
        if (!response.ok) {
          const error = json?.message || response.status;
          setData(error);
        } else {
          setData(json);
        }
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
