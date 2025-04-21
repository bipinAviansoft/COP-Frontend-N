import homepageFeaturedLinks from "../../data/homepage-featured-cards.json";
import FeaturedLinkCard from "./featured-link-card";

export default function FeaturedLinks() {
  return (
    <ul className="grid grid-cols-3 md:grid-cols-6 gap-3 text-white">
      {homepageFeaturedLinks.map((featuredItem, index) => (
        <FeaturedLinkCard key={index} featuredItem={featuredItem} />
      ))}
    </ul>
  );
}
