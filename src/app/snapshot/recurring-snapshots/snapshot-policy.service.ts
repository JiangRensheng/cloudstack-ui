import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BackendResource } from '../../shared/decorators';
import { BaseBackendService } from '../../shared/services';
import { DayPeriod } from './day-period/day-period.component';
import { Policy, TimePolicy } from './policy-editor/policy-editor.component';
import { PolicyType } from './recurring-snapshots.component';
import { SnapshotPolicy } from './snapshot-policy.model';
import { Time } from './time-picker/time-picker.component';


export interface SnapshotPolicyCreationParams {
  policy: Policy<TimePolicy>;
  policyType: PolicyType;
  volumeId: string;
}

@Injectable()
@BackendResource({
  entity: 'SnapshotPolicy',
  entityModel: SnapshotPolicy
})
export class SnapshotPolicyService extends BaseBackendService<SnapshotPolicy> {
  public getPolicyList(volumeId: string): Observable<Array<Policy<TimePolicy>>> {
    return super.getList(
      { volumeId },
      { command: 'list', entity: 'SnapshotPolicies' }
    )
      .map(policies => {
        return policies.map(_ => this.transformPolicy(_));
      });
  }

  public create(params: SnapshotPolicyCreationParams): Observable<void> {
    const policyCreationParams = {
      intervalType: this.transformPolicyTypeToString(params.policyType),
      maxSnaps: params.policy.storedSnapshots,
      schedule: this.transformTimePolicyToSchedule(params.policy),
      timeZone: params.policy.timeZone.geo,
      volumeId: params.volumeId
    };

    return super.create(policyCreationParams);
  }

  public remove(id: string): Observable<void> {
    return super.remove({ id }, { entity: 'SnapshotPolicies' });
  }

  private convertAmPmTo24(time: Time): Time {
    if (time.period == null) {
      return time;
    }

    if (time.period === DayPeriod.Am) {
      if (time.hour === 12) {
        return {
          hour: 0,
          minute: time.minute
        }
      } else {
        return time;
      }
    } else {
      if (time.hour === 12) {
        return {
          hour: 12,
          minute: time.minute
        }
      } else {
        return {
          hour: time.hour + 12,
          minute: time.minute
        }
      }
    }
  }

  private transformPolicyTypeToString(type: PolicyType): string {
    switch (type) {
      case PolicyType.Hourly:
        return 'hourly';
      case PolicyType.Daily:
        return 'daily';
      case PolicyType.Weekly:
        return 'weekly';
      case PolicyType.Monthly:
        return 'monthly';
      default:
        throw new Error('Incorrect policy mode');
    }
  }

  private transformTimePolicyToSchedule(policy: Policy<TimePolicy>): string {
    if (policy.timePolicy.hour == null) {
      return policy.timePolicy.minute.toString();
    }

    const timePolicy24 = this.convertAmPmTo24(policy.timePolicy);

    const hours = timePolicy24.hour;
    const minutes = this.pad(timePolicy24.minute);
    const weekDay = policy.timePolicy.dayOfWeek;
    const monthDay = policy.timePolicy.dayOfMonth;

    return [minutes, hours, weekDay, monthDay]
      .filter(_ => _ != null)
      .join(':');
  }

  private transformScheduleToTimePolicy(schedule: string, policyType: PolicyType): Partial<TimePolicy> {
    const parsedSchedule = schedule.split(':');

    switch (parsedSchedule.length) {
      case 1:
        return {
          minute: +parsedSchedule[0]
        };
      case 2:
        return {
          hour: +parsedSchedule[1],
          minute: +parsedSchedule[0]
        };
      case 3:
        const timePolicy: Partial<TimePolicy> = {
          hour: +parsedSchedule[1],
          minute: +parsedSchedule[0]
        };

        if (policyType === PolicyType.Weekly) {
          timePolicy.dayOfWeek = +parsedSchedule[2];
        }

        if (policyType === PolicyType.Monthly) {
          timePolicy.dayOfMonth = +parsedSchedule[2];
        }

        return timePolicy;
      default:
        throw new Error('Incorrect snapshot policy format');
    }
  }

  private transformPolicy(policy: SnapshotPolicy): Policy<Partial<TimePolicy>> {
    return {
      id: policy.id,
      storedSnapshots: policy.maxSnaps,
      timePolicy: this.transformScheduleToTimePolicy(policy.schedule, policy.intervalType),
      timeZone: { geo: policy.timeZone },
      type: policy.intervalType
    };
  }

  private pad(value: any): string {
    return +value < 10 ? `0${+value}` : `${+value}`;
  }
}
