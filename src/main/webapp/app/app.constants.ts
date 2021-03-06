import { Action } from 'rxjs/internal/scheduler/Action';

// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;

// hydrabad server
// export const RESUME_REPO_URL = '183.82.104.67:8083';
// export const EDMS_URL = '183.82.104.67:8084';YYYY-MM-DD

// bangalore server
export const RESUME_REPO_URL = 'http://192.168.1.92:8083';
export const EDMS_URL = 'http://192.168.1.92:8084';

export const DATE_ALERT_MSG = 'To date cannot be less than From date';
export const EMPLOYEE_UPDATE_MSG = 'Employee details updated successfully';
export const ENTER_EMP_ID = 'Please enter employee id';
export const ID = 'id';

export const ROLE_RECRUITER = 'ROLE_RECRUITER';
export const ROLE_RECRUITERMANAGER = 'ROLE_RECRUITERMANAGER';
export const ROLE_ENGINEER = 'ROLE_ENGINEER';
export const ROLE_HR_MANAGER = 'ROLE_HR_MANAGER';
export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
export const ROLE_HR_MANAGER_ADMIN = 'ROLE_HR_MANAGER_ADMIN';
export const ROLE_NETWORK_ADMIN = 'ROLE_NETWORK_ADMIN';
export const ASSET_INVENTORY = 'ASSET_INVENTORY';

export const WELCOME = 'welcome';
export const DASHBOARD = 'dashboard';
export const LOGIN_TITLE = 'Login';
export const ADMIN_PATH = 'admin';

// URL CONSTANT
export const SEARCH_CRITERIA_URL = 'search-criteria';
export const DOWNLOAD_HISTORY_URL = 'download-history';
export const MAIL_HISTORY_URL = 'mail-history';
export const SLACE = '/';
export const DASHBOARD_URL = '/dashboard';
export const UPDATE_DROP_DOWN_URL = 'api/dropdowns';
export const AUTHENTICATION_SUCCESS = 'authenticationSuccess';
export const REQUEST_URL = 'request';
export const REST = '/reset';
export const REGISTER_URL = '/register';
export const JOB_URL = '/job';
export const SEND_AUTH_SUCCESS = 'Sending Authentication Success';
/ to be discussed /;
export const BLANK = '';
export const SUCCESS = 'success';
export const FAIL = 'fail';
export const ERROR = 'error';
export const SELECT_ACTION = 'Select action';
export const INFO = 'info';
export const WARNING = 'warning';
export const QUESTION = 'question';
export const SEARCH_HISTORIES = 'SearchHistories';
export const PROFESSIONAL_HISTORIES = 'ProfessionalHistories';
export const POPUP = 'popup';
export const ID_URL = ':id';
export const DELETE_BY_ID_URL = ':id/delete';
export const EDIT_BY_ID_URL = ':id/edit';
export const NEW_URL = 'new';
export const VIEW_BY_ID_URL = ':id/view';
export const RESPONSE = 'response';
export const SEARCH_HISTORY_URL = '/search-history';
export const DELETED_SEARCH_HISTORY = 'Search history deleted';
export const CANCEL = 'cancel';
export const STATIC_STRING = 'static';
export const SIZE_LG = 'lg';
export const PROFESSIONAL_HISTORY_LIST_MODIFICATION = 'professionalHistoryListModification';
export const API_PROFESSIONAL_HISTORIES_URL = 'api/professional-histories';
export const API_PROFESSIONAL_HISTORIES_BY_PID_URL = 'api/professionalhistoriesByPid';
export const PROFESSIONAL_HISTORY_URL = '/professional-history';
export const DELETED_PROFESSIONAL_HISTORY = 'Deleted an professional History';
export const PROFESSIONAL_LIST_MODIFICATION = 'professionalListModification';
/ to be discussed /;
export const PROFESSIONALS = 'Professionals';
export const SEARCH_API_URL = 'api/search';
export const DOWNLOAD_EXCEL_URL = 'api/downloadExcel';
export const MAIL_API_URL = 'api/mail';
export const REPORT_SEND_SUCCESSFULLY_MSG = 'Reports sent successfully to the registered email...!';
export const UNABLE_SEND_REPORT_MSG = 'Unable to send reports to the registered email...!';
export const STATUS_400 = 400;
export const PROFESSIONAL_API_URL = 'api/professionals';
export const MASTER = 'masters';
export const HAS_AUTHORITIES = ['ROLE_RECRUITERMANAGER', 'ROLE_RECRUITER'];
export const JOBPOST_URL = 'services/jobpost/api';
export const EXPERIENCE = 'Experience';
export const CLIENT_NAME = 'Client Name';
export const USER_NAME = 'User Name';
export const LOCATION = 'Location';
export const POSITION = 'Position';
export const NUMBER_JOB = 'No Of Jobs';
export const STATUS = 'Status';
export const LEAVE_TYPE = 'LeaveType';
export const PUBLIC_HOLIDAYS = 'PublicHolidays';
export const PROJECT = 'Project';
export const REPORTING_MANAGER = 'Reporting Manager';
export const RECRUTER = 'Recruiter';
export const EXPERIENCE_LIST_URL = 'services/jobpost/api/config/experiencelist';
export const CLIENT_NAME_LIST_URL = 'services/jobpost/api/config/clientnamelist';
export const USER_NAME_LIST_URL = 'services/jobpost/api/config/usernamelist';
export const LOCATION_LIST_URL = 'services/jobpost/api/config/locationlist';
export const POSITION_LIST_URL = 'services/jobpost/api/config/positionlist';
export const JOB_NO_LIST_URL = 'services/jobpost/api/config/jobnolist';
export const EIP = 'eipform';
export const EIP_USER_DETAIL_URL = 'services/eip/api/user/detail';
export const EIP_CREATE_URL = 'services/eip/api/user/detail/update';
export const EIP_USER_DETAIL_EMAILID_URL = 'services/eip/api/user-detail';
export const EIP_POSITION = 'services/jobpost/api/config/positionlist';
export const EIP_LOCATION = 'services/jobpost/api/config/locationlist';
export const LEAVE_STATUS_URL = 'services/eip/api/userdetailsleave/leavestatus/';
export const UPDATE_EMPLOYEE_LIST_BY_LEAVE_STATUS_URL = 'services/eip/api/userdetailsleave/leavestatus/';

export const LEAVE_TYPE_EMP_LIST_URL = 'services/eip/api/userdetailsleave/leavetype/';
export const LEAVE_TYPE_COUNT_EMP_LIST_URL = 'services/eip/api/userdetailsleave/leavestatuscount/';
export const USER_DETAILS_LEAVE_URL = 'services/eip/api/userdetailsleave';
export const USER_DETAILS__LEAVE_HISTORY_URL = 'services/eip/api/userdetailsleave/employee';
export const USER_LEAVE_URL = 'services/eip/api/userleave';
export const REQUEST_API_URL = 'services/eip/api/request';
export const LEAVE_TYPE_URL = 'services/eip/api/leavetype';
export const LEAVE_CANCEL_URL = 'services/eip/api/userdetailsleave/leave-cancel';
export const JOB_POST = 'JOB_POST';
export const RESUME_REPO = 'RESUME_REPO';
export const EDMS = 'EDMS';
export const FILL_PROFILE_DETAILS = 'Please fill the profile details';

export const LEAVE_MGT = 'LEAVE_MGT';
export const TIMESHEET_MANAGEMENT = 'TIMESHEET MANAGEMENT';
export const TIMESHEET_ADMIN = 'TIMESHEET MANAGEMENT ADMIN';
export const USERREPORTS = 'user-reports';
export const DASHBOARDCURRENTMONTH = 'hr-dashboardbymonth';
export const LEAVE_URL = 'leave';
export const TIMESHEET = 'timesheet';
export const REQUEST = 'request';
export const UN_AUTHORIZED_MSG = 'You are not authorized to access this';
export const PUBLIC_HOLIDAY_URL = 'services/eip/api/publicHolidays';
export const TIMESHEET_STATUS_URL = 'services/eip/api/status';
export const PAGE_ERR = 'Page not found';
export const JOBPOST_TITLE = 'JOBPOSTING';
export const EIP_TITLE = 'PROFILE';
export const LEAVE_TITLE = 'LEAVE MANAGEMENT';
export const LEAVE_ADMIN_TITLE = 'LEAVE MANAGEMENT ADMIN';
export const WEEKEND = 'weekend';
export const TIMESHEET_TITLE = 'timesheet';
export const PENDING = 'Pending';
export const APPROVED = 'Approved';
export const REJECTED = 'Rejected';
export const REJECT = 'Reject';
export const WFH = 'Work-From-Home';
export const WCL = 'Work-From-Client-Location';
export const CO = 'Comp-Off';
export const MAIL_SENT_HR_UNFREEZE_TIMESHEET = 'Notification sent to concerned team to re-enable timesheet';
export const PRESENT = 'Present';
export const SL = 'Sick-Leave';
export const CL = 'Casual-Leave';
export const HOLIDAY = 'Holiday';
export const WORKFROMHOME = 'Work-From-Home';
export const WORKFROMCLIENTLOCATION = 'Work-From-Client-Location';
export const COMPOFF = 'Comp-Off';
export const SAVED_SUCCESS_MSG = 'Saved successfully';
/ to be discussed /;
export const DATA_IS_NOT_SAVED_MSG = 'Data is not Saved';
/ to be discussed /;
export const STATUS_SMALL_TEXT = 'status';
/ to be discussed /;
export const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';
export const EMAIL_SENT_EMPLOYEE_MAIL = 'Email reminder(s) has been sent.';
/ to be discussed /;
export const CANCELATION_REQUEST_SENT = 'Cancellation request sent to concerned teams';
export const UNABLE_SENT_CANCELATION_REQUESTION_HR = 'Unable to send cancellation request!';
export const CANCEL_LEAVE = 'Do you want to cancel this leave ?';
export const DATA_SAVED_SUCCESSFULLY_MALI_TO_HR = 'Leave application sent for approval';
export const APPLY_LEAVE_MSG = 'Do you want to proceed with leave application ? ';
/ to be discussed /;
export const ALREADY_HOLIDAY_CANT_APPLY_LEAVE = 'This day is a declared holiday, leave cannot be applied';
export const LEAVE_ALREADY_APPLIED = 'Leave is already applied for';
export const REQUEST_MGT = 'REQUEST MANAGEMENT';
export const EIP_BASE_URL = 'services/eip';
export const USER_DETAIL_HISTORY_SAVE_URL = '/api/user_history';
export const FIND_ALL_USER_DETAIL_HISTORY_SAVE_URL = '/api/user_history/findall';
export const LOG_IN = 'LOG IN';
export const PROFILE_PAGE = 'Profile Page';
export const LEAVE_PAGE = 'Leave Page';
export const START_DATE_VALIDATION_MSG = 'Start date is less or equal to end Date';
export const DD_MM_YY = 'dd/MM/yyyy';

export const ASSETINVENTORY_SERVICE = '../assetinventory.service';
export const ANGULAR_CORE = '@angular/core';
export const SHARED_MODEL_ASSET_INVENTORY_ADD_ASSET_MODEL = '../../../shared/model/asset-inventory/add-asset.model';
export const SWEETALERT2 = 'sweetalert2';
export const ANGULAR_ROUTER = '@angular/router';
export const ANGULAR_FORMS = '@angular/forms';
export const APP_SHARED_MODEL_ASSET_INVENTORY_ASSET_TYPE_MODEL = 'app/shared/model/asset-inventory/asset-type.model';
export const APP_SHARED_MODEL_ASSET_INVENTORY_MANUFACTURER_MODEL = 'app/shared/model/asset-inventory/manufacturer.model';
export const APP_SHARED_MODEL_ASSET_INVENTORY_ADD_CLIENT_MODEL = 'app/shared/model/asset-inventory/add-client.model';
export const APP_SHARED_MODEL_ASSET_INVENTORY_ADD_LOCATION_MODEL = 'app/shared/model/asset-inventory/add-location.model';
export const JHI_ADD_ASSET = 'jhi-add-asset';
export const ADD_ASSET_COMPONENT_HTML = './add-asset.component.html';
export const ADD_ASSET_COMPONENT_SCSS = './add-asset.component.scss';
export const SUCCESSFULLY_SAVED = 'Successfully Saved';
export const THIS_SERIAL_NO_IS_ALREDY_EXIST = 'This Serial No. is already exist';
export const ADD_CLIENT_COMPONENT_SCSS = './add-client.component.scss';
export const ADD_CLIENT_COMPONENT_HTML = './add-client.component.html';
export const OOPS = 'Oops';
export const CLIENT_NAME_IS_ALRAEDY_EXIST = 'client name is already exist';
export const CLIENT_NAME_EDITED_SUCCESSFULLY = 'Client Name Edited Successfully';
export const FAIL_CLIENT_NAME_IS_ALREADY_EXIST = 'Fail! Client Name is Already Exist';
export const LOCATION_NAME_IS_ALRESDY_EXIST = 'Location name is already exist';
export const LOCATION_NAME_EDITED_SUCCESSFULLY = 'Location Name Edited Successfully';
export const FAIL_LOCATION_NAME_IS_ALREADY_EXIST = 'Fail! Location Name is Already Exist';
export const ASSET_TYPE_IS_ALREADY_EXITS = 'Asset Type is already exist';
export const ASSET_TYPE_EDITED_SUCCESSFULLY = 'Asset Type Edited Successfully';
export const FAIL_ASSET_TYPE_IS_ALREADY_EXIST = 'Fail! Asset Type is Already Exist';
export const FAIL_MANUFACTURER_IS_ALREADY_EXIST = 'Fail! Manufacturer is Already Exist';
export const DELETED_SUCCESSFULLY = 'Deleted Successfully';
export const APP_CORE_AUTH_USER_ROUTE_ACCESS_SERVICE = 'app/core/auth/user-route-access-service';
export const ADDCLIENT = 'addclient';
export const ADDASSETS = 'addassets';
export const JHI_ASSET_DASHBOARD = 'jhi-asset-dashboard';
export const ASSET_DASHBOARD_COMPONENT_HTML = './asset-dashboard.component.html';
export const ASSET_DASHBOARD_COMPONENT_SCSS = './asset-dashboard.component.scss';
export const APP_SHARED_MODEL_ASSET_INVENTORY_VIEW_ASSET_MODEL = 'app/shared/model/asset-inventory/view-asset.model';
export const APP_CORE_USER_USER_MODEL = 'app/core/user/user.model';
export const APP_SHARED_MODEL_ASSET_INVENTORY_ADD_ASSET_MODEL = 'app/shared/model/asset-inventory/add-asset.model';
export const APP_SHARED_MODEL_ASSET_INVENTORY_ASSETTYPE_MODEL = 'app/shared/model/asset-inventory/asset-type.model';
export const APP_SHARED_MODEL_ASSET_INVENTORY_ASSIGNE_ASSET_MODEL = 'app/shared/model/asset-inventory/assign-asset.model';
export const JHI_ASSIGNE_ASSET = 'jhi-assign-asset';
export const ASSIGN_ASSET_COMPONENT_HTML = './assign-asset.component.html';
export const ASSIGN_ASSET_COMPONENT_SCSS = './assign-asset.component.scss';
export const ASSIGNMENT_DATE_SHOULD_BE_GREATER_THAN_PURSCHES_dManufacturer_is_already_exist =
  'Assignment Date should be greater than purchase date';
export const ASSIGNMENT_DATE_SHOULD_BE_GREATER_THAN_PREVIOUS_ASSIGNMENT_DATE =
  'Assignment Date should be greater than previous Assignment Date';
export const ASSIGNED = 'Assigned';
export const THIS_SERIAL_NO_IS_ALREDY_ASSIGNED = 'This Serial No. is already assigned';
export const SUCCESSFULLY_ASSIGNED = 'Successfully Assigned';
export const MOMENT = 'moment';
export const JHI_RELEASE_ASSET1 = 'jhi-release-assetl';
export const RELEASE_ASSET_COMPONENT_HTML = './release-asset.component.html';
export const RELEASE_ASSET_COMPONENT_SCSS = './release-asset.component.scss';
export const ASSETTYPE = 'assetType';
export const SERIALNUMBER = 'serialNumber';
export const CLIENTNAME = 'clientName';
export const LOCATIONNAME = 'locationName';
export const ASSIGNETO = 'assignTo';
export const REASON = 'reason';
export const PAGINATOR1 = 'paginator1';
export const SORT1 = 'sort1';
export const RELEASED = 'Released';
export const PLEASE_MENTION_THE_REASON = 'Please mention the reason';
export const ARE_YOU_SURE_YOU_WANT_TO_RELEASE = 'Are you sure you want to release?';
export const RELEASED_SUCCESSFULLY = 'Released Successfully';
export const RELEASE_ASSET_COMPONENT = './release-asset.component';
export const RELEASE_ASSET = 'Release Asset';
export const EXCELJS = 'exceljs';
export const FILE_SAVER = 'file-saver';
export const ANGULAR_MATERIAL = '@angular/material';
export const JHI_VIEW_ASSET = 'jhi-view-asset';
export const VIEW_ASSET_COMPONENT_HTML = './view-asset.component.html';
export const VIEW_ASSET_COMPONENT_SCSS = './view-asset.component.scss';
export const MODELNUMBER = 'modelNumber';
export const PROCUREMENTDATE = 'procurementDate';
export const RELEASEDATE = 'releaseDate';
export const MANUFACTURER = 'manufacturer';
export const ASSIGNEMENTDATE = 'assignmentDate';
export const PAGINATOR2 = 'paginator2';
export const PAGINATOR3 = 'paginator3';
export const SORT2 = 'sort2';
export const LIST_OF_ALL_ASSETS = 'List Of All Assets';
export const UNASSIGNED_ASSETS = 'Unassigned Assets';
export const REPORTS_OF_ALL_ASSETS_ASSIGNED_Released = 'Reports Of All Assets Assigned & Released';
export const MANUFACTURER_IS_ALREADY_EXIST = 'Manufacturer is already exist';
export const THIN = 'thin';
export const application_vnd_openxmlformats_officedocument_spreadsheetml_sheet =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const UNASSIGNEDASSET_XLSX = 'UnassignedAssets.xlsx';
export const ALLASSETSLIST_XLSX = 'AllAssetsList.xlsx';
export const APPLICATION_VN_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const ASSET_OWNED_BY = 'Asset Owned By';
export const VIEW_ASSET_COMPONENT = './view-asset.component';
export const VIEWASSET = 'viewasset';
export const VIEW_ASSET = 'View Asset';
export const JHI_VIEW_CLIENT = 'jhi-view-client';
export const VIEW_CLIENT_COMPONENT_HTML = './view-client.component.html';
export const VIEW_CLIENT_COMPONENT_SCSS = './view-client.component.scss';
export const VIEW_CLIENTREPORT = 'view-clientreport';
export const VIEW_CLIENT = 'View Client';
export const VIEW_RELEASEDASSET_COMPONENT_HTML = './view-releasedasset.component.html';
export const VIEW_RELEASEDASSET_COMPONENT_SCSS = './view-releasedasset.component.scss';
export const VIEW_RELEASEDASSET = 'view-releasedasset';
