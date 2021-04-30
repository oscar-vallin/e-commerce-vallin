module.exports = (name,token) => {
    return `
        <div>
            <h2 style="text-align: center">Bienvenido!</h2>
            <p>Hola ${name} gracias por registrate con nostros</p>
            <p>Haz click aqui para continuar con tus compras!</p>
            <a href="http://localhost:4000/api/users/active-account/${token}" style="color: blue">confirmar</a>
        </div>
    `
}