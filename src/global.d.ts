import type { Endpoints } from "@octokit/types";

declare type SearchRepositoryParameters = Endpoints["GET /search/repositories"]["parameters"];
declare type SearchRepositoryResponse = Endpoints["GET /search/repositories"]["response"]["data"];
