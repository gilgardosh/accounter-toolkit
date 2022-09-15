import { getMeshSDK, Sdk } from '../.mesh';

const init = async (authToken: string, userName: string): Promise<{ sdk: Sdk }> => {
  const sdk = await getMeshSDK({
    authToken,
    userName,
  });

  return { sdk };
};

export * from '../.mesh';
export { init };
