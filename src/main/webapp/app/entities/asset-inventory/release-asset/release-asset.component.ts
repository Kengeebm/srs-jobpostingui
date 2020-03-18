import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import moment = require('moment');
import { IAssignAsset, AssignAsset } from 'app/shared/model/asset-inventory/assign-asset.model';
import { AssetInventoryService } from '../assetinventory.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'jhi-release-asset',
  templateUrl: './release-asset.component.html',
  styleUrls: ['./release-asset.component.scss']
})
export class ReleaseAssetComponent implements OnInit {
  displayedColumns1: string[] = ['assetType', 'serialNumber', 'clientName', 'locationName', 'assignTo', 'assignmentDate', 'reason', 'save'];
  @ViewChild('reason', { static: false }) reason: ElementRef;
  config: any;
  assignAsset: IAssignAsset;
  assignAssetList: IAssignAsset[] = [];
  assignedAssetListDataSource: MatTableDataSource<IAssignAsset>;
  validReasonValue: boolean;
  header1: string[];
  headerRow: any;
  data1: string[][];
  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  noData: boolean;
  constructor(private service: AssetInventoryService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.assignAssetList.length
    };
  }

  ngOnInit() {
    this.assignAsset = new AssignAsset();
    this.getAllAssignAsset();
  }

  private getAllAssignAsset() {
    this.service.findByAssignStatus('Assigned').subscribe(data => {
      this.assignAssetList = data.body;
      this.assignedAssetListDataSource = new MatTableDataSource(this.assignAssetList);
      this.assignedAssetListDataSource.paginator = this.paginator1;
      this.assignedAssetListDataSource.sort = this.sort1;
      this.noData = this.assignedAssetListDataSource.data.length === 0 ? true : false;
    });
  }

  releaseAssignedAsset(assign: IAssignAsset) {
    assign.status = 'Released';
    assign.releasedDate = moment();

    if (assign.reason === '') {
      Swal.fire('', 'Please mention the reason', 'error');
    } else {
      Swal.fire({
        title: 'Are you sure you want to release?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(result => {
        if (result.value) {
          this.service.updateAssignAsset(assign).subscribe(data => {
            this.assignAsset = data.body;
            if (data.status === 200) {
              Swal.fire('', 'Released Successfully', 'success');
              this.getAllAssignAsset();
            }
          });
        }
      });
    }
  }
  applyFilter(filterValue: string) {
    if (this.assignAssetList.filter) this.assignedAssetListDataSource.filter = filterValue.trim().toLowerCase();
  }
  pageChanged(event) {
    this.config.totalItems = this.assignAssetList.length;
    this.config.currentPage = event;
  }
}
