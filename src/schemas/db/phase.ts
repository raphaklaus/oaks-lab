import { Task } from "./task";

export interface Phase {
  id: string;
  name: string;
  done: boolean;
  tasks: Task[];
}
