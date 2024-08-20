import { HttpEvent, HttpHandlerFn, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Modify the request here if needed
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', 'Bearer your-token-here')
  });

  // Pass the modified request to the next handler
  return next(clonedRequest);
};