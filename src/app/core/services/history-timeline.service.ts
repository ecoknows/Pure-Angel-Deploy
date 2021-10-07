import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setHistoryTimeline } from '@core/redux/history/history.actions';
import { HistoryState } from '@core/redux/history/history.reducers';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryTimelineService {
  constructor(
    private http: HttpClient,
    private store: Store<{}>,
    private authService: AuthService
  ) {}

  fetchHistoryTimeline() {
    this.http
      .get<{
        message: String;
        data: {
          name: string;
          value: number;
        }[];
      }>(environment.api + 'api/history', {
        headers: this.authService.headers,
      })
      .subscribe((response) => {
        const data = [
          {
            name: 'Total Assets',
            series: response.data,
          },
        ];

        if (data) {
          this.store.dispatch(
            setHistoryTimeline({
              list: data,
            })
          );
        }
      });
  }
}
