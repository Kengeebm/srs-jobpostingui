import { AssetInventoryService } from '../assetinventory.service';
import { Component, OnInit } from '@angular/core';
import { IAddAsset, AddAsset } from '../../../shared/model/asset-inventory/add-asset.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IAssetList } from 'app/shared/model/asset-inventory/asset-type.model';
import { IManufacturer } from 'app/shared/model/asset-inventory/manufacturer.model';
import { IClient } from 'app/shared/model/asset-inventory/add-client.model';
import { ILocation } from 'app/shared/model/asset-inventory/add-location.model';

@Component({
  selector: 'jhi-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  addAsset: IAddAsset;
  addAssetList: IAddAsset[] = [];
  assetLists: IAssetList[] = [];
  manufacturerList: IManufacturer[] = [];
  clientList: IClient[] = [];
  locationList: ILocation[] = [];
  form: NgForm;
  constructor(private service: AssetInventoryService, private activeRoute: ActivatedRoute, private route: Router) {
    service.assetValue$.subscribe(res => {
      console.log('res for add asset value', res);
      if (res) {
        this.addAssetList = res;
      } else {
        this.addAssetList = [
          {
            assetType: '',
            serialNumber: '',
            modelNumber: '',
            manufacturer: '',
            procurementDate: null,
            clientName: '',
            locationName: ''
          }
        ];
      }
    });
  }

  ngOnInit() {
    this.addAsset = new AddAsset();
    this.getAssetType();
    this.getManufacturerList();
    this.getClientList();
    this.getLocationList();
    this.reset(this.form);
  }

  save(form: NgForm) {
    this.addAsset = this.addAssetList[0];
    if (this.addAsset && this.addAsset.id == null) {
      this.service.createAddAsset(this.addAssetList[0]).subscribe(res => {
        if (res.status === 200) {
          this.addAsset = new AddAsset();
          Swal.fire('', 'Successfully Saved', 'success');
          form.form.markAsPristine();
          form.resetForm();
        } else if (res.status === 208) {
          this.addAsset = new AddAsset();
          Swal.fire('', 'This Serial No. is already exist', 'error');
          form.reset(form.value);
          this.addAsset.serialNumber = '';
        }
      });
    } else {
      this.service.updateAddAsset(this.addAsset).subscribe(value => {
        if (value.status === 200) {
          this.addAsset = new AddAsset();
          // this.findAllAddAssets();
          Swal.fire('', 'Asset Details Edited Successfully', 'success');
          form.form.markAsPristine();
          form.resetForm();
        } else if (value.status === 208) {
          this.addAsset = new AddAsset();
          Swal.fire('Oops', 'Fail! Asset Details is Already Exist', 'error');
        }
      });
    }
  }

  private getAssetType() {
    this.service.findAllAssetType().subscribe(data => {
      this.assetLists = data.body;
    });
  }
  private getManufacturerList() {
    this.service.findAllManufacturerList().subscribe(data => {
      this.manufacturerList = data.body;
    });
  }
  private getClientList() {
    this.service.findAllClient().subscribe(data => {
      this.clientList = data.body;
    });
  }
  private getLocationList() {
    this.service.findAllLocation().subscribe(data => {
      this.locationList = data.body;
    });
  }
  reset(form: NgForm) {
    form.form.markAsPristine();
    form.resetForm();
  }
  findAllAddAssets() {
    this.service.findAllAddAsset().subscribe(res => {
      console.log(res);
      this.addAssetList = res.body;
    });
  }
}
