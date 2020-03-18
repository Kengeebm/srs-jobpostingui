import { Component, OnInit } from '@angular/core';
import { ITimeSheeetApproval, TimeSheetApproval } from 'app/timesheet/timesheetapproval/timesheetapprovalmodel';
import { TimeSheetApprovalService } from './../timesheetapprovalservice';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  timeSheetApproval: ITimeSheeetApproval;
  timeSheetApprovals: ITimeSheeetApproval[] = [];
  id: string;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected timeSheetApprovalService: TimeSheetApprovalService,
    protected route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.timeSheetApprovalService.findById(this.id).subscribe(res => {
        this.timeSheetApproval = res.body;
        console.log(this.id);
      });
    });
  }

  update() {
    this.timeSheetApprovalService.update(this.timeSheetApproval).subscribe(value => {
      Swal.fire('saved successfully');
      this.route.navigate(['timesheet/approval/view']);
    });
  }
}
