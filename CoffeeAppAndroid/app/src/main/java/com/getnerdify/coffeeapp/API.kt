package com.getnerdify.coffeeapp

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

interface CoffeeMastersApiService {
    @GET("menu.json")
    suspend fun fetchMenu(): List<Category>
}

object API {
    private val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl("https://manuelduarte077.github.io/CoffeeApp/coffeeapi/api/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val menuService: CoffeeMastersApiService by lazy {
        retrofit.create(CoffeeMastersApiService::class.java)
    }
}