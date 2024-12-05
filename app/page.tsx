"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { persona } from "@/constants/persona";

interface Persona {
  id: number;
  name: string;
  problem: string;
  req: string;
}

export default function Home() {
  const [activePersona, setActivePersona] = useState<Persona>(persona[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logData = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-background-light flex flex-col items-center justify-start gap-4 rounded-lg p-10 shadow-lg">
      <h1 className="h1-bold">Davin Goggins v2</h1>
      <div className="flex w-full justify-between gap-3">
        {persona.map((person) => {
          return (
            <Button
              key={person.id}
              onClick={() => setActivePersona(person)}
              className={`${activePersona.id === person.id ? "active" : ""}`}
            >
              {person.name}
            </Button>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit(logData)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          id="name"
          type="text"
          placeholder="NAME"
          className="border-none p-5 shadow-md"
          {...register("name", { required: "Name is required" })}
        />
        <Textarea
          id="problem"
          placeholder={activePersona.problem}
          className="border-none p-5 shadow-md"
          {...register("problem", { required: "Problem is required" })}
        />
        <Button type="submit" className="active mt-4 p-5 shadow-md">
          {activePersona.req}
        </Button>
      </form>
    </div>
  );
}
