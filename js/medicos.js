const data = [
    {
        nombre: "Dra. María González Pérez",
        especialidad: "Ginecología y Obstetricia",
        ubicacion: "Clínica Infantil Sonrisas, Av. Juárez #123, Ciudad de México",
        horarios: "Lunes a viernes de 9:00 a.m. a 5:00 p.m.",
        contacto: {
            telefono: "(55) 1234-5678",
            correo: "mgonzalez@clinicasomrisas.com"
        },
        reseñas: "4.8/5 basado en 50 opiniones de pacientes.",
        biografia: "La Dra. María González es una pediatra con más de 10 años de experiencia, especializada en el cuidado integral de los niños desde el nacimiento hasta la adolescencia."
    },
    {
        nombre: "Dr. Carlos Sánchez Rodríguez",
        especialidad: "medicina general",
        ubicacion: "Piso ",
        horarios: "Martes y jueves de 10:00 a.m. a 2:00 p.m.",
        contacto: {
            telefono: "+34 123 456 789",
            correo: "csanchez@hospital.esperanza.es"
        },
        reseñas: "4.5/5 basado en 30 opiniones de pacientes.",
        biografia: "El Dr. Carlos Sánchez es un cirujano ortopédico reconocido por su precisión quirúrgica y su enfoque compasivo hacia sus pacientes."
    },
    {
        nombre: "Dra. Ana Martínez López",
        especialidad: "Ginecología y Obstetricia",
        ubicacion: "Clínica de Dermatología y Estética, Calle Gran Vía #789, Madrid, España",
        horarios: "Lunes, miércoles y viernes de 8:00 a.m. a 4:00 p.m.",
        contacto: {
            telefono: "+34 987 654 321",
            correo: "amartinez@dermaestetica.es"
        },
        reseñas: "4.9/5 basado en 60 opiniones de pacientes.",
        biografia: "La Dra. Ana Martínez es una dermatóloga experta en tratamientos estéticos y médicos para el cuidado de la piel, con una trayectoria destacada en el campo de la dermatología."
    },
    {
        nombre: "Dr. Juan Pérez García",
        especialidad: "Cardiología",
        ubicacion: "Hospital del Corazón, Carrera 10 #456, Bogotá, Colombia",
        horarios: "Martes y jueves de 9:00 a.m. a 1:00 p.m.",
        contacto: {
            telefono: "+57 123 456 789",
            correo: "juperez@hospitalcorazon.com.co"
        },
        reseñas: "4.7/5 basado en 40 opiniones de pacientes.",
        biografia: "El Dr. Juan Pérez es un cardiólogo altamente capacitado con una amplia experiencia en el diagnóstico y tratamiento de enfermedades del corazón."
    },
    {
        nombre: "Dra. Laura Fernández Ruiz",
        especialidad: "Ginecología y Obstetricia",
        ubicacion: "Clínica de la Mujer, Av. Constitución #234, Santiago, Chile",
        horarios: "Lunes a viernes de 10:00 a.m. a 6:00 p.m.",
        contacto: {
            telefono: "+56 9 8765 4321",
            correo: "lfernandez@clinicamujer.cl"
        },
        reseñas: "4.6/5 basado en 50 opiniones de pacientes.",
        biografia: "La Dra. Laura Fernández es una ginecóloga comprometida con la salud integral de la mujer, ofreciendo atención personalizada y de calidad."
    },
    {
        nombre: "Dr. José García Martínez",
        especialidad: "Medicina Interna",
        ubicacion: "Centro Médico Integral, Av. Independencia #567, Buenos Aires, Argentina",
        horarios: "Martes y jueves de 10:00 a.m. a 4:00 p.m.",
        contacto: {
            telefono: "+54 11 2345 6789",
            correo: "jgarcia@centromedicointegral.com.ar"
        },
        reseñas: "4.8/5 basado en 45 opiniones de pacientes.",
        biografia: "El Dr. José García es un internista reconocido por su enfoque holístico en el tratamiento de enfermedades complejas."
    },
    {
        nombre: "Dra. Marta Rodríguez Gómez",
        especialidad: "Psiquiatría",
        ubicacion: "Centro de Salud Mental, Calle Mayor #789, Madrid, España",
        horarios: "Lunes a viernes de 9:00 a.m. a 5:00 p.m.",
        contacto: {
            telefono: "+34 987 654 321",
            correo: "mrodriguez@saludmental.es"
        },
        reseñas: "4.9/5 basado en 55 opiniones de pacientes.",
        biografia: "La Dra. Marta Rodríguez es una psiquiatra con una sólida formación académica y una amplia experiencia en el tratamiento de trastornos mentales."
    },
    {
        nombre: "Dr. Luis Hernández Flores",
        especialidad: "Oftalmología",
        ubicacion: "Clínica de Ojos Visión Clara, Av. Revolución #123, Ciudad de México",
        horarios: "Martes a viernes de 8:00 a.m. a 3:00 p.m.",
        contacto: {
            telefono: "(55) 9876-5432",
            correo: "lhernandez@visionclara.com.mx"
        },
        reseñas: "4.7/5 basado en 40 opiniones de pacientes.",
        biografia: "El Dr. Luis Hernández es un oftalmólogo comprometido con la prevención y tratamiento de enfermedades oculares, ofreciendo tecnología de vanguardia en su consulta."
    },
    {
        nombre: "Dra. Ana López Martínez",
        especialidad: "Endocrinología",
        ubicacion: "Centro de Endocrinología Integral, Calle San Juan #456, Buenos Aires, Argentina",
        horarios: "Lunes a viernes de 10:00 a.m. a 6:00 p.m.",
        contacto: {
            telefono: "+54 11 9876 5432",
            correo: "alopez@endocrinologiaintegral.com.ar"
        },
        reseñas: "4.6/5 basado en 35 opiniones de pacientes.",
        biografia: "La Dra. Ana López es una endocrinóloga reconocida por su enfoque multidisciplinario en el manejo de trastornos hormonales."
    },
    {
        nombre: "Dr. Javier Ramírez Pérez",
        especialidad: "Cirugía General",
        ubicacion: "Hospital San Lucas, Av. Principal #789, Santiago, Chile",
        horarios: "Martes y jueves de 9:00 a.m. a 3:00 p.m.",
        contacto: {
            telefono: "+56 9 8765 4321",
            correo: "jramirez@hsanlucas.cl"
        },
        reseñas: "4.5/5 basado en 30 opiniones de pacientes.",
        biografia: "El Dr. Javier Ramírez es un cirujano general con una sólida experiencia en procedimientos quirúrgicos tanto convencionales como mínimamente invasivos."
    }
];