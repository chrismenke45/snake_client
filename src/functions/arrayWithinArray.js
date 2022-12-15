function arrayWithinArray(outerArray, innerArray) {
    let outerJSON = JSON.stringify(outerArray);
    let innerJSON = JSON.stringify(innerArray);
    return outerJSON.indexOf(innerJSON) !== -1
}
export default arrayWithinArray;