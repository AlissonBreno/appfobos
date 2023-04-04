/* eslint-disable global-require */
import { getApplicationName } from 'react-native-device-info';

const appName = getApplicationName();
const Companies = {
  Prime: 1, Link: 2, Neo: 3, Fitcard: 4,
};

function getCompany() {
  switch (appName) {
    case 'Prime Gestão de Serviços': return Companies.Prime;
    case 'Link Gestão de Serviços': return Companies.Link;
    case 'Neo Gestão de Serviços': return Companies.Neo;
    case 'Fitcard Gestão de Serviços': return Companies.Fitcard;
    default: return 0;
  }
}

function getCompanyLogo() {
  switch (appName) {
    case 'Prime Gestão de Serviços': return require('assets/images/logo-prime.png');
    case 'Link Gestão de Serviços': return require('assets/images/logo-link.png');
    case 'Neo Gestão de Serviços': return require('assets/images/logo-neo.png');
    case 'Fitcard Gestão de Serviços': return require('assets/images/logos/logo-fitcard.png');
    default: return 0;
  }
}

const companyId = getCompany();
const companyLogo = getCompanyLogo();

export { companyId, companyLogo, Companies };
