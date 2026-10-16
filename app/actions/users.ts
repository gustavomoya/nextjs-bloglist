"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { getUserByUsername } from '@/app/services/users'

type UserValues = {
  username: string
  name: string
  password: string
  passwordConfirm: string
}

type UserErrors = {
  username?: string
  name?: string
  password?: string
  passwordConfirm?: string
}

export type RegisterUserState = {
  errors: UserErrors
  values: UserValues,
  success: boolean
}

export const registerUser = async (prevState: RegisterUserState, formData: FormData) : Promise<RegisterUserState> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const values: UserValues = { username, name, password, passwordConfirm };
  const errors: UserErrors = {};

  if (!username.trim() || username.trim().length < 4) {
    errors.username = "The username must be at least 4 characters long"
  }

  if (!name.trim()) {
    errors.name = "The name cannot be empty"
  }

  if (!password.trim() || password.trim().length < 4) {
    errors.password = "The password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  const user = await getUserByUsername(username)

  if (user) {
    errors.username = "This username is already taken"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values, success: false }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  return { errors, values, success: true }
}