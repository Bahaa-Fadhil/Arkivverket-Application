import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArkivService } from './ArkivService.service';

//  API Endpoints
const mockdata = {
    last_updated: 1553592653, // API last updated
    data: { // API endpoint 
      data: [
        {
            source_id: 'L0001',
            title: 'Per Helliesens krigsfangebrev',
            source_description: '1 Brev fra Bredtvet, 6 brev (derav 1 kopi) fra Grini, 33 brev (derav 2 kopier) fra Sachsenhausen, 1 brev fra Neuengamme og et eksemplar av illegal nyhetsavis.',
            start_year: 1942,
            end_year: 1945, 
        },
        {
            source_id: 'L0002',
            title: 'Norske offiserer i tysk fangenskap',
            source_description: 'Krigsfangebrev m.m.: Otto Ruge - Peter Anker',
            start_year: 1941,
            end_year: 1945, 

        }
      ]
    }
  };

  describe('ArkivService', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArkivService]
    }));
  
    it('should be created', () => {
      const service: ArkivService = TestBed.get(ArkivService);
      expect(service).toBeTruthy();
    });
  
    it('should get data', inject(
        [HttpTestingController, ArkivService],
        (httpMock: HttpTestingController, ArkivService: ArkivService) => {
          ArkivService.getArkivSites().subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toEqual(mockdata);
            }
          });
  
          const mockReq = httpMock.expectOne(ArkivService.corsApiUrl + ArkivService.dataInfoUrl); 
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockdata);
  
          httpMock.verify();
        }
      )
    );
  });
  