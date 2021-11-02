let timer = null;

const getCached = () => {
  if (!timer) {
    timer = Date.now();
    console.log("Start timer", timer);
    return false;
  }
  if (timer) {
    const now = Date.now();
    const diff = ((now - timer) / (1000 * 60)).toFixed(0);
    console.log("Timer", timer);
    console.log("Now", now);
    console.log("Diff", diff);
    if (diff < 2) {
      console.log("Data from cache");
      return true;
    } else {
      console.log("Data from request");
      timer = null;
      return false;
    }
  }
};

module.exports = getCached;
