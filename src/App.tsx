import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { useQueryResponse } from "./hooks";
import { SearchBox } from "./components/SearchBox";
import { SearchList } from "./components/SearchList";
import "./App.css";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const results = useQueryResponse(searchParams);
  console.log("result", results);
  const handleChange = useCallback((value: string) => {
    console.log("value", value);
    setSearchParams({ q: value });
  }, []);

  const q = searchParams.get("q");
  const list = results?.items;
  return (
    <div className="App">
      <div className="title">
        This project implements a demo that searches the GitHub repository.
      </div>
      <SearchBox query={q} onChange={handleChange} />
      {list?.length ? <SearchList list={list} /> : null}
    </div>
  );
}

export default App;
