export const elipser = (value, max) => {
  if (value != undefined)
    return value.substring(0, max).toString() + (value.length > 10 ? "..." : "");
};


export const DateParser = (date) => {
  return date.substring(0,10)
}