const fetchJSON = async (url) => {
  const res = await fetch(url);
  const resJSON = await res.json();
  return resJSON;
};

const runFns = (fns) => {
  const fnsType = toString.call(fns);

  if (fnsType === '[object Array]') {
    fns.forEach(fn => fn());
    return;
  }

  if (fnsType === '[object Function]') {
    fns();
    return;
  }
};


/*

export const fetchJSON = (url) => {
  const resJSON;
  // 
  return resJSON;
};

export const runFns = (fns) => {
  const fnsType = toString.call(fns);

  if (fnsType === '[object Array]') {
    fns.forEach(fn => fn());
    return;
  }

  if (fnsType === '[object Function]') {
    fns();
    return;
  }
};


export function fetchJSON(url) {
  const resJSON = null;
  // 
  return resJSON;
};

export function runFns(fns) {
  const fnsType = toString.call(fns);

  if (fnsType === '[object Array]') {
    fns.forEach(fn => fn());
    return;
  }

  if (fnsType === '[object Function]') {
    fns();
    return;
  }
};

*/
