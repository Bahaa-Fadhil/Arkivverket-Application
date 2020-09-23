import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArkivService } from '../ArkivService.service';

// Arkiv info attributes prop.
interface ArkivInfo {
  source_id: string,
  title: string,
  source_description: string,
  start_year: number,
  end_year: number,
}

interface ArkivStatus {
  source_id: string;
  title: string,
  source_description: string,
}


@Component({
  selector: 'app-arkiv-list',
  templateUrl: './arkiv-list.component.html',
  styleUrls: ['./arkiv-list.component.scss']
})
export class ArkivListComponent implements OnInit, OnDestroy {
  public lastUpdated: number;
  public statusList = Array(); /* list of sites with statuses */
  private subscription: Subscription;
  public foo: any;
  public bar: any;

  constructor(
    public ArkivService: ArkivService
  ) { }

  ngOnInit() { // chach list and get data foram source
    this.subscription = this.ArkivService.getArkivSites()
    .subscribe(res => {
      if (res.length === 2 && res[0].data && res[0].data.source &&
        res[1].data && res[1].data.source && res[1].last_updated) {
        this.lastUpdated = res[1].last_updated;
        this.statusList = this.createArkivList(res[0].data.source, res[1].data.source);
      }
  });
  }

/**
   * Create a arkiv list of info to be sendt to desplay
   * @param source - an array of source information objects
   * @param status - an array of status objects
   * @returns returns a list of Arkiv objects containing source and info
   */
  public createArkivList(source: Array<ArkivInfo>, status: Array<ArkivStatus>) {
    const arkivList = Array();
    source.forEach(elem => {
      const arkivStatus = this.getArkivInfo(elem.source_id, status );
      if (arkivStatus) {
        arkivList.push(this.createListElem(elem));
      }
    });
    return arkivList;
  }

  /**
   * Get the information of a arkiv from its id
   * @param id - the source id
   * @param source - an array of source objects
   * @returns returns the source object with the corresponding id
   */
  public getArkivInfo(id: string, data: Array<ArkivStatus>): ArkivStatus {
    return data.find(elem => {
      return elem.source_id && elem.source_id === id;
    });
  }

   /**
   * Create a List element containing source info
   * @param info- a source info object
   * @param status - a source status object
   * @returns returns an object containing source
   */
  private createListElem(info: ArkivInfo) {
    return {
      source_id: info.source_id,
      title: info.title,
      start_year: info.start_year,
      end_year: info.end_year,
    };
  }

 /**
   * Convert posix timestamp to human readable format
   * @param posix- a posix timestamp
   * @returns returns a human readable time as a string
   */
  public displayDate(posix: number): string {
    const currentDatetime = new Date(posix * 1000);
    const formattedDate = currentDatetime.getFullYear() +
      '.' + (currentDatetime.getMonth() + 1) + '.' +
      currentDatetime.getDate() + '  ' + currentDatetime.getHours() +
      ':' + currentDatetime.getMinutes() + ':' + currentDatetime.getSeconds();
    return formattedDate;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
