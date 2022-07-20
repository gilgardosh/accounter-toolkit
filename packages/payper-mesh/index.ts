import { getMeshSDK, Sdk } from './.mesh';

const init = async (authToken: string, userName: string): Promise<{ sdk: Sdk }> => {
  console.log('initiating sdk...');

  process.env.PAYPER_MESH_AUTH_TOKEN = authToken;
  process.env.PAYPER_MESH_USER_NAME = userName;

  const sdk = await getMeshSDK();

  return { sdk };
};

export * from './.mesh';
export { init };
