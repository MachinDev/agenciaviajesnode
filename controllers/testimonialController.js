import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    // Validar
    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre es obligatorio'})
    }
    if(email.trim() === '') {
        errores.push({mensaje: 'El email es obligatorio'})
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje es obligatorio'})
    }
    if(errores.length > 0) {
        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar los errores en la vista
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}