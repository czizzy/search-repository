import { SearchRepositoryResponse } from "../../global";

type SearchListProps = {
  list: SearchRepositoryResponse["items"];
  q: string;
};

export function SearchList(props: SearchListProps) {
  const { list, q } = props;
  return list.length ? (
    <ul role="list">
      {list.map((item) => {
        return (
          <li role="listitem" key={item.id}>
            <a href={item.html_url} target="_blank" rel="noreferrer" role="link" tabIndex={0}>
              {item.full_name}
            </a>
          </li>
        );
      })}
    </ul>
  ) : (
    <div>We couldn’t find any repositories matching &apos;{q}&apos;</div>
  );
}
