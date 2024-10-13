import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  getExistingLob(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unique-clob`);
  }

  getCard1Values(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCard1`);
  }

  getCard2Values(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCard2`);
  }

  getCard3Values(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCard3`);
  }

  getCard4Values(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCard4`);
  }

  getCard1ByLobValues(lob: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getLobCard1`, {
      params: { c_lob: lob },
    });
  }

  getCard2ByLobValues(lob: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getLobCard2`, {
      params: { c_lob: lob },
    });
  }

  getCard3ByLobValues(lob: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getLobCard3`, {
      params: { c_lob: lob },
    });
  }

  getCard4ByLobValues(lob: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getLobCard4`, {
      params: { c_lob: lob },
    });
  }

  getLineChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/line-chart`);
  }

  getPieChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pie-chart`);
  }

  getHeatChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/heat-chart`);
  }

  getBarChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bar-chart`);
  }

  getColumnChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/column-chart`);
  }

  getLOBPieChart(lob: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lob-pie-chart`, {
      params: { c_lob: lob },
    });
  }

  getMarketSegment(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/claims/lob-market-segment-aggregate`);
  }

  getOwnerAggregate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/claims/lob-owner-aggregate`);
  }

  getSupervisorAggregate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/claims/lob-supervisor-aggregate`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/aggregate-data`);
  }

  getStageProgression(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stage-progression`);
  }

  getAllClaim(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all-claims`);
  }

  createPromptData(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/gpt-prompt`, payload, { headers });
  }

  getCardValues(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/batch-stats`);
  }
}
