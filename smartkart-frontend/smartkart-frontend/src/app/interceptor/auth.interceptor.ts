import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

const excludeUrls=[
    '/api/user/register',
    '/api/user/verify'

]
export const authInterceptor: HttpInterceptorFn =(req: HttpRequest<any>, next: HttpHandlerFn) =>{
    const isExcluded=excludeUrls.some(url => req.url.includes(url));
    if(isExcluded){
        return next(req);
    }
    // const token = localStorage.getItem('logData');
    const token= typeof window !== 'undefined' && window.localStorage
        ? localStorage.getItem('logData')
        : null;
    if(token){
        const cloned=req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
    }
    return next(req);
}