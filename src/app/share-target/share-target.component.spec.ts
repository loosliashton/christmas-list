import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTargetComponent } from './share-target.component';

describe('ShareTargetComponent', () => {
  let component: ShareTargetComponent;
  let fixture: ComponentFixture<ShareTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareTargetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareTargetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
