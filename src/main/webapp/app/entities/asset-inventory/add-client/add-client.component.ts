import { Component, OnInit } from '@angular/core';
import { AssetInventoryService } from '../assetinventory.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IClient, Client } from 'app/shared/model/asset-inventory/add-client.model';
import { ILocation, Location } from 'app/shared/model/asset-inventory/add-location.model';
import { IAssetList, AssetList } from 'app/shared/model/asset-inventory/asset-type.model';
import { IManufacturer, Manufacturer } from 'app/shared/model/asset-inventory/manufacturer.model';

@Component({
  selector: 'jhi-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  addClient: IClient;
  clientsList: IClient[] = [];
  addLocation: ILocation;
  locationsList: ILocation[] = [];
  addAssetList: IAssetList;
  assetsList: IAssetList[] = [];
  addManufacturer: IManufacturer;
  manufacturerList: IManufacturer[] = [];
  config: any;
  config1: any;
  form: NgForm;
  form1: NgForm;
  form2: NgForm;
  form3: NgForm;
  config2: any;
  config3: any;
  constructor(private service: AssetInventoryService, private route: Router) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.clientsList.length
    };
    this.config1 = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.locationsList.length
    };
    this.config2 = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.assetsList.length
    };
    this.config3 = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.manufacturerList.length
    };
  }

  ngOnInit() {
    this.addClient = new Client();
    this.addLocation = new Location();
    this.addAssetList = new AssetList();
    this.addManufacturer = new Manufacturer();
    this.findAllClients();
    this.findAllLocations();
    this.findAllAssetList();
    this.findAllManufacturer();
    this.reset(this.form1);
    this.resetLocation(this.form);
    this.resetAssetList(this.form2);
    this.resetManufacturer(this.form3);
  }
  findAllClients() {
    this.service.findAllClient().subscribe(res => {
      this.clientsList = res.body;
    });
  }
  findAllLocations() {
    this.service.findAllLocation().subscribe(res => {
      this.locationsList = res.body;
    });
  }
  findAllAssetList() {
    this.service.findAllAssetList().subscribe(res => {
      this.assetsList = res.body;
    });
  }
  findAllManufacturer() {
    this.service.findAllManufacturerList().subscribe(res => {
      this.manufacturerList = res.body;
    });
  }
  reset(form1: NgForm) {
    form1.form.markAsPristine();
    form1.resetForm();
  }
  resetLocation(form: NgForm) {
    form.form.markAsPristine();
    form.resetForm();
  }
  resetAssetList(form2: NgForm) {
    form2.form.markAsPristine();
    form2.resetForm();
  }
  resetManufacturer(form3: NgForm) {
    form3.form.markAsPristine();
    form3.resetForm();
  }
  onSubmit(form1: NgForm) {
    if (this.addClient !== null && this.addClient.id == null) {
      this.service.createClient(this.addClient).subscribe(res => {
        if (res.status === 200) {
          this.addClient = new Client();
          this.findAllClients();
          Swal.fire('', 'Successfully Saved', 'success');
          form1.form.markAsPristine();
          form1.resetForm();
        } else if (res.status === 208) {
          this.addClient = new Client();
          Swal.fire('Oops', 'client name is already exist', 'error');
        }
      });
    } else {
      this.service.updateClient(this.addClient).subscribe(value => {
        if (value.status === 200) {
          this.addClient = new Client();
          this.findAllClients();
          Swal.fire('', 'Client Name Edited Successfully', 'success');
          form1.form.markAsPristine();
          form1.resetForm();
        } else if (value.status === 208) {
          this.addClient = new Client();
          Swal.fire('Oops', 'Fail! Client Name is Already Exist', 'error');
        }
      });
    }
  }
  onSubmitLocation(form: NgForm) {
    if (this.addLocation !== null && this.addLocation.id == null) {
      this.service.createLocation(this.addLocation).subscribe(res => {
        if (res.status === 200) {
          this.addLocation = new Location();
          this.findAllLocations();
          Swal.fire('', 'Successfully Saved', 'success');
          form.form.markAsPristine();
          form.resetForm();
        } else if (res.status === 208) {
          this.addLocation = new Location();
          Swal.fire('Oops', 'Location name is already exist', 'error');
        }
      });
    } else {
      this.service.updateLocation(this.addLocation).subscribe(value => {
        if (value.status === 200) {
          this.addLocation = new Location();
          this.findAllLocations();
          Swal.fire('', 'Location Name Edited Successfully', 'success');
          form.form.markAsPristine();
          form.resetForm();
        } else if (value.status === 208) {
          this.addLocation = new Location();
          Swal.fire('Oops', 'Fail! Location Name is Already Exist', 'error');
        }
      });
    }
  }

  onSubmitAssetList(form2: NgForm) {
    if (this.addAssetList !== null && this.addAssetList.id == null) {
      this.service.createAssetList(this.addAssetList).subscribe(res => {
        if (res.status === 200) {
          this.addAssetList = new AssetList();
          this.findAllAssetList();
          Swal.fire('', 'Successfully Saved', 'success');
          form2.form.markAsPristine();
          form2.resetForm();
        } else if (res.status === 208) {
          this.addAssetList = new AssetList();
          Swal.fire('Oops', 'Asset Type is already exist', 'error');
        }
      });
    } else {
      this.service.updateAssetList(this.addAssetList).subscribe(value => {
        if (value.status === 200) {
          this.addAssetList = new AssetList();
          this.findAllAssetList();
          Swal.fire('', 'Asset Type Edited Successfully', 'success');
          form2.form.markAsPristine();
          form2.resetForm();
        } else if (value.status === 208) {
          this.addAssetList = new AssetList();
          Swal.fire('Oops', 'Fail! Asset Type is Already Exist', 'error');
        }
      });
    }
  }

  onSubmitManufacturer(form3: NgForm) {
    if (this.addManufacturer !== null && this.addManufacturer.id == null) {
      this.service.createManufacturerList(this.addManufacturer).subscribe(res => {
        if (res.status === 200) {
          this.addManufacturer = new Manufacturer();
          this.findAllManufacturer();
          Swal.fire('', 'Successfully Saved', 'success');
          form3.form.markAsPristine();
          form3.resetForm();
        } else if (res.status === 208) {
          this.addManufacturer = new Manufacturer();
          Swal.fire('Oops', 'Manufacturer is already exist', 'error');
        }
      });
    } else {
      this.service.updateManufacturerList(this.addManufacturer).subscribe(value => {
        if (value.status === 200) {
          this.addManufacturer = new Manufacturer();
          this.findAllManufacturer();
          Swal.fire('', 'Manufacturer Edited Successfully', 'success');
          form3.form.markAsPristine();
          form3.resetForm();
        } else if (value.status === 208) {
          this.addManufacturer = new Manufacturer();
          Swal.fire('Oops', 'Fail! Manufacturer is Already Exist', 'error');
        }
      });
    }
  }

  deleteClient(id: any) {
    this.service.deleteClient(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire('', 'Deleted Successfully', 'success');
        this.findAllClients();
      }
    });
  }
  deleteLocation(id: any) {
    this.service.deleteLocation(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire('', 'Deleted Successfully', 'success');
        this.findAllLocations();
      }
    });
  }

  deleteAsset(id: any) {
    this.service.deleteAssetList(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire('', 'Deleted Successfully', 'success');
        this.findAllAssetList();
      }
    });
  }

  deleteManufacturer(id: any) {
    this.service.deleteManufacturerList(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire('', 'Deleted Successfully', 'success');
        this.findAllManufacturer();
      }
    });
  }
  editClient(id: any) {
    this.service.findClientById(id).subscribe(value => {
      this.addClient = value.body;
    });
  }
  editLocation(id: any) {
    this.service.findLocationById(id).subscribe(value => {
      this.addLocation = value.body;
    });
  }

  editAsset(id: any) {
    this.service.findAssetById(id).subscribe(value => {
      this.addAssetList = value.body;
    });
  }
  editManufacturer(id: any) {
    this.service.findManufacturerById(id).subscribe(value => {
      this.addManufacturer = value.body;
    });
  }

  pageChangeClient(event) {
    this.config.totalItems = this.clientsList.length;
    this.config.currentPage = event;
  }
  pageChangeLocation(event) {
    this.config1.totalItems = this.locationsList.length;
    this.config1.currentPage = event;
  }
  pageChangeAsset(event) {
    this.config2.totalItems = this.assetsList.length;
    this.config2.currentPage = event;
  }
  pageChangeManufacturer(event) {
    this.config3.totalItems = this.manufacturerList.length;
    this.config3.currentPage = event;
  }
}
