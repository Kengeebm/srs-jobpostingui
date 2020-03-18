import { NgForm } from '@angular/forms';
import { INotification, Notification } from './notification-management.model';
import { Component } from '@angular/core';
import { NotificationService } from './notification-management.service';
import moment = require('moment');
import Swal from 'sweetalert2';
import { SUCCESS } from 'app/app.constants';

@Component({
  selector: 'jhi-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.scss']
})
export class NotificationManagementComponent {
  notificationList: INotification[] = [];
  notification: INotification;

  constructor(public notificationService: NotificationService) {
    this.notification = new Notification();
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.notificationService.findAll().subscribe(data => {
      this.notificationList = data.body;
    });
  }

  onSubmit(form: NgForm) {
    this.notification.publishedDate = moment().format('dddd, DD MMM YYYY');
    this.notificationService.create(this.notification).subscribe(value => {
      if (value.body) {
        Swal.fire({
          type: SUCCESS,
          background: '#e6f2ff',
          showConfirmButton: false,
          title: 'Saved successfully',
          timer: 2000
        });
      }
      this.findAll();
    });
    form.form.markAsPristine();
    form.resetForm();
  }

  deleteItem(id: any) {
    this.notificationService.delete(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire({ type: SUCCESS, title: 'Data deleted successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        this.findAll();
      }
    });
  }
}
