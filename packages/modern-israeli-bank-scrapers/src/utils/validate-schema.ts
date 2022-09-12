import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export async function validateSchema(jsonSchema: any, data: any) {
  const ajv = new Ajv({ verbose: true, allowMatchingProperties: true });
  addFormats(ajv);
  let valid;
  try {
    valid = ajv.validate(jsonSchema, data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return { isValid: false, errors: e };
  }

  return { isValid: valid, errors: ajv.errors };
}
