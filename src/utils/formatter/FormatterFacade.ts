/* eslint-disable no-param-reassign */
import XDate from 'xdate';
import xdateConfig from '../../config/xdate';
import { IFormatter } from '.';

const capitalizeRegex = new RegExp(/(?!\sda\s|\sde\s|\sdo\s|\spara\s|\se\s|\sa\s|\so\s|\sltda\s|\sto\s|\stu\s|\sltda\s)(^\w|\s\w)/g);
class FormatterFacade implements IFormatter {
  configureXDate() {
    XDate.locales[xdateConfig.defaultLocale] = xdateConfig.locales;
    XDate.defaultLocale = xdateConfig.defaultLocale;
  }

  constructor() {
    this.configureXDate();
  }

  capitalize(string?: string) {
    if (!string) return '';
    if (typeof string !== 'string') return '';
    return string.toLowerCase().replace(capitalizeRegex, letter => letter.toUpperCase());
  }

  simpleDate(date: Date | string) {
    if (!date) return '01/01/1990';
    const newDate = new Date(date);
    const xdate = new XDate(newDate);
    return xdate.toString("dd'/'MM'/'yyyy");
  }

  displaySimpleDate(date: Date | string | undefined) {
    if (!date) return '01/01/1990';
    const newDate = new Date(date);
    const xdate = new XDate(newDate);
    return xdate.toString("dd' 'MMM' 'yyyy");
  }

  simpleDateUSA(dateString: Date) {
    if (!dateString) return '01-01-1990';
    const date = new XDate(dateString);
    return date.toString("yyyy'-'MM'-'dd");
  }

  simpleDateTime(dateString?: Date | string) {
    if (!dateString) return '01-01-1990';
    const date = new XDate(dateString.toString());
    return date.toString("dd'/'MM'/'yy 'às' HH:mm'h'");
  }

  firstName(string?: string) {
    if (!string) return '';

    return string.split(' ').slice(0, 1)[0];
  }

  formatToCurrency(value?: number | string) {
    if (!value) return '';
    if (typeof value === 'string') {
      const str = value as string;
      return `${str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
    }

    const decimalFormatted = value.toFixed(2).replace('.', ',');
    return `${decimalFormatted.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  }

  zeroFill(number: string, width: number) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number.toString()) ? 2 : 1)).join('0') + number;
    }
    return `${number}`;
  }

  validateEmail(mail?: string) {
    if (!mail) return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  }

  phoneFormat(phoneString: string) {
    if (!phoneString) return '(00) 9 0000-0000';
    const phone = String(phoneString).replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
    return phone;
  }

  decimalFormat(number?: string | number) {
    if (!number) return '0';
    const newValue = String(number).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return newValue;
  }

  removeFirstSpace(string: string) {
    if (string.charAt(0) === ' ') {
      return string.substring(1);
    }

    return string;
  }
}

export default FormatterFacade;
