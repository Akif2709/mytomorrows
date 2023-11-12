import { HttpErrorResponse } from '@angular/common/http';
import { DataState, DataStatus } from '@mytomorrows/shared-models';

export function setLoading(): DataState {
  return {
    status: DataStatus.LOADING,
    value: undefined,
    error: undefined,
  };
}

export function setSuccess<K>(value: K): DataState {
  return {
    status: DataStatus.SUCCESS,
    value,
    error: undefined,
  };
}

export function setError(error: HttpErrorResponse): DataState {
  return {
    status: DataStatus.ERROR,
    value: undefined,
    error: error,
  };
}
