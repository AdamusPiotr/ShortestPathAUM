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
    const canGoTop = currentY < 4 && currentY < endY;
    const canGoRight = currentX < 4 && currentX < endX;
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
    }
  }

  //Last final point
  points.push({ currentX, currentY });

  return {
    cost,
    points
  };
}

const shortestPaths = [[], [], [], [], []];

function dynamicProgramming(endX, endY) {
  if (endX === 0 && endY === 0) {
    const shortestPathDetails = { cost: 0, path: [{ x: 0, y: 0 }] };
    shortestPaths[0][0] = shortestPathDetails;

    return shortestPathDetails;
  }

  if (shortestPaths[endY][endX] != null) {
    return shortestPaths[endY][endX];
  }

  if (endX === 0) {
    const fromBottomBase = dynamicProgramming(endX, endY - 1);
    const costFromBottom = fromBottomBase.cost + arr[endY - 1][endX][0];
    const shortestPathDetails = {
      cost: costFromBottom,
      path: [...fromBottomBase.path, { x: endX, y: endY }]
    };

    shortestPaths[endY][endX] = shortestPathDetails;

    return shortestPathDetails;
  }

  if (endY === 0) {
    const fromLeftBase = dynamicProgramming(endX - 1, endY);
    const costFromLeft = fromLeftBase.cost + arr[endY][endX - 1][1];
    const shortestPathDetails = {
      cost: costFromLeft,
      path: [...fromLeftBase.path, { x: endX, y: endY }]
    };

    shortestPaths[endY][endX] = shortestPathDetails;

    return shortestPathDetails;
  }

  const fromLeftBase = dynamicProgramming(endX - 1, endY);
  const fromBottomBase = dynamicProgramming(endX, endY - 1);

  const costFromLeft = fromLeftBase.cost + arr[endY][endX - 1][1];
  const costFromBottom = fromBottomBase.cost + arr[endY - 1][endX][0];

  if (costFromBottom < costFromLeft) {
    const shortestPathDetails = {
      cost: costFromBottom,
      path: [...fromBottomBase.path, { x: endX, y: endY }]
    };

    shortestPaths[endY][endX] = shortestPathDetails;

    return shortestPathDetails;

  } else {
    const shortestPathDetails = {
      cost: costFromLeft,
      path: [...fromLeftBase.path, { x: endX, y: endY }]
    };


    shortestPaths[endY][endX] = shortestPathDetails;

    return shortestPathDetails;
  }
}

// console.log('greedy', greedy(4, 4));;
// console.log(greedy(1, 4));;
// console.log(greedy(3, 3));;
// console.log(greedy(4, 3));;
// console.log(greedy(2, 2));;

// console.log('dynamicProgramming', dynamicProgramming(4, 4));
// console.log(dynamicProgramming(1, 4));
// console.log(dynamicProgramming(3,3));
// console.log(dynamicProgramming(4,3));
// console.log(dynamicProgramming(2,2));
