import Input from "../../ui/common/Input";
import Form from "../../ui/common/Form";
import Button from "../../ui/common/Button";
import FileInput from "../../ui/common/FileInput";
import { useForm } from "react-hook-form";
//import { useAddEditCatalog } from './useAddEditCatalog';
import FormRow from "../../ui/common/FormRow";
import Textarea from "../../ui/common/Textarea";

function CreateCabinForm({onCloseModal }) {

  var catalogToEdit = '{"id":"997d2149e773f2a3990b47fa","name":"Adidas FIFA World Cup 2018 OMB Football","summary":"Adidas FIFA World Cup 2018 OMB Football","description":"Featuring an innovative surface panel design, this is the match ball used during footballs FIFA World Cup™. Inspired by Russias urban landscapes, a pixelated graphic pays tribute to the iconic Telstar ball. Its thermally bonded seamless surface designs.","imageFile":"Nike-Footb244002611.png","image":"iVBORw","price":3200,"brands":{"name":"Adidas","id":"63ca5e40e0aa3968b549af53"},"types":{"name":"Football","id":"63ca5d7d380402dce7f06ebc"}}';

  let isEditSession = false;

//  const { mutate, isLoading } = useAddEditCatalog();

  if (catalogToEdit) {
    isEditSession = Boolean(catalogToEdit.id);
  }

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? { id: catalogToEdit.id, brandname: catalogToEdit.brands.name, productname: catalogToEdit.name, producttype: catalogToEdit.types.name, productsummary: catalogToEdit.summary, productdescription: catalogToEdit.description, price: catalogToEdit.price, image: catalogToEdit.image } : {},
  });

  const { errors } = formState;

  function onSubmit(data) {

    const newData = isEditSession ? { ...data, id: catalogToEdit.id } : data;
    mutate(newData, 
      {
      onSuccess: (newData => reset(), onCloseModal?.() ) });
  }


  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
    onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? "modal" : "regular"}
  >


      <FormRow label="Brand name" error={errors?.brandname?.message}>
        <Input
          type="text"
          id="brandname"

          {...register("brandname", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Product Type" error={errors?.producttype?.message}>
        <Input
          type="text"
          id="producttype"

          {...register("producttype", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Product Name" error={errors?.productname?.message}>
        <Input type="text" id="productname" {...register("productname", {
          required: "This field is required",
        })} />
      </FormRow>

      <FormRow label="Product Summary" error={errors?.productsummary?.message}>
        <Textarea type="text" id="productsummary" {...register("productsummary", {
          required: "This field is required",
        })} />
      </FormRow>

      <FormRow label="Product Description" error={errors?.productdescription?.message}>

        <Textarea type="text" id="productdescription" {...register("productdescription")} />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input type="number" id="price" defaultValue={0} {...register("price", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Price cannot be less than 1'
          },
          max: {
            value: 100000,
            message: 'Price cannot be greater than 100000'

          }
        })} />
      </FormRow>

      <FormRow label="Product photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>

        <Button disabled={false}>
          {isEditSession ? "Edit Catalog Item" : "Add Catalog Item"}
        </Button>

      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
