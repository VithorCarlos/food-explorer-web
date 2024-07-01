"use client";
import { Button } from "@/components/button";
import { GobackButton } from "@/components/goback-button";
import { Form } from "@/components/input";
import { foodCategories } from "@/utils/mock";
import { Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function EditDish() {
  const [igredients, setIgredients] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddIgredient = () => {
    const currentInputRef = inputRef.current;

    if (!!currentInputRef) {
      setIgredients((state) =>
        !state.some((oldIgredient) => oldIgredient === currentInputRef.value)
          ? [currentInputRef.value!, ...state]
          : state,
      );

      currentInputRef.value = "";
    }
  };

  const handleRemoveIgredient = (igredientToRemove: string) => {
    const newIgrdients = igredients.filter(
      (oldIgredient) => oldIgredient !== igredientToRemove,
    );

    setIgredients(newIgrdients);
  };

  const openFileOnPressEnter = (
    event: React.KeyboardEvent<HTMLLabelElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("select-image")?.click();
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

  return (
    <section className="mx-auto max-w-6xl px-8 lg:px-4">
      <GobackButton className="mt-8" />

      <h1 className="my-8 text-3xl font-medium">Editar prato</h1>

      <div className="mb-12">
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
                  Alterar imagem
                  <Form.Input
                    id="select-image"
                    placeholder="Alterar imagem"
                    className="hidden"
                    accept="image/*"
                    type="file"
                  />
                </label>
              </Form.Viewport>
            </Form.Wrapper>

            <Form.Wrapper className="md:col-start-2">
              <Form.Label title="Nome" htmlFor="name" />
              <Form.Viewport className="pl-0">
                <Form.Input id="name" placeholder="Ex.: Salada Ceasar" />
              </Form.Viewport>
            </Form.Wrapper>

            <Form.Wrapper className="md:col-start-3">
              <Form.Label title="Categoria" htmlFor="category" />
              <Form.Viewport className="pl-0">
                <Form.Select placeholder="Selecione" selectedValue="">
                  {foodCategories.map((categorie, index) => (
                    <Form.SelectItem
                      value={categorie.key}
                      hasSeparator={foodCategories.length - 1 > index}
                    >
                      {categorie.title}
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

                    <button onClick={handleAddIgredient}>
                      <Plus className="h-5 w-5 text-light_500" />
                    </button>
                  </div>

                  {igredients.map((igredient) => (
                    <div
                      key={igredient}
                      className="flex min-w-max items-center gap-1 rounded-lg bg-light_600 px-4 py-[5.5px]"
                    >
                      <span>{igredient}</span>
                      <button onClick={() => handleRemoveIgredient(igredient)}>
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
                <Form.Input id="price" type="number" placeholder="R$ 00,00" />
              </Form.Viewport>
            </Form.Wrapper>
          </div>

          <Form.Wrapper>
            <Form.Label title="Descrição" htmlFor="description" />
            <Form.Viewport className="pl-0">
              <Form.TextInput placeholder="Fale brevemente sobre o prato, seus ingredientes e composição" />
            </Form.Viewport>
          </Form.Wrapper>

          <div className="flex items-center justify-between gap-8 lg:self-end">
            <Button className="w-max self-end bg-dark_950 px-4">
              Excluir prato
            </Button>

            <Button className="w-max self-end bg-tomato_400 px-4">
              Salvar alterações
            </Button>
          </div>
        </Form.Root>
      </div>
    </section>
  );
}
