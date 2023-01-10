import { SearchRepositoryResponse } from "../../global";

type SearchListProps = {
  list: SearchRepositoryResponse["items"];
};

export function SearchList(props: SearchListProps) {
  const { list } = props;
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.id}>
            <a href={item.html_url} target="_blank" rel="noreferrer">
              {item.full_name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
