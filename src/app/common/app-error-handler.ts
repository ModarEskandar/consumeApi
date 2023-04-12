import { AppError } from './app-error';
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
  override handleError(error: AppError) {
    alert('An unexpected error occurred');
    console.log(error);
  }
}
