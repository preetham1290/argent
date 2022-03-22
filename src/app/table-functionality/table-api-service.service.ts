import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCriteria, PAGE_SIZES } from './search-criteria';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableApiServiceService {

  constructor(private http: HttpClient) { }

  getWithParam(criteria: SearchCriteria) {
    let params: HttpParams = new HttpParams();
    if (criteria.sortColumn) {
      params = params.set('ordering', criteria.sortDirection === 'asc' ? criteria.sortColumn : '-' + criteria.sortColumn);
    }
    if (criteria.searchValue) {
      params = params.set('search', criteria.searchValue.trim());
    }
    if (criteria.pageNo) {
      params = params.set('page', criteria.pageNo.toString());
    }
    if (criteria.pageSize || criteria.pageSize == PAGE_SIZES.ZERO) {
      params = params.set('page_size', criteria.pageSize.toString());
    } else {
      // if (criteria.pageNo && criteria.pageNo == 1) {
      //   params = params.set('page_size', '20');
      // } else {
      // }
      params = params.set('page_size', `${PAGE_SIZES.DEFAULT_PAGE_SIZE}`);
    }
    if (criteria.params) {
      criteria.params.forEach(element => {
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            if (element[key] || element[key] == 0 || element[key] == '0') {
              params = params.set(key, element[key]);
            }
          }
        }
      });
    }
    if (criteria.multiValueParam) {
      for (const key in criteria.multiValueParam) {
        if (criteria.multiValueParam.hasOwnProperty(key) && criteria.multiValueParam[key]) {
          let arr = criteria.multiValueParam[key];
          arr.forEach(element => {
            params = params.append(key, element);
          });
        }
      }
    }
    return params.keys().length ? params : null;
  }

  getData<T>(url: string, criteria: SearchCriteria): Observable<T> {
    return this.http.get<T>(url, { params: this.getWithParam(criteria) });
  }
}