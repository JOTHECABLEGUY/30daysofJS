// 2724. Sort By
// Easy
// Companies
// Given an array arr and a function fn, return a sorted array sortedArr. You can assume fn only returns numbers and those numbers determine the sort order of sortedArr. sortedArray must be sorted in ascending order by fn output.

// You may assume that fn will never duplicate numbers for a given array.

 

// Example 1:

// Input: arr = [5, 4, 1, 2, 3], fn = (x) => x
// Output: [1, 2, 3, 4, 5]
// Explanation: fn simply returns the number passed to it so the array is sorted in ascending order.
// Example 2:

// Input: arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) => d.x
// Output: [{"x": -1}, {"x": 0}, {"x": 1}]
// Explanation: fn returns the value for the "x" key. So the array is sorted based on that value.
// Example 3:

// Input: arr = [[3, 4], [5, 2], [10, 1]], fn = (x) => x[1]
// Output: [[10, 1], [5, 2], [3, 4]]
// Explanation: arr is sorted in ascending order by number at index=1. 
 

// Constraints:

// arr is a valid JSON array
// fn is a function that returns a number
// 1 <= arr.length <= 5 * 105

/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */


// without Array.prototype. sort (inspiration from Geeks for Geeks implementation of MergeSort)
var merge = (arr, left_index, mid_index, right_index, fn) => {
    left = []
    for (var i = 0; i<mid_index-left_index+1; i++){
        left.push(arr[left_index + i])
    }
    // left = arr.slice(left_index, mid_index-left_index+1)
    // console.log(left, left1)
    right = []
    for (var i = 0; i < right_index - mid_index; i++){
        right.push(arr[mid_index + 1 + i])
    }
    // right = arr.slice(mid_index+1, right_index)
    // console.log(right, right1)
    l_index = 0
    r_index = 0
    merged_arr_index = left_index
    while (l_index < left.length && r_index < right.length){
        element1 = fn(left[l_index])
        element2 = fn(right[r_index])
        if (element1 <= element2){
            e_to_add = left[l_index]
            l_index++
        } else{ 
            e_to_add = right[r_index]
            r_index++
        }
        arr[merged_arr_index] = e_to_add
        merged_arr_index++
    }
    while(l_index < left.length){
        arr[merged_arr_index] = left[l_index]
        l_index++
        merged_arr_index++
    }
    while(r_index < right.length){
        arr[merged_arr_index] = right[r_index]
        r_index++
        merged_arr_index++
    }
}
function mergeSort(arr,l, r, fn){
    if(l >= r){
        return;
    }
    var m = l+ parseInt((r-l)/2);
    mergeSort(arr,l,m,fn);
    mergeSort(arr,m+1,r,fn);
    merge(arr,l,m,r,fn);
}
var sortBy = function(arr, fn) {
    mergeSort(arr, 0, arr.length-1, fn)
    return arr
};

// with Array.prototype.sort
var sortBy = function(arr, fn) {
    var compare = (a, b) => a - b > 0 ? 1: -1 
    return arr.sort((a, b) => compare(fn(a), fn(b)));
}

