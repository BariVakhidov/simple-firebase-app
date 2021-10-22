export const shallowObjEquality = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean => {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  if (entries1.length !== entries2.length) {
    return false;
  }

  for (let i = 0; i < entries1.length; i++) {
    if (entries1[0][i] !== entries2[0][i]) {
      return false;
    }

    if (entries1[i][1] !== entries2[i][1]) {
      return false;
    }
  }

  return true;
};