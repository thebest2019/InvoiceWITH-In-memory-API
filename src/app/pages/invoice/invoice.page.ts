import { Storage } from '@ionic/storage';
import { InvoiceD } from './../../models/InvoiceD';
import { InvoiceH } from 'src/app/models/InvoiceH';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { first } from 'rxjs/operators';
import { NavController } from '@ionic/angular';



declare var layui;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  
  header: any[] = [];
  constructor(
    private router: Router,
    private storage: Storage,
    public navCtrl: NavController,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.GetInvoiceList();
  }

  GetInvoiceList() {
    let layer = layui.layer;
    this.invoiceService.getInvoicesHList().subscribe((data: any[]) => {
      console.log(data);
      this.header = data;
    })
  }

  // Send Parameter
  async GoToInvoiceDetails(invNo: any) {
    await this.storage.set('invNo', invNo);
    await this.navCtrl.navigateForward(['taps/tabs/invoice/detail']);
  }



}
