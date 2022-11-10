import { getMeshSDK, Sdk } from '../.mesh/index.js';

const init = async (authToken: string, userName: string): Promise<{ sdk: Sdk }> => {
  const sdk = await getMeshSDK({
    authToken,
    userName,
  });

  return { sdk };
};

export * from '../.mesh/index.js';
export { init };
