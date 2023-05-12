export default function agoForm(publishedAt) {
  const published = new Date(publishedAt);
  const date = new Date();
  const diff = date - published;
  const unit = {
    년: 1000 * 60 * 60 * 24 * 265,
    달: 1000 * 60 * 60 * 24 * 30,
    일: 1000 * 60 * 60 * 24,
    시간: 1000 * 60 * 60,
    분: 1000 * 60,
    초: 1000,
  };
  const seletedUnit = Object.keys(unit).filter((key) => unit[key] <= diff)[0];
  return `${Math.floor(diff / unit[seletedUnit])}${seletedUnit}`;
}
