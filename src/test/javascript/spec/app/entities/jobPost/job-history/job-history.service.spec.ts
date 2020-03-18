/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JobHistoryService } from 'app/entities/jobPost/job-history/job-history.service';
import { IJobHistory, JobHistory } from 'app/shared/model/jobPost/job-history.model';

describe('Service Tests', () => {
  describe('JobHistory Service', () => {
    let injector: TestBed;
    let service: JobHistoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IJobHistory;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(JobHistoryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new JobHistory(
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            closedOn: currentDate.format(DATE_FORMAT),
            updatedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a JobHistory', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startDate: currentDate.format(DATE_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            closedOn: currentDate.format(DATE_FORMAT),
            updatedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            closedOn: currentDate,
            updatedDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new JobHistory(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a JobHistory', async () => {
        const returnedFromService = Object.assign(
          {
            jobId: 'BBBBBB',
            clientName: 'BBBBBB',
            noOfPosition: 1,
            positionName: 'BBBBBB',
            location: 'BBBBBB',
            jobDesc: 'BBBBBB',
            expReq: 'BBBBBB',
            filledPosition: 1,
            comments: 'BBBBBB',
            startDate: currentDate.format(DATE_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            closedOn: currentDate.format(DATE_FORMAT),
            openedBy: 'BBBBBB',
            closedBy: 'BBBBBB',
            updatedBy: 'BBBBBB',
            updatedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            closedOn: currentDate,
            updatedDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of JobHistory', async () => {
        const returnedFromService = Object.assign(
          {
            jobId: 'BBBBBB',
            clientName: 'BBBBBB',
            noOfPosition: 1,
            positionName: 'BBBBBB',
            location: 'BBBBBB',
            jobDesc: 'BBBBBB',
            expReq: 'BBBBBB',
            filledPosition: 1,
            comments: 'BBBBBB',
            startDate: currentDate.format(DATE_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            closedOn: currentDate.format(DATE_FORMAT),
            openedBy: 'BBBBBB',
            closedBy: 'BBBBBB',
            updatedBy: 'BBBBBB',
            updatedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
            closedOn: currentDate,
            updatedDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a JobHistory', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
