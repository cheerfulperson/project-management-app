import { TestBed } from '@angular/core/testing';

import { MoveTaskService } from './move-task.service';

describe('MoveTaskService', () => {
  let service: MoveTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
