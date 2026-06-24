import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { TaskApiService } from './task-api.service'
import { TaskItem, TaskStatus, UserItem } from './models'

type ColumnConfig = { id: TaskStatus; label: string }

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  private draggedTaskId: number | null = null
  private readonly formBuilder = inject(FormBuilder)

  readonly columnConfig: ColumnConfig[] = [
    { id: 0, label: 'To do' },
    { id: 1, label: 'In Progress' },
    { id: 2, label: 'Done' },
  ]

  users: UserItem[] = []
  activeUserId: number | null = null
  tasks: TaskItem[] = []
  loadingUsers = true
  loadingTasks = false
  error: string | null = null

  readonly userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    idade: [''],
  })

  constructor(
    private readonly apiService: TaskApiService,
  ) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  get tasksByStatus(): Record<TaskStatus, TaskItem[]> {
    return {
      0: this.tasks.filter((task) => task.status === 0),
      1: this.tasks.filter((task) => task.status === 1),
      2: this.tasks.filter((task) => task.status === 2),
    }
  }

  selectUser(event: Event): void {
    const selectedValue = Number((event.target as HTMLSelectElement).value)
    this.activeUserId = Number.isNaN(selectedValue) ? null : selectedValue
    if (this.activeUserId !== null) {
      this.loadTasks(this.activeUserId)
    }
  }

  submitUser(): void {
    const name = this.userForm.controls.name.value?.trim()

    if (!name) {
      return
    }

    const ageValue = this.userForm.controls.idade.value?.trim()
    const idade = ageValue ? Number(ageValue) : null

    this.apiService.createUser(name, idade).pipe(takeUntil(this.destroy$)).subscribe({
      next: (createdUser) => {
        this.users = [...this.users, createdUser]
        this.activeUserId = createdUser.id
        this.userForm.reset({ name: '', idade: '' })
        this.loadTasks(createdUser.id)
      },
      error: (error) => {
        this.error = this.extractErrorMessage(error, 'Erro ao criar usuário.')
      },
    })
  }

  startDrag(taskId: number): void {
    this.draggedTaskId = taskId
  }

  endDrag(): void {
    this.draggedTaskId = null
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault()
  }

  dropTask(columnId: TaskStatus): void {
    if (this.draggedTaskId === null) {
      return
    }

    const draggedTask = this.tasks.find((task) => task.id === this.draggedTaskId)

    if (!draggedTask) {
      this.draggedTaskId = null
      return
    }

    const previousStatus = draggedTask.status
    this.tasks = this.tasks.map((task) =>
      task.id === this.draggedTaskId ? { ...task, status: columnId } : task,
    )

    this.apiService
      .updateTaskStatus(this.draggedTaskId, columnId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedTask) => {
          this.tasks = this.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        },
        error: (error) => {
          this.tasks = this.tasks.map((task) =>
            task.id === this.draggedTaskId ? { ...task, status: previousStatus } : task,
          )
          this.error = this.extractErrorMessage(error, 'Erro ao atualizar tarefa.')
        },
        complete: () => {
          this.draggedTaskId = null
        },
      })
  }

  private loadUsers(): void {
    this.loadingUsers = true
    this.apiService.listUsers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.users = users
          this.activeUserId = users[0].id
          this.loadTasks(users[0].id)
          return
        }

        this.apiService.createUser('Demo user', 25).pipe(takeUntil(this.destroy$)).subscribe({
          next: (createdUser) => {
            this.users = [createdUser]
            this.activeUserId = createdUser.id
            this.loadTasks(createdUser.id)
          },
          error: (error) => {
            this.error = this.extractErrorMessage(error, 'Erro ao criar usuário padrão.')
          },
          complete: () => {
            this.loadingUsers = false
          },
        })
      },
      error: (error) => {
        this.error = this.extractErrorMessage(error, 'Erro ao carregar usuários.')
        this.loadingUsers = false
      },
      complete: () => {
        this.loadingUsers = false
      },
    })
  }

  private loadTasks(userId: number): void {
    this.loadingTasks = true
    this.apiService.listTasks(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (tasks) => {
        this.tasks = tasks
      },
      error: (error) => {
        this.tasks = []
        this.error = this.extractErrorMessage(error, 'Erro ao carregar tarefas.')
      },
      complete: () => {
        this.loadingTasks = false
      },
    })
  }

  private extractErrorMessage(error: unknown, fallbackMessage: string): string {
    if (error instanceof Error) {
      return error.message
    }

    return fallbackMessage
  }
}