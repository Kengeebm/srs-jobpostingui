import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL, JOBPOST_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {
  private title = new BehaviorSubject<any[]>([]);
  titleNav = this.title.asObservable();
  // navTitle: any;
  private messageSource = new BehaviorSubject<any[]>([]);
  currentMessage = this.messageSource.asObservable();

  private sliderValue = new BehaviorSubject<any[]>([]);
  currentSliderValue = this.sliderValue.asObservable();

  changesliderValue(value: any) {
    this.sliderValue.next(value);
  }

  constructor(private http: HttpClient) {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }
  setTitle(name: any) {
    this.title.next(name);
  }

  getRecordCount() {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/jobs/count');
  }

  getClosedJobs() {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/jobs/close');
  }

  getOpenJobs() {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/jobs/open');
  }

  getAssignedJobs() {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/jobs/count/assignee');
  }

  openVacancies() {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/jobs/vancancies/count');
  }

  getShortListedCount(flag) {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/shortlist/candidate/countByshortlisted/' + flag);
  }

  getScheduleCount(flag) {
    return this.http.get(SERVER_API_URL + JOBPOST_URL + '/shortlist/candidate/countByscheduled/' + flag);
  }
}
