"use client";

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
}

export default function Home() {
  const [activePersona, setActivePersona] = useState<Persona>(persona[0]);
  const [response, setResponse] = useState<string | null>(null); // TODO: type
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchResponse = async (data: any) => {
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
    setResponse(result.output);
    console.log("API result", result.output);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 rounded-lg bg-background-light p-10 shadow-lg">
      <h1 className="h1-bold">Davin Goggins v2</h1>
      <div className="flex w-full justify-between gap-3">
        {persona.map((person) => {
          return (
            <Button
              key={person.id}
              onClick={() => setActivePersona(person)}
              className={`${
                activePersona.id === person.id ? "active" : ""
              } flex-1`}
              disabled={response != null}
            >
              {person.name}
            </Button>
          );
        })}
      </div>

      {response === null ? (
        <form
          onSubmit={handleSubmit(fetchResponse)}
          className="flex w-full flex-col gap-4"
        >
          <Input
            id="name"
            type="text"
            placeholder="NAME"
            className="border-none p-5 shadow-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <Textarea
            id="problem"
            placeholder={activePersona.problem}
            className="border-none p-5 shadow-md"
            {...register("problem", { required: "Problem is required" })}
          />
          {errors.problem && (
            <p className="text-red-500 text-sm">{errors.problem.message}</p>
          )}

          <Button
            type="submit"
            className="active mt-4 p-5 shadow-md"
            disabled={isLoading}
          >
            {activePersona.req}
          </Button>
        </form>
      ) : (
        <div className="flex w-full flex-col gap-4">
          <TextareaAutosize
            name="responseText"
            id="responseText"
            className="scrollbar-hidden max-h-[300px] rounded-md border-none p-5 text-justify shadow-md"
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
    </div>
  );
}
