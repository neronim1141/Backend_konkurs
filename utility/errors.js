class NotFound extends Error {
  constructor(...args) {
    super(args);
    this.message = 'Not Found';
    this.code = 404;
  }
}

module.exports = {
  NotFound
};
