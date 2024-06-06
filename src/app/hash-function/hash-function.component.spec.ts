import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashFunctionComponent } from './hash-function.component';

describe('HashFunctionComponent', () => {
  let component: HashFunctionComponent;
  let fixture: ComponentFixture<HashFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashFunctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HashFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
