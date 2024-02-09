import { useCallback, useState, memo } from "react";

import { useQueryResponse } from "./hooks/useQueryResponse";
import { SearchBox } from "./components/SearchBox";
import { SearchList } from "./components/SearchList";
import { isSearchRepositoryResponse } from "./utils";
import { Pagination } from "./components/Pagination";

import "./App.css";

const Desc = memo(() => {
  return (
    <div className="app-desc">
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
    </div>
  );
});

Desc.displayName = "Desc";

function App() {
  const [searchParams, setSearchParams] = useState<SearchRepositoryParameters>({
    q: "",
    per_page: 10,
    page: 1,
  });
  const [results, isSearching] = useQueryResponse(searchParams);
  const handleQueryChange = useCallback(
    (value: string) => {
      setSearchParams({ ...searchParams, q: value, page: 1 });
    },
    [searchParams],
  );

  const handlePageChange = useCallback(
    (value: number) => {
      setSearchParams({ ...searchParams, page: value });
    },
    [searchParams],
  );

  const handleSortChange = useCallback(
    (value: SearchRepositoryParameters["sort"]) => {
      setSearchParams({ ...searchParams, sort: value });
    },
    [searchParams],
  );

  return (
    <div className="App">
      <SearchBox
        onQueryChange={handleQueryChange}
        onSortChange={handleSortChange}
        isSearching={isSearching}
      />
      <div
        style={{
          opacity: isSearching ? 0.5 : 1,
        }}
      >
        {results ? (
          <>
            <SearchList result={results} q={searchParams.q} />
            {isSearchRepositoryResponse(results) ? (
              <Pagination
                totalCount={results.total_count}
                currentPage={searchParams.page}
                onChange={handlePageChange}
                disabled={isSearching}
              />
            ) : null}
          </>
        ) : (
          <Desc />
        )}
      </div>
    </div>
  );
}

export default App;
