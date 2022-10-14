import { Task } from './task'

export interface Phase {
  name: string,
  done: boolean,
  tasks: Task[]
}
