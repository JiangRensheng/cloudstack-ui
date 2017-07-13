import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyMode } from '../recurring-snapshots.component';
import { TimeZone } from '../time-zone/time-zone.service';
import { DailyPolicy } from './daily/daily-policy.component';
import { HourlyPolicy } from './hourly/hourly-policy.component';
import { MonthlyPolicy } from './monthly/monthly-policy.component';
import { WeeklyPolicy } from './weekly/weekly-policy.component';


export type TimePolicy = HourlyPolicy | DailyPolicy | WeeklyPolicy | MonthlyPolicy;

export interface Policy {
  timePolicy: TimePolicy;
  timeZone: TimeZone;
  storedSnapshots: number;
}

@Component({
  selector: 'cs-policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.component.scss']
})
export class PolicyComponent {
  @Input() policyMode: PolicyMode;
  @Output() onPolicySave: EventEmitter<Policy>;

  public Policies = PolicyMode;

  public policy: TimePolicy;
  public timeZone: TimeZone;
  public storedSnapshots: number;

  public save(): void {
    this.onPolicySave.emit({
      timePolicy: this.policy,
      timeZone: this.timeZone,
      storedSnapshots: this.storedSnapshots
    });
  }
}
