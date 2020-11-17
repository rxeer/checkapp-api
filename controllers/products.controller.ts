import boom from 'boom';
import { Response } from 'express';

import ProductModel from '@/models/Product';

import {
  ProductDto,
  IProductInterface,
  IProductsRequest,
} from '@/@types/models/Product';

const createProduct = (req: IProductsRequest, res: Response) => {
  if (req.body) {
    ProductModel.create(
      //  @ts-ignore
      new ProductDto({
        ...req.body,
        userId: req.params.userId,
      })
    )
      .then((data: IProductInterface) => {
        return res.send(data);
      })
      .catch((err) => res.json(boom.notFound(err)));
  }
};

const get = (req: IProductsRequest, res: Response) => {
  const userId = req.params.userId;

  return ProductModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IProductInterface[]) => {
      const list = data.filter(
        (product: IProductInterface) => product.userId === userId
      );
      res.send(list);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const remove = (req: IProductsRequest, res: Response) => {
  return ProductModel.findOneAndRemove({ _id: req.params.productId })
    .then((data) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.json(boom.notFound('Products id not found'));
      }
    })
    .catch((err) => res.send(boom.notFound(err)));
};

const update = (req: IProductsRequest, res: Response) => {
  return ProductModel.findOneAndUpdate(
    { _id: req.params.productId },
    {
      //   @ts-ignore
      $set: new ProductDto({
        ...req.body,
        userId: req.params.userId,
      }),
    },
    { new: true }
  )

    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.json(boom.notFound('Product id not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

export default {
  get,
  remove,
  update,
  createProduct,
};
