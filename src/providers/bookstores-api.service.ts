import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookstoresApi{

	private baseUrl = 'https://haruki-df84e.firebaseio.com/';
	currentBookstore: any = {};

	constructor(private http: Http) {
	}

	getBookstores(){
		return new Promise(resolve => {
			this.http.get(`${this.baseUrl}/bookstores.json`)
				.subscribe(res => resolve(res.json()));
		});
	}

	getBookstoreDetails(bookstoreId): Observable<any> {
		return this.http.get(`${this.baseUrl}/bookstores.json?orderBy="id"&equalTo="${bookstoreId}"`)
		.map((response: Response) => {
			this.currentBookstore = response.json();
			return this.currentBookstore;
		});
	}

	getBookstoreData(bookstoreId): Observable<any> {
		return this.http.get(`${this.baseUrl}/bookstores-data/${bookstoreId}.json`)
		.map((response: Response) => {
			this.currentBookstore = response.json();
			return this.currentBookstore;
		});
	}	

}