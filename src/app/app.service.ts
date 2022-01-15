import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams,
} from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class WebApiObservableService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getService(url: string): Observable<any> {
    return this.http.get(url, this.options);
  }

  getServiceWithDynamicQueryTerm(
    url: string,
    key: string,
    val: string
  ): Observable<any> {
    return this.http.get(url + "/?" + key + "=" + val, this.options);
  }

  getServiceWithFixedQueryString(url: string, param: any): Observable<any> {
    this.options = new RequestOptions({
      headers: this.headers,
      search: "query=" + param,
    });
    return this.http.get(url, this.options);
  }

  getServiceWithComplexObjectAsQueryString(
    url: string,
    param: any
  ): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    for (var key in param) {
      if (param.hasOwnProperty(key)) {
        let val = param[key];
        params.set(key, val);
      }
    }
    this.options = new RequestOptions({
      headers: this.headers,
      search: params,
    });
    return this.http.get(url, this.options);
  }

  createService(url: string, param: any): Observable<any> {
    let body = JSON.stringify(param);
    return this.http.post(url, body, this.options);
  }

  updateService(url: string, param: any): Observable<any> {
    let body = JSON.stringify(param);
    return this.http.put(url, body, this.options);
  }

  patchService(url: string, param: any): Observable<any> {
    let body = JSON.stringify(param);
    return this.http.patch(url, body, this.options);
  }

  deleteService(url: string, param: any): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    for (var key in param) {
      if (param.hasOwnProperty(key)) {
        let val = param[key];
        params.set(key, val);
      }
    }
    this.options = new RequestOptions({
      headers: this.headers,
      search: params,
    });
    return this.http.delete(url, this.options);
  }

  deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
    return this.http.delete(url + "/?" + key + "=" + val, this.options);
  }

  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
