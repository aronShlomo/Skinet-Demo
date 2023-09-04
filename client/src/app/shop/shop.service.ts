import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brands } from '../shared/models/brands';
import { Types } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = "https://localhost:5002/api/";

  constructor(private http: HttpClient) { }


  getProduct(shopParams: ShopParams){
    
    let params = new HttpParams();
    
    if (shopParams.brandId > 0) params = params.append('brandId', shopParams.brandId);
    if (shopParams.typeId > 0)  params = params.append('typeId', shopParams.typeId);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if(shopParams.search) params = params.append('search', shopParams.search)
    return this.http.get<Pagination<Product[]>>(this.baseUrl + "product", {params});
  }

  getBrands(){
    return this.http.get<Brands[]>(this.baseUrl + 'product/brands');
  }

  getTypes(){
    return this.http.get<Types[]>(this.baseUrl + 'product/types');
  }


}
