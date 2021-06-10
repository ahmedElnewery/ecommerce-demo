import React from "react";
import { useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Router from 'next/router'
import { useRouter } from "next/router";

import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import Dropdown from "../../Components/UI/Dropdown/Dropdown";
import Message from "../../Components/UI/Message/Message";
import Head from "next/head";

export const getStaticPaths = async () => {
  const res = await fetch("https://nameless-waters-19458.herokuapp.com/api/products");
  const products = await res.json();
  // map data to an array of path objects with params (id)
  const paths = products.map((product) => {
    return {
      params: { id: product._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const id = context.params.id;

  return {
    props: { id: id },
  };
};

const Cart = (props) => {
  const router = useRouter();
  const id = props.id;
  const qunatity = Number(router.query) ? Number(router.query) : 1;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qunatity));
    }
  }, [dispatch, id, qunatity]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const checkoutHandler = () => {
    Router.push("/order");
  };
  return (
    <>
      <Head>
        <title>Cart</title>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <h2>SHOPPING CART</h2>
            {cartItems.length === 0 ? (
              <Message>
                No! Cart Item yet{" "}
                <Link href="/">
                  <a>Go Back</a>
                </Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((cartItem) => {
                  return (
                    <ListGroup.Item key={cartItem.id}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                          />
                        </Col>
                        <Col md={3}>
                          <Link href={`/product/${cartItem.id}`}>
                            <a>{cartItem.name}</a>
                          </Link>
                        </Col>
                        <Col md={2}>
                          $ {(cartItem.price * cartItem.quantity).toFixed(2)}
                        </Col>
                        <Col md={2}>
                          <Dropdown
                            length={cartItem.countInStock}
                            value={cartItem.quantity}
                            valueHandler={(e) =>
                              dispatch(
                                addToCart(cartItem.id, Number(e.target.value))
                              )
                            }
                          />
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="light"
                            onClick={() => removeFromCartHandler(cartItem.id)}
                          >
                            <i className="fas fa-trash text-danger"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h4>
                    subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    items
                  </h4>
                  <p>
                    Total Price: $
                    {cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Cart;
