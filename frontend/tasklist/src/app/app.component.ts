import { Component } from '@angular/core'
import { TaskBoardComponent } from './task-board.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskBoardComponent],
  template: '<app-task-board />',
})
export class AppComponent {}