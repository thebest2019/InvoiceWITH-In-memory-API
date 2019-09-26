export class InvoiceH {
    id: number;
    invoiceNo: string;
    Customer: string;
    InvoiceDate: Date;
    invoiceNote: string;
    ReferenceNo: string;
    PIC: string;
    subtotal: number;
    otherCharges: number;
    vat: number;
    grandTotal: number;
}