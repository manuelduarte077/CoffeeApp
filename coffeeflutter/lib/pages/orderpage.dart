import 'package:flutter/material.dart';

import '../datamanager.dart';

class OrderPage extends StatelessWidget {
  final DataManager dataManager;

  const OrderPage({super.key, required this.dataManager});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: EdgeInsets.zero,
      itemCount: dataManager.cart.length,
      itemBuilder: (context, index) {
        var item = dataManager.cart[index];

        return Padding(
          padding: const EdgeInsets.all(8.0),
          child: OrderItem(
            title: item.product.name,
            price: item.product.price,
            quantity: item.quantity.toString(),
            onRemove: () {
              dataManager.cartRemove(item.product);
            },
          ),
        );
      },
    );
  }
}

class OrderItem extends StatelessWidget {
  final Function()? onRemove;

  final String title;
  final double price;
  final String quantity;

  const OrderItem({
    super.key,
    this.onRemove,
    required this.title,
    required this.price,
    required this.quantity,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: ListTile(
        title: Text(title),
        subtitle: Text("\$${price * double.parse(quantity)}"),
        leading: Text("${quantity}x"),
        trailing: IconButton(
          color: Theme.of(context).primaryColor,
          onPressed: onRemove,
          icon: const Icon(Icons.delete),
        ),
      ),
    );
  }
}
