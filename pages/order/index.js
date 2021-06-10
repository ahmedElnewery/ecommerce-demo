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


const Order = (props) => {

  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <Head>
        <title>Orders</title>
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
            <h2>Your Orders</h2>
            {cartItems.length === 0 ? (
              <Message>
                You have not any orders{" "}
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
                        <Col md={2} className="text-center">
                            <span >
                          {cartItem.quantity}
                            </span>
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="danger"
                            onClick={() => removeFromCartHandler(cartItem.id)}
                          >
                            cancel 
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Col>
         
        </Row>
      </Container>
    </>
  );
};
export default Order;
