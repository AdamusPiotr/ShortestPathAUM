const arr = [
  [[6, 4], [4, 1], [3, 2], [3, 3], [2]],
  [[10, 3], [4, 2], [2, 2], [3, 2], [2]],
  [[20, 2], [8, 3], [3, 2], [2, 1], [3]],
  [[25, 1], [10, 2], [4, 2], [3, 2], [2]],
  [[null, 3], [null, 2], [null, 3], [null, 2], [null, NaN]]
];

function greedy(endX, endY) {
  const points = [];
  let currentX = 0;
  let currentY = 0;
  let cost = 0;

  while (currentX !== endX || currentY !== endY) {
    const canGoTop = currentY < 4;
    const canGoRight = currentX < 4;
    points.push({ currentX, currentY });

    if (canGoTop && canGoRight) {
      if (arr[currentY][currentX][0] < arr[currentY][currentX][1]) {
        cost += arr[currentY][currentX][0];
        currentY += 1;
      } else {
        cost += arr[currentY][currentX][1];
        currentX += 1;
      }

      continue;
    }

    if (canGoRight) {
      cost += arr[currentY][currentX][1];
      currentX += 1;

      continue;
    }

    if (canGoTop) {
      cost += arr[currentY][currentX][0];
      currentY += 1;

      continue;
    }
  }

  console.log("cost", cost);
  console.log("path", points);
}

const smallestPaths = [[], [], [], []];

function dynamicProgramming(endX, endY) {
  console.log("endX", "endY", endX, endY);
  if (endX === 0 && endY === 0) {
    //We have to have some staring point
    smallestPaths[0][0] = 0;
    return 0;
  }

  if (smallestPaths[endY][endX] != null) {
    //return previously CalculatedValue
    console.log('We have this calculated previously')
    return smallestPaths[endY][endX];
  }

  if (endX === 0) {
    console.log("we are going here");
    const fromBottomBase = dynamicProgramming(endX, endY - 1);
    const costFromBottom = fromBottomBase + arr[endY - 1][endX][0];

    smallestPaths[endY][endX] = costFromBottom;

    return costFromBottom;
  }

  if (endY === 0) {
    const fromLeftBase = dynamicProgramming(endX - 1, endY);
    const costFromLeft = fromLeftBase + arr[endY][endX - 1][1];

    smallestPaths[endY][endX] = costFromLeft;

    return costFromLeft;
  }

  // Here we have to ways of accomplish this point,
  // because we can go from left and from bottom
  const fromLeftBase = dynamicProgramming(endX - 1, endY);
  const fromBottomBase = dynamicProgramming(endX, endY - 1);

  const costFromLeft = fromLeftBase + arr[endY][endX - 1][1];
  const costFromBottom = fromBottomBase + arr[endY - 1][endX][0];

  if (costFromBottom < costFromLeft) {
    smallestPaths[endY][endX] = costFromBottom;

    return costFromBottom;
  } else {
    smallestPaths[endY][endX] = costFromLeft;

    return costFromLeft;
  }
}

// function dynamicProgramming(endX, endY) {
//   for (let row = 0; row < 4; ++row) {
//     for (let column = 0; column < 4; ++column) {
//       if (row === 0 && column === 0) {
//         smallestPaths[0].push(0);
//         continue;
//       }
//
//       if (row === 0) {
//         smallestPaths[row].push(
//           smallestPaths[row][column - 1] + arr[row][column - 1][1]
//         );
//         continue;
//       }
//
//       if (column === 0) {
//         smallestPaths[row].push(
//           smallestPaths[row - 1][column] + arr[row - 1][column][0]
//         );
//         continue;
//       }
//
//       const smallestPathElementFromBottom =
//         smallestPaths[row - 1][column] + arr[row - 1][column][0];
//       const smallestPathElementFromLeft =
//         smallestPaths[row][column - 1] + arr[row][column - 1][1];
//
//       smallestPaths[row].push(
//         Math.min(smallestPathElementFromLeft, smallestPathElementFromBottom)
//       );
//     }
//   }
//
//   console.log(smallestPaths);
// }

// greedy(4, 4);

dynamicProgramming(0, 3);

console.log("end of first dynamic programing");
dynamicProgramming(0, 2);

console.log(smallestPaths);
