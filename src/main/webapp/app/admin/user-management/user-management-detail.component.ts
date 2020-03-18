import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../core/user/user.model';

@Component({
  selector: 'jhi-user-mgmt-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.scss']
})
export class UserMgmtDetailComponent implements OnInit {
  user: User;
  modalService: any;
  dataChange: any;
  closeResult: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      this.user = user.body ? user.body : user;
    });
  }
  prevPage() {
    this.router.navigate(['/admin/user-management']);
    this.modalService.dismissAll();
  }

  open(content) {
    if (this.dataChange) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    } else {
      this.prevPage();
    }
  }
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }
}
