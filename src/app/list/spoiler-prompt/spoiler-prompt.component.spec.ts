import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerPromptComponent } from './spoiler-prompt.component';

describe('SpoilerPromptComponent', () => {
  let component: SpoilerPromptComponent;
  let fixture: ComponentFixture<SpoilerPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpoilerPromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpoilerPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
