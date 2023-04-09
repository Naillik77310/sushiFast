import { Injectable } from '@angular/core';
import { IBox } from 'src/model/IBox';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn:'root',
})
export class ManagerSushiBoxService {
  panier: IBox[] = [];
  itemCountSource = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSource.asObservable();

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

  addToPanier(box: IBox) {
    this.panier.push(box);
    this.itemCountSource.next(this.panier.length);
  }
  ajouterCountPanier() {
    this.itemCountSource.next(this.itemCountSource.value + 1);
  }
  deleteCountPanier() {
    this.itemCountSource.next(this.itemCountSource.value - 1);
  }
  cleanCountPanier() {
    this.itemCountSource.next(0);
  }

  getPanier(): IBox[] {
    return this.panier; 
  }

  // Vide le panier
  clearPanier() {
    this.panier = []; 
    return this.panier;
  }
}
