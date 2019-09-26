import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { InvoiceH } from 'src/app/models/InvoiceH';
import { InvoiceD } from 'src/app/models/InvoiceD';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



declare var layui;
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  InvoiceForm: FormGroup;
  InvoiceH: InvoiceH;
  InvoiceD: InvoiceD[];
  invoiceData: InvoiceD;
  
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }


  get InvoiceLines(): FormArray {
    return this.InvoiceForm.get('invoiceItems') as FormArray;
  }

  createForm() {
    this.InvoiceForm = this.fb.group({
      invoiceNo: ['', Validators.required],
      Customer: ['', Validators.required],
      InvoiceDate: ['', Validators.required],
      invoiceNote: ['', Validators.required],
      ReferenceNo: ['', Validators.required],
      PIC: ['', Validators.required],
      subtotal: [0, Validators.required],
      otherCharges: [0, Validators.required],
      vat: [0, Validators.required],
      grandTotal: [0, Validators.required],
      invoiceItems: this.fb.array([this.createInvoiceItems()])
    });
  }

  createInvoiceItems(): FormGroup {
    return this.fb.group({
      ProductCode: [0, Validators.required],
      ProductName: ['', Validators.required],
      qty: [0, Validators.required],
      unitPrice: [0, Validators.required],
      discount: [0, Validators.required],
      lineTotal: [0, Validators.required]
    });
  }

  addItem() {
    this.InvoiceLines.push(this.createInvoiceItems());
  }

  removeItem(i: number) {
    this.InvoiceLines.removeAt(i);
  }


  AddInvoice(InvoiceForm: FormGroup) {

    let layer = layui.layer;
    this.InvoiceH = { ...InvoiceForm.value };
    const linesFormArray = this.InvoiceForm.get("invoiceItems") as FormArray;
    this.InvoiceD = [];
    for (let i = 0; i < linesFormArray.length; i++) {
      this.InvoiceD.push(linesFormArray.value[i]);
    }

    this.invoiceService.createInvoiceH(this.InvoiceH).pipe(first())
      .subscribe(
        data => {
          console.log("AddedH:", data);
          this.AddInvoiceD(this.InvoiceD, this.InvoiceH.invoiceNo);
        },
        error => {
          layer.msg(error);
        });
  }


  AddInvoiceD(InvoiceD: any, invNo: string) {
    let layer = layui.layer;
    for (let i = 0; i < this.InvoiceD.length; i++) {
      this.InvoiceD[i].invoiceNo = invNo;
      this.invoiceService.createInvoiceD(this.InvoiceD[i]).pipe(first())
        .subscribe(
          data => {
            console.log("AddedD:", data);
          },
          error => {
            layer.msg(error);
          });
    }
      layer.msg('Save invoice successfully!');
      this.router.navigate(['/taps/tabs/invoice']);
  }




}
