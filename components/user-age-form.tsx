"use client"

import { useState } from "react"
import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { UserAvatar } from "@/components/user-avatar"

import { firebaseApp } from "./firebase"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "age" >
}

type FormData = z.infer<typeof userNameSchema>


// Import necessary modules and components

export function UserAgeForm({ user, className, ...props }: UserNameFormProps) {
    const router = useRouter();
    const {
      handleSubmit,
      register,
      setValue,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(userNameSchema),
      defaultValues: {
        id: user?.id || "",
        age: user?.age || ""
      },
    });
    const [isSaving, setIsSaving] = React.useState<boolean>(false);
    const [isSavingImage, setIsSavingImage] = React.useState<boolean>(false);
  
    // State to store the image file
    const [imageFile, setImageFile] = useState<File | null>(null);
  
    // State to store the image URL
    const [imageURL, setImageURL] = useState<string | null>(null);
  
    const handleImageUpload = async (file: File) => {
      // ... Your existing image upload logic ...
    };
  
    const img = localStorage.getItem("imageURL");
  
    async function onSubmit(data: FormData) {
      setIsSaving(true);
  
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: data.age, 
          }),
        });
  
        setIsSaving(false);
  
        if (!response.ok) {
          throw new Error("Update failed");
        }
  
        // Handle success
        toast({
          description: "Your profile has been updated.",
        });
  
        router.refresh();
      } catch (error) {
        setIsSaving(false);
  
        // Handle errors
        toast({
          title: "Error",
          description: "Failed to update your profile.",
          variant: "destructive",
        });
      }
    }
  
    return (
      <form
        className={cn((className = " "))}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        
        
        <div className="md:w-1/2 xs:1/2">
          <Card className="float-center">
            <CardHeader>
              <CardTitle>Age Update</CardTitle>
              <CardDescription>Update your age.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  id="age"
                  {...register("age")}
                />
                {errors?.age && (
                  <p className="px-1 text-xs text-red-600">{errors.age.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <button
                type="submit"
                className={cn(buttonVariants(), className)}
                disabled={isSaving}
              >
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Update Age</span>
              </button>
            </CardFooter>
          </Card>
        </div>
      </form>
    );
  }
  