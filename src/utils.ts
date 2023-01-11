import type { SearchRepositoryParameters } from "./global";

export function getDefaultSearchParams(): SearchRepositoryParameters {
  return {
    q: "",
    per_page: 10,
    page: 1,
    sort: undefined,
  };
}
