import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(public http: HttpClient) { }

  getDrink(name:string){
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name).pipe(
      map((resp:any)=>{
        console.log(resp)
        //console.log(this.transformDrink(resp.drinks)) 
        return this.transformDrink(resp.drinks)
        
      })
      )
  }
  private transformDrink(drinks: any[]){
      return drinks.map((item: any)=>{
        //console.log(item)
        let ingredients : any[]= []
        Object.keys(item).forEach((key: any)=>{
          //console.log(key)
          if(key.includes("strIngredient")){
            item[key] && ingredients.push(item[key])
            
          }

        })
        //console.log("Ingredientes:",ingredients)
        return{
          name : item.strDrink,
          img: item.strDrinkThumb,
          ingredients : ingredients

        }
      })
  }
}
