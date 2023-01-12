import { DOTS, usePagination, UsePaginationProps } from "../../hooks/usePagination";

import "./Pagination.css";

type PaginationProps = Omit<UsePaginationProps, "totalPageCount"> & {
  onChange: (current: number) => void;
  disabled?: boolean;
  maxCount?: number;
};

const pageSize = 10;

export function Pagination(props: PaginationProps) {
  const { maxCount = 1000, currentPage = 1, totalCount, onChange, disabled = false } = props;
  const totalPageCount = Math.ceil(Math.min(maxCount, totalCount) / pageSize);
  const items = usePagination({ ...props, totalPageCount });

  function handleChange(current: number) {
    if (current !== currentPage) {
      onChange(current);
    }
  }

  return items.length ? (
    <ul role="navigation" aria-label="Pagination" className="pagination">
      <li key={"prev"}>
        <button
          tabIndex={0}
          type="button"
          disabled={disabled || currentPage === 1}
          aria-label={`page ${currentPage - 1}`}
          onClick={() => {
            handleChange(currentPage - 1);
          }}
        >
          &lt; Previous
        </button>
      </li>
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          {item === DOTS ? (
            <div>...</div>
          ) : (
            <button
              tabIndex={0}
              type="button"
              aria-label={`page ${item}`}
              disabled={disabled}
              className={typeof item === "number" && currentPage === item ? "active" : ""}
              onClick={() => {
                handleChange(item);
              }}
            >
              {item}
            </button>
          )}
        </li>
      ))}
      <li key={"next"}>
        <button
          tabIndex={0}
          type="button"
          disabled={disabled || currentPage === totalPageCount}
          aria-label={`page ${currentPage + 1}`}
          onClick={() => {
            handleChange(currentPage + 1);
          }}
        >
          Next &gt;
        </button>
      </li>
    </ul>
  ) : null;
}
