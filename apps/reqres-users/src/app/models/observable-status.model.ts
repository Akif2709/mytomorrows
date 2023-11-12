import { HttpErrorResponse } from '@angular/common/http';

export enum DataStatus {
  SUCCESS = 'Success',
  ERROR = 'Error',
  LOADING = 'Loading',
}

export type DataState<T = unknown> =  {
  status: DataStatus;
  value?: T;
  error?: HttpErrorResponse;
}
