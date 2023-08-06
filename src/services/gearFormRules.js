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

export function formatGearFields(data) {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const newModel = item.model[0].toUpperCase() + item.model.slice(1);
      const newType = item.type.toLowerCase();
      return { ...item, model: newModel, type: newType };
    });
  } else {
    const newModel = data.model[0].toUpperCase() + data.model.slice(1);
    const newType = data.type.toLowerCase();
    return { ...data, model: newModel, type: newType };
  }
}

export default gearFormRules;
