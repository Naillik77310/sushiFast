import { Injectable } from '@angular/core';
import { IBox } from 'src/model/IBox';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerSushiBoxService {

  constructor(private http: HttpClient) { }

  public getSushiBoxes() : Observable<any> {
    return this.http.get(environment.apiSushi)  
  }

  public getBoxesById(id:number) : Observable<any>{
    return this.http.get(environment.apiSushi+"/"+id)
  }
    getPanierList(): [] {
    return JSON.parse(localStorage.getItem('PanieList') || '[]');
  }

  //setBoxInLS(): Ibox[] {
    //let PanierList = this.getPanierList
    //PanierList = JSON.parse(localStorage.getItem('PanierList'))
    //PanierList.push(box)
    //localStorage.setItem('PanierList', JSON.stringify(PanierList))
    //this.refreshPanierListEvent.emit(PanierList)
  //}
}
