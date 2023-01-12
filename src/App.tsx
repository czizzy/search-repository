import { useCallback, useState } from "react";

import { useQueryResponse } from "./hooks/useQueryResponse";
import { SearchBox } from "./components/SearchBox";
import { SearchList } from "./components/SearchList";
import { isSearchRepositoryResponse } from "./utils";
import type { SearchRepositoryParameters } from "./global";
import "./App.css";
import { Pagination } from "./components/Pagination";

function App() {
  const [searchParams, setSearchParams] = useState<SearchRepositoryParameters>({
    q: "",
    per_page: 10,
    page: 1,
    sort: undefined,
  });
  const [results, isLoading] = useQueryResponse(searchParams);
  const handleQChange = useCallback(
    (value: string) => {
      setSearchParams({ ...searchParams, q: value });
    },
    [searchParams],
  );

  const handlePageChange = useCallback(
    (value: number) => {
      setSearchParams({ ...searchParams, page: value });
    },
    [searchParams],
  );

  return (
    <div className="App">
      <div>This project implements a demo that searches the GitHub repository.</div>
      <div>
        <strong>
          For unauthenticated requests, the rate limit allows you to make up to 10 requests per
          minute. Read more about{" "}
          <a
            href="https://docs.github.com/en/rest/search?apiVersion=2022-11-28#rate-limit"
            target="_blank"
            rel="noreferrer"
          >
            Github API Rate limit
          </a>
        </strong>
      </div>
      <div>If you encounter this problem, please try again later.</div>

      <SearchBox onChange={handleQChange} isSearching={isLoading} />

      {results ? (
        <div
          style={{
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <SearchList result={results} q={searchParams.q} />
          {isSearchRepositoryResponse(results) ? (
            <Pagination
              totalCount={results.total_count}
              currentPage={searchParams.page}
              onChange={handlePageChange}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
