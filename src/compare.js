import _ from 'lodash';


export const compare = (object1, object2) => {

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const keys = _.union(keys1, keys2).toSorted();

  const result = ['{\n'];

  for (const key of keys) {
    
    if (key in object1 && !(key in object2)) {
      result.push(`  - ${key}: ${object1[key]}\n`);
      continue;
    };
    
    if (!(key in object1) && key in object2) {
      result.push(`  + ${key}: ${object2[key]}\n`);
      continue;
    };
    
    const value1 = object1[key];
    const value2 = object2[key];
    
    result.push(
      value1 !== value2
        ? `  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}\n`
        : `    ${key}: ${object1[key]}\n`
    );
  };

  result.push('}');

  return result.join('');
};
