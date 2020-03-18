import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class JobHistoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-job-history div table .btn-danger'));
  title = element.all(by.css('jhi-job-history div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class JobHistoryUpdatePage {
  pageTitle = element(by.id('jhi-job-history-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  jobIdInput = element(by.id('field_jobId'));
  clientNameInput = element(by.id('field_clientName'));
  noOfPositionInput = element(by.id('field_noOfPosition'));
  positionNameInput = element(by.id('field_positionName'));
  locationInput = element(by.id('field_location'));
  jobDescInput = element(by.id('field_jobDesc'));
  expReqInput = element(by.id('field_expReq'));
  filledPositionInput = element(by.id('field_filledPosition'));
  commentsInput = element(by.id('field_comments'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  closedOnInput = element(by.id('field_closedOn'));
  openedByInput = element(by.id('field_openedBy'));
  closedByInput = element(by.id('field_closedBy'));
  updatedByInput = element(by.id('field_updatedBy'));
  updatedDateInput = element(by.id('field_updatedDate'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setJobIdInput(jobId) {
    await this.jobIdInput.sendKeys(jobId);
  }

  async getJobIdInput() {
    return await this.jobIdInput.getAttribute('value');
  }

  async setClientNameInput(clientName) {
    await this.clientNameInput.sendKeys(clientName);
  }

  async getClientNameInput() {
    return await this.clientNameInput.getAttribute('value');
  }

  async setNoOfPositionInput(noOfPosition) {
    await this.noOfPositionInput.sendKeys(noOfPosition);
  }

  async getNoOfPositionInput() {
    return await this.noOfPositionInput.getAttribute('value');
  }

  async setPositionNameInput(positionName) {
    await this.positionNameInput.sendKeys(positionName);
  }

  async getPositionNameInput() {
    return await this.positionNameInput.getAttribute('value');
  }

  async setLocationInput(location) {
    await this.locationInput.sendKeys(location);
  }

  async getLocationInput() {
    return await this.locationInput.getAttribute('value');
  }

  async setJobDescInput(jobDesc) {
    await this.jobDescInput.sendKeys(jobDesc);
  }

  async getJobDescInput() {
    return await this.jobDescInput.getAttribute('value');
  }

  async setExpReqInput(expReq) {
    await this.expReqInput.sendKeys(expReq);
  }

  async getExpReqInput() {
    return await this.expReqInput.getAttribute('value');
  }

  async setFilledPositionInput(filledPosition) {
    await this.filledPositionInput.sendKeys(filledPosition);
  }

  async getFilledPositionInput() {
    return await this.filledPositionInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return await this.commentsInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return await this.endDateInput.getAttribute('value');
  }

  async setClosedOnInput(closedOn) {
    await this.closedOnInput.sendKeys(closedOn);
  }

  async getClosedOnInput() {
    return await this.closedOnInput.getAttribute('value');
  }

  async setOpenedByInput(openedBy) {
    await this.openedByInput.sendKeys(openedBy);
  }

  async getOpenedByInput() {
    return await this.openedByInput.getAttribute('value');
  }

  async setClosedByInput(closedBy) {
    await this.closedByInput.sendKeys(closedBy);
  }

  async getClosedByInput() {
    return await this.closedByInput.getAttribute('value');
  }

  async setUpdatedByInput(updatedBy) {
    await this.updatedByInput.sendKeys(updatedBy);
  }

  async getUpdatedByInput() {
    return await this.updatedByInput.getAttribute('value');
  }

  async setUpdatedDateInput(updatedDate) {
    await this.updatedDateInput.sendKeys(updatedDate);
  }

  async getUpdatedDateInput() {
    return await this.updatedDateInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class JobHistoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-jobHistory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-jobHistory'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
