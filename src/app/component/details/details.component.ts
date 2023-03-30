import { Component, OnInit } from '@angular/core';
import { IBox } from 'src/model/IBox';
import { ManagerSushiBoxService } from 'src/app/service/manager-sushi-box.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pathImage: string = "http://localhost:8080/api/image/"
  detailBox : any
  id = 0

  constructor(private managerSushiBoxservice: ManagerSushiBoxService,
    private route : ActivatedRoute
    ) {
    this.route.params.subscribe( (params: any) => console.log(params));
      
    }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
      this.id = params['id'];
    });

    this.managerSushiBoxservice.getBoxesById(this.id).subscribe(
      {
      next:(boxes: IBox[]) => {
        this.detailBox = boxes
        console.log(this.detailBox)
      }, 
      error:(er: any) => console.log(er)
    })
  }

  }