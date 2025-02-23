"use client";

import { Button } from "@/components/button";
import { Form } from "@/components/input";
import { SnackDTO } from "@/dto/snack.dto";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { FOOD_CATEGORIES_TRANSLATIONS } from "@/utils/translations/food-categories-translation";
import { Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { schema, FormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUpdateFood } from "@/api/food.api";
import { useRouter } from "next/navigation";

interface Props {
  food: SnackDTO;
}

export const FormEditDish: React.FC<Props> = ({ food }) => {
  const [ingredients, setingredients] = useState<string[]>(
    food.ingredients ?? [],
  );
  const [isFetching, setIsFetching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<{ name: string }>({ name: food.imageUrl });
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState<string>(
    food.category ?? "",
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const { replace } = useRouter();

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

  const handleSelectFoodCategory = (value: string) => {
    const newValue = value as FOOD_CATEGORIES;
    setSelectedFoodCategory(value);
    setValue("category", newValue);
  };

  const editFoodForm = async (data: FormProps) => {
    if (data) {
      setIsFetching(true);
      const { title, description, category, imageUrl, price, ingredients } =
        data;

      try {
        await fetchUpdateFood({
          id: food.id,
          ...(title && { title }),
          ...(description && { description }),
          ...(category && { category }),
          ...(imageUrl && { imageUrl }),
          ...(price && { price }),
          ingredients,
        });

        replace(`/${food.id}`);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Cria um preview da imagem
      setValue("imageUrl", file.name);
    }
  };

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
    if (image.name) {
      setValue("imageUrl", image.name);
    }
  }, [image]);

  useEffect(() => {
    if (ingredients.length > 0) {
      setValue("ingredients", ingredients);
    }
  }, [ingredients]);

  return (
    <div className="mb-12">
      <img
        className="mb-8 h-28 w-28 rounded-full object-cover md:h-40 md:w-40 lg:h-28 lg:w-28"
        src={preview ?? food?.imageUrl}
        alt={food?.title}
      />
      <form onSubmit={handleSubmit(editFoodForm)}>
        <Form.Root className="gap-8">
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(447px,1fr)_minmax(348px,1fr)]">
            <Form.Wrapper className="md:col-start-1">
              <Form.Label title="Imagem do prato" htmlFor="name" />
              <Form.Viewport className="pl-0">
                <label
                  htmlFor="select-image"
                  className="flex w-full items-center gap-2 px-6 py-3.5 hover:cursor-pointer"
                  tabIndex={0}
                  onKeyDown={openFileOnPressEnter}
                >
                  <Upload />
                  {image && image.name && image.name.length > 20
                    ? image.name.substring(0, 20).concat("...")
                    : image?.name || "Alterar imagem"}

                  <Form.Input
                    id="select-image"
                    placeholder="Alterar imagem"
                    className="hidden"
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </Form.Viewport>
            </Form.Wrapper>

            <Form.Wrapper className="md:col-start-2">
              <Form.Label title="Titulo" htmlFor="title" />
              <Form.Viewport className="pl-0">
                <Form.Input
                  {...register("title")}
                  id="title"
                  placeholder="Ex.: Salada Ceasar"
                  defaultValue={food.title}
                />
              </Form.Viewport>
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
                      placeholder="Adicionar"
                      className="w-20 flex-grow px-0 py-0"
                      ref={inputRef}
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
                  defaultValue={food.price}
                />
              </Form.Viewport>
            </Form.Wrapper>
          </div>

          <Form.Wrapper>
            <Form.Label title="Descrição" htmlFor="description" />
            <Form.Viewport className="pl-0">
              <Form.TextInput
                {...register("description")}
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                defaultValue={food.description}
              />
            </Form.Viewport>
          </Form.Wrapper>

          <div className="flex items-center justify-between gap-8 lg:self-end">
            <Button className="w-max self-end bg-dark_950 px-4">
              Excluir prato
            </Button>

            <Button
              type="submit"
              className="w-max self-end bg-tomato_400 px-4"
              isLoading={isFetching}
            >
              Salvar alterações
            </Button>
          </div>
        </Form.Root>
      </form>
    </div>
  );
};
