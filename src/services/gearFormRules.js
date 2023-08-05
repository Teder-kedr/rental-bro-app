const gearFormRules = {
  hasValue: (value) => {
    if (value) return true;
    else return false;
  },

  price: (value) => {
    if (parseInt(value) >= 0) return true;
    else return false;
  },

  qty: (value) => {
    if (parseInt(value) > 0) return true;
    else return false;
  },
};

export default gearFormRules;
