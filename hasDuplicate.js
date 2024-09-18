function hasDuplicate(nums) {
    let store = [];

    for (let i = 0; i < nums.length; ++i) {
        if (store.includes(nums[i])) {
            console.log(`${nums[i]} has a duplicate!`);
            return true;
        } else {
            store.push(nums[i]);
        }
    }

    console.log("The given array has no duplicates!")
    return false;
}

let nums1 = [1,2,3,4,5,6,7,8,9];
console.log(hasDuplicate(nums1));

let nums2 = [1,2,3,4,5,6,7,8,9,9];
console.log(hasDuplicate(nums2));
