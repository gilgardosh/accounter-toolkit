import {
  getExpensesResponse,
  Maybe,
  MeshContext,
  QuerygetExpensesArgs,
  QueryResolvers,
  ResolverFn,
  ResolversParentTypes,
} from '../../.mesh';

module.exports =
  (
    next: ResolverFn<
      Maybe<Promise<getExpensesResponse>>,
      ResolversParentTypes['Query'],
      MeshContext,
      Partial<QuerygetExpensesArgs>
    >
  ): QueryResolvers['getExpenses'] =>
  (root, args, context, info) => {
    if (!args.input) {
      args.input = {};
    }
    args.input.api_user = process.env.PAYPER_MESH_USER_NAME;
    return next(root, args, context, info).then(res => {
      // fix for Payper returning Null in cases currency is "ILS"
      res.expenses?.map(expense => (expense.currency_symbol = expense.currency_symbol || 'ILS'));
      return res;
    });
  };
