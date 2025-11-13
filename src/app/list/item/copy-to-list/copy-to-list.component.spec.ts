import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyToListComponent } from './copy-to-list.component';

describe('CopyToListComponent', () => {
  let component: CopyToListComponent;
  let fixture: ComponentFixture<CopyToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyToListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
