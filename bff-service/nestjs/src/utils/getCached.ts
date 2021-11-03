let timer = null;

export const getCached = () => {
  if (!timer) {
    timer = Date.now();
    console.log('Start timer', timer);
    return false;
  }
  if (timer) {
    const now = Date.now();
    const diff = ((now - timer) / (1000 * 60)).toFixed(1);
    console.log('Timer', timer);
    console.log('Now', now);
    console.log('Minutes passed:', diff);
    if (parseInt(diff) < 2) {
      console.log('Get data from cache');
      return true;
    } else {
      console.log('Get data from request');
      timer = Date.now();
      console.log('Start new timer', timer);
      return false;
    }
  }
};
