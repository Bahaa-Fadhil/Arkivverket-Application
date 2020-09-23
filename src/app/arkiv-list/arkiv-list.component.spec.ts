import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArkivService } from '../ArkivService.service';
import { ArkivListComponent } from './arkiv-list.component';
import { from, of } from 'rxjs';


const ArkivServiceSpy = jasmine.createSpyObj('ArkivService', ['getArkivSites']);

const mockdata = {
  last_updated: 1553592653, // API last updated
  data: { // API endpoint 
    source: [
      {
          source_id: '1',
          title: '',
          source_description: '',
          start_year: 1950,
          end_year: 2020, 
      },
      {
          source_id: '2',
          title: '',
          source_description: '',
          start_year: 1950,
          end_year: 2020, 

      }
    ]
  }
};

const mockRes = [mockdata]; // make a const from endpoint

describe('ArkivListComponent', () => {
  let component: ArkivListComponent;
  let fixture: ComponentFixture<ArkivListComponent>;

  ArkivServiceSpy.getArkivSites.and.returnValue(of(mockRes));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArkivListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ArkivService,
          useValue: ArkivServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('status list', () => {
    it('should initiate status list', () => {
      expect(component.statusList.length).toBeGreaterThan(0);
    });  
    it('getStationStatusInfo should return json object for given id', () => {
      const data = component.getArkivInfo('2', mockdata.data.source);
      expect(data).toEqual(mockdata.data.source[1]);
  });
  });
});