"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { persona } from "@/constants/persona";

interface Persona {
  id: number;
  name: string;
  problem: string;
  req: string;
  prompt: string;
  reset: string;
  image: string;
  desc: string;
}

interface FormData {
  name: string;
  problem: string;
}

export default function Home() {
  const [activePersona, setActivePersona] = useState<Persona>(persona[0]);
  const [response, setResponse] = useState<string | null>(null); // TODO: type
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const fetchResponse = async (data: FormData) => {
    setIsLoading(true);
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        problem: data.problem,
        personaId: activePersona.id,
      }),
    });

    const result = await res.json();
    if (!result.error) {
      setResponse(result.output);
      reset({ name: "", problem: "" });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex max-w-[600px] flex-col flex-wrap items-center justify-center gap-3 rounded-lg bg-background-light p-10 shadow-lg max-sm:max-w-[400px]">
      <h1 className="h1-bold max-sm:text-[35px]">Davin Goggins v2</h1>
      <div className="flex w-full flex-wrap justify-between gap-3">
        {persona.map((person) => {
          return (
            <Button
              key={person.id}
              onClick={() => {
                setActivePersona(person);
                reset({ name: "", problem: "" });
              }}
              className={`${
                activePersona.id === person.id ? "active" : ""
              } flex-1`}
              disabled={response != null || isLoading}
            >
              {person.name}
            </Button>
          );
        })}
      </div>

      <div className="my-3 size-[100px] overflow-hidden rounded-full max-sm:size-[80px]">
        <Image
          src={activePersona.image}
          alt={`${activePersona.name}'s image`}
          width={100}
          height={100}
          className="size-full object-cover"
        />
      </div>
      <p className="mb-3 flex-wrap text-center text-sm">{activePersona.desc}</p>

      {response === null ? (
        <form
          onSubmit={handleSubmit(fetchResponse)}
          className="flex w-full flex-col gap-4"
        >
          <Input
            id="name"
            type="text"
            placeholder="NAME"
            className="border-none bg-light p-5 text-primary shadow-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-sm">{errors.name.message}</p>}

          <Textarea
            id="problem"
            placeholder={activePersona.problem}
            className="border-none bg-light p-5 text-primary shadow-md"
            {...register("problem", { required: "Problem is required" })}
          />
          {errors.problem && (
            <p className="text-sm">{errors.problem.message}</p>
          )}

          <Button
            type="submit"
            className="active mt-4 p-5 shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : activePersona.req}
          </Button>
        </form>
      ) : (
        <div className="flex w-full flex-col gap-4">
          <TextareaAutosize
            name="responseText"
            id="responseText"
            className="scrollbar-hidden max-h-[250px] rounded-md border-none bg-light p-5 text-justify text-primary shadow-md"
            value={response}
          />
          <Button
            onClick={() => setResponse(null)}
            className="active mt-4 p-5 shadow-md"
          >
            {activePersona.reset}
          </Button>
        </div>
      )}

      <p className="pt-4 text-xs !text-opacity-0">cr. davinpwk 2024</p>
    </div>
  );
}
