import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CustomGrid } from '../models/custom-grid.model';
import { toODataString } from '@progress/kendo-data-query';
import { CustomGridViewModel } from '../models/custom-grid.viewmodel';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridState } from '../models/grid-state.model';

@Injectable({
  providedIn: 'root'
})
export class CustomGridService {
  private BASE_URL = 'http://localhost:5000/odata/Kendo';
  constructor(private http: HttpClient) { }

  getCustomValue(): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/value`).pipe(
      map(response => {
        const gridData = response;
        console.log(gridData);
        return <any>gridData;
      })
    );
  }

  getCustomGrids(gridState: GridState, id: number): Observable<CustomGridViewModel> {
    const queryStr = `${toODataString(gridState)}&$count=true`;
    const header = new HttpHeaders({ 'id': id.toString() });
    return this.http.get<any>(`${this.BASE_URL}?${queryStr}`, { headers: header, observe: 'response' }).pipe(
      map(response => {
        const gridData = response.body['value'];

        const total = parseInt(response.body['@odata.count'], 10);
        const index = parseInt(response.headers.get('X-Total-Count'), 10);
        // const id = 151;
        return (<CustomGridViewModel>{
          gridResult: (<GridDataResult>{
            data: gridData,
            total: total
          }),
          total: total,
          index: index,
          id: id
        });
      })
    );
  }


  // getCustomGrids(gridState: any): Observable<CustomGrid[]> {
  //   const queryStr = `${toODataString(gridState)}&$count=true`;
  //   const header = new HttpHeaders({ 'id': '151' });
  //   return this.http.get<CustomGrid[]>(`${this.BASE_URL}?${queryStr}`, { headers: header, observe: 'response' }).pipe(
  //     map(response => {
  //       const gridData = response.body['value'];
  //       // gridData.map((val, index) => val.RowId = index);
  //       localStorage.setItem('index', response.headers.get('X-Total-Count'));
  //       // return (<GridDataResult>{
  //       //   data: gridData,
  //       //   total: parseInt(response.body['@odata.count'], 10)
  //       // });
  //       return <CustomGrid[]>gridData;
  //     })
  //   );
  // }


}
