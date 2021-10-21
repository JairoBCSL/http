import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocComponent } from './componentes/poc.component';
import { PocAsyncComponent } from './componentes/poc-async.component';
import { PocTakecComponent } from './componentes/poc-take.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { UnsubscribeRoutingModule } from './unsubscribe-routing.module';

@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakecComponent,
    PocUnsubComponent,
    PocBaseComponent,
  ],
  imports: [
    CommonModule,
    UnsubscribeRoutingModule
  ]
})
export class UnsubscribeModule { }
