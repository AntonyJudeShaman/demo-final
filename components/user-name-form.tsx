"use client"

import { useState } from "react"
import * as React from "react"
import { useRouter } from "next/navigation"
// Updated import
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
import { UserAgeForm } from "./user-age-form"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<
    User,
    "id" | "image" | "email" | "name" | "age" | "gender" | "phone"
  >
}

type FormData = z.infer<typeof userNameSchema>

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      id: user?.id || "",
      name: user?.name || "",
      email: user?.email || "",
      age: user?.age || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isSavingImage, setIsSavingImage] = React.useState<boolean>(false)
  const [isSavingPhone, setIsSavingPhone] = React.useState<boolean>(false)
  const [isSavingGender, setIsSavingGender] = React.useState<boolean>(false)
  const [isSavingAge, setIsSavingAge] = React.useState<boolean>(false)

  // State to store the image file
  const [imageFile, setImageFile] = useState<File | null>(null)

  // State to store the image URL
  const [imageURL, setImageURL] = useState<string | null>(null)

  // Get the image URL from localStorage if available
  const img =
    typeof window !== "undefined" ? localStorage.getItem("imageURL") : null

  const handleImageUpload = async (file: File) => {
    setIsSavingImage(true)

    const storage = getStorage(firebaseApp)
    const storagePath = `images/${user.id}`
    const storageRef = ref(storage, storagePath)

    try {
      await uploadBytes(storageRef, file)

      const downloadURL = await getDownloadURL(storageRef)

      setImageURL(downloadURL)

      if (typeof window !== "undefined") {
        localStorage.setItem("imageURL", downloadURL)
      }

      setIsSavingImage(false)
    } catch (error) {
      console.error("Error uploading image:", error)
      setIsSavingImage(false)
    }
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    setIsSavingPhone(true)
    setIsSavingGender(true)
    setIsSavingAge(true)

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          phone: data.phone,
          gender: data.gender,
        }),
      })

      setIsSaving(false)
      setIsSavingPhone(false)
      setIsSavingGender(false)
      setIsSavingAge(false)

      if (!response.ok) {
        throw new Error("Update failed")
      }

      toast({
        description: "Your profile has been updated.",
      })

      router.refresh() // Use router.reload() instead of router.refresh()
    } catch (error) {
      setIsSaving(false)

      toast({
        title: "Success",
        description: "Your profile was updated.",
        variant: "success",
      })
    }
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[600px] mb-4 md:mb-0">
          <Card className="max-w-[600px] mr-8 pb-2 pt-3">
            <CardHeader>
              <CardTitle>Your Name</CardTitle>
              <CardDescription>
                Please enter your full name or a display name you are
                comfortable with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  className="w-[400px]"
                  size={32}
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
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
                <span>Save</span>
              </button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-1/2 ">
          <Card className="float-right ">
            <div className="grid md:grid-cols-2  grid-cols-3  gap-4">
              <div>
                <CardHeader>
                  <CardTitle>Profile Image</CardTitle>
                  <CardDescription>
                    Upload a profile image (optional).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1 w-[250px]">
                    <Label className="sr-only" htmlFor="image">
                      Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          setImageFile(file)
                          handleImageUpload(file)
                        }
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <button
                    type="submit"
                    className={cn(buttonVariants(), className)}
                    disabled={isSavingImage}
                  >
                    {isSavingImage && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>Upload</span>
                  </button>
                </CardFooter>
              </div>
              <div className="flex justify-center md:items-center md:mt-0 mt-6">
                <UserAvatar
                  user={{ image: img || user?.image || null }}
                  className="h-28 w-28 md:h-48 md:w-48 border-2 border-purple-400"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <br />
      <Card>
        <CardHeader>
          <CardTitle>Your Email</CardTitle>
          <CardDescription>Your email cannot be changed.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="w-[400px] text-purple-400"
              size={32}
              {...register("email")}
              readOnly
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <br />

      {/* Section for Age */}
      <div className="flex md:flex-row flex-col">
        <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
          <Card className="max-w-[600px]">
            <CardHeader>
              <CardTitle>Your Age</CardTitle>
              <CardDescription>Please enter your age.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="age">
                  Age
                </Label>
                <Input
                  id="age"
                  className="w-[350px]"
                  type="number"
                  min="0"
                  max="150"
                  {...register("age")}
                />
                {errors?.age && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <button
                type="submit"
                className={cn(buttonVariants(), className)}
                disabled={isSavingAge}
              >
                {isSavingAge && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Save</span>
              </button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-1/2 mb-4 md:mb-0">
          <Card className="max-w-[600px]">
            <CardHeader>
              <CardTitle>Your Phone</CardTitle>
              <CardDescription>Please enter your phone number.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="phone">
                  Phone
                </Label>
                <Input
                  id="phone"
                  className="w-[350px]"
                  type="tel"
                  {...register("phone")}
                />
                {errors?.phone && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <button
                type="submit"
                className={cn(buttonVariants(), className)}
                disabled={isSavingPhone}
              >
                {isSavingPhone && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Save</span>
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <br />
      {/* Section for Gender */}
      <Card className="">
        <CardHeader>
          <CardTitle>Your Gender</CardTitle>
          <CardDescription>Please enter your gender.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="gender">
              Gender
            </Label>
            <Input id="gender" className="w-[400px]" {...register("gender")} />
            {errors?.gender && (
              <p className="px-1 text-xs text-red-600">
                {errors.gender.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSavingGender}
          >
            {isSavingGender && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
      <br />
    </form>
  )
}
