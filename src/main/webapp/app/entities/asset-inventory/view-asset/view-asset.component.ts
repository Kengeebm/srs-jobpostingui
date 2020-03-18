import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { IAssignAsset } from 'app/shared/model/asset-inventory/assign-asset.model';
import { IAddAsset, AddAsset } from 'app/shared/model/asset-inventory/add-asset.model';
import { AssetInventoryService } from '../assetinventory.service';
import { IViewAllAsset } from 'app/shared/model/asset-inventory/view-asset.model';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'jhi-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss']
})
export class ViewAssetComponent implements OnInit {
  displayedColumns1: string[] = [
    'assetType',
    'serialNumber',
    'modelNumber',
    'manufacturer',
    'procurementDate',
    'clientName',
    'locationName',
    'save'
  ];
  displayedColumns2: string[] = [
    'assetType',
    'serialNumber',
    'modelNumber',
    'manufacturer',
    'procurementDate',
    'clientName',
    'locationName'
  ];
  displayedColumns3: string[] = [
    'assetType',
    'serialNumber',
    'modelNumber',
    'manufacturer',
    'procurementDate',
    'status',
    'assignTo',
    'assignmentDate',
    'releaseDate',
    'clientName',
    'locationName'
  ];
  listAllAssetReportsDataSource: MatTableDataSource<IViewAllAsset>;
  unassignedListDataSource: MatTableDataSource<IAddAsset>;
  allAddAssetListDataSource: MatTableDataSource<IAddAsset>;
  addAssetListDownloadAllData: MatTableDataSource<IAddAsset>;
  listAllAssetReports: IViewAllAsset[] = [];
  unassignedList: IAddAsset[] = [];
  allAddAssetList: IAddAsset[] = [];
  addAsset: IAddAsset[] = [];
  config: any;
  config1: any;
  config2: any;
  headerRow: any;
  header1: string[];
  data1: string[][];
  data2: string[];
  newArray: any;
  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  @ViewChild('sort3', { static: true }) sort3: MatSort;
  noData: boolean;
  totalNoRows: any;
  selectedData: string;

  constructor(private service: AssetInventoryService, private router: Router) {}

  ngOnInit() {
    this.selectedData = 'List Of All Assets';
    this.findAll();
  }
  tabChanged(event) {
    // this.selection.clear();
    this.selectedData = event.tab.textLabel;
    this.findAll();
  }
  findAll() {
    if (this.selectedData === 'List Of All Assets') {
      this.service.findAllAddAsset().subscribe(res => {
        this.allAddAssetList = res.body;
        this.allAddAssetListDataSource = new MatTableDataSource(this.allAddAssetList);
        this.addAssetListDownloadAllData = this.allAddAssetListDataSource;
        this.allAddAssetListDataSource.paginator = this.paginator1;
        this.allAddAssetListDataSource.sort = this.sort1;
        this.noData = this.allAddAssetListDataSource.data.length === 0 ? true : false;
      });
    } else if (this.selectedData === 'Unassigned Assets') {
      this.service.findAllUnAssignedAssets().subscribe(res => {
        this.unassignedList = res.body;
        this.unassignedListDataSource = new MatTableDataSource(this.unassignedList);
        this.unassignedListDataSource.paginator = this.paginator2;
        this.unassignedListDataSource.sort = this.sort2;
        this.noData = this.unassignedListDataSource.data.length === 0 ? true : false;
      });
    } else if (this.selectedData === 'Reports Of All Assets Assigned & Released') {
      this.service.findAllViewAsset().subscribe(data => {
        this.listAllAssetReports = data.body;
        this.listAllAssetReportsDataSource = new MatTableDataSource(this.listAllAssetReports);
        this.listAllAssetReportsDataSource.paginator = this.paginator3;
        this.listAllAssetReportsDataSource.sort = this.sort3;
        this.noData = this.listAllAssetReportsDataSource.data.length === 0 ? true : false;
      });
    }
  }

  applyFilter(filterValue: string) {
    if (this.allAddAssetList.filter) this.allAddAssetListDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {
    if (this.unassignedList.filter) this.unassignedListDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(filterValue: string) {
    if (this.listAllAssetReports.filter) this.listAllAssetReportsDataSource.filter = filterValue.trim().toLowerCase();
  }

  generateExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('List Of All Assets');
    const arr = this.allAddAssetList;
    this.header1 = ['Asset Type', 'Serial Number', 'Model Number', 'Manufacturer', 'Procurement Date', 'Asset Owned By', 'Location'];
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
        [
          `${value.assetType}`,
          `${value.serialNumber}`,
          `${value.modelNumber}`,
          `${value.manufacturer}`,
          `${value.procurementDate}`,
          `${value.clientName}`,
          `${value.locationName}`
        ]
      ];

      worksheet.addRows(this.data1);
    }
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'UnassignedAssets.xlsx');
    });
  }

  listAllAssetExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('List Of All Assigned and Released Assets');
    const arr = this.listAllAssetReports;
    this.header1 = [
      'Asset Type',
      'Serial Number',
      'Model Number',
      'Manufacturer',
      'Procurement Date',
      'Status',
      'Assign To',
      'Assignment Date',
      'Released Date',
      'Asset Owned By',
      'Location'
    ];
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
        [
          `${value.assetType}`,
          `${value.serialNumber}`,
          `${value.modelNumber}`,
          `${value.manufacturer}`,
          `${value.procurementDate}`,
          `${value.status}`,
          `${value.assignTo}`,
          `${value.assignmentDate}`,
          `${value.releaseDate}`,
          `${value.clientName}`,
          `${value.locationName}`
        ]
      ];
      worksheet.addRows(this.data1);
    }
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 15;
    worksheet.getColumn(11).width = 15;
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ListOfAllAssignedAssetsReport.xlsx');
    });
  }

  allAssetsListExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('List Of All Assets');
    const arr = this.addAssetListDownloadAllData;
    this.header1 = ['Asset Type', 'Serial Number', 'Model Number', 'Manufacturer', 'Procurement Date', 'Asset Owned By', 'Location'];
    this.headerRow = worksheet.addRow(this.header1);

    this.headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '7094db' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    for (const value of Object.values(arr.data)) {
      this.data1 = [
        [
          `${value.assetType}`,
          `${value.serialNumber}`,
          `${value.modelNumber}`,
          `${value.manufacturer}`,
          `${value.procurementDate}`,
          `${value.clientName}`,
          `${value.locationName}`
        ]
      ];
      worksheet.addRows(this.data1);
    }
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'AllAssetsList.xlsx');
    });
  }
  deleteAddAsset(id: any) {
    this.service.deleteAddAsset(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire('', 'Deleted Successfully', 'success');
        this.ngOnInit();
      }
    });
  }
  findAllAddAssets() {
    this.service.findAllAddAsset().subscribe(res => {
      this.allAddAssetList = res.body;
    });
  }
  editAddAsset(id: any) {
    this.service.findAddAssetById(id).subscribe(value => {
      this.addAsset[0] = value.body;
      this.router.navigate(['addassets', this.addAsset]);
      this.service.getAssetData(this.addAsset);
    });
  }
}
