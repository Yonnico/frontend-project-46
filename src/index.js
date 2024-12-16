import { fileParser } from "./parsers.js";
import { compare } from "./compare.js";
import { formatter } from "./formatter.js";

export const gendiff = (filepath1, filepath2, format = "stylish") => {

  const file1 = fileParser(filepath1);
  const file2 = fileParser(filepath2);

  const difference = compare(file1, file2);

  const result = formatter(difference, format);

  return result;
};
