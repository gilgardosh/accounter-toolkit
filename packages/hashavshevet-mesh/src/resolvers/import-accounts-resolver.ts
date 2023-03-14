import type {
  importAccountsResponse,
  MeshContext,
  MutationimportAccountsArgs,
  MutationResolvers,
  ResolverFn,
  ResolversParentTypes,
} from '../../.mesh/index.js';

module.exports = (
  next: ResolverFn<
    Promise<importAccountsResponse>,
    ResolversParentTypes['Query'],
    MeshContext,
    Partial<MutationimportAccountsArgs>
  >,
) => {
  const resolver: MutationResolvers['importAccounts'] = (root, args, context, info) => {
    if (args.input) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (args.input as any).myindex = 'acc';
    }
    return next(root, args, context, info);
  };
  return resolver;
};
