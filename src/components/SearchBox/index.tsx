import { ChangeEvent, useCallback } from "react";
import debounce from "lodash/debounce";
import BounceLoader from "react-spinners/BounceLoader";

import "./SearchBox.css";

type SearchBoxProps = {
  onQueryChange: (value: string) => void;
  onSortChange: (value: SearchRepositoryParameters["sort"]) => void;
  isSearching: boolean;
};

const sortOptions: Array<[SearchRepositoryParameters["sort"], string]> = [
  [undefined, "Best match"],
  ["stars", "Most stars"],
  ["forks", "Most forks"],
  ["updated", "Most updated"],
];

export function SearchBox(props: SearchBoxProps) {
  const { onQueryChange, onSortChange, isSearching } = props;

  const handleInputChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      onQueryChange(e.target.value);
    }, 400),
    [onQueryChange],
  );

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SearchRepositoryParameters["sort"]);
  };
  return (
    <div className="searchbox-container">
      <label className="searchbox-q-label">
        <input
          className="searchbox"
          type="text"
          placeholder="Search Github repositories"
          onChange={handleInputChange}
          name="q"
          autoFocus
        />
        {isSearching ? <BounceLoader size={30} color={"#f28482"} /> : null}
      </label>
      <label className="searchbox-sort-label">
        <select
          disabled={isSearching}
          name="sort"
          defaultValue={""}
          onChange={handleSortChange}
          role="listbox"
        >
          {sortOptions.map(([value, text]) => (
            <option key={text} value={value ?? ""}>
              {text}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
