package com.aarondeveloper.trackingsport.presentation

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkInfo

fun isConnectedToInternet(context: Context): Boolean {
    val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val activeNetwork: NetworkInfo? = connectivityManager.activeNetworkInfo
    return activeNetwork != null && activeNetwork.isConnected
}