module.exports = (next) => (root, args, context, info) => {
  args.input.myindex = 'acc';
  return next(root, args, context, info);
};
