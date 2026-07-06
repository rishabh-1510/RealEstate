"use client"

import Modal from "./Modal"
import React, { useState } from "react"
import Input from "../ui/Input"
import { Button } from "../ui/Button"
import { FcGoogle } from "react-icons/fc"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { useAuthModal } from "@/src/store/useAuthModalStore"
import toast from "react-hot-toast"
import { authClient } from "@/src/lib/auth-client"
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/src/services/signInWithGoogle"

interface RegisterValues {
  name: string,
  email: string,
  password: string
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>

const RegisterModal = () => {
  const router = useRouter();
  const { openLogin, isRegisterOpen, closeRegister } = useAuthModal();
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState(false); // NEW

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined
    }))
  };

  const validate = () => {
    const newErrors: RegisterErrors = {};
    if (!values.name.trim()) {
      newErrors.name = 'Name is Required'
    } else if (values.password.length < 2) {
      newErrors.password = 'Name must be at least 2 characters!'
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email address!'
    }
    if (!values.password.trim()) {
      newErrors.password = "Password is required"
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters!'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate) return;
    try {
      setLoading(true);
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password
      });
      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Registration sucessful");
      router.refresh();
      setValues({
        name: "",
        email: "",
        password: ""
      });
      closeRegister();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong please try again.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
      <div className="mb-6 space-y-1 ">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome to NextEstate</h2>
        <p className="text-sm text-gray-500 ">Create and account</p>
      </div>
      <form className="space-y-8" onSubmit={onSubmit}>
        <Input id="login-name" name="name" label={"name"} value={values.name} onChange={handleChange} error={errors.name} disabled={loading} />
        <Input id="login-email" name="email" label={"Email"} value={values.email} onChange={handleChange} error={errors.email} disabled={loading} />

        {/* Password field with show/hide toggle */}
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            label={"Password"}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            disabled={loading}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
          </button>
        </div>

        <Button type="submit" fullWidth loading={loading} >
          Continue
        </Button>
      </form>
      <div className="relative my-6 ">
        <div className="flex items-center absolute inset-0">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center  text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">
            Or
          </span>
        </div>
      </div>
      <Button variant="outline" fullWidth disabled={loading} icon={<FcGoogle size={22} />} onClick={signInWithGoogle}>
        Continue with Google
      </Button>
      <p className="text-gray-400 text-center text-sm mt-6 ">
        Already have an account?{" "}
        <span className="text-primary font-semibold cursor-pointer hover:underline" onClick={openLogin}>
          Login
        </span>
      </p>
    </Modal>
  )
}

export default RegisterModal