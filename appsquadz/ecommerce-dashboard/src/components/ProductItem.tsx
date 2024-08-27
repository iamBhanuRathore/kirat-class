// import React from "react";
// import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// import { useInView } from "react-intersection-observer";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   images: string[];
// }

// interface Props {
//   product: Product;
// }

// const ProductItem: React.FC<Props> = ({ product }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <Card className="h-full border-2 group border-black/20 duration-1000">
//       <div ref={ref}>
//         {inView && (
//           <CardMedia
//             component="img"
//             className="border-b-2 group-hover:border-black/30 aspect-square object-cover"
//             image={product.images[0]}
//             alt={product.title}
//             loading="lazy" // Enable lazy loading
//             sizes="(max-width: 600px) 400px, (max-width: 1200px) 300px, 500px" // Specify sizes
//           />
//         )}
//       </div>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.description}
//         </Typography>
//         <Typography variant="h6">${product.price}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           <b>Category: </b>&nbsp;{product.category}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductItem;
import React from "react";
// import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  brand?: string;
  category: string;
  rating: number;
  tags: string[];
  images: string[];
}

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.1,
  // });
  console.log(product.images[0]);

  return (
    <div className="w-full flex-1 group py-3 h-full px-3">
      <div className="bg-white shadow-xl border-2 rounded-lg overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${product.images[0]})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className={`flex flex-col justify-between h-56 p-4 border-b-2 group-hover:border-black/30`}>
          <div className="flex justify-end text-xs items-center">
            {product.rating}
            <Star className="border-0 w-4 h-4 text-transparent fill-green-500" />
          </div>
          {product.brand && (
            <div className="ml-auto text-xs items-center bg-green-500 text-white p-1 rounded-md">
              {product.brand}
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
            {product.title}
          </p>
          <p className="text-3xl text-gray-900">${product.price}</p>
          <p className="text-gray-700"> {product.description}</p>
        </div>
        <div className="flex p-4 border-t border-gray-300 text-gray-700">
          <div className="font-bold items-center capitalize">
            Category: &nbsp;
          </div>
          <div className="capitalize font-semibold">
            {product.tags.join(", ")}
          </div>
        </div>
        {/* <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
          <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
            Realtor
          </div>
          <div className="flex items-center pt-2">
            <div
              className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
              // style="background-image: url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)"
            ></div>
            <div>
              <p className="font-bold text-gray-900">Tiffany Heffner</p>
              <p className="text-sm text-gray-700">(555) 555-4321</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductItem;
