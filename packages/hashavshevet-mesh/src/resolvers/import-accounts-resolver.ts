/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  importAccountsResponse,
  MeshContext,
  MutationimportAccountsArgs,
  MutationResolvers,
  ResolverFn,
  ResolversParentTypes, // @ts-ignore
} from '../mesh-artifacts/index.js';

module.exports = (
  next: ResolverFn<
    Promise<importAccountsResponse>,
    ResolversParentTypes['Query'],
    MeshContext,
    Partial<MutationimportAccountsArgs>
  >,
) => {
  // @ts-ignore
  const resolver: MutationResolvers['importAccounts'] = (root, args, context, info) => {
    if (args.input) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (args.input as any).myindex = 'acc';
    }
    return next(root, args, context, info);
  };
  return resolver;
};
