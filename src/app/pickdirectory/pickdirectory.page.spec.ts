import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickdirectoryPage } from './pickdirectory.page';

describe('PickdirectoryPage', () => {
  let component: PickdirectoryPage;
  let fixture: ComponentFixture<PickdirectoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickdirectoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickdirectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
