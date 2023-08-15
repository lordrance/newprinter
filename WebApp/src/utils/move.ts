//数组去重
export const uniqueArray = (arr: number[]) => {
    let uniqueArray: number[] = [];
    for (const num of arr) {
        if (uniqueArray.length === 0 || num !== uniqueArray[uniqueArray.length - 1]) {
            uniqueArray.push(num);
        }
    }
    return uniqueArray
}

//有序数组找到刚好大于小于的下标
export const findClosestIndices = (arr: number[], target: number) => {
  if (arr.length === 0) {
    return [-1, -1];
  }

  let lowerIndex = -1;
  let upperIndex = -1;

  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      lowerIndex = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  left = 0;
  right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) {
      upperIndex = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return [lowerIndex, upperIndex];
}

//插入有序数组，第一大于num的位置
export const insertIntoArray = (arr: number[], num: number) => {
    let index = 0;
    while (index < arr.length && arr[index] <= num) {
        index++;
    }
    arr.splice(index, 0, num);
    return arr;
}

