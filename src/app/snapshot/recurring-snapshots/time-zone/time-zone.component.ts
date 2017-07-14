import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeZone, TimeZoneService } from './time-zone.service';


@Component({
  selector: 'cs-time-zone',
  templateUrl: 'time-zone.component.html',
  styleUrls: ['time-zone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeZoneComponent),
      multi: true
    }
  ]
})
export class TimeZoneComponent implements ControlValueAccessor, OnInit {
  public _timeZone: TimeZone;
  public timeZones: Array<TimeZone>;
  public visibleTimeZones: Array<TimeZone>;

  constructor(private timeZoneService: TimeZoneService) {}

  public ngOnInit(): void {
    this.loadTimeZones();
  }

  public updateVisibleTimeZones(query: string): void {
    this.visibleTimeZones = this.timeZones && this.timeZones.filter(timeZone => {
      return this
        .timeZoneToString(timeZone)
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }

  public propagateChange: any = () => {};

  @Input()
  public get timeZone(): TimeZone {
    return this._timeZone;
  }

  public set timeZone(value) {
    this._timeZone = value;
    this.propagateChange(this.timeZone);
  }

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void { }

  public writeValue(value: any): void {
    if (value) {
      this.timeZone = value;
    }
  }

  public timeZoneToString(timeZone: TimeZone): string {
    return `${timeZone.geo} (${timeZone.zone})`;
  }

  private loadTimeZones(): void {
    this.timeZoneService.get()
      .subscribe(timeZones => {
        this.timeZones = timeZones;
        this.updateVisibleTimeZones('');
        this.timeZone = this.timeZones[0];
      });
  }
}