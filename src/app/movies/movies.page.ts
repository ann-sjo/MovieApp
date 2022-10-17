import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/core';
import { MovieService } from 'src/app/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res)=> {
      loading.dismiss();
      //this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if (event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
}
