function arrowKeyCodeConverter(keyCode) {
  console.log(keyCode)
  //let a
  switch (keyCode) {
    case 37: //leftArrow
      return"left"
    case 38: // upArrow
      return"up"
    case 39: //rightArrow
      return"right"
    case 40: // downArrow
      return"down"
    case 32 || 13: //spacebar or enter
      return"pause"
  }
}
export default arrowKeyCodeConverter;