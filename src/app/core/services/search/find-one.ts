import { MasterService } from '@core/services/master/master.service';
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
export class FindOneService {
  constructor(private masterService: MasterService) {}

  loadFindOneDataTypeAccount(object) {

    this.masterService.findOneDataTypeAccount(object).subscribe(data => {
        const response = data as any;
        console.log(response)
        const status = response.statusCode
        if (status === 200) {     
            return response.message[0];
        }
      
      })
   
  }
   
 
}
