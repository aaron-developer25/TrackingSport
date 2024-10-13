package com.example.trackingsport;

import javafx.application.Application;
import javafx.event.Event;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.BorderPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Objects;

public class TrackingSport extends Application {
    private WebView webView;

    @Override
    public void start(Stage stage) throws IOException {
        Image icon = new Image(Objects.requireNonNull(getClass()
                .getResourceAsStream("/Icons/icon.png")));
        stage.getIcons().add(icon);

        webView = new WebView();
        WebEngine webEngine = webView.getEngine();

        if (isConnectedToInternet()) {
            webEngine.load("http://trackingsport.000.pe");
        } else {
            mostrarVistaOffline();
        }

        webView.setContextMenuEnabled(false);
        webView.setOnContextMenuRequested(Event::consume);

        BorderPane root = new BorderPane();
        root.setCenter(webView);

        Scene scene = new Scene(root, 1280, 800);
        stage.setTitle("TrackingSport");
        stage.setScene(scene);
        stage.show();
    }

    private void mostrarVistaOffline() {
        String offlineMessage = "<html>" +
                "<head><style>" +
                "body { display: flex; justify-content: center; align-items: center; " +
                "height: 100vh; margin: 0; font-family: Arial, sans-serif; }" +
                "h1 { color: red; }" +
                "h1, p { text-align: center; }" +
                "</style></head>" +
                "<body><div>" +
                "<h1>No hay conexión a Internet!!!</h1>" +
                "<p>Por favor, verifica tu conexión.</p>" +
                "</div></body></html>";
        webView.getEngine().loadContent(offlineMessage);
    }

    private boolean isConnectedToInternet() {
        try {
            URL url = new URL("http://www.google.com");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("HEAD");
            connection.setConnectTimeout(3000);
            connection.connect();
            return connection.getResponseCode() == 200;
        } catch (Exception e) {
            return false;
        }
    }

    public static void main(String[] args) {
        launch();
    }
}