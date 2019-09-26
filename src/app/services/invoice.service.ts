import { Storage } from '@ionic/storage';
import { InvoiceD } from 'src/app/models/InvoiceD';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { InvoiceH } from '../models/InvoiceH';


const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  //Get Header List
  public getInvoicesHList() {
    return this.http.get(this.SERVER_URL + 'InvoiceH');
  }

  //Get InvoiceH By InvoiceNo
  public getInvoiceHByInvoiceNo(invoiceNo): Observable<InvoiceD> {
    return this.http.get<InvoiceD>(`${this.SERVER_URL + 'InvoiceH'}/${invoiceNo}`);
  }

  //Get InvoiceD By InvoiceNo
  public getInvoiceDByInvoiceNoIN(invoiceNo) {
    return this.http.get(`${this.SERVER_URL + 'InvoiceDetail'}?invoiceNo=^${invoiceNo}`);
  }

  //Add Header
  public createInvoiceH(Header: {
    id: number, invoiceNo: string, Customer: string,
    InvoiceDate: Date, invoiceNote: string, ReferenceNo: string,
    PIC: string, subtotal: number, otherCharges: number, vat: number, grandTotal: number
  }) {
    return this.http.post(`${this.SERVER_URL + 'InvoiceH'}`, Header).pipe(
      catchError(this.errorHandl)
    );
  }


  //Add Detail
  public createInvoiceD(Detail: InvoiceD) {
    return this.http.post(`${this.SERVER_URL + 'InvoiceDetail'}`, Detail)
  }


  //Delete InvoiceH
  public deleteInvoiceH(invoiceNo) {
    return this.http.delete(`${this.SERVER_URL + 'InvoiceH'}/${invoiceNo}`)
  }

  //Delete InvoiceD
  public deleteInvoiceD(invoiceNo) {
    return this.http.delete(`${this.SERVER_URL + 'InvoiceDetail'}/${invoiceNo}`)
  }


  public updateInvoiceH(header: InvoiceH) {
    return this.http.put(`${this.SERVER_URL + 'InvoiceH'}/${header.invoiceNo}`, header)
  }

  public updateInvoiceD(detail: InvoiceD) {
    return this.http.put(`${this.SERVER_URL + 'InvoiceDetail'}/${detail.invoiceNo}`, detail)
  }





  AddInvoiceH(InvoiceH: any) {
    //console.log(JSON.stringify(user));
    return this.http.post<any>(`${environment.Endpiont_API}/auth/Invoice/AddInvoiceH`, JSON.stringify(InvoiceH), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  AddInvoiceD(InvoiceD: any) {
    //console.log(JSON.stringify(user));
    return this.http.post<any>(`${environment.Endpiont_API}/auth/Invoice/AddInvoiceD`, JSON.stringify(InvoiceD), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }


  GetInvoiceList(): Observable<any[]> {
    //console.log(JSON.stringify(user));
    return this.http.get<any[]>(`${environment.Endpiont_API}/auth/Invoice/List`)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  GetInvoiceDbyInvoiceNo(invNo: string): Observable<InvoiceD[]> {
    console.log("invNo", invNo);
    return this.http.get<InvoiceD[]>(`${environment.Endpiont_API}/auth/Invoice/GetInvoiceDbyInvoiceNo/` + invNo)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )

  }


  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
