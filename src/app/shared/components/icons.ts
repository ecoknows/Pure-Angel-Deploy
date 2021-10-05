import {
  faUsers,
  faFunnelDollar,
  faCommentsDollar,
  faHandHoldingUsd,
  faSearch,
  faUserPlus,
  faUserCheck,
  faUserShield,
  faMoneyBillAlt,
  faReceipt,
  faStreetView,
  faUser,
  faCashRegister,
} from '@fortawesome/free-solid-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export function getIcon(
  icon: string | IconDefinition
): IconDefinition | undefined {
  switch (icon) {
    case 'faUser':
      return faUser;
    case 'faUsers':
      return faUsers;
    case 'faUserPlus':
      return faUserPlus;
    case 'faFunnelDollar':
      return faFunnelDollar;
    case 'faCommentsDollar':
      return faCommentsDollar;
    case 'faHandHoldingUsd':
      return faHandHoldingUsd;
    case 'faUserCheck':
      return faUserCheck;
    case 'faUserShield':
      return faUserShield;
    case 'faMoneyBillAlt':
      return faMoneyBillAlt;
    case 'faReceipt':
      return faReceipt;
    case 'faStreetView':
      return faStreetView;
    case 'faCashRegister':
      return faCashRegister;
    case 'faSearch':
      return faSearch;
  }
  return undefined;
}
