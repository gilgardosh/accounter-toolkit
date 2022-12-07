// eslint-disable-next-line import/no-default-export
export default function (next) {
  return (root, args, context, info) => {
    args.input.myindex = 'acc';
    return next(root, args, context, info);
  };
}
