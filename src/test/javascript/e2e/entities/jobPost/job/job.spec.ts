/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { JobComponentsPage, JobDeleteDialog, JobUpdatePage } from './job.page-object';

const expect = chai.expect;

describe('Job e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobUpdatePage: JobUpdatePage;
  let jobComponentsPage: JobComponentsPage;
  let jobDeleteDialog: JobDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Jobs', async () => {
    await navBarPage.goToEntity('job');
    jobComponentsPage = new JobComponentsPage();
    await browser.wait(ec.visibilityOf(jobComponentsPage.title), 5000);
    expect(await jobComponentsPage.getTitle()).to.eq('Jobs');
  });

  it('should load create Job page', async () => {
    await jobComponentsPage.clickOnCreateButton();
    jobUpdatePage = new JobUpdatePage();
    expect(await jobUpdatePage.getPageTitle()).to.eq('Create or edit a Job');
    await jobUpdatePage.cancel();
  });

  it('should create and save Jobs', async () => {
    const nbButtonsBeforeCreate = await jobComponentsPage.countDeleteButtons();

    await jobComponentsPage.clickOnCreateButton();
    await promise.all([
      jobUpdatePage.setJobIdInput('jobId'),
      jobUpdatePage.setClientNameInput('clientName'),
      jobUpdatePage.setNoOfPositionInput('5'),
      jobUpdatePage.setPositionNameInput('positionName'),
      jobUpdatePage.setLocationInput('location'),
      jobUpdatePage.setJobDescInput('jobDesc'),
      jobUpdatePage.setExpReqInput('expReq'),
      jobUpdatePage.setFilledPositionInput('5'),
      jobUpdatePage.setCommentsInput('comments'),
      jobUpdatePage.setStartDateInput('2000-12-31'),
      jobUpdatePage.setEndDateInput('2000-12-31'),
      jobUpdatePage.setClosedOnInput('2000-12-31'),
      jobUpdatePage.setOpenedByInput('openedBy'),
      jobUpdatePage.setClosedByInput('closedBy')
    ]);
    expect(await jobUpdatePage.getJobIdInput()).to.eq('jobId', 'Expected JobId value to be equals to jobId');
    expect(await jobUpdatePage.getClientNameInput()).to.eq('clientName', 'Expected ClientName value to be equals to clientName');
    expect(await jobUpdatePage.getNoOfPositionInput()).to.eq('5', 'Expected noOfPosition value to be equals to 5');
    expect(await jobUpdatePage.getPositionNameInput()).to.eq('positionName', 'Expected PositionName value to be equals to positionName');
    expect(await jobUpdatePage.getLocationInput()).to.eq('location', 'Expected Location value to be equals to location');
    expect(await jobUpdatePage.getJobDescInput()).to.eq('jobDesc', 'Expected JobDesc value to be equals to jobDesc');
    expect(await jobUpdatePage.getExpReqInput()).to.eq('expReq', 'Expected ExpReq value to be equals to expReq');
    expect(await jobUpdatePage.getFilledPositionInput()).to.eq('5', 'Expected filledPosition value to be equals to 5');
    expect(await jobUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await jobUpdatePage.getStartDateInput()).to.eq('2000-12-31', 'Expected startDate value to be equals to 2000-12-31');
    expect(await jobUpdatePage.getEndDateInput()).to.eq('2000-12-31', 'Expected endDate value to be equals to 2000-12-31');
    expect(await jobUpdatePage.getClosedOnInput()).to.eq('2000-12-31', 'Expected closedOn value to be equals to 2000-12-31');
    expect(await jobUpdatePage.getOpenedByInput()).to.eq('openedBy', 'Expected OpenedBy value to be equals to openedBy');
    expect(await jobUpdatePage.getClosedByInput()).to.eq('closedBy', 'Expected ClosedBy value to be equals to closedBy');
    await jobUpdatePage.save();
    expect(await jobUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await jobComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Job', async () => {
    const nbButtonsBeforeDelete = await jobComponentsPage.countDeleteButtons();
    await jobComponentsPage.clickOnLastDeleteButton();

    jobDeleteDialog = new JobDeleteDialog();
    expect(await jobDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Job?');
    await jobDeleteDialog.clickOnConfirmButton();

    expect(await jobComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
