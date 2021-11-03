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
    console.log("Minutes passed:", diff);
    if (diff < 2) {
      console.log("Get data from cache");
      return true;
    } else {
      console.log("Get data from request");
      timer = Date.now();
      console.log("Start new timer", timer);
    }
  }
};

module.exports = getCached;
