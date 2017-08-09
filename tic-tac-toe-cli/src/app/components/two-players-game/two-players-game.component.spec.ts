import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPlayersGameComponent } from './two-players-game.component';

describe('TwoPlayersGameComponent', () => {
  let component: TwoPlayersGameComponent;
  let fixture: ComponentFixture<TwoPlayersGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoPlayersGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoPlayersGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
