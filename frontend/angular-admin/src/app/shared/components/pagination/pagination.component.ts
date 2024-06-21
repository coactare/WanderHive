import { Component, Input } from '@angular/core';
import { CatalogParams } from '../../../catalog/types/CatalogParams';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() count: number = 0;

  currentPage: number = 1;
  pageCount: number = 1;

  catalogParams = new CatalogParams();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const pageParam = params.get('page');
      this.currentPage = pageParam ? +pageParam : 1;

    });

    this.pageCount = Math.ceil(this.count / this.catalogParams.pageSize);
    
  }


  nextPage(): any {
    let currentPage = this.getCurrentPageFromQueryParams() + 1;
    this.updateQueryParam('page', currentPage);
  }

  prevPage(): any {
    let currentPage = this.getCurrentPageFromQueryParams() - 1;
    this.updateQueryParam('page', currentPage);
  }



  private getCurrentPageFromQueryParams(): number {
    const pageQueryParam = this.route.snapshot.queryParamMap.get('page');
    const page = pageQueryParam ? +pageQueryParam : 1;

    return page;
  }

  private updateQueryParam(param: string, value: any): void {
    let queryParams = { ...this.route.snapshot.queryParams, [param]: value };
    let navigationExtras: NavigationExtras = {
      queryParams,
      queryParamsHandling: 'merge'
    };
    this.router.navigate([], navigationExtras);
  }

}
