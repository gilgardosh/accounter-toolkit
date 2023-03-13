import type {
  getBatchResponse,
  MeshContext,
  QuerygetBatchArgs,
  queryInput_getBatch_input_Input,
  QueryResolvers,
  ResolverFn,
  ResolversParentTypes, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '../mesh-artifacts/index.js';
// eslint-disable-next-line import/extensions
import { batchDataFile } from './data-files';

const handleBatchParameters = (args: queryInput_getBatch_input_Input = {}) => {
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
      type: 'txt',
      name: 'status',
      defVal: `"${args.statusMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'status1',
      defVal: `"${args.statusMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'date',
      name: 'initDate',
      defVal: `"${args.initDateMin || '1990/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'date',
      name: 'initDate1',
      defVal: `"${args.initDateMax || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return parametersArray;
};

module.exports = (
  next: ResolverFn<
    Promise<getBatchResponse>,
    ResolversParentTypes['Query'],
    MeshContext,
    Partial<QuerygetBatchArgs>
  >,
) => {
  const resolver: QueryResolvers['getBatch'] = (root, args, context, info) => {
    args.input ||= {};
    const parameters = handleBatchParameters(args.input);
    args.input = {
      parameters,
      datafile: batchDataFile,
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
