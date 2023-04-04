const environment = process.env.ENVIRONMENT_TYPE;

export enum Environments {
  Staging = 'staging',
  Release = 'release',
}

export enum APIs {
  Auth = 'auth',
  GestaoServicos = 'gestaoServicos',
}

const apis = {
  auth: {
    staging: 'https://api-auth-homologacao.fitcard.com.br',
    release: 'https://api-auth.fitcard.com.br',
  },
  gestaoServicos: {
    staging: 'https://api-gestao-servicos-homologacao.fitcard.com.br',
    release: 'https://api-gestao-servicos.fitcard.com.br',
  },
};

/**
 * Returns the API URL of the actual enviroment.
 */
export function getApiUrl(api: APIs): string {
  switch (environment) {
    case Environments.Staging: return apis[api].staging;
    case Environments.Release: return apis[api].release;
    default: return apis[api].staging;
  }
}

/**
 * Returns the Enviroment thats beeing used.
 */
export function getEnviroment(): Environments {
  if (!environment) return Environments.Staging;
  return environment as Environments;
}
