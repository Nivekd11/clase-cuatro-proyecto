import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public form!: FormGroup

  public drinks!: any[]

  constructor(public request: BusquedaService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("",[Validators.required]),
    });
  }

  searchDrink(){
    console.log("hola")
    console.log(this.form.get("name")?.value)
    this.request.getDrink(this.form.get("name")?.value).subscribe({
      next:(resp : any)=>{
         console.log("Transformado",resp)
         this.drinks = resp
         console.log(this.drinks)
         //name.value=resp.name;
         //order.value = resp.order;
      },
      error:(error : any)=>{
        this.drinks = ["hay un error"]
      }
    })
  }

}
