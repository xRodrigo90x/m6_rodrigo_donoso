
const app = require('./index');

const main = () => {
    app.listen(3000, () => console.log("Servidor escuchando en hhtp://localhost:3000"))
}

main();