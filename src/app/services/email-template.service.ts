import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService extends DataService {
  constructor(httpClient: HttpClient) {
    super('eblaepm.no-ip.org:9092/cdi/api/v1/email-template', httpClient);
  }
}
