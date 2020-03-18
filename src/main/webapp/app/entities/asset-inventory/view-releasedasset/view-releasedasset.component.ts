import { Component, OnInit } from '@angular/core';
import { AssetInventoryService } from '../assetinventory.service';
import { IAssignAsset } from 'app/shared/model/asset-inventory/assign-asset.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'jhi-view-releasedasset',
  templateUrl: './view-releasedasset.component.html',
  styleUrls: ['./view-releasedasset.component.scss']
})
export class ViewReleasedassetComponent implements OnInit {
  config: any;
  releasedAssetListDataSource: MatTableDataSource<IAssignAsset>;
  releasedAssetList: IAssignAsset[] = [];
  constructor(private service: AssetInventoryService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.releasedAssetList.length
    };
  }

  ngOnInit() {
    this.getAllReleasedAsset();
  }

  pageChanged(event) {
    this.config.totalItems = this.releasedAssetList.length;
    this.config.currentPage = event;
  }

  private getAllReleasedAsset() {
    this.service.findByAssignStatus('Released').subscribe(data => {
      this.releasedAssetList = data.body;
    });
  }
}
