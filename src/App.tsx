import { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { useQueryResponse } from "./hooks";
import "./App.css";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const results = useQueryResponse(searchParams);
  console.log("result", results);
  const list = results?.items;
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQ = formData.get("q") as string;
    if (!newQ) return;
    setSearchParams({ q: newQ });
  }
  return (
    <div className="App">
      <div className="title">Search</div>
      <form onSubmit={handleSubmit} method="GET">
        <label>
          <input
            key={q}
            type="text"
            placeholder="Search Github repositories"
            defaultValue={q ?? ""}
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

      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
