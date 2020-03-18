import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-history-mgmt',
  templateUrl: './history-management.component.html',
  styleUrls: ['./history-management.component.scss']
})
export class HistoryMgmtComponent implements OnInit {
  closeResult: string;
  displayedColumns: string[] = ['login', 'firstName', 'status', 'visitPage', 'loginTime', 'modifyContent'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  accountService: any;

  constructor(private userdetailhistoryService: UserdetailhistoryService, private modalService: NgbModal) {}

  ngOnInit() {
    this.userdetailhistoryService.findAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value.body);
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
