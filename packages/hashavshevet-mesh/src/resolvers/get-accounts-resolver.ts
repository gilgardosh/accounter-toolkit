/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  getAccountsResponse,
  MeshContext,
  QuerygetAccountsArgs,
  queryInput_getAccounts_input_Input,
  QueryResolvers,
  ResolverFn,
  ResolversParentTypes, // @ts-ignore
} from '../mesh-artifacts/index.js';
// eslint-disable-next-line import/extensions
import { accountsDataFile } from './data-files';

const handleAccountsParameters = (args: queryInput_getAccounts_input_Input = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'txt',
      name: 'id',
      defVal: `"${args.idMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'txt',
      name: 'id1',
      defVal: `"${args.idMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'txt',
      name: 'isActive',
      defVal: `"${args.isActiveMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'isActive1',
      defVal: `"${args.isActiveMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'txt',
      name: 'name',
      defVal: `"${args.nameMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'txt',
      name: 'name1',
      defVal: `"${args.nameMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];

  return parametersArray;
};
module.exports = (
  next: ResolverFn<
    Promise<getAccountsResponse>,
    ResolversParentTypes['Query'],
    MeshContext,
    Partial<QuerygetAccountsArgs>
  >,
) => {
  // @ts-ignore
  const resolver: QueryResolvers['getAccounts'] = (root, args, context, info) => {
    const parameters = handleAccountsParameters(args.input ?? {});
    args.input = {
      parameters,
      datafile: accountsDataFile,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    // @ts-ignore
    return next(root, args, context, info)?.then(async data => {
      const datum = (await data).repdata?.[0];
      if (datum && !datum.id) {
        return null;
      }
      return data;
    });
  };
  return resolver;
};
