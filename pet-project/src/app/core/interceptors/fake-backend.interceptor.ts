import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { RoleEnum } from '../enums/role.enum';
import { UserModel } from '../models/user.model';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method, body } = req;
    if (url.endsWith('/login') && method === 'POST') {
      console.log(body.login === '1' && body.password === '1');
      if (body.login === '1' && body.password === '1') {
        return this.getErrorResponse('Неверный логин или пароль');
      }
      return this.getSuccessResponse({
        login: body.login,
        role: RoleEnum.Editor,
        name: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
      } as UserModel);
    }
    return next.handle(req);
  }

  private getSuccessResponse(body: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
  }
  private getErrorResponse(
    errorMessage: string
  ): Observable<HttpErrorResponse> {
    return throwError(
      () => new HttpErrorResponse({ status: 500, error: errorMessage })
    );
  }
}

export const FAKE_BACKEND_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
