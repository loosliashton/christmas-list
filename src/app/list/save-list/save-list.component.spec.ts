import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveListComponent } from './save-list.component';

describe('SaveListComponent', () => {
  let component: SaveListComponent;
  let fixture: ComponentFixture<SaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
