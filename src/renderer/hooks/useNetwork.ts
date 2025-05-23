// import { useEffect, useState } from "react";
// import WiFiControl from "wifi-control";

// export function useNetwork() {
//   const [network, setNetwork] = useState<WiFiControl.Networks[]>([]);

//   useEffect(() => {
//     WiFiControl.scanForWifi((err, response) => {
//       if(err) console.error(err);
//       setNetwork(response.networks);
//     })
//   }, [network]);

//   return {
//     network,
//   };
// }
