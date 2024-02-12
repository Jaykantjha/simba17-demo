import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { inject } from "@angular/core";
import { UtilityService } from "./utility-service.service";

export const decryptResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const utilityService = inject(UtilityService);
  const needDecrypt = req.url.includes('svg');
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = typeof event.body === 'string' && !needDecrypt ? JSON.parse(utilityService.decryptString(event.body)) : event.body;
        const modifiedResponse = event.clone({ body });
        return modifiedResponse;
      }
      return event;
    })
  );
};
