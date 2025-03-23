"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useAccountContext } from "@/components/AccountContext/AccountContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  password: z.string().min(2, {
    message: "Password must be at least 3 characters.",
  }),
});

const Login = () => {
  const [message, setMessage] = useState("");
  const { usernameState } = useAccountContext();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div>
      {message && <p>{message}</p>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            async (data: z.infer<typeof FormSchema>) => {
              try {
                const response = await axios.post(
                  "http://localhost:8000/login",
                  data,
                );
                localStorage.setItem("token", response.data.access_token);
                usernameState.setUsername(data.username);
                router.push("/");
              } catch (error) {
                setMessage("Invalid username or password");
                console.error("Error logging in:", error);
              }
            },
          )}
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
            <LogIn /> Log In
          </Button>
        </form>
      </Form>
      <a href="/register">Don't have an account, click here!</a>
    </div>
  );
};

export default Login;
