import express from 'express';

import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';

import Order from '../models/orderModel.js';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const order = await newOrder.save();
    if (order) {
      res.status(201).send({ message: 'order created', order });
    } else {
      res
        .status(500)
        .send({ message: 'Something went wrong, please try again later' });
    }
  })
);
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      console.log('order found and sent');
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true),
        (order.paidAt = Date.now()),
        (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        });
      const updatedOrder = await order.save();
      if (updatedOrder) {
        res.send({ message: 'Order paid', order: updatedOrder });
      } else {
        res.status(500).send({ message: 'Unable to update order' });
      }
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);
export default orderRouter;
