import CityProtectedLink from "../../city-protected-link";

export default function RecentSelections({ recentSelections, onSelection }) {
  if (recentSelections.length > 0)
    return (
      <div>
        <p className="text-gray-400 text-sm mb-2">Recently viewed</p>
        <ul>
          {recentSelections.map((recentItem) => {
            const { id, name, slug } = recentItem;
            return (
              <li
                key={id}
                className=" text-gray-darker text-sm p-1.5 hover:bg-gray-100 rounded"
              >
                <CityProtectedLink
                  href={`/${slug}`}
                  className="flex items-center gap-x-2 w-full"
                  onClick={() => onSelection(recentItem)}
                >
                  <i className="bx bx-time-five"></i>
                  <span>{name}</span>
                </CityProtectedLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
}
