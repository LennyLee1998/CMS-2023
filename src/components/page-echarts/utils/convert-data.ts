import { coordinateData } from "./coordinate-data";

export function convertData(data: any) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    // 根据名字取出对应城市的经纬度
    const geoCoord = coordinateData[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
}
