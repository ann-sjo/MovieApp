import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie = null;
  imageBaseUrl = environment.images;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res)=>{
        console.log(res);
        this.movie = res;
    });
  }

  openHomepage(){
    window.open(this.movie.homepage);
  }
}
