export default function getCollectionIcon(asset) {
  const OBJECT_URL = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-collections/global/default/{asset}.png`;

  return OBJECT_URL.replace(/{asset}/gi, asset);
}
