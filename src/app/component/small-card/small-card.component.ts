import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../service/claim.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent implements OnInit {
  lob: string = "LOB2"; 
  claimPending: number = 0; 
  slaBreached: number = 0; 
  today_average_processing_time: number = 0;
  current_month_average: number = 0;
  lob_average: number = 0;
  region_average: number = 0;
  today: number = 0;
  yesterday: number = 0;
  month_to_date_avg: number = 0;
  quarter_to_date_avg: number = 0;
  sla_met: number = 0;
  abandoned: number = 0;
  sla_breached: number = 0;

  constructor(private service: ClaimService) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    // Check if the lob value is set
    if (this.lob) {
      // If lob value exists, fetch lob-specific data
      forkJoin({
        lobcard1: this.service.getCard1ByLobValues(this.lob),
        lobcard2: this.service.getCard2ByLobValues(this.lob),
        lobcard3: this.service.getCard3ByLobValues(this.lob),
        lobcard4: this.service.getCard4ByLobValues(this.lob)
      }).subscribe({
        next: (responses) => {
          this.claimPending = responses.lobcard1.claim_pending;
          this.slaBreached = responses.lobcard1.sla_breached;
          this.today_average_processing_time = responses.lobcard2.today_average;
          this.lob_average = responses.lobcard2.lob_average;
          this.current_month_average = responses.lobcard2.month_average;
          this.region_average = responses.lobcard2.region_average;
          this.today = responses.lobcard3.today;
          this.yesterday = responses.lobcard3.yesterday;
          this.month_to_date_avg = responses.lobcard3.month_to_date;
          this.quarter_to_date_avg = responses.lobcard3.quarter_to_date;
          this.sla_met = responses.lobcard4.sla_met;
          this.abandoned = responses.lobcard4.abandoned;
          this.sla_breached = responses.lobcard4.sla_breached
        },
        error: (error) => {
          console.error('Error fetching LOB data', error);
        }
      });
    } else {
      // If lob value does not exist, fetch normal data
      forkJoin({
        card1: this.service.getCard1Values(),
        card2: this.service.getCard2Values(),
        card3: this.service.getCard3Values(),
        card4: this.service.getCard4Values()
      }).subscribe({
        next: (responses) => {
          this.claimPending = responses.card1.claim_pending;
          this.slaBreached = responses.card1.sla_breached;
          this.today_average_processing_time = responses.card2.today_average;
          this.lob_average = responses.card2.lob_average;
          this.current_month_average = responses.card2.month_average;
          this.region_average = responses.card2.region_average;
          this.today = responses.card3.today;
          this.yesterday = responses.card3.yesterday;
          this.month_to_date_avg = responses.card3.month_to_date;
          this.quarter_to_date_avg = responses.card3.quarter_to_date;
          this.sla_met = responses.card4.sla_met;
          this.sla_breached = responses.card4.sla_breached;
          this.abandoned = responses.card4.abandoned
        },
        error: (error) => {
          console.error('Error fetching normal data', error);
        }
      });
    }
  }
}
