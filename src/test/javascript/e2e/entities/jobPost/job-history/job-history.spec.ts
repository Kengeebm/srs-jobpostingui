/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { JobHistoryComponentsPage, JobHistoryDeleteDialog, JobHistoryUpdatePage } from './job-history.page-object';

const expect = chai.expect;

describe('JobHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobHistoryUpdatePage: JobHistoryUpdatePage;
  let jobHistoryComponentsPage: JobHistoryComponentsPage;
  let jobHistoryDeleteDialog: JobHistoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load JobHistories', async () => {
    await navBarPage.goToEntity('job-history');
    jobHistoryComponentsPage = new JobHistoryComponentsPage();
    await browser.wait(ec.visibilityOf(jobHistoryComponentsPage.title), 5000);
    expect(await jobHistoryComponentsPage.getTitle()).to.eq('Job Histories');
  });

  it('should load create JobHistory page', async () => {
    await jobHistoryComponentsPage.clickOnCreateButton();
    jobHistoryUpdatePage = new JobHistoryUpdatePage();
    expect(await jobHistoryUpdatePage.getPageTitle()).to.eq('Create or edit a Job History');
    await jobHistoryUpdatePage.cancel();
  });

  it('should create and save JobHistories', async () => {
    const nbButtonsBeforeCreate = await jobHistoryComponentsPage.countDeleteButtons();

    await jobHistoryComponentsPage.clickOnCreateButton();
    await promise.all([
      jobHistoryUpdatePage.setJobIdInput('jobId'),
      jobHistoryUpdatePage.setClientNameInput('clientName'),
      jobHistoryUpdatePage.setNoOfPositionInput('5'),
      jobHistoryUpdatePage.setPositionNameInput('positionName'),
      jobHistoryUpdatePage.setLocationInput('location'),
      jobHistoryUpdatePage.setJobDescInput('jobDesc'),
      jobHistoryUpdatePage.setExpReqInput('expReq'),
      jobHistoryUpdatePage.setFilledPositionInput('5'),
      jobHistoryUpdatePage.setCommentsInput('comments'),
      jobHistoryUpdatePage.setStartDateInput('2000-12-31'),
      jobHistoryUpdatePage.setEndDateInput('2000-12-31'),
      jobHistoryUpdatePage.setClosedOnInput('2000-12-31'),
      jobHistoryUpdatePage.setOpenedByInput('openedBy'),
      jobHistoryUpdatePage.setClosedByInput('closedBy'),
      jobHistoryUpdatePage.setUpdatedByInput('updatedBy'),
      jobHistoryUpdatePage.setUpdatedDateInput('2000-12-31')
    ]);
    expect(await jobHistoryUpdatePage.getJobIdInput()).to.eq('jobId', 'Expected JobId value to be equals to jobId');
    expect(await jobHistoryUpdatePage.getClientNameInput()).to.eq('clientName', 'Expected ClientName value to be equals to clientName');
    expect(await jobHistoryUpdatePage.getNoOfPositionInput()).to.eq('5', 'Expected noOfPosition value to be equals to 5');
    expect(await jobHistoryUpdatePage.getPositionNameInput()).to.eq(
      'positionName',
      'Expected PositionName value to be equals to positionName'
    );
    expect(await jobHistoryUpdatePage.getLocationInput()).to.eq('location', 'Expected Location value to be equals to location');
    expect(await jobHistoryUpdatePage.getJobDescInput()).to.eq('jobDesc', 'Expected JobDesc value to be equals to jobDesc');
    expect(await jobHistoryUpdatePage.getExpReqInput()).to.eq('expReq', 'Expected ExpReq value to be equals to expReq');
    expect(await jobHistoryUpdatePage.getFilledPositionInput()).to.eq('5', 'Expected filledPosition value to be equals to 5');
    expect(await jobHistoryUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await jobHistoryUpdatePage.getStartDateInput()).to.eq('2000-12-31', 'Expected startDate value to be equals to 2000-12-31');
    expect(await jobHistoryUpdatePage.getEndDateInput()).to.eq('2000-12-31', 'Expected endDate value to be equals to 2000-12-31');
    expect(await jobHistoryUpdatePage.getClosedOnInput()).to.eq('2000-12-31', 'Expected closedOn value to be equals to 2000-12-31');
    expect(await jobHistoryUpdatePage.getOpenedByInput()).to.eq('openedBy', 'Expected OpenedBy value to be equals to openedBy');
    expect(await jobHistoryUpdatePage.getClosedByInput()).to.eq('closedBy', 'Expected ClosedBy value to be equals to closedBy');
    expect(await jobHistoryUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    expect(await jobHistoryUpdatePage.getUpdatedDateInput()).to.eq('2000-12-31', 'Expected updatedDate value to be equals to 2000-12-31');
    await jobHistoryUpdatePage.save();
    expect(await jobHistoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await jobHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last JobHistory', async () => {
    const nbButtonsBeforeDelete = await jobHistoryComponentsPage.countDeleteButtons();
    await jobHistoryComponentsPage.clickOnLastDeleteButton();

    jobHistoryDeleteDialog = new JobHistoryDeleteDialog();
    expect(await jobHistoryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Job History?');
    await jobHistoryDeleteDialog.clickOnConfirmButton();

    expect(await jobHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
