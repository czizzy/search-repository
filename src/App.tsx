import { ChangeEvent, FormEvent, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";
import { useQueryResponse } from "./hooks";
import "./App.css";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const results = useQueryResponse(searchParams);
  console.log("result", results);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      setSearchParams({ q: e.target.value });
    }, 500),
    [],
  );
  const q = searchParams.get("q");
  const list = results?.items;
  return (
    <div className="App">
      <div className="title">
        This project implements a demo that searches the GitHub repository.
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            key={q}
            type="text"
            placeholder="Search Github repositories"
            defaultValue={q ?? ""}
            onChange={handleChange}
            name="q"
          />
          <img src="/search.svg" className="search" alt="Search" width="20" height="20" />
        </label>
      </form>
      {list?.length ? (
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                <a href={item.html_url} target="_blank" rel="noreferrer">
                  {item.full_name}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default App;
