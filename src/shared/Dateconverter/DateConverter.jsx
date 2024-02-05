// database date converter
// const data = "2023-02-06T10:34:56.000000Z"  //year month day
// // month day year
export const DatabaseDateConverter = (s) => {
  const clone = s.slice(0, 10).split("-");
  return `${clone[1]}/${clone[2]}/${clone[0]}`;
};

// To Convert Date YY/MM/DD(2022-10-21) to MM/DD/YY
export const defaultCalenderDate = (p) => {
  let parts = p.split("-");
  let convertedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
  return convertedDate;
};

export const dbtimeconverter = (s) => {
  // console.log("sb", s);
  const clone = s?.slice(11, 19)?.split(":");
  // return `${clone[0]}:${clone[1]}:${clone[2]}`;
  return `${clone[0]}:${clone[1]}}`;
  // return clone;
};

// To Convert Date YY/MM/DD(2022-10-21) to MM/DD/YY
export const dateConverter = (date) => {
  //console.log(date);
  const afterSplit = date?.split("-");
  //console.log(afterSplit);
  if (afterSplit?.length > 0) {
    return `${afterSplit[1]}/${afterSplit[2]}/${afterSplit[0]}`;
  }
};
