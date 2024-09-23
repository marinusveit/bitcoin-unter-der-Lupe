import { TestBed } from '@angular/core/testing';

import { BlockchainUtilityService } from './blockchain-utility.service';

describe('BlockchainUtilityService', () => {
  let service: BlockchainUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockchainUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
