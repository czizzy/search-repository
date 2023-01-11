import { ChangeEvent, useCallback } from "react";
import debounce from "lodash/debounce";
import ScaleLoader from "react-spinners/ScaleLoader";

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
    <div style={{ display: "flex" }}>
      <label>
        <input
          type="text"
          placeholder="Search Github repositories"
          onChange={handleChange}
          name="q"
        />
      </label>
      {isSearching ? <ScaleLoader /> : null}
    </div>
  );
}
