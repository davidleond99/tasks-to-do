import { WidgetItem } from "@/components/WidgetItem";

export default function PageDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem />
      <WidgetItem />
      <WidgetItem />
      <WidgetItem />
      <WidgetItem />
      <WidgetItem />
    </div>
  );
}
