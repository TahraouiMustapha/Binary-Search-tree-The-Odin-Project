function sort(array) {
    if(array.length > 1) {
        let middleIndex = Math.floor(array.length / 2);
        let left = sort(array.slice(0, middleIndex  ));
        let right = sort(array.slice( middleIndex  ));
        array = merge(left, right);
    }
    return array;
}

console.log(sort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));



function merge(array1 , array2) {
    let arr = [], indArr1 = 0, indArr2 = 0;

    while(arr.length < array1.length + array2.length) {
        if(array1[indArr1] < array2[indArr2]) {
            arr[indArr1 + indArr2] = array1[indArr1];
            indArr1 += 1;
            if(indArr1 >= array1.length) arr = arr.concat(array2.slice(indArr2));
        } else {
            arr[indArr1 + indArr2] = array2[indArr2];
            indArr2 += 1;
            if(indArr2 >= array2.length) arr = arr.concat(array1.slice(indArr1));
        }
    }

    return arr;
}
