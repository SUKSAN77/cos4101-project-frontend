import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
                    <CardDescription>
                        ป้อนอีเมลของคุณด้านล่างเพื่อเข้าสู่ระบบบัญชีของคุณ
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">อีเมล</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="cos@rumail.ru.ac.th"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">รหัสผ่าน</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        ลืมรหัสผ่าน?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                เข้าสู่ระบบ
                            </Button>
                            <Button variant="outline" className="w-full">
                                เข้าสู่ระบบด้วยบัญชี Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            มีบัญชีแล้วหรือยัง?{" "}
                            <a
                                href="#"
                                className="underline underline-offset-4"
                            >
                                สมัครสมาชิก
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
