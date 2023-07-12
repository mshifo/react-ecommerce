import { useGetPaginatedProductsQuery } from "../../app/services/api.slice";
import ProductsTable from "../../components/ProductsTable";
import ProductsTableSkeleton from "../../components/ProductsTableSkeleton";

const AdminProducts = () => {
  const { data, error, isLoading } = useGetPaginatedProductsQuery({ page: 1 });
  console.log(data, error, isLoading);
  return isLoading ? <ProductsTableSkeleton /> : <ProductsTable {...data} />;
};

export default AdminProducts;
