import {
  faUsers,
  faFunnelDollar,
  faCommentsDollar,
  faHandHoldingUsd,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export function getIcon(icon: string | IconDefinition): IconDefinition {
  switch (icon) {
    case 'faUsers':
      return faUsers;
    case 'faFunnelDollar':
      return faFunnelDollar;
    case 'faCommentsDollar':
      return faCommentsDollar;
    case 'faHandHoldingUsd':
      return faHandHoldingUsd;
    case 'faSearch':
      return faSearch;
  }
  return faUsers;
}
