// ./ake testmodel
import 'pdjs'
import connection from 'vendor/typeorm'
import { Order } from 'models'

async function main() {
  const conn = await connection

  /*
  const input = {
    type: 'SALE',
    customerId: 1,
    inventoryId: 1,
    orderItems: [{ productId: 1, variantId: 1, qty: 1, price: 10 }],
  }
  */

  const input = {
    type: 'SALE',
    customerId: '1',
    inventoryId: '1',
    orderItems: [{ qty: 1, price: 10, variantId: 1, productId: 1 }],
  }
  const record = Order.create()
  for (let [key, value] of Object.entries(input)) {
    record[key] = value
  }
  pd('record', record)
  await record.save()
  //pd('order.orderItems', order.orderItems)

  /*
  const order = await Order.findOne(13)
  pd('order', order)
  pd('order.orderItems', await order.orderItems)
  */
  //pd('shipment', await order.shipment)
  //pd('shipment.operator', await (await order.shipment).operator)
}

main()
