"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { BookOpen, Sparkles, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import BookLogin from "../../../../public/images/book_login.png";
import { useLoginMutation } from "@/queries/useAuth";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const loginMutation = useLoginMutation();

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginBodyType>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(LoginBody),
    });

    const onSubmit = async (data: LoginBodyType) => {
        if (loginMutation.isPending) return;
        try {
            const result = await loginMutation.mutateAsync(data);
            toast.success(result.payload.message || "Đăng nhập thành công!");
            router.push("/");
        } catch (error: any) {
            console.log("Login error:", error);
            toast.error(
                error?.message?.toLowerCase().includes("bad credentials")
                    ? "Tài khoản hoặc mật khẩu không đúng!"
                    : error?.message || "Đăng nhập thất bại. Vui lòng thử lại."
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#dbeafe] via-[#f0f9ff] to-[#e0f7fa] overflow-hidden">
            <div className="flex flex-1 items-center justify-center p-8">
                <Card className="w-full max-w-lg bg-white/70 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl">
                    <CardHeader className="text-center space-y-2">
                        <div className="flex justify-center mb-2">
                            <div className="p-3 rounded-full bg-blue-600/10">
                                <BookOpen className="w-7 h-7 text-blue-600" />
                            </div>
                        </div>
                        <CardTitle className="text-4xl font-bold text-gray-800">
                            Đăng nhập
                        </CardTitle>
                        <CardDescription className="text-gray-500 text-xl">
                            Chào mừng trở lại với{" "}
                            <span className="font-semibold text-blue-600">
                                BookStore
                            </span>{" "}
                            ✨
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                                noValidate
                            >
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="!text-gray-900">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    className="mt-2 bg-white/80 border-gray-300 focus-visible:ring-blue-300"
                                                    {...field}
                                                />
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
                                            <FormLabel className="!text-gray-900">
                                                Mật khẩu
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="••••••••"
                                                        className="mt-2 bg-white/80 border-gray-300 focus-visible:ring-blue-300 pr-10"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        {showPassword ? (
                                                            <Eye className="w-5 h-5" />
                                                        ) : (
                                                            <EyeOff className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="text-right mt-4">
                                    <Link
                                        href="/forgot-password"
                                        className="text-blue-600 hover:underline text-sm font-semibold"
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 rounded-lg"
                                >
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Đăng nhập
                                </Button>
                            </form>
                        </Form>

                        <div className="flex items-center my-5">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="px-3 text-gray-500 text-sm">
                                hoặc
                            </span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        <Button
                            variant="outline"
                            className="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 flex items-center justify-center gap-2 transition-all duration-200"
                            onClick={() => console.log("Login with Google")}
                        >
                            <FcGoogle className="w-5 h-5" />
                            Đăng nhập với Google
                        </Button>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Chưa có tài khoản?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Đăng ký ngay
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="hidden lg:flex flex-1 items-center justify-center relative">
                <div className="absolute inset-0 bg-cover opacity-10" />
                <div className="relative z-10 max-w-full text-center px-10">
                    <Image
                        src={BookLogin}
                        alt="Book illustration"
                        width={480}
                        height={480}
                        className="mx-auto drop-shadow-lg"
                        priority
                        quality={100}
                    />
                    <h2 className="text-6xl font-bold text-gray-800 mb-3 leading-tight">
                        Khám phá tri thức 📖
                    </h2>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-xl">
                        Đọc sách, chia sẻ và cùng nhau phát triển. <br />
                        BookStore là nơi những câu chuyện bắt đầu. <br />
                        ☆*: .｡. o(≧▽≦)o .｡.:*☆
                    </p>
                </div>
            </div>
        </div>
    );
}
