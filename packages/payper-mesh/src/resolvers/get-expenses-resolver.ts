import type {
  getExpensesResponse,
  MeshContext,
  QuerygetExpensesArgs,
  QueryResolvers,
  ResolverFn,
  ResolversParentTypes,
} from '../../.mesh/index.js';

module.exports = (
  next: ResolverFn<
    Promise<getExpensesResponse>,
    ResolversParentTypes['Query'],
    MeshContext,
    Partial<QuerygetExpensesArgs>
  >,
) => {
  const resolver: QueryResolvers['getExpenses'] = (root, args, context, info) => {
    args.input ||= {};
    if ('userName' in context && !args.input.api_user) {
      args.input.api_user = context['userName'] as string;
    }
    return next(root, args, context, info).then(async res => {
      // fix for Payper returning Null in cases currency is "ILS"
      const adjustedRes = await res;
      adjustedRes.expenses?.map(expense => {
        if (expense) {
          expense.currency_symbol ??= 'ILS';
        }
      });
      return res;
    });
  };
  return resolver;
};
