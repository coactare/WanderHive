import { Component, ElementRef, ViewChild } from '@angular/core';
import { CreateCatalogComponent } from '../create-catalog/create-catalog.component';
import { Store } from '@ngrx/store';
import { catalogActions } from '../../store/actions';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/components/errorMessage/errorMessage.component';
import { CommonModule } from '@angular/common';
import { combineLatest, tap } from 'rxjs';
import { selectCatalogData, selectDeleteActionResponse, selectIsLoading } from '../../store/reducers';
import { RouterLink } from '@angular/router'
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CatalogParams } from '../../types/CatalogParams';

@Component({
  selector: 'mc-manage-catalog',
  standalone: true,
  imports: [CommonModule, CreateCatalogComponent, LoadingComponent, ErrorMessageComponent, RouterLink, PaginationComponent],
  templateUrl: './manage-catalog.component.html',
  styleUrl: './manage-catalog.component.css'
})

export class ManageCatalogComponent {

  constructor(private store: Store) { }

  ngOnInit(): void { this.fetchCatalog() }

  currentPage: number = 1 | 0;

  pageCount: number = 1 | 0;
  totalCount = 0;
  @ViewChild('search') searchTerm?: ElementRef;

  catalogParams = new CatalogParams();

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Ascending', value: 'priceAsc' },
    { name: 'Price: Descending', value: 'priceDesc' }
  ];

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    //error: this.store.select(selectError),
    catalog: this.store.select(selectCatalogData),
  }).pipe(
    tap(({ catalog }) => {

      //console.log('Catalog data:', catalog);

      this.totalCount = catalog?.count ?? 0;
      this.currentPage = catalog?.pageIndex ?? 0;
      this.pageCount = Math.ceil(this.totalCount / this.catalogParams.pageSize);
    })
  );

  onSearch() {
    this.catalogParams = { ...this.catalogParams, search: this.searchTerm?.nativeElement.value };
    this.catalogParams.pageIndex = 1;
    this.fetchCatalog()
  }

  onReset() {

    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
      this.catalogParams = new CatalogParams();
      this.fetchCatalog()
    }
  }

  deleteCatalogItem(id: string) {
    this.store.dispatch(catalogActions.deleteCatalogItem({ id }));

    this.store.select(selectDeleteActionResponse).pipe(
      tap(selectDeleteActionResponse => {
        if (selectDeleteActionResponse) {
          alert('Item Deleted');
          this.fetchCatalog();
        }
      })
    ).subscribe();
  }

  fetchCatalog(): void {
    this.store.dispatch(catalogActions.getCatalog({ catalogParams: this.catalogParams }));
  }

  nextPage(): any {
    this.catalogParams = { ...this.catalogParams, pageIndex: this.currentPage + 1 };
    this.fetchCatalog();
  }

  prevPage(): any {
    this.catalogParams = { ...this.catalogParams, pageIndex: this.currentPage - 1 };
    this.fetchCatalog();
  }


}
