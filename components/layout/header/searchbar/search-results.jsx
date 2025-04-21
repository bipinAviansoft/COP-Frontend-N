import CityProtectedLink from "../../city-protected-link";

export default function SearchResults({ results, onSelection }) {
  return (
    <ul>
      {results.map((result) => {
        const { id, name, slug } = result;
        return (
          <li
            key={id}
            className=" text-gray-darker text-sm p-1.5 hover:bg-gray-100 rounded"
          >
            <CityProtectedLink
              href={`/${slug}`}
              className="flex items-center gap-x-2"
              onClick={() => onSelection(result)}
            >
              <span>{name}</span>
            </CityProtectedLink>
          </li>
        );
      })}
    </ul>
  );
}
