"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/input";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { FOOD_CATEGORIES_TRANSLATIONS } from "@/utils/translations/food-categories-translation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { schema, FormProps } from "./schema";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toast-message";
import { useRouter } from "next/navigation";
import { fetchCreateFood } from "@/api/food.api";

export function FormCreateDish() {
  const [ingredients, setingredients] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState<string>("");

  const { back } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const handleAddIgredient = () => {
    const currentInputRef = inputRef.current;

    if (!!currentInputRef && currentInputRef.value.length > 0) {
      setingredients((state) =>
        !state.some((oldIgredient) => oldIgredient === currentInputRef.value)
          ? [currentInputRef.value!, ...state]
          : state,
      );

      currentInputRef.value = "";
    }
  };

  const handleRemoveIgredient = (igredientToRemove: string) => {
    const newIngrdients = ingredients.filter(
      (oldIgredient) => oldIgredient !== igredientToRemove,
    );

    setingredients(newIngrdients);
    setValue("ingredients", newIngrdients);
  };

  const openFileOnPressEnter = (
    event: React.KeyboardEvent<HTMLLabelElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("select-image")?.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setPreview(url);
      setValue("imageUrl", url);
    }
  };

  const handleSelectFoodCategory = (value: string) => {
    const newValue = value as FOOD_CATEGORIES;
    setSelectedFoodCategory(value);
    setValue("category", newValue);
  };

  const createFoodForm = async (data: FormProps) => {
    if (data) {
      setIsFetching(true);
      const { title, description, category, imageUrl, price, ingredients } =
        data;

      try {
        await fetchCreateFood({
          title,
          description,
          category,
          imageUrl,
          price,
          ingredients,
        });
        back();
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    if (errors.imageUrl) {
      showToast({
        type: "error",
        content: "A imagem do prato é obrigatória",
      });
    }

    if (errors.category) {
      showToast({
        type: "error",
        content: "A categoria é obrigatória",
      });
    }
  }, [errors]);

  useEffect(() => {
    if (ingredients.length > 0) {
      setValue("ingredients", ingredients);
    }
  }, [ingredients]);

  useEffect(() => {
    const currentInputRef = inputRef.current;

    const addOnPressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        handleAddIgredient();
      }
    };

    if (!!currentInputRef) {
      currentInputRef.addEventListener("keyup", addOnPressEnter);
    }

    return () => {
      if (!!currentInputRef) {
        currentInputRef.removeEventListener("keyup", addOnPressEnter);
      }
    };
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className="mb-12">
      {preview && (
        <img
          className="mb-8 h-28 w-28 rounded-full object-cover md:h-40 md:w-40 lg:h-28 lg:w-28"
          src={preview!}
          alt={image?.name}
        />
      )}

      <form onSubmit={handleSubmit(createFoodForm)}>
        <Form.Root className="gap-8">
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(447px,1fr)_minmax(348px,1fr)]">
            <Form.Wrapper className="md:col-start-1">
              <Form.Label title="Imagem do prato" htmlFor="name" />
              <Form.Viewport className="pl-0">
                <label
                  className="flex w-full items-center gap-2 px-6 py-3.5 hover:cursor-pointer focus:outline-1 focus:outline-dark_950"
                  htmlFor="select-image"
                  tabIndex={0}
                  onKeyDown={openFileOnPressEnter}
                >
                  <Upload />
                  {image?.name || "Selecione a imagem"}
                  <Form.Input
                    id="select-image"
                    placeholder="Selecione a imagem"
                    className="hidden"
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </Form.Viewport>
            </Form.Wrapper>

            <Form.Wrapper className="md:col-start-2">
              <Form.Label title="Título" htmlFor="title" />
              <Form.Viewport className="pl-0">
                <Form.Input
                  {...register("title")}
                  id="title"
                  placeholder="Ex.: Salada Ceasar"
                  hasError={!!errors.title}
                />
              </Form.Viewport>
              {errors.title?.message && (
                <Form.Error message={errors.title?.message} />
              )}
            </Form.Wrapper>

            <Form.Wrapper className="md:col-start-3">
              <Form.Label title="Categoria" htmlFor="category" />
              <Form.Viewport className="pl-0">
                <Form.Select
                  placeholder="Selecione"
                  selectedValue={selectedFoodCategory}
                  defaultValue={selectedFoodCategory}
                  onValueChange={handleSelectFoodCategory}
                >
                  {Object.values(FOOD_CATEGORIES).map((category, index) => (
                    <Form.SelectItem
                      key={category}
                      value={category}
                      hasSeparator={
                        Object.values(FOOD_CATEGORIES).length - 1 > index
                      }
                    >
                      {FOOD_CATEGORIES_TRANSLATIONS[category]}
                    </Form.SelectItem>
                  ))}
                </Form.Select>
              </Form.Viewport>
            </Form.Wrapper>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_251px]">
            <Form.Wrapper className="overflow-x-auto md:col-start-1">
              <Form.Label title="Ingredientes" htmlFor="Ingredients" />
              <Form.Viewport className="pl-0">
                <div className="custom-scroll flex items-center gap-4  overflow-x-auto px-2 py-2">
                  <div className="flex min-w-max items-center gap-1 rounded-lg border border-dashed border-light_600 px-4 py-[5.5px]">
                    <Form.Input
                      ref={inputRef}
                      placeholder="Adicionar"
                      className="w-20 flex-grow px-0 py-0"
                    />

                    <button type="button" onClick={handleAddIgredient}>
                      <Plus className="h-5 w-5 text-light_500" />
                    </button>
                  </div>

                  {ingredients.map((igredient) => (
                    <div
                      key={igredient}
                      className="flex min-w-max items-center gap-1 rounded-lg bg-light_600 px-4 py-[5.5px]"
                    >
                      <span>{igredient}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIgredient(igredient)}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </Form.Viewport>
            </Form.Wrapper>

            <Form.Wrapper className="md:col-start-2">
              <Form.Label title="Preço" htmlFor="price" />
              <Form.Viewport className="pl-0">
                <Form.Input
                  {...register("price", {
                    setValueAs: (price) => parseFloat(price) || 0,
                  })}
                  id="price"
                  type="number"
                  placeholder="R$ 00,00"
                  hasError={!!errors.price}
                />
              </Form.Viewport>
              {errors.price?.message && (
                <Form.Error message={errors.price?.message} />
              )}
            </Form.Wrapper>
          </div>

          <Form.Wrapper>
            <Form.Label title="Descrição" htmlFor="description" />
            <Form.Viewport className="pl-0">
              <Form.TextInput
                {...register("description")}
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                hasError={!!errors.description}
              />
            </Form.Viewport>
            {errors.description?.message && (
              <Form.Error message={errors.description?.message} />
            )}
          </Form.Wrapper>

          <Button
            type="submit"
            className="bg-tomato_400 px-4 lg:w-max lg:self-end"
            isLoading={isFetching}
          >
            Salvar alterações
          </Button>
        </Form.Root>
      </form>
    </div>
  );
}
