import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '../../components/Product/Product';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import SlickSlider from '../../components/SlickSlider/SlickSlider';
import { getWishList } from '../../store/selectors';

const OneProduct = () => {
  const params = useParams();
  const product = useSelector((state) =>
    state.items.data.length
      ? /* eslint no-underscore-dangle: 0 */
        state.items.data.find((item) => item._id === params.id)
      : null
  );

  const categories = useSelector((state) =>
    state.items.data.length
      ? state.items.data.filter(
          (item) => item.categories === product.categories
        )
      : null
  );

  const wishlist = useSelector(getWishList);
  const inWishList =
    wishlist && wishlist.find((item) => item._id === params.id);

  if (!product) return null;

  // /* eslint no-console: 0 */
  // console.log('productId:', params.id);
  // /* eslint no-console: 0 */
  // console.log('product from state:', product);
  // /* eslint no-console: 0 */
  // console.log('product name:', product.name);
  // /* eslint no-console: 0 */
  // console.log('product color:', product.color);
  // /* eslint no-console: 0 */
  // console.log('product categories:', product.categories);
  // /* eslint no-console: 0 */
  // console.log('wishlist:', product.inWishList);
  return (
    <div className="container">
      <Breadcrumbs />
      <Product
        name={product.name}
        img={product.imageUrls}
        color={product.color}
        sizes={product.sizes}
        currentPrice={product.currentPrice}
        id={product._id}
        description={product.description}
        inWishList={inWishList}
      />
      <SlickSlider categories={categories} />
    </div>
  );
};

export default OneProduct;
