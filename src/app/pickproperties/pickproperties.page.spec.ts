import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickpropertiesPage } from './pickproperties.page';

describe('PickpropertiesPage', () => {
  let component: PickpropertiesPage;
  let fixture: ComponentFixture<PickpropertiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickpropertiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickpropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
