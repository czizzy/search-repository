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
  const results = useQueryResponse(searchParams);
  const handleChange = useCallback((value: string) => {
    console.log("value", value);
    setSearchParams({ ...searchParams, q: value });
  }, []);

  const list = results?.items;
  return (
    <div className="App">
      <div className="title">
        This project implements a demo that searches the GitHub repository.
      </div>
      <SearchBox onChange={handleChange} />
      {list?.length ? <SearchList list={list} /> : null}
    </div>
  );
}

export default App;
