import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchPipe } from './search.pipe';
import { SearchClientPipe } from './search-client.pipe';
import { SearchAssetListPipe } from './search-assetlist.pipe';
import { SearchLocationPipe } from './search-location.pipe';
import { SearchClientNamePipe } from './search-clientname.pipe';
import { SearchManufacturerListPipe } from './search-manufacturer.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ADDASSETS_ROUTE } from './add-asset/add-asset.route';
import { ASSIGNASSET_ROUTE } from './assign-asset/assign-asset.route';
import { ADDCLIENT_ROUTE } from './add-client/add-client.route';
import { RELEASEASSET_ROUTE } from './release-asset/release-asset.route';
import { VIEWCLIENT_ROUTE } from './view-client/view-client.route';
import { VIEWASSET_ROUTE } from './view-asset/view-asset.route';
import { VIEWRELEASEDASSET_ROUTE } from './view-releasedasset/view-releasedasset.route';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssignAssetComponent } from './assign-asset/assign-asset.component';
import { ReleaseAssetComponent } from './release-asset/release-asset.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewAssetComponent } from './view-asset/view-asset.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { ViewReleasedassetComponent } from './view-releasedasset/view-releasedasset.component';
import { ASSET_DASHBOARD_ROUTE } from './asset-dashboard/asset-dashboard.route';
import { AssetDashBoardComponent } from './asset-dashboard/asset-dashboard.component';
import { SearchUnassignedPipe } from './searchunassigned.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatTabsModule, MatFormFieldModule, MatSortModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    RouterModule.forChild([
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
      ASSET_DASHBOARD_ROUTE,
      ADDASSETS_ROUTE,
      ASSIGNASSET_ROUTE,
      ADDCLIENT_ROUTE,
      RELEASEASSET_ROUTE,
      VIEWCLIENT_ROUTE,
      VIEWASSET_ROUTE,
      VIEWRELEASEDASSET_ROUTE
    ]),
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    AssetDashBoardComponent,
    AddAssetComponent,
    AssignAssetComponent,
    ReleaseAssetComponent,
    AddClientComponent,
    ViewClientComponent,
    ViewAssetComponent,
    SearchPipe,
    SearchClientPipe,
    SearchLocationPipe,
    SearchClientNamePipe,
    SearchUnassignedPipe,
    ViewReleasedassetComponent,
    SearchAssetListPipe,
    SearchManufacturerListPipe
  ]
})
export class ItaimApplicationEntityModule {}
