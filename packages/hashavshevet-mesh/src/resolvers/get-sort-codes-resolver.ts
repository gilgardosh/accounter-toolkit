import { getSortCodesResponse } from '../mesh-artifacts/index.js';
import { sortCodesDataFile } from './data-files/index.js';

// eslint-disable-next-line import/no-default-export
export default function (next) {
  return (root, args, context, info) => {
    args.input = {
      parameters: [],
      datafile: sortCodesDataFile,
    };
    return next(root, args, context, info).then((data: getSortCodesResponse) => {
      if (data.status?.repdata?.length && !data.status.repdata[0].code) {
        return null;
      }
      return data;
    });
  };
}
