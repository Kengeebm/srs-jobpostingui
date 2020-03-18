import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IRequest } from './request.model';
import { RequestService } from './request.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';

@Component({
  selector: 'jhi-requesthistory',
  templateUrl: './requesthistory.component.html',
  styleUrls: ['./requesthistory.component.scss']
})
export class RequestHistoryComponent implements OnInit {
  closeResult: string;
  displayedColumns: string[] = ['empId', 'name', 'message', 'fileName', 'attachment'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  accountService: any;

  constructor(private requestService: RequestService, private modalService: NgbModal) {}

  ngOnInit() {
    this.requestService.findAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value.body);
      // console.log('datasource is ' + this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
