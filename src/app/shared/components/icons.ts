import {
  faUsers,
  faFunnelDollar,
  faCommentsDollar,
  faHandHoldingUsd,
  faSearch,
  faUserPlus,
  faUserCheck,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export function getIcon(
  icon: string | IconDefinition
): IconDefinition | undefined {
  switch (icon) {
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
    case 'faSearch':
      return faSearch;
  }
  return undefined;
}
