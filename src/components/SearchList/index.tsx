import { SearchRepositoryResponse } from "../../global";

type SearchListProps = {
  list: SearchRepositoryResponse["items"];
};

export function SearchList(props: SearchListProps) {
  const { list } = props;
  return (
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
  );
}
