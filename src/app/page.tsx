import { cookies } from "next/headers";

import { BarChartComponent } from "@/components/chart-bar-multiple";
import { PieChartComponent } from "@/components/chart-pie-donut-text";
import Layout from "@/components/layout";

export default async function Page() {
    const cookieStore = await cookies();
    const myData = cookieStore.get("myData")?.value || "ไม่มีข้อมูลในคุกกี้";

    return (
        <div>
            <Layout>
                <PieChartComponent />
                <BarChartComponent />
            </Layout>
        </div>
    );
}
