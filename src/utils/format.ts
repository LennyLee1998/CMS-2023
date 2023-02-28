import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// 通过utc的插件对原来dayjs进行拓展, 会继承一些方法
dayjs.extend(utc);

// utcString: 0时区的UTC
export function formatUTC(
  utcString: string,
  //如果有默认值,这里就可以不写类型,因为可以自动进行类型推导
  format = "YYYY/MM/DD HH:mm:ss"
) {
  // utc后面可以传入一个utc的字符串
  // 链式编程
  // utcOffset:在原来的基础上偏移8小时
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format);
  return resultTime;
}
