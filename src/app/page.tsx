import { BarChartComponent } from "@/components/chart-bar-multiple";
import { PieChartComponent } from "@/components/chart-pie-donut-text";
import Layout from "@/components/layout";

export default async function Page() {
    return (
        <div>
            <Layout>
                <PieChartComponent />
                <BarChartComponent />
            </Layout>
        </div>
    );
}
