class AppError extends Error {
  /**
   * Initializes an error caused by the app itself intentionally, by some validation.
   * @param message The error message. Default is 'Erro desconhecido'
   */
  constructor(message?: string) {
    super(message || 'Erro desconhecido');
  }
}

export default AppError;
