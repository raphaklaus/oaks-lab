export type Task = TaskAPI & TaskInternal;

// Quick explanation: The idea here is to expose different interfaces
// to the developer according to the use case. For example, "TaskAPI" is
// meant to be used in places where we only care about the data the client
// side can send us. "TaskInternal" on the other hands deals with logic
// that is internal to the application.
export interface TaskAPI {
  name: string;
}

export interface TaskInternal {
  id: string;
  done: boolean;
}
