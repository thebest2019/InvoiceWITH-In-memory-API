import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InvoiceService } from 'src/app/services/invoice.service';
import { first } from 'rxjs/operators';
import { InvoiceD } from 'src/app/models/InvoiceD';
import { element } from 'protractor';

declare var layui;
let layer = layui.layer;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  itemsD: any[] = [];
  constructor(
    private storage: Storage,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.GetInvoiceDlist();
  }


  GetInvoiceDlist() {
    this.storage.get('invNo').then((val) => {
      this.invoiceService.getInvoiceDByInvoiceNoIN(val).pipe(first())
        .subscribe(
          (data: any[]) => {
            layer.msg('loading....');
            data.forEach(element => {
              this.itemsD.push(element);
            });
          },
          error => {
            console.log(error);
          });

    });
  }



}
