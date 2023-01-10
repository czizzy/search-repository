import { ChangeEvent, FormEvent, useCallback } from "react";
import debounce from "lodash/debounce";

type SearchBoxProps = {
  query: string | null;
  onChange: (value: string) => void;
};

export function SearchBox(props: SearchBoxProps) {
  const { onChange, query } = props;
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      onChange(e.target.value);
    }, 500),
    [],
  );
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          key={query}
          type="text"
          placeholder="Search Github repositories"
          defaultValue={query ?? ""}
          onChange={handleChange}
          name="q"
        />
        <img src="/search.svg" className="search" alt="Search" width="20" height="20" />
      </label>
    </form>
  );
}
