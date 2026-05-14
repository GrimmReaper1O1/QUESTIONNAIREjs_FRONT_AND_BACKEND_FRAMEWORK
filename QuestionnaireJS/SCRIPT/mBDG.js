let sortArrObjKeyString = (arr, type) => {
    return arr.sort((a, b) => a.name.localeCompare(b[type]));
}