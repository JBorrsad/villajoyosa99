// Información de contacto - Clínica Dental Villajoyosa 99
export const CONTACT_INFO = {
	clinica: {
		name: 'Madrid',
		address: 'Calle de Villajoyosa, 99',
		postalCode: '28041',
		city: 'Madrid',
		country: 'España',
		phone: '91 798 86 69',
		mobile: '618 459 605',
		email: 'clinicavillajoyosa99@gmail.com',
		googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5!2d-3.6931!3d40.3456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4227c1e7b6f7a1%3A0x8c6f8b8b8b8b8b8b!2sCalle%20de%20Villajoyosa%2C%2099%2C%2028041%20Madrid!5e0!3m2!1ses!2ses!4v1707100000000!5m2!1ses!2ses'
	}
} as const;

// Información de la clínica
export const CLINIC_INFO = {
	name: 'Clínica Dental Villajoyosa 99',
	shortName: 'Villajoyosa 99',
	slogan: 'Tu clínica dental de confianza en Madrid desde 1999',
	description: 'Más de 25 años cuidando sonrisas en Madrid',
	foundedYear: 1999,
	yearsExperience: 25,
	googleRating: 5.0,
	googleReviews: 52
} as const;

// Servicios ofrecidos
export const SERVICES = [
	{
		id: 'visitas-regulares',
		title: 'Visitas Regulares',
		icon: 'tesicon4.png',
		image: '/img/servicios_cards/prevencion.png',
		description: 'Las revisiones regulares sirven para mucho más de lo que pueda parecer. Son una ocasión ideal para conocer todos los detalles acerca de tu estado de salud bucodental y hacer un seguimiento del mismo. En Clínica Dental Villajoyosa 99 realizamos revisiones completas que incluyen exploración clínica, radiografías cuando son necesarias y un plan de tratamiento personalizado para mantener tu boca en perfecto estado.',
		features: ['Revisiones completas', 'Seguimiento personalizado', 'La mejor prevención']
	},
	{
		id: 'odontologia-general',
		title: 'Odontología General',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/conservadora.png',
		description: 'La odontología general es la encargada de solucionar los problemas más básicos y comunes relacionados con la salud bucodental. En nuestra clínica tratamos caries, realizamos obturaciones, reconstrucciones dentales y ofrecemos un cuidado integral de tu boca. Nuestro objetivo es mantener tus dientes naturales el mayor tiempo posible mediante tratamientos conservadores y de calidad.',
		features: ['Obturaciones y empastes', 'Reconstrucciones dentales', 'Cuidado integral de tu boca']
	},
	{
		id: 'implantes',
		title: 'Implantes Dentales',
		icon: 'tesicon11.png',
		image: '/img/servicios_cards/implante.jpg',
		description: 'Los implantes dentales son la solución más avanzada para reponer dientes perdidos. Un implante es un tornillo de titanio de alta calidad que se introduce en el hueso maxilar o mandibular, sobre el cual se colocarán posteriormente coronas o prótesis. En Clínica Dental Villajoyosa 99 utilizamos tecnología de última generación y materiales de primera calidad para garantizar el éxito del tratamiento y la durabilidad de tus implantes.',
		features: ['Implantes de titanio', 'Coronas y prótesis sobre implantes', 'Recupera tu sonrisa']
	},
	{
		id: 'ortodoncia',
		title: 'Ortodoncia',
		icon: 'tesicon8.png',
		image: '/img/servicios_cards/orto.avif',
		description: 'La ortodoncia es una rama de la odontología que estudia, previene y corrige problemas dentales como desviación en la posición de los dientes, apiñamientos o diastemas. En nuestra clínica ofrecemos tratamientos de ortodoncia tanto para niños como para adultos, utilizando las técnicas más modernas y efectivas. Nuestro objetivo es conseguir una sonrisa perfecta y una correcta oclusión dental que mejore tanto la estética como la funcionalidad de tu boca.',
		features: ['Corrección de posición dental', 'Tratamiento de apiñamientos', 'Asesoramiento personalizado']
	},
	{
		id: 'endodoncia',
		title: 'Endodoncia',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/endo.png',
		description: 'Sabemos de sobra que el dolor de muelas es una de las cosas más incómodas que existen. Este dolor, normalmente es producido cuando una caries crece lo suficiente y llega al nervio. La endodoncia, también conocida como tratamiento de conductos, es el procedimiento que nos permite salvar dientes que de otra manera tendrían que ser extraídos. Eliminamos el tejido pulpar infectado, limpiamos los conductos radiculares y los sellamos para evitar futuras infecciones.',
		features: ['Tratamiento de conductos', 'Eliminación del dolor', 'Salvamos dientes comprometidos']
	},
	{
		id: 'periodoncia',
		title: 'Periodoncia',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/periodoncia.png',
		description: 'Una mala higiene sumado a otros factores puede desembocar en una enfermedad de las encías. La rama de la odontología que se encarga del cuidado y tratamiento de estas es la Periodoncia. Tratamos tanto la gingivitis como la periodontitis, enfermedades que afectan a las encías y al soporte de los dientes. Nuestro tratamiento periodontal incluye limpiezas profundas, curetajes y seguimiento personalizado para mantener tu salud periodontal en óptimas condiciones.',
		features: ['Tratamiento de encías', 'Gingivitis y Periodontitis', 'Salud periodontal']
	},
	{
		id: 'protesis',
		title: 'Prótesis',
		icon: 'tesicon11.png',
		image: '/img/servicios_cards/protesis.png',
		description: 'Las prótesis dentales son dispositivos creados a medida del paciente para restaurar la pérdida de uno o varios dientes y recuperar así la funcionalidad dental y su estética. En Clínica Dental Villajoyosa 99 realizamos prótesis removibles, prótesis fijas y prótesis sobre implantes, todas ellas diseñadas y fabricadas con los materiales más avanzados para garantizar máxima comodidad, durabilidad y un resultado estético natural.',
		features: ['Prótesis removibles', 'Prótesis fijas', 'Prótesis sobre implantes']
	},
	{
		id: 'odontopediatria',
		title: 'Odontopediatría',
		icon: 'tesicon4.png',
		image: '/img/servicios_cards/odontopediatria.jpg',
		description: 'En Clínica Dental Villajoyosa 99 también nos preocupamos por los más pequeños. Por eso, ofrecemos un servicio de odontopediatría ajustado a cada niño o niña para que su experiencia sea lo más llevadera posible. Nuestro equipo está especializado en el trato con niños, creando un ambiente relajado y amigable. Realizamos tratamientos preventivos, sellados de fisuras, tratamientos de caries y seguimiento del desarrollo dental para asegurar una sonrisa sana desde la infancia.',
		features: ['Atención especializada para niños', 'Ambiente adaptado', 'Experiencia sin estrés']
	}
] as const;

// Navegación
export const NAV_ITEMS = [
	{ label: 'Inicio', href: '#inicio' },
	{ label: 'Servicios', href: '#servicios' },
	{ label: 'Equipo', href: '#equipo' },
	{ label: 'Clínica', href: '#clinica' }
] as const;

// Equipo
export const TEAM = [
	{
		id: 'dr-polo',
		name: 'Dr. Alfredo Marcial Polo Lorduy',
		role: 'Director Médico - Odontólogo',
		bio: 'Licenciado en Odontología por la Universidad de Cartagena (Colombia) en 1987. Con más de 37 años de experiencia en el cuidado de la salud bucodental, el Dr. Polo Lorduy lidera nuestro equipo con dedicación y profesionalidad.',
		image: '/img/equipo/dr-polo.jpg',
		credentials: [
			'Universidad de Cartagena (1987)',
			'Más de 37 años de experiencia',
			'Especialista en odontología integral'
		]
	}
] as const;

// Horarios
export const SCHEDULE = {
	weekdays: {
		morning: '10:00 - 14:00',
		afternoon: '16:30 - 20:00'
	},
	saturday: {
		morning: '10:00 - 13:30',
		afternoon: 'Cerrado'
	},
	sunday: 'Cerrado'
} as const;
