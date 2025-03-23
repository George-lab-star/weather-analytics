"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAccountContext } from "@/components/AccountContext/AccountContext";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LogIn } from "lucide-react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
  password: z.string().min(2, {
    message: "Password must be at least 3 characters.",
  }),
});

const Register = () => {
  const [message, setMessage] = useState("");
  const { usernameState } = useAccountContext();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post("http://localhost:8000/register", data);
      localStorage.setItem("token", response.data.access_token);
      usernameState.setUsername(data.username);
      setMessage("Registration successful!");
      router.push("/");
    } catch (error) {
      setMessage("Error registering user");
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] w-[40vh]">
      {message && <p>{message}</p>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>
            <LogIn /> Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
