export const getSignByAmount = amount => {
  return +amount > 0 ? "+" : +amount < 0 ? "-" : "";
};

export const getStyleBySign = sign => {
  return sign === "+"
    ? { color: "forestgreen" }
    : sign === "-"
    ? { color: "crimson" }
    : {};
};

export const formatAmount = (amount, SIGN) => {
  const _amount = Math.abs(parseInt(amount));
  return `${SIGN}${_amount}$`;
};
