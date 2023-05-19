import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [
      { path: 'notes', canActivate: [authGuard], component: NotesComponent },
      {
        path: 'reminders',
        canActivate: [authGuard],
        component: RemindersComponent,
      },
      {
        path: 'archive',
        canActivate: [authGuard],
        component: ArchiveComponent,
      },
      { path: 'trash', canActivate: [authGuard], component: TrashComponent },
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
