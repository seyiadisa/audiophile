"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { NewProductData, NewProductError } from "@/types";
import { startTransition, useActionState, useRef, useState } from "react";
import { Button } from "../ui/button";
import createNewProduct from "@/actions/new-product";
import { Plus, Trash2 } from "lucide-react";

const initialProductState: NewProductData = {
  shortName: "",
  name: "",
  price: "",
  details: "",
  features: "",
  inTheBox: {
    "": "",
  },
  category: "headphones",
  image: null,
};

export default function NewProductDialog() {
  const [state, formAction, pending] = useActionState(createNewProduct, {
    success: false,
    data: initialProductState,
    error: {} as NewProductError,
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState<NewProductData["category"]>(
    state.data.category
  );
  const [boxItems, setBoxItems] = useState<NewProductData["inTheBox"]>(
    state.data.inTheBox
  );

  const handleImageUpload = () => {
    if (!fileInputRef.current) return null;

    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const removeImage = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBoxItemChange = (
    index: number,
    field: "item" | "quantity",
    value: string
  ) => {
    const newBoxItems = Object.entries(boxItems);

    if (field === "item") {
      newBoxItems[index][0] = value;
    } else {
      newBoxItems[index][1] = value;
    }
    setBoxItems(Object.fromEntries(newBoxItems));
  };

  const addBoxItem = () => {
    setBoxItems({ ...boxItems, "": "" });
  };

  const removeBoxItem = (index: number) => {
    const newBoxItems = Object.entries(boxItems).filter((_, i) => i !== index);
    setBoxItems(Object.fromEntries(newBoxItems));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return null;

    const formData = new FormData(formRef.current);
    formData.append("inTheBox", JSON.stringify(boxItems));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel data-error data-required htmlFor="name">
                    Product Name
                    <span>{state.error.name}</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={state.data.name}
                    placeholder="XX99 Mark II Headphones"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel data-error data-required htmlFor="shortName">
                    Short Name
                    <span>{state.error.shortName}</span>
                  </FieldLabel>
                  <Input
                    id="shortName"
                    name="shortName"
                    defaultValue={state.data.shortName}
                    placeholder="XX99 MK II"
                  />
                </Field>

                <Field>
                  <FieldLabel data-error data-required htmlFor="price">
                    Price
                    <span>{state.error.price}</span>
                  </FieldLabel>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={state.data.price}
                    placeholder="2999"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel data-error data-required htmlFor="category">
                    Category
                    <span>{state.error.category}</span>
                  </FieldLabel>
                  <RadioGroup
                    value={category}
                    onValueChange={(val) =>
                      setCategory(val as NewProductData["category"])
                    }
                    name="category"
                    className="flex h-full items-center gap-4"
                  >
                    {["headphones", "speakers", "earphones"].map((cat) => (
                      <div key={cat} className="flex items-center gap-2">
                        <RadioGroupItem value={cat} id={cat} />
                        <label
                          htmlFor={cat}
                          className="cursor-pointer capitalize"
                        >
                          {cat}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </Field>

                <Field className="md:col-span-2">
                  <FieldLabel data-error data-required htmlFor="details">
                    Details
                    <span>{state.error.details}</span>
                  </FieldLabel>
                  <Textarea
                    id="details"
                    name="details"
                    defaultValue={state.data.details}
                    placeholder="Product description..."
                    required
                  />
                </Field>

                <Field className="md:col-span-2">
                  <FieldLabel data-error data-required htmlFor="features">
                    Features
                    <span>{state.error.features}</span>
                  </FieldLabel>
                  <Textarea
                    id="features"
                    name="features"
                    defaultValue={state.data.features}
                    placeholder="Product features..."
                    required
                  />
                </Field>
              </FieldGroup>

              <Field>
                <FieldLabel data-required htmlFor="image">
                  Product Image
                </FieldLabel>
                <div>
                  {fileName ? (
                    <div className="flex items-center gap-2">
                      <p>{fileName}</p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="rounded-md p-2 hover:bg-slate-200"
                      >
                        <Trash2 className="text-destructive" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant={"outline"}
                      className="*:flex *:items-center *:gap-2"
                      onClick={handleImageUpload}
                    >
                      <Plus className="inline" /> Upload Image
                    </Button>
                  )}

                  <Input
                    ref={fileInputRef}
                    type="file"
                    id="image"
                    name="image"
                    hidden
                    onChange={handleFileChange}
                  />
                </div>
                <span className="text-destructive block text-sm">
                  {state.error.image}
                </span>
              </Field>

              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">In The Box</h3>
                {Object.entries(boxItems).map(([item, quantity], index) => (
                  <FieldGroup
                    key={index}
                    className="mb-2 flex flex-row flex-nowrap items-center gap-4"
                  >
                    <Field className="flex-1">
                      <FieldLabel data-required htmlFor={"item" + index}>
                        Item Name
                      </FieldLabel>
                      <Input
                        id={"item" + index}
                        value={item}
                        onChange={(e) =>
                          handleBoxItemChange(index, "item", e.target.value)
                        }
                        placeholder="Headphone Unit"
                      />
                    </Field>
                    <Field className="w-24">
                      <FieldLabel data-required>Quantity</FieldLabel>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          handleBoxItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </Field>
                    <Button
                      variant={"ghost"}
                      showArrow={false}
                      type="button"
                      onClick={() => removeBoxItem(index)}
                      className="hover:text-destructive mt-6"
                    >
                      Remove
                    </Button>
                  </FieldGroup>
                ))}
                <span className="text-destructive block text-sm">
                  {state.error.inTheBox}
                </span>
                <Button
                  showArrow={false}
                  variant={"ghost"}
                  type="button"
                  onClick={addBoxItem}
                  className="mt-2"
                >
                  + Add Item
                </Button>
              </div>

              <Button type="submit" disabled={pending}>
                {pending ? "Loading..." : "Create Product"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
