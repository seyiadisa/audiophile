import NewProductDialog from "@/components/admin/product-dialog";
import ProductView from "@/components/admin/product-view";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold">Welcome, Admin</h1>
        <NewProductDialog />
      </div>

      <ProductView />
    </div>
  );
}
