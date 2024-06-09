import 'package:coffeeflutter/datamanager.dart';
import 'package:flutter/material.dart';

class MenuPage extends StatelessWidget {
  final DataManager dataManager;
  const MenuPage({super.key, required this.dataManager});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: dataManager.getMenu(),
      builder: ((context, snapshot) {
        if (snapshot.hasData) {
          var categories = snapshot.data!;

          return ListView.builder(
            itemCount: categories.length,
            itemBuilder: ((context, index) {
              return Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(categories[index].name),
                  ),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const ClampingScrollPhysics(),
                    itemCount: categories[index].products.length,
                    itemBuilder: (context, prodIndex) {
                      var product = categories[index].products[prodIndex];

                      return Padding(
                        padding: const EdgeInsets.all(8),
                        child: ProductItem(
                          imageUrl: product.imageUrl,
                          name: product.name,
                          price: product.price.toStringAsFixed(2),
                          onAdd: () {
                            dataManager.cartAdd(product);
                          },
                        ),
                      );
                    },
                  )
                ],
              );
            }),
          );
        } else {
          if (snapshot.hasError) {
            // Data is not there, because of an error
            return const Text("There was en error");
          } else {
            // Data is in progress (the future didn't finish)
            return const CircularProgressIndicator();
          }
        }
      }),
    );
  }
}

class ProductItem extends StatelessWidget {
  final String imageUrl;
  final String name;
  final String price;
  final Function()? onAdd;

  const ProductItem({
    super.key,
    required this.imageUrl,
    required this.name,
    required this.price,
    this.onAdd,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: Column(
        children: [
          Image.network(
            imageUrl,
            width: double.infinity,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      name,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text("\$$price"),
                  ],
                ),
                FilledButton.icon(
                  onPressed: onAdd,
                  label: const Icon(Icons.shopping_cart),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
