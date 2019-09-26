import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb(){

    let  InvoiceH =  [
     {  id:  1,  invoiceNo:  'INVO01', Customer: "The Best", InvoiceDate: new Date(), invoiceNote: "Test invoice Note 1", ReferenceNo: 'INV2019-001', PIC: 'The Best', subtotal: 10500, otherCharges: 100, vat: 5, grandTotal: 10000 },
     {  id:  2,  invoiceNo:  'INVO02', Customer: "The Best", InvoiceDate: new Date(), invoiceNote: "Test invoice Note 2", ReferenceNo: 'INV2019-002', PIC: 'The Best', subtotal: 10500, otherCharges: 100, vat: 5, grandTotal: 10000 },
     {  id:  3,  invoiceNo:  'INVO03', Customer: "The Best", InvoiceDate: new Date(), invoiceNote: "Test invoice Note 3", ReferenceNo: 'INV2019-003', PIC: 'The Best', subtotal: 10500, otherCharges: 100, vat: 5, grandTotal: 10000 },
     {  id:  4,  invoiceNo:  'INVO04', Customer: "The Best", InvoiceDate: new Date(), invoiceNote: "Test invoice Note 4", ReferenceNo: 'INV2019-004', PIC: 'The Best', subtotal: 10500, otherCharges: 100, vat: 5, grandTotal: 10000 },
     {  id:  5,  invoiceNo:  'INVO05', Customer: "The Best", InvoiceDate: new Date(), invoiceNote: "Test invoice Note 5", ReferenceNo: 'INV2019-005', PIC: 'The Best', subtotal: 10500, otherCharges: 100, vat: 5, grandTotal: 10000 },
     
    ];


    let  InvoiceDetail =  [
      {  id:  1,  invoiceNo:  'INVO01', productId: "Prod001", ProductName: "Production 001", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      {  id:  1,  invoiceNo:  'INVO01', productId: "Prod0011", ProductName: "Production 001", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      {  id:  1,  invoiceNo:  'INVO01', productId: "Prod00111", ProductName: "Production 001", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      {  id:  2,  invoiceNo:  'INVO02', productId: "Prod002", ProductName: "Production 002", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      {  id:  3,  invoiceNo:  'INVO03', productId: "Prod003", ProductName: "Production 003", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      {  id:  4,  invoiceNo:  'INVO04', productId: "Prod004", ProductName: "Production 004", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      {  id:  5,  invoiceNo:  'INVO05', productId: "Prod005", ProductName: "Production 005", qty: 5, unitPrice: 2200, discount: 100, lineTotal: 10500 },
      
     ];

 
    return {InvoiceH, InvoiceDetail};
 
   }


}
