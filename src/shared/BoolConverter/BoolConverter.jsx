const BoolConverter = (n) => {
  const bool = {
    true: 1,
    false: 2,
    1: true,
    2: false,
    null: false,
  };

  return bool[n];
};

export const BoolConverter01 = (n) => {
  const bool = {
    true: 1,
    false: 0 || null,
    1: true,
    0: false,
    null: false,
  };

  return bool[n];
};

export default BoolConverter;
