import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AssignAsset, IAssignAsset } from 'app/shared/model/asset-inventory/assign-asset.model';
import { AddAsset, IAddAsset } from 'app/shared/model/asset-inventory/add-asset.model';
import { AddEmployee, IAddEmployee } from 'app/shared/model/asset-inventory/add-employee.model';
import { IClient } from 'app/shared/model/asset-inventory/add-client.model';
import { IAssetList } from 'app/shared/model/asset-inventory/asset-type.model';
import { IManufacturer } from 'app/shared/model/asset-inventory/manufacturer.model';
import { IViewAllAsset } from 'app/shared/model/asset-inventory/view-asset.model';
import { IUser } from 'app/core/user/user.model';
import { ILocation } from 'app/shared/model/asset-inventory/add-location.model';

@Injectable({
  providedIn: 'root'
})
export class AssetInventoryService {
  private assetValueSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public assetValue$: Observable<any> = this.assetValueSubject.asObservable();

  public employeeUrl = process.env.SERVER_API_URL + '/services/paraamarshauth/api/users';
  public clientUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/client';
  public assignAssetUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/assignAsset';
  public addAssetUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/addAsset';
  public assetListUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/assetList';
  public manufacturerListUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/manufacturerList';
  public viewAllAssetUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/viewAllAsset';
  public locationUrl = process.env.SERVER_API_URL + '/services/assetinventorynew/api/location';
  constructor(private http: HttpClient) {}

  createAssignAsset(assign: AssignAsset): Observable<HttpResponse<AssignAsset>> {
    return this.http.post<AssignAsset>(this.assignAssetUrl + '/save', assign, { observe: 'response' });
  }

  updateAssignAsset(assign: IAssignAsset): Observable<HttpResponse<IAssignAsset>> {
    return this.http.put<IAssignAsset>(this.assignAssetUrl + '/update', assign, { observe: 'response' });
  }

  findAllAssignAsset(): Observable<HttpResponse<IAssignAsset[]>> {
    return this.http.get<IAssignAsset[]>(this.assignAssetUrl + '/getAll', { observe: 'response' });
  }

  findByAssignStatus(status: String): Observable<HttpResponse<IAssignAsset[]>> {
    return this.http.get<IAssignAsset[]>(this.assignAssetUrl + `${'/getallbystatus'}/${status}`, { observe: 'response' });
  }

  deleteAssignAsset(id: any): Observable<HttpResponse<IAssignAsset>> {
    return this.http.delete(this.assignAssetUrl + `${'/delete'}/${id}`, { observe: 'response' });
  }

  createAddAsset(asset: AddAsset): Observable<HttpResponse<AddAsset>> {
    return this.http.post<AddAsset>(this.addAssetUrl + '/save', asset, { observe: 'response' });
  }

  findAllAddAsset(): Observable<HttpResponse<IAddAsset[]>> {
    return this.http.get<IAddAsset[]>(this.addAssetUrl + '/getAll', { observe: 'response' });
  }

  updateAddAsset(addAsset: IAddAsset): Observable<HttpResponse<IAddAsset>> {
    return this.http.put<IAddAsset>(this.addAssetUrl + '/update', addAsset, { observe: 'response' });
  }

  deleteAddAsset(id: any): Observable<HttpResponse<IAddAsset>> {
    return this.http.delete(this.addAssetUrl + `/${id}`, { observe: 'response' });
  }

  findAddAssetById(id: any): Observable<HttpResponse<IAddAsset>> {
    return this.http.get(this.addAssetUrl + `/${id}`, { observe: 'response' });
  }

  createEmployee(employee: AddEmployee): Observable<HttpResponse<AddEmployee>> {
    return this.http.post<AddEmployee>(this.employeeUrl + '/save', employee, { observe: 'response' });
  }

  findAllEmployee(): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(this.employeeUrl + '/getAll', { observe: 'response' });
  }

  createClient(client: IClient): Observable<HttpResponse<IClient>> {
    return this.http.post<IClient>(this.clientUrl + '/save', client, { observe: 'response' });
  }

  findAllClient(): Observable<HttpResponse<IClient[]>> {
    return this.http.get<IClient[]>(this.clientUrl + '/getAll', { observe: 'response' });
  }

  updateClient(client: IClient): Observable<HttpResponse<IClient>> {
    return this.http.put<IClient>(this.clientUrl + '/update', client, { observe: 'response' });
  }

  deleteClient(id: any): Observable<HttpResponse<IClient>> {
    return this.http.delete(this.clientUrl + `/${id}`, { observe: 'response' });
  }

  findClientById(id: any): Observable<HttpResponse<IClient>> {
    return this.http.get(this.clientUrl + `/${id}`, { observe: 'response' });
  }

  findAllAssetType(): Observable<HttpResponse<IAssetList[]>> {
    return this.http.get<IAssetList[]>(this.assetListUrl + '/getAll', { observe: 'response' });
  }

  findAllViewAsset(): Observable<HttpResponse<IViewAllAsset[]>> {
    return this.http.get<IViewAllAsset[]>(this.viewAllAssetUrl + '/getAllTwoTables', { observe: 'response' });
  }

  findSerialNumByAssetType(assetType: String): Observable<HttpResponse<IAddAsset[]>> {
    return this.http.get<IAddAsset[]>(this.addAssetUrl + `/getserialnum/${assetType}`, { observe: 'response' });
  }

  findAllUnAssignedAssets(): Observable<HttpResponse<IAddAsset[]>> {
    return this.http.get<IAddAsset[]>(this.addAssetUrl + '/getAllUnAssigned', { observe: 'response' });
  }

  findBySerialNumber(serialNumber: String): Observable<HttpResponse<IAddAsset[]>> {
    return this.http.get<IAddAsset[]>(this.addAssetUrl + `/getListBySerial/${serialNumber}`, { observe: 'response' });
  }
  createLocation(location: ILocation): Observable<HttpResponse<ILocation>> {
    return this.http.post<ILocation>(this.locationUrl + '/save', location, { observe: 'response' });
  }

  findAllLocation(): Observable<HttpResponse<ILocation[]>> {
    return this.http.get<ILocation[]>(this.locationUrl + '/getAll', { observe: 'response' });
  }

  updateLocation(location: ILocation): Observable<HttpResponse<ILocation>> {
    return this.http.put<ILocation>(this.locationUrl + '/update', location, { observe: 'response' });
  }

  deleteLocation(id: any): Observable<HttpResponse<ILocation>> {
    return this.http.delete(this.locationUrl + `/${id}`, { observe: 'response' });
  }

  findLocationById(id: any): Observable<HttpResponse<ILocation>> {
    return this.http.get(this.locationUrl + `/${id}`, { observe: 'response' });
  }

  findLocationBySerialNumber(serialNumber: String): Observable<HttpResponse<IAddAsset[]>> {
    return this.http.get<IAddAsset[]>(this.addAssetUrl + `/getLocation/${serialNumber}`, { observe: 'response' });
  }

  createAssetList(assetList: IAssetList): Observable<HttpResponse<IAssetList>> {
    return this.http.post<IAssetList>(this.assetListUrl + '/save', assetList, { observe: 'response' });
  }

  findAllAssetList(): Observable<HttpResponse<IAssetList[]>> {
    return this.http.get<IAssetList[]>(this.assetListUrl + '/getAll', { observe: 'response' });
  }

  updateAssetList(assetList: IAssetList): Observable<HttpResponse<IAssetList>> {
    return this.http.put<IAssetList>(this.assetListUrl + '/update', assetList, { observe: 'response' });
  }

  deleteAssetList(id: any): Observable<HttpResponse<IAssetList>> {
    return this.http.delete(this.assetListUrl + `/${id}`, { observe: 'response' });
  }

  findAssetById(id: any): Observable<HttpResponse<IAssetList>> {
    return this.http.get(this.assetListUrl + `/${id}`, { observe: 'response' });
  }
  createManufacturerList(manufacturerList: IManufacturer): Observable<HttpResponse<IManufacturer>> {
    return this.http.post<IManufacturer>(this.manufacturerListUrl + '/save', manufacturerList, { observe: 'response' });
  }

  findAllManufacturerList(): Observable<HttpResponse<IManufacturer[]>> {
    return this.http.get<IManufacturer[]>(this.manufacturerListUrl + '/getAll', { observe: 'response' });
  }

  updateManufacturerList(manufacturerList: IManufacturer): Observable<HttpResponse<IManufacturer>> {
    return this.http.put<IManufacturer>(this.manufacturerListUrl + '/update', manufacturerList, { observe: 'response' });
  }

  deleteManufacturerList(id: any): Observable<HttpResponse<IManufacturer>> {
    return this.http.delete(this.manufacturerListUrl + `/${id}`, { observe: 'response' });
  }

  findManufacturerById(id: any): Observable<HttpResponse<IManufacturer>> {
    return this.http.get(this.manufacturerListUrl + `/${id}`, { observe: 'response' });
  }

  getAssetData(data) {
    this.assetValueSubject.next(data);
  }
}
