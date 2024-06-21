import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getActiveConsumer } from '@angular/core/primitives/signals';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs'
import { CreateCatalogRequestInterface } from '../../types/createCatalogRequest.interface';
import { RouterLink } from '@angular/router';
//import { selectIsSubmitting } from '../../store/XXXXXXselectors';
import { selectIsLoading, selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { CatalogStateInterface } from '../../types/catalogState.interface';
import { catalogActions } from '../../store/actions';
import { CatalogService } from '../../services/catalog.service';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
//import { CatalogService } from '../../services/catalog.service';
import { Location } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'mc-create-catalog',
  standalone: true,
  imports: [LoadingComponent,CommonModule, ReactiveFormsModule, RouterLink, BackendErrorMessages],
  templateUrl: './create-catalog.component.html',
  styleUrl: './create-catalog.component.css'
})
export class CreateCatalogComponent {

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
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    isLoading: this.store.select(selectIsLoading),
    backendErrors: this.store.select(selectValidationErrors),
    
  })
  constructor(private location: Location, private fb: FormBuilder, private store: Store, private catalogService: CatalogService) { } //<{ catalog: CatalogStateInterface }>) {} //, private catalogService: CatalogService) { }

  @Input() showCreateCatalogComponent: boolean = false;
  moveBack() {
    this.location.back();
  }

  clearFrom(): void {
    this.form.reset();
  }

  onSubmit() {
    const formValues = this.form.getRawValue();

    const request: CreateCatalogRequestInterface = {
      name: formValues.productname,
      summary: formValues.productsummary,
      description: formValues.productdescription,
      image: this.productImage,
      imageFile: "imageFile",
      price: formValues.price.toString(),
      brands: { id: null, name: formValues.brandname },
      types: { id: null, name: formValues.producttype }
    };

    this.store.dispatch(catalogActions.createCatalog({ createCatalog: request }));

  }


  
  productImage: File | null = null;

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.productImage = fileInput.files[0];
    }
  }
}

