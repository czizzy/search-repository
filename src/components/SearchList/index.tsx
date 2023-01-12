import { SearchRepositoryResponse } from "../../global";
import { isSearchRepositoryResponse } from "../../utils";
import Star from "../Icons/Star";

import "./SearchList.css";

type SearchListProps = {
  result: SearchRepositoryResponse | string;
  q: string;
};

export function SearchList(props: SearchListProps) {
  const { result, q } = props;
  if (isSearchRepositoryResponse(result)) {
    const { items } = result;
    const dateTimeFormat = new Intl.DateTimeFormat();
    return items.length ? (
      <div className="search-list">
        <h2>{result.total_count} repository results</h2>
        <ul role="list">
          {items.map((item) => {
            return (
              <li role="listitem" key={item.id}>
                <div className="repo-title">
                  <a href={item.html_url} target="_blank" rel="noreferrer" role="link" tabIndex={0}>
                    {item.full_name}
                  </a>
                </div>
                <div className="repo-desc">{item.description}</div>
                {item.stargazers_count ? (
                  <div className="repo-info">
                    <div className="repo-star">
                      <a href={`${item.html_url}/stargazers`} target="_blank" rel="noreferrer">
                        <Star /> {item.stargazers_count}
                      </a>
                    </div>
                    <div className="repo-update">
                      Updated on {dateTimeFormat.format(new Date(item.updated_at))}
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <div className="tip">We couldn’t find any repositories matching &apos;{q}&apos;</div>
    );
  } else {
    return <div className="tip">Error: {result}</div>;
  }
}
