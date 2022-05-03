import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//Services
import { PokeapiService } from 'src/app/service/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  
  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;
  constructor(
    private activedRoute: ActivatedRoute,
    private pokeApiService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon(){
     const id = this.activedRoute.snapshot.params['id'];   
      const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
      const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);
      
      return forkJoin([pokemon, name]).subscribe(
        res => {
         this.pokemon = res;
         this.isLoading = true;
        },
        error => {
          this.apiError = true;
        }
      )
  }

}
