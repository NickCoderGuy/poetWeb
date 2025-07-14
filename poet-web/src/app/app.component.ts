import { NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgIf, NgForOf, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public data: any
  public author: string = 'Shakespeare'
  public title: string = 'Sonnet'

  constructor(private http: HttpClient){}

  ngOnInit(): void {
      this.fetchPoetry();
  }

  onSubmit(author: string, title: string): void {
    const url = `https://poetrydb.org/author,title/${author};${title}`;

    this.http.get(url).subscribe({
      next: (resp: any) => {
        console.log('Poem data:', resp);
        if (Array.isArray(resp)) {
          this.data = resp;
        } else {
          this.data = [resp];
        }
      },
      error: (err) => {
        console.error('Failed to fetch poem:', err);
        this.data = { error: 'Poem not found or an error occurred.' };
      }
    });
  }

  public fetchPoetry() {
    const url = `https://poetrydb.org/author,title/${this.author};${this.title}`;
    
    this.http.get(url).subscribe(
      (resp: any) => {
        console.log(resp);
        this.data = resp;
      },
      (error) => {
        console.error('Error fetching poetry:', error);
      }
    );
  }
}
