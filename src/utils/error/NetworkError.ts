class NetworkError extends Error {
  /**
   * Initializes an network error.
   * @param message The error message. Default is 'Você está offline, verifique sua conexão.'
   */
  constructor(message?: string) {
    super(message || 'Você está offline, verifique sua conexão.');
  }
}

export default NetworkError;
