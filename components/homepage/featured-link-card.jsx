import Link from "next/link";
import Image from "next/image";

export default function FeaturedLinkCard({ featuredItem }) {
  const { title, imageUrl, imageAlt, iconUrl, iconAlt, slug } = featuredItem;

  return (
    <li className="rounded-md overflow-hidden shadow-lg">
      <Link href={slug} className="relative block p-2 lg:p-2.5 xl:p-3 h-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="-z-10 object-cover"
          sizes="(max-width: 768px) 33vw, 16.67vw"
        />
        <div className="flex flex-col">
          <div className="self-end relative size-7 lg:size-8 mb-6 xl:mb-10">
            <Image
              src={iconUrl}
              alt={iconAlt}
              sizes="(max-width: 1024px) 28px, 32px"
              fill
            />
          </div>
          <p className="text-xs lg:text-sm xl:text-base">{title}</p>
        </div>
      </Link>
    </li>
  );
}
