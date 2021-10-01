import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { directReferralReducer } from './direct-referral/direct-referral.reducers';
import { genealogyReducer } from './genealogy/genealogy.reducer';
import { indirectReferralReducer } from './indirect-referral/indirect-referral.reducers';
import { verificationReducer } from './admin/verification/verification.reducers';
import { pairingBonusReducer } from './pairing-bonus/pairing-bonus.reducers';

const reducer: object = {
  directReferralReducer: directReferralReducer,
  indirectReferralReducer: indirectReferralReducer,
  pairingBonusReducer: pairingBonusReducer,

  genealogyReducer: genealogyReducer,
  userReducer: userReducer,
  verificationReducer: verificationReducer,
};

@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot(reducer)],
})
export class ReduxModule {}
