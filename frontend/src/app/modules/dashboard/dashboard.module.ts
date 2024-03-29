import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesComponent } from './components/notes/notes.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { MatRippleModule } from '@angular/material/core';

import { ClickOutsideModule } from 'ng-click-outside';
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize.directive';
import { OutsideClickDirective } from 'src/app/directives/outside-click.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { NoteDataComponent } from './components/notes/note-data/note-data.component';
import { ArchiveNoteDataComponent } from './components/archive/note-data/note-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/common/authconfig.interceptor';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { DashboardSnackbarComponent } from './components/dashboard-snackbar/dashboard-snackbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NotesComponent,
    ArchiveComponent,
    TrashComponent,
    RemindersComponent,
    TextareaAutoresizeDirective,
    OutsideClickDirective,
    NoteDataComponent,
    ArchiveNoteDataComponent,
    DashboardSnackbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatRippleModule,
    ClickOutsideModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    },
  ],
})
export class DashboardModule {}
