"use client";

import Button from "@/components/button";
import { Form } from "@/components/input";
import { SnackDTO } from "@/dto/snack.dto";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { FOOD_CATEGORIES_TRANSLATIONS } from "@/utils/translations/food-categories-translation";
import { Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { schema, FormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toast-message";
import { fetchUploadAttachment } from "@/services/attachment/fetch-upload-attachment";
import { fetchUpdateFood } from "@/services/foods/fetch-update-food";
import { fetchDeleteFood } from "@/services/foods/fetch-delete-food";

interface Props {
  food: SnackDTO;
}

export const FormEditDish: React.FC<Props> = ({ food }) => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [ingredients, setingredients] = useState<string[]>(
    food.ingredients ?? [],
  );
  const [isFetching, setIsFetching] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedFoodCategory, setSelectedFoodCategory] =
    useState<FOOD_CATEGORIES>(food.category);

  const attachmentUrlValue = getValues("attachmentUrl");

  const { replace, refresh } = useRouter();

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
      inputRef.current?.click();
    }
  };

  const handleSelectFoodCategory = (value: FOOD_CATEGORIES) => {
    const newValue = value;

    setSelectedFoodCategory(value);
    setValue("category", newValue);
  };

  const editFoodForm = async (data: FormProps) => {
    setIsFetching(true);

    try {
      let attachmentId = food.attachmentId ?? undefined;

      const { title, description, category, price, ingredients } = data;

      if (!data) return;
      if (file) {
        const attachmentData = await fetchUploadAttachment(file);
        if (!attachmentData && file) {
          return;
        }

        attachmentId = attachmentData.attachmentId;
      }
      const response = await fetchUpdateFood({
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price && { price }),
        attachmentId,
        ...(ingredients && { ingredients }),
        snackId: food.snackId,
      });

      if (response.success) {
        replace(`/${food.snackId}`);
        refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files?.[0];

    if (fileInput) {
      const fileSizeLimit = 2 * 1024 * 1024;

      if (fileInput.size > fileSizeLimit) {
        return showToast({
          type: "error",
          content: "O tamanho do arquivo é muito grande. Limite 2MB",
        });
      }
      setFile(fileInput);
      setPreview(URL.createObjectURL(fileInput));
      setValue("attachmentUrl", fileInput.name);
    }
  };
  const handleDeleteDish = async () => {
    setIsFetching(true);
    const isConfirmed = confirm("Tem certeza que deseja remover este prato?");
    try {
      if (isConfirmed) {
        const response = await fetchDeleteFood(food.snackId);

        if (response.success) {
          replace("/");
          refresh();
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!attachmentUrlValue) {
      setValue("attachmentUrl", food.attachmentUrl);
    }
  }, [getValues("attachmentUrl")]);

  useEffect(() => {
    if (ingredients.length > 0) {
      setValue("ingredients", ingredients);
    }
  }, [ingredients]);

  useEffect(() => {
    if (food.category) {
      setValue("category", selectedFoodCategory);
    }
  });

  const onError: SubmitErrorHandler<FormProps> = (errors) => {
    const keys = Object.values(errors);

    for (const key of keys) {
      showToast({ type: "error", content: `${key.message}` });
    }
  };

  return (
    <div className="mb-12">
      <img
        className="mb-8 h-28 w-28 rounded-full object-cover md:h-40 md:w-40 lg:h-28 lg:w-28"
        src={preview ?? food?.attachmentUrl}
        alt={food?.title}
      />
      <form onSubmit={handleSubmit(editFoodForm, onError)}>
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
                  {attachmentUrlValue &&
                  attachmentUrlValue &&
                  attachmentUrlValue.length > 20
                    ? attachmentUrlValue.substring(0, 16).concat("...")
                    : attachmentUrlValue?.substring(0, 16).concat("...") ||
                      "Alterar imagem"}

                  <Form.Input
                    id="select-image"
                    placeholder="Alterar imagem"
                    className="sr-only"
                    accept="image/*"
                    type="file"
                    ref={inputRef}
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
                      ref={inputRef}
                      placeholder="Adicionar"
                      className="w-20 flex-grow px-0 py-0"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAddIgredient();
                        }
                      }}
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
            <Button
              className="w-max self-end bg-dark_950 px-4 hover:bg-dark_900"
              onClick={handleDeleteDish}
              isLoading={isFetching}
              disabled={isFetching}
            >
              Excluir prato
            </Button>

            <Button
              type="submit"
              className="w-max self-end bg-tomato_400 px-4 "
              isLoading={isFetching}
              disabled={isFetching}
            >
              Salvar alterações
            </Button>
          </div>
        </Form.Root>
      </form>
    </div>
  );
};
