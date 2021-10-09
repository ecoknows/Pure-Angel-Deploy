import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { directReferralReducer } from './direct-referral/direct-referral.reducers';
import { genealogyReducer } from './genealogy/genealogy.reducer';
import { indirectReferralReducer } from './indirect-referral/indirect-referral.reducers';
import { verificationReducer } from './admin/verification/verification.reducers';
import { pairingBonusReducer } from './pairing-bonus/pairing-bonus.reducers';
import { authenticationReducer } from './admin/authentication/authentications.reducers';
import { cashoutsReducer } from './admin/cashouts-verification/cashouts.reducers';
import { userCashoutsReducer } from './cashouts/user-cashouts.reducers';
import { historyReducer } from './history/history.reducers';
import { memberVerificationReducer } from './mega-center/member-verification.reducers';

const reducer: object = {
  directReferralReducer: directReferralReducer,
  indirectReferralReducer: indirectReferralReducer,
  pairingBonusReducer: pairingBonusReducer,
  userCashoutsReducer: userCashoutsReducer,
  historyReducer: historyReducer,

  genealogyReducer: genealogyReducer,
  userReducer: userReducer,

  verificationReducer: verificationReducer,
  memberVerificationReducer: memberVerificationReducer,

  authenticationReducer: authenticationReducer,
  cashoutsReducer: cashoutsReducer,
};

@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot(reducer)],
})
export class ReduxModule {}
