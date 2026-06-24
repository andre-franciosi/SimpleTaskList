import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TaskItem, UserItem } from './models'

const API_BASE_URL = 'http://localhost:8080'

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  constructor(private readonly httpClient: HttpClient) {}

  listUsers(): Observable<UserItem[]> {
    return this.httpClient.get<UserItem[]>(`${API_BASE_URL}/user`)
  }

  createUser(name: string, idade: number | null): Observable<UserItem> {
    return this.httpClient.post<UserItem>(`${API_BASE_URL}/user`, { name, idade })
  }

  listTasks(userId: number): Observable<TaskItem[]> {
    return this.httpClient.get<TaskItem[]>(`${API_BASE_URL}/tasks/task`, {
      params: { userId },
    })
  }

  updateTaskStatus(taskId: number, status: number): Observable<TaskItem> {
    return this.httpClient.patch<TaskItem>(`${API_BASE_URL}/tasks/task`, { status }, {
      params: { taskId },
    })
  }
}