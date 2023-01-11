import { useCallback, useState } from "react";

import { useQueryResponse } from "./hooks";
import { SearchBox } from "./components/SearchBox";
import { SearchList } from "./components/SearchList";
import { getDefaultSearchParams } from "./utils";
import type { SearchRepositoryParameters } from "./global";
import "./App.css";

function App() {
  const [searchParams, setSearchParams] = useState<SearchRepositoryParameters>(() =>
    getDefaultSearchParams(),
  );
  const [results, isLoading] = useQueryResponse(searchParams);
  const handleChange = useCallback((value: string) => {
    setSearchParams({ ...searchParams, q: value });
  }, []);

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
      <SearchBox onChange={handleChange} isSearching={isLoading} />
      {results ? (
        <div
          style={{
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <SearchList result={results} q={searchParams.q} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
