import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorMultipleSelectComponent } from './author-multiple-select.component';

describe('AuthorMultipleSelectComponent', () => {
  let component: AuthorMultipleSelectComponent;
  let fixture: ComponentFixture<AuthorMultipleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorMultipleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorMultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
