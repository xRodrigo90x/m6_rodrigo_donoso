
const express = require('express');
const app = express();
const anime = require('./anime.json')
const fs = require("fs/promises")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ENDPOINT PRINCIPAL
app.get("/api/anime", (req, res) => {
    res.send({ code: 200, message: "Listado de animes", data: anime })
})


//METODO GET POR ID O POR NOMBRE
app.get("/api/anime/:parametro", (req, res) => {
    try {
        const parametro = req.params.parametro.toLowerCase();

        const animeItem = anime[parametro] || Object.values(anime).find(animeObj =>
            animeObj.nombre.toLowerCase() === parametro

        );

        if (animeItem) {
            res.send({ code: 200, message: "Detalle del anime", data: animeItem });
        } else {
            res.status(404).send({ code: 404, message: "Anime no encontrado" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ code: 500, message: "Error interno del servidor" });
    }

});


//METODO PUT
app.put('/api/anime/:id', async (req, res) => {
    try {
        const data = await fs.readFile('anime.json', 'utf8');
        const animeData = JSON.parse(data);

        const idActializar = parseInt(req.params.id);
        const actualizacion = req.body;

        if (animeData[idActializar]) {
            animeData[idActializar] = { ...animeData[idActializar], ...actualizacion };
            await fs.writeFile('anime.json', JSON.stringify(animeData, null, 2), 'utf8');
            res.send({ code: 200, message: 'Anime actualizado exitosamente' });
        } else {
            res.status(404).send({ code: 404, message: 'Anime no encontrado' });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ code: 500, message: 'Error interno del servidor' });
    }
});


//METODO POST
app.post('/api/anime', async (req, res) => {
    try {
        const newAnime = req.body;

        const data = await fs.readFile('anime.json', 'utf8');
        const animeData = JSON.parse(data);

        const highestKey = Math.max(...Object.keys(animeData).map(Number));

        const nextKey = highestKey + 1;

        animeData[nextKey] = newAnime;

        await fs.writeFile('anime.json', JSON.stringify(animeData, null, 2), 'utf8');

        res.send({ code: 201, message: 'Anime creado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ code: 500, message: 'Error interno del servidor' });
    }
});

//METODO DELETE
app.delete('/api/anime/:id', async (req, res) => {
    try {
        const data = await fs.readFile('anime.json', 'utf8');
        const animeData = JSON.parse(data);

        let borrarId = parseInt(req.params.id)

        if (animeData[borrarId]) {
            delete animeData[borrarId]
            await fs.writeFile('anime.json', JSON.stringify(animeData, null, 2), 'utf8');

            res.send({ code: 201, message: 'Anime borrado exitosamente' });


        } else {
            res.status(404).send({ code: 404, message: 'Anime no encontrado' });

        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ code: 500, message: 'Error interno del servidor' });
    }
})

module.exports = app;
