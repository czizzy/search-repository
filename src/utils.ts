import type { SearchRepositoryResponse } from "./global";

export function isSearchRepositoryResponse(
  res: SearchRepositoryResponse | string,
): res is SearchRepositoryResponse {
  return (res as SearchRepositoryResponse).items !== undefined;
}
