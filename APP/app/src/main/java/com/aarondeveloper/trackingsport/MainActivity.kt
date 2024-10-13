package com.aarondeveloper.trackingsport

import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import android.widget.ProgressBar
import com.aarondeveloper.trackingsport.presentation.TrackingSportConnFallida
import com.aarondeveloper.trackingsport.presentation.isConnectedToInternet

class MainActivity : ComponentActivity() {
    private var webView: WebView? = null
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        progressBar = findViewById(R.id.progressBar)

        limpiarDatosWebView()
        setupWebView()

        if (isConnectedToInternet(this)) {
            webView?.loadUrl("https://trackingsport.000.pe/")
        } else {
            mostrarVistaOffline()
        }
    }

    private fun setupWebView() {
        webView?.settings?.javaScriptEnabled = true
        webView?.settings?.cacheMode = WebSettings.LOAD_NO_CACHE
        webView?.clearCache(true)

        webView?.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                progressBar.visibility = View.VISIBLE
                progressBar.progress = 0
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                progressBar.visibility = View.GONE
                if (!isConnectedToInternet(this@MainActivity)) {
                    mostrarVistaOffline()
                }
            }

        }
        webView?.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                progressBar.progress = newProgress
                if (newProgress == 100) {
                    progressBar.visibility = View.GONE
                } else {
                    progressBar.visibility = View.VISIBLE
                }
            }
        }
    }

    private fun limpiarDatosWebView() {
        webView?.clearCache(true)
        CookieManager.getInstance().removeAllCookies(null)
        CookieManager.getInstance().flush()
        WebView(this).clearFormData()
        WebView(this).clearHistory()
        WebView(this).clearSslPreferences()
        deleteDatabase("webview.db")
        deleteDatabase("webviewCache.db")
    }

    private fun mostrarVistaOffline() {
        progressBar.visibility = View.GONE
        setContent {
            TrackingSportConnFallida()
        }
    }

    override fun onBackPressed() {
        if (webView != null && webView!!.canGoBack()) {
            webView!!.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
