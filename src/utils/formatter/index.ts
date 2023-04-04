import FormatterFacade from './FormatterFacade';

export interface IFormatter {
  capitalize: (value?: string) => string;
  simpleDate: (date: Date | string) => string;
  displaySimpleDate: (date?: Date | string) => string;
  simpleDateUSA: (date: Date) => string;
  simpleDateTime: (date?: Date | string) => string;
  formatToCurrency: (value: number | string) => string;
  zeroFill: (number: string, width: number) => string;
  firstName: (string?: string) => string;
  validateEmail: (string?: string) => boolean;
  phoneFormat: (string: string) => string;
  decimalFormat: (value?: string | number) => string;
  removeFirstSpace: (string: string) => string;
}

/**
 * Uses the "Factory" design pattern, that is
 * used to make the formatter type consistent throughout the application.
 */
class FormatterFactory {
  /**
   * Creates a new instance of an IFormatter.
   */
  static create = (): IFormatter => new FormatterFacade();
}

export default FormatterFactory.create();
