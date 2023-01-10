import { ChangeEvent, useCallback } from "react";
import debounce from "lodash/debounce";

type SearchBoxProps = {
  onChange: (value: string) => void;
};

export function SearchBox(props: SearchBoxProps) {
  const { onChange } = props;

  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }, 500),
    [],
  );
  return (
    <div>
      <label>
        <input
          type="text"
          placeholder="Search Github repositories"
          onChange={handleChange}
          name="q"
        />
      </label>
    </div>
  );
}
