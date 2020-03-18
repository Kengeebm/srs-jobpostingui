import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { IUser } from 'app/core/user/user.model';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { IEForm } from 'app/shared/model/jobPost/eipform.model';
import { Worklocation, IWorklocation } from 'app/shared/model/jobPost/worklocation.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'jhi-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.scss']
})
export class UserReportsComponent implements OnInit {
  displayedColumns1: string[] = ['login', 'email', 'createdDate', 'createdBy', 'location', 'projectCode'];
  allEmpList: IUser[] = [];
  allEmpListDataSource: MatTableDataSource<IUser>;
  allUserDetails: IEForm[] = [];
  location: IWorklocation[] = [];
  header1: any;
  headerRow: any;
  data1: any;
  public loc: string;
  public email: string;

  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  noData: boolean;
  constructor(public service: UserService) {}

  ngOnInit() {
    this.getAllUsers();
    this.getLocPro();
    this.getLocation();
    this.service.findLocation().subscribe(value => {
      this.location = value.body;
    });
  }

  private getAllUsers() {
    this.service.findAll().subscribe(res => {
      this.allEmpList = res.body;
    });
  }

  private getLocPro() {
    this.service.findUd().subscribe(res => {
      this.allUserDetails = res.body;
      this.allUserDetails.forEach(userDet => {
        this.loc = userDet.workLocation;
        this.email = userDet.email;
        this.allEmpList.forEach(empDet => {
          if (this.email == empDet.email) {
            empDet.location = this.loc;
          }
        });
      });

      this.allEmpListDataSource = new MatTableDataSource(this.allEmpList);
      this.allEmpListDataSource.paginator = this.paginator1;
      this.allEmpListDataSource.sort = this.sort1;
      this.noData = this.allEmpListDataSource.data.length === 0 ? true : false;
    });
  }

  private getLocation() {
    this.service.findLocation().subscribe(res => {
      this.location = res.body;
    });
  }

  downloadAllEmployeesList() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Users data');
    const arr = this.allEmpList;
    this.header1 = ['User Name', 'Email', 'Created Date', 'Created By', 'Location', 'Project Code'];
    this.headerRow = worksheet.addRow(this.header1);
    this.headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '7094db' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    for (const value of Object.values(arr)) {
      this.data1 = [
        [`${value.login}`, `${value.email}`, `${value.createdDate}`, `${value.createdBy}`, `${value.location}`, `${value.projectCode}`]
      ];
      worksheet.addRows(this.data1);
    }
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'AllUserDetails.xlsx');
    });
  }

  nameByFilter(filterValue: string) {
    this.allEmpListDataSource.filter = filterValue.trim().toLowerCase();
    this.noData = this.allEmpListDataSource.filteredData.length === 0 ? true : false;
    this.allEmpListDataSource.filterPredicate = (data: { login: string }, filterValue: string) =>
      data.login
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }

  // getAllUsersList() {
  //   for (let l = 0; l < this.allEmpList.length; l++) {
  //     for (let m = 0; m < this.allUserDetails.length; m++) {
  //       console.log('..................................', this.allUserDetails[l].email, this.allEmpList[m].email);
  //       if (this.allEmpList[l].email === this.allUserDetails[m].email) {
  //         this.allEmpList[l].workLocation = this.allUserDetails[m].workLocation;
  //         this.allEmpList[l].projectCode = this.allUserDetails[m].projectCode;

  //         console.log('emp id', this.allUserDetails[m].empId, this.allEmpList[l].workLocation);
  //       }
  //     }
  //   }
  // }
}
