import { ChangeEvent, useCallback } from "react";
import debounce from "lodash/debounce";
import BounceLoader from "react-spinners/BounceLoader";

import "./SearchBox.css";

type SearchBoxProps = {
  onChange: (value: string) => void;
  isSearching: boolean;
};

export function SearchBox(props: SearchBoxProps) {
  const { onChange, isSearching } = props;

  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }, 400),
    [],
  );
  return (
    <div className="searchbox-container">
      <label className="searchbox-label">
        <input
          className="searchbox"
          type="text"
          placeholder="Search Github repositories"
          onChange={handleChange}
          name="q"
          autoFocus
        />
      </label>
      {isSearching ? <BounceLoader size={30} color={"#f4a261"} /> : null}
    </div>
  );
}
