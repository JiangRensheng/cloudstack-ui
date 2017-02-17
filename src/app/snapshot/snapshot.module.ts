import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';

import { PeriodSelectorComponent } from './recurring-snapshots/period-selector/period-selector.component';
import { RecurringSnapshotsComponent } from './recurring-snapshots/recurring-snapshots.component';
import { SnapshotCreationComponent } from './snapshot-creation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MdlModule,
    MdlSelectModule,
    SharedModule
  ],
  exports: [
    RecurringSnapshotsComponent,
    SnapshotCreationComponent
  ],
  declarations: [
    PeriodSelectorComponent,
    RecurringSnapshotsComponent,
    SnapshotCreationComponent
  ],
  entryComponents: [
    RecurringSnapshotsComponent,
    SnapshotCreationComponent
  ]
})
export class SnapshotModule { }
