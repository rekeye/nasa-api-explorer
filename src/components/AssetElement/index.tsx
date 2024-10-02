import { CollectionItem } from "../../services/assetsApi/types";

interface AssetElementProps {
  asset: CollectionItem;
}

const AssetElement = (props: AssetElementProps) => {
  return (
    <>
      <li className="rounded-md overflow-hidden">
        {props.asset.data[0].media_type === "image" && (
          <img
            className="object-contain aspect-square"
            src={props.asset.links?.[0].href}
            alt={props.asset.data[0].title}
          />
        )}
        {props.asset.data[0].media_type === "video" && (
          <video controls>
            <source src={props.asset.links?.[0].href} type="video/mp4" />
          </video>
        )}
        <h2 className="text-center">{props.asset.data[0].title}</h2>
      </li>
    </>
  );
};

export default AssetElement;
