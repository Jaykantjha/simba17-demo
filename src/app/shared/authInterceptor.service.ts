import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const authorization = "U2l3AdatD6FaCgWsfM71bDzhCerD5PHUy5oXG0X7scezyTu99AtvIoussGT5mkm+h8f0199ZZNsl/fu0EQLb98Il103LMa6+SlU6s7ZuG9gJ8VHhYRsQtwx3Zl/oszsasgPgALNl5ZEvp4Zh+hFYqIRKeACa5GDiB6JZD1FC+C5ohCcqL0OrfIzGTG/QE8wZmOT9oa1NGGloaCjFC95VXd682Ij15FsDtUf2V/qjwMrMbJnm4ZQRfcdcvUVlweafg35yk3j3OR9f2/9kIg+iK8Ed8BkVxhY2CZxtJdjGOD0ZBRvCa+rb71TkFJnpoHJf9Y2RZ578l7itNj4qF5Mn5kIYFHWRa5r7Z3zy5X133Nk=";
const customHeader = "ODA4MDgwODA4MDgwODA4MA==";
const apiKey = "rj9tHOO4ACaGkYqqRNg589NuR4BLeNNw4ZJ9b30Z";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const isVOAPI = req.url.startsWith(environment.voUrl);
    if (isVOAPI) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: authorization,
                'x-custom-header': customHeader,
                source: 'web',
                'x-api-key': apiKey
            }
        })
        return next(cloned);
    } else {
        return next(req);
    }
};
