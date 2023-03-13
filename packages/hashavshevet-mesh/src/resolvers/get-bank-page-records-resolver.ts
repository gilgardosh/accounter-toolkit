import type {
  getBankPageRecordsResponse,
  MeshContext,
  QuerygetBankPageRecordsArgs,
  queryInput_getBankPageRecords_input_Input,
  QueryResolvers,
  ResolverFn,
  ResolversParentTypes, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '../mesh-artifacts/index.js';
// eslint-disable-next-line import/extensions
import { bankPageRecordsDataFile } from './data-files';

const handleBankPageRecordsParameters = (args: queryInput_getBankPageRecords_input_Input = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'long',
      name: 'id',
      defVal: args.idMin || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'long',
      name: 'id1',
      defVal: args.idMax || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'long',
      name: 'bankPageId',
      defVal: args.bankPageIdMin || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'long',
      name: 'bankPageId1',
      defVal: args.bankPageIdMax || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'date',
      name: 'date',
      defVal: `"${args.dateMin || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'date',
      name: 'date1',
      defVal: `"${args.dateMax || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return parametersArray;
};

module.exports = (
  next: ResolverFn<
    Promise<getBankPageRecordsResponse>,
    ResolversParentTypes['Query'],
    MeshContext,
    Partial<QuerygetBankPageRecordsArgs>
  >,
) => {
  const resolver: QueryResolvers['getBankPageRecords'] = (root, args, context, info) => {
    const parameters = handleBankPageRecordsParameters(args.input ?? {});
    args.input = {
      parameters,
      datafile: bankPageRecordsDataFile,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    return next(root, args, context, info).then(async data => {
      const datum = (await data).repdata?.[0];
      if (datum && !datum.id) {
        return null;
      }
      return data;
    });
  };
  return resolver;
};
