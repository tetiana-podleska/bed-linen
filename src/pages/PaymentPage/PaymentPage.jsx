/* eslint-disable */

import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutHeader from '../../components/CheckoutHeader/CheckoutHeader';
import { ReactComponent as MasterCard } from '../../images/svg/masterCard.svg';
import { ReactComponent as Visa } from '../../images/svg/visa-logo.svg';
import { ReactComponent as HandsWithMoneysa } from '../../images/svg/HandsWithMoney.svg';
import './PaymentPage.scss';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { setCartProducts } from '../../store/operations';
import NoItems from '../../components/NoItems/NoItems';
import { CHANGE_PAYMENT_METHOD } from '../../store/types';

export default function PaymentPage(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const items = useSelector((state) => state.items.data);
  const payBy = useSelector((state) => state.payByCard);
  let totalPrice = 0;
  const bagItems = [];
  const bag = JSON.parse(localStorage.getItem('bag')) || [];
  const jwt = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(setCartProducts());
  }, [dispatch]);

  const getLocalCart = () => {
    if (jwt === null) {
      items.forEach((el) => {
        bag.forEach((element) => {
          if (element === el._id) {
            bagItems.push(el);
          }
        });
      });
      items.map((el) => {
        if (el.inShoppingBag === true) {
          totalPrice += el.currentPrice * el.quantityInBag;
        }
        return el;
      });
    } else if (jwt !== null) {
      const productsInCart = useSelector((state) => state.productsInCart.data);
      productsInCart.forEach((el) => {
        bagItems.push(el);
      });
      bagItems.map((el) => {
        totalPrice += el.product.currentPrice * el.cartQuantity;
        return el;
      });
    }
  };

  return (
    <div>
      {getLocalCart()}
      <CheckoutHeader payment />
      <div className="payment__container">
        <div className="registration">
          <div className="registration-right__block">
            <p className="registration__title">PAYMENT METHOD</p>

            {payBy ? (
              <>
                <div
                  className="pay_by active"
                  onClick={() =>
                    dispatch({ type: CHANGE_PAYMENT_METHOD, payload: true })
                  }
                >
                  <div className="pay__container">
                    <div className="payment-by-card__header">
                      <div className="pay__text-content">
                        <div className="checked active" />
                        <div className="">
                          <p className="credit-card">Credit Card</p>
                          <p className="attention">
                            Please enter your credit card details
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <MasterCard />
                        <Visa />
                      </div>
                    </div>
                    <PaymentForm history={history} />
                  </div>
                </div>

                <hr className="decor-line" />

                <div
                  className="pay_by"
                  onClick={() =>
                    dispatch({ type: CHANGE_PAYMENT_METHOD, payload: false })
                  }
                >
                  <div className="pay__container">
                    <div className="payment-by-card__header">
                      <div className="pay__text-content">
                        <div className="checked" />
                        <div className="">
                          <p className="credit-card">Payment to the courier</p>
                          <p className="attention">
                            Cash or card payment to the courier upon delivery
                          </p>
                        </div>
                      </div>
                      <HandsWithMoneysa />
                    </div>
                  </div>
                </div>
              </>
            ) : <>
            <div
              className="pay_by"
              onClick={() =>
                dispatch({ type: CHANGE_PAYMENT_METHOD, payload: true })
              }
            >
              <div className="pay__container">
                <div className="payment-by-card__header">
                  <div className="pay__text-content">
                    <div className="checked active" />
                    <div className="">
                      <p className="credit-card">Credit Card</p>
                      <p className="attention">
                        Please enter your credit card details
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <MasterCard />
                    <Visa />
                  </div>
                </div>
                <PaymentForm history={history} />
              </div>
            </div>

            <hr className="decor-line" />

            <div
              className="pay_by active"
              onClick={() =>
                dispatch({ type: CHANGE_PAYMENT_METHOD, payload: false })
              }
            >
              <div className="pay__container">
                <div className="payment-by-card__header">
                  <div className="pay__text-content">
                    <div className="checked" />
                    <div className="">
                      <p className="credit-card">Payment to the courier</p>
                      <p className="attention">
                        Cash or card payment to the courier upon delivery
                      </p>
                    </div>
                  </div>
                  <HandsWithMoneysa />
                </div>
              </div>
            </div>
          </>}

            <hr className="decor-line" />
            <p
              className="back__button"
              onClick={() => {
                history.goBack();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
              >
                <path
                  d="M6.87695 11.7964L1.01147 6.40533L6.85379 0.989186"
                  stroke="#373F41"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </p>
          </div>
          <div className="registration-left__block">
            <p className="registration__title">SUMMARY</p>
            {bagItems.length === 0 ? <NoItems /> : null}
            {jwt === null
              ? bagItems.map((el) => {
                  return (
                    <div className="card" key={el.itemNo}>
                      <img
                        src={el.imageUrls[0]}
                        alt="image"
                        width="150px"
                        height="150px"
                      />
                      <div className="card-text-content">
                        <p className="card-text-content__title">{el.name}</p>
                        <p className="card-text-content__price">
                          ${el.currentPrice}
                        </p>
                      </div>
                    </div>
                  );
                })
              : bagItems.map((el) => {
                  return (
                    <div className="card" key={el.product.itemNo}>
                      <img
                        src={el.product.imageUrls[0]}
                        alt="image"
                        width="150px"
                        height="150px"
                      />
                      <div className="card-text-content">
                        <p className="card-text-content__title">
                          {el.product.name}
                        </p>
                        <p className="card-text-content__price">
                          ${el.product.currentPrice}
                        </p>
                      </div>
                    </div>
                  );
                })}
            <hr className="decor-line" />
            <p className="registration-coupone">ENTER COUPONE CODE</p>
            <p className="registration-price">
              <span>SUBTOTAL</span>
              <span>${totalPrice}</span>
            </p>
            <p className="registration-price">
              <span>SHIPPING</span>
              <span>FREE</span>
            </p>
            <p className="registration-price">
              <span>TAXES</span>
              <span>$5</span>
            </p>
            <p className="total-price">
              <span>TOTAL</span>
              <span>${(totalPrice += 5)}</span>
            </p>
            <button
              className="next__button btn"
              variant="dark"
              type="submit"
              form="payment-form"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
