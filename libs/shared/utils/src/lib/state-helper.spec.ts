import { setLoading, setSuccess, setError } from './state-helpers';
import { DataState, DataStatus } from '@mytomorrows/shared-models';
import { HttpErrorResponse } from '@angular/common/http';

describe('Data State Utils', () => {
  it('should create a loading state', () => {
    const loadingState: DataState = setLoading();

    expect(loadingState.status).toBe(DataStatus.LOADING);
    expect(loadingState.value).toBeUndefined();
    expect(loadingState.error).toBeUndefined();
  });

  it('should create a success state', () => {
    const successValue = 'Success Value';
    const successState: DataState = setSuccess(successValue);

    expect(successState.status).toBe(DataStatus.SUCCESS);
    expect(successState.value).toBe(successValue);
    expect(successState.error).toBeUndefined();
  });

  it('should create an error state', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 404,
      statusText: 'Not Found',
    });

    const errorState: DataState = setError(errorResponse);

    expect(errorState.status).toBe(DataStatus.ERROR);
    expect(errorState.value).toBeUndefined();
    expect(errorState.error).toBe(errorResponse);
  });
});
