import { GetStaticProps, NextPage } from "next"; 
import Home from "@/pages";
import { IProduct, TypePaginationProducts} from "@/types/product.interface";
import { ProductService } from "@/services/product/product.service";

const HomePage: NextPage <TypePaginationProducts> = ({length, products}) => {
  return <Home products={products} length={length}/>
}

export const getStaticProps: GetStaticProps<TypePaginationProducts> = async () => {
  const { data } = await ProductService.getAll({
    page: 1,
    perPage: 4
  });

  // Проверка наличия данных и их корректной структуры
  if (data && Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('products')) {
    return {
      props: {
        products: data[0].products,
        length: data[0].length
      }
    };
  } else {
    // Обработка ситуации, когда данные не получены или имеют неправильный формат
    console.error('Ошибка при получении данных: неверный формат данных');
    return {
      props: {
        products: [],
        length: 0
      }
    };
  }
};





export default HomePage