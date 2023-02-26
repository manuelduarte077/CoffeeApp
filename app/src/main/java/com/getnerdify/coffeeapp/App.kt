package com.getnerdify.coffeeapp

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Scaffold
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import com.getnerdify.coffeeapp.pages.InfoPage
import com.getnerdify.coffeeapp.pages.MenuPage
import com.getnerdify.coffeeapp.pages.OrderPage


@Composable
@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
fun App(dataManager: DataManager) {
    val selectedRoute = remember {
        mutableStateOf("menu")
    }
    Scaffold(

        topBar = {
            TopAppBar {
                AppTitle()
            }
        },
        content = {
            when (selectedRoute.value) {
                Routes.MenuPage.route -> MenuPage(dataManager)
                Routes.OffersPage.route -> OffersPage()
                Routes.OrderPage.route -> OrderPage(dataManager)
                Routes.InfoPage.route -> InfoPage()
            }
        },
        bottomBar = {
            NavBar(
                selectedRoute = selectedRoute.value,
                onChange = { route ->
                    selectedRoute.value = route
                })
        }
    )
}

@Composable
fun AppTitle() {
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier.fillMaxWidth()
    ) {
        Image(
            painter = painterResource(id = R.drawable.logo),
            contentDescription = "Coffee Masters Logo"
        )
    }
}