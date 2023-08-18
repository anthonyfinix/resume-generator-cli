module.exports = function Handler() {
  const handlers = {};
  const setHandler = function (message, cb) {
    this.handlers[message] = { cb, show: false };
  };
  const removeHandler = function (message) {
    delete this.handlers[message];
  };
  const hideHandler = function (message) {
    this.handlers[message].show = false;
  };
  return { handlers, setHandler, removeHandler, hideHandler };
};
