export type Task = TaskAPI & TaskInternal;

export interface TaskAPI {
  name: string;
}

export interface TaskInternal {
  id: string;
  done: boolean;
}
