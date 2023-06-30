import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        },
        resources: {
            en: {
                translation: {
                    Home: "Home",
                    "About Us": "About Us",
                    "Creative Categories": "Creative Categories",
                    "Our Valuable Providers services": "Our Valuable Providers services",
                    "Know About Us!": "Know About Us!",
                    "All Service Provider": "All Service Provider",
                    "Get In Touch With Us!": "Get In Touch With Us!",
                    "Let's Talk": "Let's Talk",
                    "Quick Email": "Quick Email",
                    "Office Address": "Office Address",
                    "Opening Hours": "Opening Hours",
                    Name: "Name",
                    Email: "Email",
                    Subject: "Subject",
                    Message: "Message",
                    Categories: "Categories",
                    Providers: "Providers",
                    Contact: "Contact",
                    "Sign in": "Sign in",
                    Search: "Search",
                    "View all Providers": "View all Providers",
                    "USEFUL CATEGORIES": "USEFUL CATEGORIES",
                    Carpenter: "Carpenter",
                    Salon: "Salon",
                    "Car Service": "Car Service",
                    "Electronic Services": "Electronic Services",
                    "Pest Control Service": "Pest Control Service",
                    "Plumbing Service": "Plumbing Service",
                    "Ac Service": "Ac Service",
                    "Home Cleaning": "Home Cleaning",
                    "Socket Switch Installation": "Socket Switch Installation",
                    "Laundry Services": "Laundry Services",
                    "Hair color": "Hair color",
                    "Electronic Store": "Electronic Store",
                    "Brake Repair": "Brake Repair",
                    "Fan installation": "Fan installation",
                    "Pest Guard": "Pest Guard",
                    "QUICK LINKS": "QUICK LINKS",
                    "KEEP UP WITH NEWS FROM US": "KEEP UP WITH NEWS FROM US",
                    "Copyright @ 2023 eDemand.All Rights Reserved": "Copyright @ 2023 eDemand.All Rights Reserved",
                    "Get the latest Subscription Offers & news from eDemand": "Get the latest Subscription Offers & news from",
                    edemand: "edemand",
                    "Order Completed": "Order Completed",
                    "Light Theme": "Light Theme",
                    "Dark Theme": "Dark Theme",
                    "eDemand Setting": "eDemand Setting",
                    Languages: "Languages",
                    "All Service Provider": "All Service Provider",
                    About: "About",
                    "Welcome to eDemmand is a professional on-demand service plateform, here we will provide you only service, with a focus on dependability and providing doorstep services.": " Welcome to eDemmand is a professional on-demand service plateform, here we will provide you only service, with a focus on dependability and providing doorstep services.",
                    "we are working to turn our passion for on demmmand service into a booming our on-demmand service as much as we enjoy offering them. I will keep posting more inportant post on my website for all of you. please give us support and love. Thanks for visiting our site. Have a Nice day !": "we are working to turn our passion for on demmmand service into a booming our on-demmand service as much as we enjoy offering them. I will keep posting more inportant post on my website for all of you. please give us support and love. Thanks for visiting our site. Have a Nice day !",
                    "Contact Us": "Contact Us",
                    "Send Message": "Send Message",
                    "No Products here!": "No Products here!",
                    "Your cart is empty.": "Your cart is empty.",
                    "Login & Add products to that we": "Login & Add products to that we",
                    "can serve you!": "can serve you!",
                    "Add": "Add",
                    "Our Services": "Our Services",
                    "Sub-Categories": "Sub-Categories",
                    "Enter Verification Code": "Enter Verification Code",
                    "We have Sent a Verification code to": "We have Sent a Verification code to",
                    "Your Number": "Your Number",
                    "Verify and Process": "Verify and Process",
                    "Welcome!": "Welcome!",
                    "Enter Phone number to continue and we will a verification code to this number": "Enter Phone number to continue and we will a verification code to this number",
                    "Login to continue": "Login to continue",
                    "By Continue you agree to out": "By Continue you agree to out",
                    "Terms of services": "Terms of services",
                    "Privacy Policy": "Privacy Policy",
                    "Login": "Login",
                    Edit: "Edit",
                    Name: "Name",
                    Email: "Email",
                    Phone: "Phone",
                    "Save Profile": "Save Profile",
                    Bookings: "Bookings",
                    "Manage Addresses": "Manage Addresses",
                    "Payment History": "Payment History",
                    Bookmarks: "Bookmarks",
                    Notifications: "Notifications",
                    Logout: "Logout",
                    "Delete Account": "Delete Account",
                }
            },
            de: {
                translation: {
                    Home: "Startseite",
                    "About Us": "Über uns",
                    "Creative Categories": "Kreative Kategorien",
                    "Our Valuable Providers services": "Unsere wertvollen Anbieterdienste",
                    "Know About Us!": "Erfahren Sie mehr über uns!",
                    "All Service Provider": "Alle Dienstleister",
                    "Get In Touch With Us!": "Kontaktieren Sie uns!",
                    "Let's Talk": "Lass uns reden",
                    "Quick Email": "Schnelle E-Mail",
                    "Office Address": "Büroadresse",
                    "Opening Hours": "Öffnungszeiten",
                    Name: "Name",
                    Email: "E-Mail",
                    Subject: "Betreff",
                    Message: "Nachricht",
                    Categories: "Kategorien",
                    Providers: "Anbieter",
                    Contact: "Kontakt",
                    "Sign in": "Anmelden",
                    Search: "Suche",
                    "View all Providers": "Alle Anbieter anzeigen",
                    "USEFUL CATEGORIES": "NÜTZLICHE KATEGORIEN",
                    Carpenter: "Tischler",
                    Salon: "Friseursalon",
                    "Car Service": "Autoservice",
                    "Electronic Services": "Elektronikdienstleistungen",
                    "Pest Control Service": "Schädlingsbekämpfung",
                    "Plumbing Service": "Sanitär Service",
                    "Ac Service": "Klimaanlagenservice",
                    "Home Cleaning": "Hausreinigung",
                    "Socket Switch Installation": "Steckdosen-Schalterinstallation",
                    "Laundry Services": "Wäschedienstleistungen",
                    "Hair color": "Haarfarbe",
                    "Electronic Store": "Elektronikgeschäft",
                    "Brake Repair": "Bremsenreparatur",
                    "Fan installation": "Ventilatorinstallation",
                    "Pest Guard": "Schädlingsabwehr",
                    "QUICK LINKS": "SCHNELLE LINKS",
                    "KEEP UP WITH NEWS FROM US": "Bleiben Sie über Neuigkeiten von uns auf dem Laufenden",
                    "Copyright @ 2023 eDemand.All Rights Reserved":
                        "Copyright @ 2023 eDemand. Alle Rechte vorbehalten",
                    "Get the latest Subscription Offers & news from edemand":
                        "Erhalten Sie die neuesten Abonnementangebote und Neuigkeiten von edemand",
                    edemand: "edemand",
                    "Order Completed": "Bestellung abgeschlossen",
                    "View All Services": "Alle Dienste anzeigen",
                    "Light Theme": "Licht thema",
                    "Dark Theme": "Dunkles Thema",
                    "Change Language": "Sprache ändern",
                    "Select Language": "Sprache auswählen",
                    English: "Englisch",
                    German: "Deutsche",
                    Spanish: "Spanisch",
                    "Enter Verification Code": "Geben Sie den Bestätigungscode ein",
                    "We have Sent a Verification code to": "Wir haben einen Bestätigungscode an",
                    "Your Number": "Deine Nummer",
                    "Verify and Process": "Überprüfen und weitermachen",
                    "Welcome!": "Willkommen!",
                    "Enter Phone number to continue and we will a verification code to this number":
                        "Geben Sie die Telefonnummer ein, um fortzufahren, und wir senden einen Bestätigungscode an diese Nummer",
                    "Login to continue": "Anmelden, um fortzufahren",
                    "By Continue you agree to out": "Durch Fortsetzen stimmen Sie unseren",
                    "Terms of services": "Nutzungsbedingungen",
                    "Privacy Policy": "Datenschutzbestimmungen",
                    "Login": "Anmeldung",
                    Edit: "Bearbeiten",
                    Name: "Name",
                    Email: "E-Mail",
                    Phone: "Telefon",
                    "Save Profile": "Profil speichern",
                    Bookings: "Buchungen",
                    "Manage Addresses": "Adressen verwalten",
                    "Payment History": "Zahlungsverlauf",
                    Bookmarks: "Lesezeichen",
                    Notifications: "Benachrichtigungen",
                    Logout: "Abmelden",
                    "Delete Account": "Konto löschen"
                }
            },
            es: {
                translation: {
                    Home: "Inicio",
                    "About Us": "Sobre nosotros",
                    "Creative Categories": "Categorías creativas",
                    "Our Valuable Providers services": "Nuestros servicios de proveedores valiosos",
                    "Know About Us!": "¡Conócenos!",
                    "All Service Provider": "Todos los proveedores de servicios",
                    "Get In Touch With Us!": "¡Ponte en contacto con nosotros!",
                    "Let's Talk": "Hablemos",
                    "Quick Email": "Correo rápido",
                    "Office Address": "Dirección de la oficina",
                    "Opening Hours": "Horario de apertura",
                    Name: "Nombre",
                    Email: "Correo electrónico",
                    Subject: "Asunto",
                    Message: "Mensaje",
                    Categories: "Categorías",
                    Providers: "Proveedores",
                    Contact: "Contacto",
                    "Sign in": "Iniciar sesión",
                    Search: "Buscar",
                    "View all Providers": "Ver todos los proveedores",
                    "USEFUL CATEGORIES": "CATEGORÍAS ÚTILES",
                    Carpenter: "Carpintero",
                    Salon: "Salón",
                    "Car Service": "Servicio de coche",
                    "Electronic Services": "Servicios electrónicos",
                    "Pest Control Service": "Servicio de control de plagas",
                    "Plumbing Service": "Servicio de fontanería",
                    "Ac Service": "Servicio de aire acondicionado",
                    "Home Cleaning": "Limpieza del hogar",
                    "Socket Switch Installation": "Instalación de interruptor de enchufe",
                    "Laundry Services": "Servicios de lavandería",
                    "Hair color": "Color de cabello",
                    "Electronic Store": "Tienda de electrónica",
                    "Brake Repair": "Reparación de frenos",
                    "Fan installation": "Instalación de ventilador",
                    "Pest Guard": "Guardia de plagas",
                    "QUICK LINKS": "ENLACES RÁPIDOS",
                    "KEEP UP WITH NEWS FROM US": "Manténgase al día con las noticias de nosotros",
                    "Copyright @ 2023 eDemand.All Rights Reserved":
                        "Derechos de autor @ 2023 eDemand. Todos los derechos reservados",
                    "Get the latest Subscription Offers & news from edemand":
                        "Obtenga las últimas ofertas de suscripción y noticias de edemand",
                    edemand: "edemand",
                    "Order Completed": "Pedido completado",
                    "View All Services": "Ver todos los servicios",
                    "Light Theme": "Tema claro",
                    "Dark Theme": "Tema oscuro",
                    "Change Language": "Cambiar idioma",
                    "Select Language": "Seleccionar idioma",
                    English: "Inglés",
                    German: "Alemán",
                    Spanish: "Español",
                    "Enter Verification Code": "Ingrese el código de verificación",
                    "We have Sent a Verification code to": "Hemos enviado un código de verificación a",
                    "Your Number": "Tu número",
                    "Verify and Process": "Verificar y procesar",
                    "Welcome!": "¡Bienvenido!",
                    "Enter Phone number to continue and we will a verification code to this number":
                        "Ingresa tu número de teléfono para continuar y te enviaremos un código de verificación a este número",
                    "Login to continue": "Iniciar sesión para continuar",
                    "By Continue you agree to out": "Al continuar, aceptas nuestra",
                    "Terms of services": "Términos de servicio",
                    "Privacy Policy": "Política de privacidad",
                    "Login": "Acceso",
                    Edit: "Editar",
                    Name: "Nombre",
                    Email: "Correo electrónico",
                    Phone: "Teléfono",
                    "Save Profile": "Guardar perfil",
                    Bookings: "Reservas",
                    "Manage Addresses": "Gestionar direcciones",
                    "Payment History": "Historial de pagos",
                    Bookmarks: "Marcadores",
                    Notifications: "Notificaciones",
                    Logout: "Cerrar sesión",
                    "Delete Account": "Eliminar cuenta"
                }
            }
        }
    });

export default i18n;
