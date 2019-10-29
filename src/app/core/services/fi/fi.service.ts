import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { FiDocument } from '@core/models/fi-document';
import { FiDocumentDetail } from '@core/models/fi-document-detail';
import { FiPayment } from '@core/models/fi-payment';

@Injectable({
  providedIn: 'root'
})
export class FiService {
  constructor(private apiService: ApiService) {}

  searchDetail(payload): Observable<any> {
    return this.apiService.post('/financial/searchDetail', payload).pipe(
      map(data => {
        console.log("searchDetail ===== "  , data)
        return data
      })
    )
  }

  //new 
  search(payload): Observable<any> {
    return this.apiService.post('/financial/search', payload).pipe(
      map(result => {
        if(result.status) {
          return result
        }else {
          return {
            status: 'F'
          }
        }
      }),
    );
  }
  
  create(payload) {
    return this.apiService.post('/financial/create', payload).pipe(
      map(result => {
        if(result.status) {
          return result
        }else {
          return {
            status: 'F'
          }
        }
      }),
    );
  }

  reverse(payload): Observable<any> {
    const result = {
      data: {},
      errors: []
    };
    return this.apiService.post('/financial/reverse', payload).pipe(
      map(result => {
        if(result.status) {
          return result
        }else {
          return {
            status: 'F'
          }
        }
      })
    );
  }

  searchPayment(payload): Observable<FiPayment> {
    const result = {
      data: {},
      errors: []
    };
    return this.apiService.post('/newgffi/searchfipaymentdata', payload).pipe(
      map(data => {
        console.log('data : ', data);
        if (data.statusCode === 200) {
          
          return data;
        } else {
          console.log('error code kak sus e here');
        }
        return data;
      })
    );
  }

  changePaymentBlock(payload) {
    return this.apiService.post('/financial/changePaymentBlock', payload).pipe(
      map(result => {
        if (result.status === 'T') {
         return result
        } else {
          console.log('error code kak sus e here');
        }
      }),
      take(1)
    );
  }
  searchLogPaymentBlock(payload) {
    return this.apiService.post('/financial/searchLogPaymentBlock', payload).pipe(
      map(result => {
        if (result.status === 'T') {
         return result
        } else {
          console.log('error code kak sus e here');
        }
      }),
      take(1)
    );
  }
}
