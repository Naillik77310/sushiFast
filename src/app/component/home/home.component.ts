import { Component, OnInit } from '@angular/core';
import { ManagerSushiBoxService } from 'src/app/service/manager-sushi-box.service';
import { IBox } from 'src/model/IBox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sushiBoxes: IBox[] = []
  pathImage: string = "http://localhost:8080/api/image/"

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

}
