import { Component, OnInit } from '@angular/core';
import { AssetInventoryService } from '../assetinventory.service';
import Swal from 'sweetalert2';
import { IClient } from 'app/shared/model/asset-inventory/add-client.model';
import { IAddAsset } from 'app/shared/model/asset-inventory/add-asset.model';

@Component({
  selector: 'jhi-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  unassignedList: IAddAsset[] = [];
  config: any;
  element: any = [];
  constructor(private service: AssetInventoryService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.unassignedList.length
    };
  }

  ngOnInit() {
    this.findAllClients();
  }

  findAllClients() {
    this.service.findAllUnAssignedAssets().subscribe(res => {
      this.unassignedList = res.body;
    });
  }

  deleteClient(id: any) {
    this.service.deleteClient(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire('', 'Deleted Successfully', 'success');
        this.findAllClients();
      }
    });
  }

  pageChanged(event) {
    this.config.totalItems = this.unassignedList.length;
    this.config.currentPage = event;
  }
}
