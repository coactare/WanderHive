import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CatalogService } from '../../services/catalog.service';
import { Location } from '@angular/common';
import { catalogActions } from '../../store/actions';
import { Observable, combineLatest } from 'rxjs';
import { selectFetchCatalogItemByIdActionResponse, selectIsLoading } from '../../store/reducers';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EditCatalogRequestInterface } from '../../types/editCatalogRequest.interface';
import { selectIsSubmitting } from '../../store/reducers';

@Component({
  selector: 'mc-edit-component',
  standalone: true,
  imports: [LoadingComponent, CommonModule, ReactiveFormsModule, RouterLink, BackendErrorMessages],
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.css'
})

export class EditComponentComponent {
  isSubmitting$ = this.store.select(selectIsSubmitting)

  form = this.fb.nonNullable.group({
    brandname: ['', Validators.required],
    producttype: ['', Validators.required],
    productname: ['', Validators.required],
    productsummary: ['', Validators.required],
    productdescription: ['', Validators.required],
    price: ['', Validators.required],
    image: [null, Validators.required]
  })

  initialValues$: Observable<any>;
  
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    isLoading: this.store.select(selectIsLoading),
  })

  constructor(private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private store: Store, private catalogService: CatalogService) {
    this.initialValues$ = this.store.select(selectFetchCatalogItemByIdActionResponse);
    
  }

  id = this.route.snapshot.paramMap.get('id') ?? '';

  ngOnInit(): void {

    this.store.dispatch(catalogActions.fetchCatalogItemById({ id: this.id }));

    this.initialValues$.subscribe(initialValues => {
      if (initialValues) {
        
        this.form.patchValue({
          productname: initialValues.name,
          productsummary: initialValues.summary,
          brandname: initialValues.brands.name,
          price: initialValues.price,
          productdescription: initialValues.description,
          producttype: initialValues.types.name
        });
      }
    });
  }

  moveBack() {
    this.location.back()
  }

  clearFrom(): void {
    this.form.reset();
  }

  onSubmit() {
    const formValues = this.form.getRawValue();

    const request: EditCatalogRequestInterface = {
      name: formValues.productname,
      summary: formValues.productsummary,
      description: formValues.productdescription,
      image: this.productImage,
      imageFile: "imageFile",
      price: formValues.price.toString(),
      brands: { id: null, name: formValues.brandname },
      types: { id: null, name: formValues.producttype }
    };

    debugger

    this.store.dispatch(catalogActions.editCatalog({ editCatalog: request }));

  }


  productImage: File | null = null;

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.productImage = fileInput.files[0];
    }
  }

}
