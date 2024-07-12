import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkleTreeComponent } from './merkle-tree.component';

describe('MerkleTreeComponent', () => {
  let component: MerkleTreeComponent;
  let fixture: ComponentFixture<MerkleTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerkleTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerkleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
