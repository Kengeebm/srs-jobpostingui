import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { GlobalVariableService } from 'app/global-variable.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkStepperPrevious } from '@angular/cdk/stepper';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  piechart: Chart;
  recordCount: any;
  openJobs: any;
  closeJobs: any;
  openVancancies: any = [];
  assignedJobs: any;
  lineChart: any;
  barChart: any;
  shortListedCount: any;
  scheduleCount: any;
  closeResult: string;

  constructor(
    private http: HttpClient,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}
  ngOnInit() {
    this.globalVariableService.getRecordCount().subscribe(res => {
      this.recordCount = res;
    });
    this.globalVariableService.getOpenJobs().subscribe(res => {
      this.openJobs = res;
    });
    this.globalVariableService.getClosedJobs().subscribe(res => {
      this.closeJobs = res;
    });

    this.globalVariableService.getAssignedJobs().subscribe(res => {
      this.assignedJobs = res;
    });
    this.globalVariableService.openVacancies().subscribe(res => {
      this.openVancancies = res;
      this.chart();
    });
    this.globalVariableService.getScheduleCount(true).subscribe(res => {
      this.scheduleCount = res;
    });
    this.globalVariableService.getShortListedCount(true).subscribe(res => {
      this.shortListedCount = res;
    });
    this.globalVariableService.setTitle('JOBPOSTING DASHBOARD');
    // this.db = require('./chartData.json');
  }
  chart() {
    this.piechart = new Chart({
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        marginLeft: 14,
        marginBottom: 50,
        height: 250
        // width: 250,
        // backgroundColor: this.dbData.backgroundColor
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      tooltip: {
        enabled: true
      },
      xAxis: {
        type: 'category'
      },
      // yAxis: {
      //     min: 0,
      //     title: {
      //         text: 'Total Percent'
      //     }
      // },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: 1,
            style: {
              // fontWeight: 'bold',
              fontFamily: 'serif',
              // position: 'relative',
              color: '#252222',
              textShadow: false,
              textOutline: 'false',
              fontSize: '11px',
              marker: false,
              fontWeight: '100'
            }
          },
          colors: ['#07265c', '#712e75', '#c3346c', '#f76048', '#ffa600', '#f44182'],
          startAngle: 0,
          endAngle: 0,
          center: ['50%', '75%'],
          size: '95%',
          innerSize: '75%'
        },
        column: {
          dataLabels: {
            enabled: false,
            style: {
              // fontWeight: 'bold',
              fontFamily: 'serif',
              marginLeft: 25,
              color: '#252222 !important',
              textShadow: false,
              textOutline: 'false'
              // position: 'relative',
              // top: '20%',
              // left: '20%',
              // bottom: '20%'
            }
          },
          borderWidth: 0,
          showInLegend: true,
          colors: ['#07265c', '#712e75', '#c3346c', '#f76048', '#ffa600', '#f44182']
        },
        series: {
          stacking: 'normal',
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Browser',
          type: 'pie',
          data: this.openVancancies,
          colorByPoint: true
        }
      ]
    });
  }

  prevPage() {
    this.router.navigate(['/welcome']);
    this.modalService.dismissAll();
  }

  // previousState() {
  //   window.history.back();
  // }

  open(content) {
    window.history.back();
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    //   result => {
    //     this.closeResult = `Closed with: ${result}`;
    //   },
    //   reason => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   }
    // );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
