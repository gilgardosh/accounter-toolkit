/* eslint-disable @typescript-eslint/no-explicit-any */
// import type {
//   getExpensesResponse,
//   Maybe,
//   MeshContext,
//   QuerygetExpensesArgs,
//   QueryResolvers,
//   ResolverFn,
//   ResolversParentTypes,
// } from '../../.mesh/index.js';

// eslint-disable-next-line import/no-default-export
export default function (
  // next: ResolverFn<
  //   Maybe<Promise<getExpensesResponse>>,
  //   ResolversParentTypes['Query'],
  //   MeshContext,
  //   Partial<QuerygetExpensesArgs>
  // >,
  next: any,
  // ): QueryResolvers['getExpenses'] =>
): any {
  return (root, args, context, info) => {
    if (!args.input) {
      args.input = {};
    }
    if ('userName' in context && !args.input.api_user) {
      args.input.api_user = context['userName'] as string;
    }
    return next(root, args, context, info).then(res => {
      // fix for Payper returning Null in cases currency is "ILS"
      res.expenses?.map(expense => (expense.currency_symbol = expense.currency_symbol || 'ILS'));
      return res;
    });
  };
}
