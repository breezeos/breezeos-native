// import { useEffect, useState } from "react";

// export function useTime() {
//   //   const is12Hour = useAppSelector((state) => state.time.hour12);
//   //   const secEnabled = useAppSelector((state) => state.time.seconds);
//   const [hour, setHour] = useState<number>(new Date().getHours());
//   const [min, setMin] = useState<number>(new Date().getMinutes());
//   const [sec, setSec] = useState<number>(new Date().getSeconds());
//   //   const fullHour = `${
//   //     is12Hour && hour > 12
//   //       ? addZero(hour - 12)
//   //       : hour === 0
//   //       ? '12'
//   //       : addZero(hour)
//   //   }`;
//   const fullHour = `${
//     hour > 12
//       ? hour - 12
//       : hour === 0
//         ? "12"
//         : hour
//   }`;
//   const fullMin = addZero(min);
//   const fullSec = addZero(sec);
//   const amPm = `${hour >= 12 ? "PM" : "AM"}`;

//   function addZero(i: any) {
//     if (i < 10) {
//       i = "0" + i;
//     }
//     return i;
//   }

//   useEffect(() => {
//     setInterval(() => {
//       setHour(new Date().getHours());
//       setMin(new Date().getMinutes());
//       setSec(new Date().getSeconds());
//     }, 1000);
//   }, []);

//   return {
//     fullHour,
//     fullMin,
//     fullSec,
//     amPm
//   };
// }
