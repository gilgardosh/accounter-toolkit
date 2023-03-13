import {
  getExpensesResponse,
  Maybe,
  MeshContext,
  QuerygetExpensesArgs,
  QueryResolvers,
  ResolverFn,
  ResolversParentTypes,
} from '../../.mesh/index.js';

module.exports =
  (
    next: ResolverFn<
      Maybe<Promise<getExpensesResponse>>,
      ResolversParentTypes['Query'],
      MeshContext,
      Partial<QuerygetExpensesArgs>
    >,
  ): QueryResolvers['getExpenses'] =>
  (root, args, context, info) => {
    args.input ||= {};
    if ('userName' in context && !args.input.api_user) {
      args.input.api_user = context['userName'] as string;
    }
    return next(root, args, context, info).then(res => {
      // fix for Payper returning Null in cases currency is "ILS"
      res.expenses?.map(expense => (expense.currency_symbol ??= 'ILS'));
      return res;
    });
  };
