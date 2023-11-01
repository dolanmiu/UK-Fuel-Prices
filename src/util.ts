export const normalizeNumber = (inputNumber: number): number => {
  if (inputNumber >= 100) {
    return inputNumber / 100;
  } else {
    return inputNumber;
  }
};

export const applyFunctionToRecordValues = <T, V>(
  record: any,
  fn: (value: T) => V
): Record<any, V> => {
  const result: Record<any, V> = {};

  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      result[key] = fn(record[key]);
    }
  }

  return result;
};
