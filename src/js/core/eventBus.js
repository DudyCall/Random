/* Simple pub/sub event bus for decoupling modules */

const listeners = new Map();

export const eventBus = {
  on(event, callback) {
    if (!listeners.has(event)) listeners.set(event, []);
    listeners.get(event).push(callback);
  },

  off(event, callback) {
    const cbs = listeners.get(event);
    if (!cbs) return;
    const idx = cbs.indexOf(callback);
    if (idx !== -1) cbs.splice(idx, 1);
  },

  emit(event, data) {
    const cbs = listeners.get(event);
    if (cbs) cbs.forEach((cb) => cb(data));
  },
};
