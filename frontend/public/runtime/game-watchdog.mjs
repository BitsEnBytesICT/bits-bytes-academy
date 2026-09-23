// The game runs on the canvas thread. This worker can still signal Python
// when a learner accidentally removes the yield from a while loop.
let interrupt,
  lastBeat = 0,
  active = false;
self.onmessage = ({ data }) => {
  if (data.type === "init") interrupt = new Uint8Array(data.interrupt);
  if (data.type === "start") {
    active = true;
    lastBeat = performance.now();
    self.postMessage({ type: "armed" });
  }
  if (data.type === "beat") lastBeat = performance.now();
  if (data.type === "stop") active = false;
};
setInterval(() => {
  if (active && performance.now() - lastBeat > 3000) {
    Atomics.store(interrupt, 0, 2);
    active = false;
    self.postMessage({ type: "timeout" });
  }
}, 100);
