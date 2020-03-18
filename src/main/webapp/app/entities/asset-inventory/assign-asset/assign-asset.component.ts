import { Component, OnInit } from '@angular/core';
import { AssetInventoryService } from '../assetinventory.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AssignAsset, IAssignAsset } from 'app/shared/model/asset-inventory/assign-asset.model';
import { IAssetList } from 'app/shared/model/asset-inventory/asset-type.model';
import { IAddAsset, AddAsset } from 'app/shared/model/asset-inventory/add-asset.model';
import { IUser } from 'app/core/user/user.model';
import { IClient } from 'app/shared/model/asset-inventory/add-client.model';
import { IViewAllAsset } from 'app/shared/model/asset-inventory/view-asset.model';
import { ILocation } from 'app/shared/model/asset-inventory/add-location.model';

@Component({
  selector: 'jhi-assign-asset',
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.scss']
})
export class AssignAssetComponent implements OnInit {
  assignAsset: IAssignAsset;
  employeeName: IUser[] = [];
  assetLists: IAssetList[] = [];
  serialNoLists: IAddAsset[] = [];
  assignAssetList: IAssignAsset[] = [];
  clientList: IClient[] = [];
  locationList: ILocation[] = [];
  assignmentDateValue: any;
  serialNumberValue: any;
  invalidDate: boolean;
  invalidSerialNo: boolean;
  serialNumAssetType: any;
  form: NgForm;
  clientSerialNum: IAddAsset[];
  locationSerialNum: IAddAsset[] = [];
  listAllAssetReports: IViewAllAsset[] = [];
  newAssignmentDate: any;
  invaliAssigndDate: boolean;
  constructor(private service: AssetInventoryService, private route: Router) {}

  ngOnInit() {
    this.assignAsset = new AssignAsset();
    this.getEmpList();
    this.getSerialNoList();
    this.getAssetType();
    this.getAllAssignAsset();
    this.getClientList();
    this.getLocationList();
    this.getAllAssetReport();
    this.reset(this.form);
  }
  getSerialNum(assetType: String) {
    this.service.findSerialNumByAssetType(assetType).subscribe(res => {
      this.serialNumAssetType = res.body;
    });
  }
  getClientName(serialNum: String) {
    this.service.findBySerialNumber(serialNum).subscribe(res => {
      this.clientSerialNum = res.body;
      this.assignAsset.clientName = this.clientSerialNum[0].clientName;
      this.assignAsset.locationName = this.clientSerialNum[0].locationName;
    });
  }
  getLocationName(serialNum: String) {
    this.service.findLocationBySerialNumber(serialNum).subscribe(res => {
      this.locationSerialNum = res.body;
    });
  }
  private getLocationList() {
    this.service.findAllLocation().subscribe(data => {
      this.locationList = data.body;
    });
  }
  getAllAssetReport() {
    this.service.findAllViewAsset().subscribe(data => {
      this.listAllAssetReports = data.body;
    });
  }
  onSubmit(form: NgForm) {
    this.invalidDate = false;
    this.invalidSerialNo = false;
    this.invaliAssigndDate = false;

    for (let i = 0; i < this.serialNoLists.length; i++) {
      this.assignmentDateValue = this.assignAsset.assignmentDate;
      this.serialNumberValue = this.assignAsset.serialNumber;
      if (this.serialNumberValue === this.serialNoLists[i].serialNumber) {
        if (this.assignmentDateValue < this.serialNoLists[i].procurementDate) {
          this.invalidDate = true;
          Swal.fire('', 'Assignment Date should be greater than purchase date', 'warning');
        }
      }
    }
    for (let k = 0; k < this.listAllAssetReports.length; k++) {
      if (this.assignAsset.serialNumber === this.listAllAssetReports[k].serialNumber) {
        if (this.assignAsset.assignmentDate < this.listAllAssetReports[k].assignmentDate) {
          this.invaliAssigndDate = true;
          Swal.fire('', 'Assignment Date should be greater than previous Assignment Date ', 'warning');
        }
      }
    }

    for (let j = 0; j < this.assignAssetList.length; j++) {
      if (this.assignAsset.serialNumber === this.assignAssetList[j].serialNumber) {
        if (this.assignAssetList[j].status === 'Assigned') {
          this.invalidSerialNo = true;
          Swal.fire('', 'This Serial No. is already assigned', 'error');
        }
      }
    }

    if (!this.invalidSerialNo && !this.invalidDate && !this.invaliAssigndDate) {
      this.assignAsset.status = 'Assigned';
      this.assignAsset.reason = '';
      this.service.createAssignAsset(this.assignAsset).subscribe(res => {
        if (res.status === 200) {
          this.assignAsset = new AssignAsset();
          this.getAllAssignAsset();
          Swal.fire('', 'Successfully Assigned', 'success');
          form.form.markAsPristine();
          form.resetForm();
        }
      });
    }
  }
  private getAllAssignAsset() {
    this.service.findAllAssignAsset().subscribe(data => {
      this.assignAssetList = data.body;
    });
  }
  private getEmpList() {
    this.service.findAllEmployee().subscribe(data => {
      this.employeeName = data.body;
    });
  }
  private getSerialNoList() {
    this.service.findAllAddAsset().subscribe(data => {
      this.serialNoLists = data.body;
    });
  }
  private getAssetType() {
    this.service.findAllAssetType().subscribe(data => {
      this.assetLists = data.body;
    });
  }
  private getClientList() {
    this.service.findAllClient().subscribe(data => {
      this.clientList = data.body;
    });
  }
  reset(form: NgForm) {
    form.form.markAsPristine();
    form.resetForm();
  }
}
