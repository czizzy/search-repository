import { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export type UsePaginationProps = {
  totalCount: number;
  totalPageCount: number;
  currentPage?: number;
};

const siblingCount = 1;

type Item = number | typeof DOTS;

export const usePagination = ({
  totalCount,
  totalPageCount,
  currentPage = 1,
}: UsePaginationProps): Array<Item> => {
  const paginationRange = useMemo(() => {
    /**
     * firstPage + DOTS + siblingCount_start + currentPage + siblingCount_end + lastPage
     * < 1 ... 5 ... 7>
     * ... means there's at least 2 number
     */
    const showAllRangePageNumbers = 1 + 1 + (siblingCount * 2 + 1) + 1 + 1;

    /*
      If the number of pages is less than the page numbers we want to show in our
      pagination component, we return the range [1..totalPageCount]
    */
    if (totalPageCount <= showAllRangePageNumbers) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not want to show dots if there is only one position left 
      as that would lead to a change if our Pagination component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 3;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount] as Array<Item>;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange] as Array<Item>;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex] as Array<Item>;
    }

    return range(1, totalPageCount);
  }, [totalCount, currentPage]);
  return paginationRange;
};
