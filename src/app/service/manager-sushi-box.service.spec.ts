import { TestBed } from '@angular/core/testing';

import { ManagerSushiBoxService } from './manager-sushi-box.service';

describe('ManagerSushiBoxService', () => {
  let service: ManagerSushiBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerSushiBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
