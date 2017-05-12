import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdlPopoverModule } from '@angular2-mdl-ext/popover';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { MdlModule } from 'angular2-mdl';
import { TranslateModule } from '@ngx-translate/core';

import {
  DivisionPipe,
  HighLightPipe,
  ViewValuePipe
} from './pipes';

import {
  AffinityGroupService,
  AsyncJobService,
  AuthGuard,
  AuthService,
  ConfigService,
  DiskOfferingService,
  DiskStorageService,
  ErrorService,
  InstanceGroupService,
  JobsNotificationService,
  LanguageService,
  LayoutService,
  LoginGuard,
  NotificationService,
  OsTypeService,
  ResourceLimitService,
  ResourceUsageService,
  SecurityGroupService,
  ServiceOfferingService,
  ServiceOfferingFilterService,
  SnapshotService,
  SSHKeyPairService,
  StatsUpdateService,
  StorageService,
  StyleService,
  TagService,
  UtilsService,
  VolumeService,
  ZoneService
} from './services';

import {
  CalendarComponent,
  CalendarMonthComponent,
  CalendarYearComponent,
  ColorPickerComponent,
  DateDisplayComponent,
  DatePickerComponent,
  DatePickerDialogComponent,
  ListComponent,
  DiskOfferingComponent,
  FabComponent,
  NoResultsComponent,
  NotificationBoxComponent,
  NotificationBoxItemComponent,
  SgRulesManagerComponent,
  SidebarComponent,
  TopBarComponent,
  VmStatisticsComponent,
  SliderComponent
} from './components';

import { MaxValueValidatorDirective } from './directives/max-value.directive';
import { MinValueValidatorDirective } from './directives/min-value.directive';

import { LoadingDirective } from './directives/loading.directive';
import { LoaderComponent } from './components/loader.component';
import { UserService } from './services/user.service';
import { FilterService } from './services/filter.service';
import { IntegerValidatorDirective } from './directives/integer-value.directive';
import { DialogService } from './services/dialog.service';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { InlineEditAutocompleteComponent } from './components/inline-edit/inline-edit-autocomplete.component';
import {
  MDL_SELECT_VALUE_ACCESSOR,
  MdlAutocompleteComponent
} from './components/autocomplete/mdl-autocomplete.component';
import { DescriptionComponent } from './components/description/description.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    TranslateModule
  ],
  exports: [
    ColorPickerComponent,
    DatePickerComponent,
    DescriptionComponent,
    DiskOfferingComponent,
    FabComponent,
    InlineEditComponent,
    InlineEditAutocompleteComponent,
    IntegerValidatorDirective,
    ListComponent,
    NoResultsComponent,
    MaxValueValidatorDirective,
    MinValueValidatorDirective,
    MdlAutocompleteComponent,
    NotificationBoxComponent,
    NotificationBoxItemComponent,
    SgRulesManagerComponent,
    SidebarComponent,
    TimePickerComponent,
    TopBarComponent,
    VmStatisticsComponent,
    DivisionPipe,
    SliderComponent,
    HighLightPipe,
    ViewValuePipe,
    LoadingDirective
  ],
  entryComponents: [
    DatePickerDialogComponent,
    LoaderComponent
  ],
  declarations: [
    CalendarComponent,
    CalendarMonthComponent,
    CalendarYearComponent,
    ColorPickerComponent,
    DateDisplayComponent,
    DatePickerComponent,
    DatePickerDialogComponent,
    DescriptionComponent,
    DiskOfferingComponent,
    FabComponent,
    InlineEditComponent,
    InlineEditAutocompleteComponent,
    IntegerValidatorDirective,
    ListComponent,
    NoResultsComponent,
    MaxValueValidatorDirective,
    MinValueValidatorDirective,
    MdlAutocompleteComponent,
    NotificationBoxComponent,
    NotificationBoxItemComponent,
    SgRulesManagerComponent,
    SidebarComponent,
    TimePickerComponent,
    TopBarComponent,
    VmStatisticsComponent,
    DivisionPipe,
    SliderComponent,
    HighLightPipe,
    ViewValuePipe,
    LoadingDirective,
    LoaderComponent
  ],
  providers: [
    AffinityGroupService,
    AsyncJobService,
    AuthGuard,
    AuthService,
    ConfigService,
    DialogService,
    DiskOfferingService,
    DiskStorageService,
    ErrorService,
    FilterService,
    InstanceGroupService,
    JobsNotificationService,
    LanguageService,
    LayoutService,
    LoginGuard,
    NotificationService,
    OsTypeService,
    ResourceLimitService,
    ResourceUsageService,
    SecurityGroupService,
    ServiceOfferingService,
    ServiceOfferingFilterService,
    SnapshotService,
    SSHKeyPairService,
    StatsUpdateService,
    StorageService,
    StyleService,
    TagService,
    UserService,
    UtilsService,
    VolumeService,
    ZoneService,
    { provide: 'INotificationService', useClass: NotificationService },
    { provide: 'IStorageService', useClass: StorageService },
    MDL_SELECT_VALUE_ACCESSOR
  ]
})
export class SharedModule { }
