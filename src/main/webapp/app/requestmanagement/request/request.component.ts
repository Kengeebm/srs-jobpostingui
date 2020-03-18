import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WELCOME, SUCCESS } from 'app/app.constants';
import { AccountService } from 'app/core';
import { IRequest, Request } from 'app/requestmanagement/request/request.model';
import { RequestService } from 'app/requestmanagement/request/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  // @ts-ignore
  @ViewChild('fileInput')
  fileInput;
  imageData: File;
  request: IRequest;
  file: File | null = null;
  private isChanges: boolean;

  // imageDatashow: any;

  constructor(private requestService: RequestService, private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.isChanges = false;
    this.request = new Request();
    this.request.name = this.accountService.getEmployeeDetails().firstName + ' ' + this.accountService.getEmployeeDetails().lastName;
    this.request.empId = this.accountService.getEmployeeDetails().empId;
  }

  save() {
    // console.log('attachment is : ' + this.request.attachment);
    this.requestService.create(this.request).subscribe(value => {
      Swal.fire({
        type: SUCCESS,
        background: '#e6f2ff',
        showConfirmButton: false,
        title: 'Data is saved successfully',
        timer: 2000
      });
    });
    this.clear();
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.imageData = this.file;
    this.request.fileName = this.file.name;
    const imageData1: IRequest = this.request;
    const reader = new FileReader();
    reader.readAsDataURL(this.imageData);
    reader.onload = function() {
      imageData1.attachment = reader.result;
      // console.log('attachment RESULT is : ', imageData1);
    };
    if (this.request.fileName === undefined || this.request.fileName === '' || this.request.fileName === null) {
      this.isChanges = false;
    } else {
      this.isChanges = true;
    }
  }

  onBack() {
    this.router.navigate(['/', WELCOME]);
  }

  onChange() {
    // console.log('file ', this.request.fileName);
    if (this.request.message === null || this.request.message === '' || this.request.message === undefined) {
      this.isChanges = false;
    }
  }

  clear() {
    this.request.message = null;
    this.file = null;
    this.isChanges = false;
  }

  /* imageClick() {
    this.requestService.findByEmployeeId(this.request.empId).subscribe(value => {
      this.imageDatashow = value.body.attachment;
    });
  }*/
}
