import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecommnityComponent } from './createcommnity.component';

describe('CreatecommnityComponent', () => {
  let component: CreatecommnityComponent;
  let fixture: ComponentFixture<CreatecommnityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecommnityComponent]
    });
    fixture = TestBed.createComponent(CreatecommnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
