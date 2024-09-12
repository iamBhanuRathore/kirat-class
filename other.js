// const moment = require("moment");
// let trendLines = [
//   {
//     start: [1957, 24997.41661579217],
//     end: [1998, 25072.042896119645],
//     selected: false,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 4,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:15:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "R4",
//   },
//   {
//     start: [1958, 24974.536226758286],
//     end: [1998, 25051.08351859337],
//     selected: false,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 3,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:20:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "R3",
//   },
//   {
//     start: [1960, 24955.323876429713],
//     end: [1998, 25012.809872675825],
//     selected: false,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 2,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:30:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "R2",
//   },
//   {
//     start: [1960, 24931.672956096823],
//     end: [1998, 24976.81441996766],
//     selected: true,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 1,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:30:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "R1",
//   },
//   {
//     start: [1980, 24948.972078055675],
//     end: [1997, 24936.99305780113],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 4,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T12:10:00+05:30",
//     endTime: "2024-09-12T13:35:00+05:30",
//     name: "S4",
//   },
//   {
//     start: [1978, 24963.36329690851],
//     end: [1997, 24952.090066693614],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 3,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T12:00:00+05:30",
//     endTime: "2024-09-12T13:35:00+05:30",
//     name: "S3",
//   },
//   {
//     start: [1976, 24978.184941403917],
//     end: [1998, 24973.603304365402],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 2,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T11:50:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "S2",
//   },
//   {
//     start: [1975, 24997.091649284113],
//     end: [1998, 24988.322888035567],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 1,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T11:45:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "S1",
//   },
// ];

// // Helper function to calculate slope
// // function findSlope(t_2, t_1, p_2, p_1) {
// //   try {
// //     let timeSlope = moment(t_2).diff(t_1, "minute");
// //     // console.log({ timeSlope, t_1, t_2, p_1, p_2 });
// //     let priceSlope = p_2 - p_1;
// //     return priceSlope / timeSlope;
// //   } catch (err) {
// //     console.log(`Err findSlope Fn`, err);
// //   }
// // }

// // // Helper function to find price at a given time
// // function findPriceAtAGivenTime(configObj, projectedTime) {
// //   try {
// //     // console.log(
// //     //   configObj.endTime,
// //     //   configObj.startTime,
// //     //   configObj.end[1].toFixed(2),
// //     //   configObj.start[1].toFixed(2)
// //     // );
// //     let slope = findSlope(
// //       configObj.endTime,
// //       configObj.startTime,
// //       configObj.end[1],
// //       configObj.start[1]
// //     );
// //     let startingPointTime = configObj.startTime;
// //     let startIngPointPrice = +configObj.start[1].toFixed(2);
// //     let timeDiff = moment(projectedTime).diff(startingPointTime, "minute");
// //     // console.log({ timeDiff });
// //     return startIngPointPrice + Number(slope * timeDiff);
// //   } catch (err) {
// //     console.log(`Error findPriceAtAGivenTime`, err);
// //     return;
// //   }
// // }

// // function groupAndSortTrendLines(trendLines) {
// //   let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
// //   // Group trend lines by color
// //   const groupedTrendLines = trendLines.reduce((acc, trendLine) => {
// //     const stroke = trendLine.appearance.stroke;

// //     if (!acc[stroke]) {
// //       acc[stroke] = [];
// //     }

// //     acc[stroke].push(trendLine);

// //     return acc;
// //   }, {});

// //   // Calculate current prices and sort trend lines within each color group
// //   for (const color in groupedTrendLines) {
// //     groupedTrendLines[color] = groupedTrendLines[color]
// //       .map((trendLine) => {
// //         const currentPrice = findPriceAtAGivenTime(trendLine, currentTime);
// //         // console.log({ currentPrice });
// //         return {
// //           //   ...trendLine,
// //           currentPrice,
// //         };
// //       })
// //       .sort((a, b) => a.currentPrice - b.currentPrice); // Sort by current price
// //   }

// //   return groupedTrendLines;
// // }

// // const sortedGroupedTrendLines = groupAndSortTrendLines(trendLines);
// // // console.log(JSON.stringify(sortedGroupedTrendLines));
// // console.log(sortedGroupedTrendLines);
// function updateTrendLineNames(trendLines) {
//   // Group the trend lines by color
//   const groupedTrendLines = trendLines.reduce((acc, trendLine) => {
//     const color = trendLine.appearance.stroke === "red" ? "R" : "S";

//     if (!acc[color]) {
//       acc[color] = [];
//     }

//     acc[color].push(trendLine);

//     return acc;
//   }, {});

//   // Update the names within each color group
//   for (const color in groupedTrendLines) {
//     groupedTrendLines[color].sort((a, b) => {
//       const endPriceA = a.end[1];
//       const endPriceB = b.end[1];
//       return endPriceA - endPriceB;
//     });

//     groupedTrendLines[color].forEach((trendLine, index) => {
//       trendLine.name = `${color.charAt(0).toUpperCase()}${index + 1}`;
//     });
//   }

//   // Return the updated array
//   return Object.values(groupedTrendLines).flat();
// }

// const updatedTrendLines = updateTrendLineNames(trendLines);
// console.log(updatedTrendLines);

// let res = [
//   {
//     start: [1960, 24931.672956096823],
//     end: [1998, 24976.81441996766],
//     selected: true,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 1,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:30:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "G1",
//   },
//   {
//     start: [1960, 24955.323876429713],
//     end: [1998, 25012.809872675825],
//     selected: false,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 2,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:30:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "G2",
//   },
//   {
//     start: [1958, 24974.536226758286],
//     end: [1998, 25051.08351859337],
//     selected: false,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 3,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:20:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "G3",
//   },
//   {
//     start: [1957, 24997.41661579217],
//     end: [1998, 25072.042896119645],
//     selected: false,
//     appearance: {
//       stroke: "green",
//       strokeOpacity: 1,
//       strokeWidth: 4,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T10:15:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "G4",
//   },
//   {
//     start: [1980, 24948.972078055675],
//     end: [1997, 24936.99305780113],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 4,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T12:10:00+05:30",
//     endTime: "2024-09-12T13:35:00+05:30",
//     name: "R1",
//   },
//   {
//     start: [1978, 24963.36329690851],
//     end: [1997, 24952.090066693614],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 3,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T12:00:00+05:30",
//     endTime: "2024-09-12T13:35:00+05:30",
//     name: "R2",
//   },
//   {
//     start: [1976, 24978.184941403917],
//     end: [1998, 24973.603304365402],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 2,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T11:50:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "R3",
//   },
//   {
//     start: [1975, 24997.091649284113],
//     end: [1998, 24988.322888035567],
//     selected: false,
//     appearance: {
//       stroke: "red",
//       strokeOpacity: 1,
//       strokeWidth: 1,
//       strokeDasharray: "Solid",
//       edgeStrokeWidth: 1,
//       edgeFill: "#FFFFFF",
//       edgeStroke: "#000000",
//       r: 6,
//     },
//     type: "LINE",
//     startTime: "2024-09-12T11:45:00+05:30",
//     endTime: "2024-09-12T13:40:00+05:30",
//     name: "R4",
//   },
// ];
