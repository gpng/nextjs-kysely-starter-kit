export interface ActionResponse {
  error?: ActionError;
}

export enum ActionError {
  Unauthorized = 'unauthorized',
  NotFound = 'not-found',
  Unexpected = 'Unexpected',
}
