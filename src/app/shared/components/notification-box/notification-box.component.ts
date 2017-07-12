import { Component, ViewChild, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { JobsNotificationService } from '../../services/jobs-notification.service';
import { MdlPopoverComponent } from '@angular-mdl/popover';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cs-notification-box',
  templateUrl: 'notification-box.component.html',
  styleUrls: ['notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {
  public unseenCount: number;

  @ViewChild(MdlPopoverComponent) public popover: MdlPopoverComponent;
  private unseenCountStream: Observable<number>;

  constructor(
    public jobsNotificationService: JobsNotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.unseenCount = 0;
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public ngOnInit(): void {
    this.popover.hide = () => {
      this.popover.isVisible = false;
      this.unseenCount = this.jobsNotificationService.pendingJobsCount;
      this.changeDetectorRef.markForCheck();
    };

    this.unseenCountStream = this.jobsNotificationService.unseenJobs;
    this.unseenCountStream
      .subscribe(count => {
        this.unseenCount += count;
      });
  }

  public onToggle(): void {
    if (this.popover.isVisible) {
      this.unseenCount = this.jobsNotificationService.pendingJobsCount;
    }
  }

  public close(id: string): void {
    const pendingJobsCount = this.jobsNotificationService.pendingJobsCount;
    const notificationsCount = this.jobsNotificationService.notifications.length;
    if (pendingJobsCount === 0 && notificationsCount === 1) {
      setTimeout(() => this.jobsNotificationService.remove(id));
      this.popover.hide();
      return;
    }

    // if you call .remove() as is, popup closes for no reason
    setTimeout(() => this.jobsNotificationService.remove(id));
  }

  public removeCompleted(): void {
    this.jobsNotificationService.removeCompleted();
    this.unseenCount = 0;
    this.popover.hide();
  }
}
