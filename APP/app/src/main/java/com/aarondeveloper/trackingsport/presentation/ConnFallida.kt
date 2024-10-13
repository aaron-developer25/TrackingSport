package com.aarondeveloper.trackingsport.presentation

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.aarondeveloper.trackingsport.R
import com.aarondeveloper.trackingsport.ui.theme.WhiteOscuro

@Composable
fun TrackingSportConnFallida() {
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        Image(
            painter = painterResource(id = R.drawable.background),
            contentDescription = "Background Image",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Image(
                painter = painterResource(id = R.drawable.ico_robot),
                contentDescription = "Robot Icon",
                modifier = Modifier.size(100.dp)
            )

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                text = "¡Ups! Hemos perdido tu conexión con el exterior.\nConéctate a internet por favor.",
                fontSize = 18.sp,
                textAlign = TextAlign.Center,
                color = WhiteOscuro
            )
        }
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
fun TrackingSportPreview() {
        TrackingSportConnFallida()
}
