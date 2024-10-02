import { CollectionItem } from "../../services/assetsApi/types";

interface AssetElementProps {
  asset: CollectionItem;
}

const AssetElement = (props: AssetElementProps) => {
  return (
    <>
      <div>
        <h2>{props.asset.data[0].title}</h2>
        {props.asset.data[0].media_type === "image" && (
          <img
            src={props.asset.links?.[0].href}
            alt={props.asset.data[0].title}
          />
        )}
        {props.asset.data[0].media_type === "video" && (
          <video controls>
            <source src={props.asset.links?.[0].href} type="video/mp4" />
          </video>
        )}
      </div>
    </>
  );
};

export default AssetElement;
