import { Component, OnInit } from '@angular/core';
import { ManagerSushiBoxService } from 'src/app/service/manager-sushi-box.service';
import { IBox } from 'src/model/IBox';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
@Component({
  selector:'app-home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.css'],
})
export class HomeComponent implements OnInit {

  sushiBoxes: IBox[] = []
  pathImage: string = "http://localhost:8080/api/image/"
  lastAddToCartTime: number = 0;

  constructor(private managerSushiBoxservice: ManagerSushiBoxService) {
    //this.managerSushiBoxservice.setBoxInLS()
  }

  ngOnInit(): void {
    this.managerSushiBoxservice.getSushiBoxes().subscribe(
      {
      next:(boxes: IBox[]) => {
        this.sushiBoxes = boxes
        console.log(this.sushiBoxes)
      }, 
      error:er => console.log(er)
    })
  }

  addToPanier(box: IBox) {
    const currentTime = Date.now();
    if (currentTime - this.lastAddToCartTime > 300) {
      // Vérifie si au moins 2 secondes se sont écoulées depuis le dernier ajout
      console.log('ajout panier');
      this.managerSushiBoxservice.addToPanier(box);
      console.log(this.managerSushiBoxservice.panier)
      this.lastAddToCartTime = currentTime;
    }
  }
}
