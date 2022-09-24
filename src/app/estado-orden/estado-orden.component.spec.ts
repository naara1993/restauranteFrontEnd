import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoOrdenComponent } from './estado-orden.component';

describe('EstadoOrdenComponent', () => {
  let component: EstadoOrdenComponent;
  let fixture: ComponentFixture<EstadoOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
