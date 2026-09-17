'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

type ModalType = "none" | "legal" | "privacy" | "data" | "cookies" | "faq";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Close modal when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal("none");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (e: React.MouseEvent, type: ModalType) => {
    e.preventDefault();
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal("none");
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleAccordionKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion(index);
    }
  };

  return (
    <>
      <footer id="footer" className="w-full bg-[#181818] border-t-2 border-[#00b9ff] text-white pt-12 pb-6 px-4 sm:px-8 md:px-12 font-['F1Regular'] relative z-40">
        
        {/* Main Grid Container */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-gray-800">
          
          {/* Col 1: Brand & Social */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
            <Link href="/" className="text-xl lg:text-2xl font-bold tracking-wider font-['F1Title'] uppercase hover:text-[#00b9ff] transition-colors">
              Motoring Community
            </Link>
            
            <p className="text-xs sm:text-sm text-gray-400 italic max-w-xs leading-relaxed">
              &quot;The home of all the race fans, where we can meet together.&quot;
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              <a 
                target="_blank" 
                title="GitHub - Christian Moreno" 
                href="https://github.com/Chriiis85" 
                className="w-9 h-9 rounded-full bg-[#282828] hover:bg-[#00b9ff] hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-md p-2" 
                aria-label="GitHub" 
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z" />
                </svg>
              </a>

              <a 
                target="_blank" 
                title="LinkedIn - Christian Moreno" 
                href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/" 
                className="w-9 h-9 rounded-full bg-[#282828] hover:bg-[#00b9ff] hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-md p-2" 
                aria-label="LinkedIn" 
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 -2 44 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" transform="translate(-702.000000, -265.000000)" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Menu */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-base font-bold font-['F1Title'] uppercase tracking-wider text-white mb-2">
              Menu
            </h2>
            <div className="w-8 h-0.5 bg-[#00b9ff] mb-3 mx-auto sm:mx-0"></div>
            
            <nav className="flex flex-col gap-2 text-xs sm:text-sm text-gray-300">
              <Link href="/" className="hover:text-[#00b9ff] transition-colors py-0.5">Main Page</Link>
              <Link href="/about" className="hover:text-[#00b9ff] transition-colors py-0.5">About Formula One</Link>
              <Link href="/drivers" className="hover:text-[#00b9ff] transition-colors py-0.5">Season Drivers</Link>
              <Link href="/teams" className="hover:text-[#00b9ff] transition-colors py-0.5">Season Constructors</Link>
              <Link href="/calendar" className="hover:text-[#00b9ff] transition-colors py-0.5">Season Calendar</Link>
              <Link href="/standings" className="hover:text-[#00b9ff] transition-colors py-0.5">Season Standings</Link>
              <Link href="/data" className="hover:text-[#00b9ff] transition-colors py-0.5">Historic Data</Link>
              <Link href="/forum" className="hover:text-[#00b9ff] transition-colors py-0.5">Community Forum</Link>
            </nav>
          </div>

          {/* Col 3: Legal & Privacy */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-base font-bold font-['F1Title'] uppercase tracking-wider text-white mb-2">
              Legal &amp; Privacy
            </h2>
            <div className="w-8 h-0.5 bg-[#00b9ff] mb-3 mx-auto sm:mx-0"></div>

            <nav className="flex flex-col gap-2 text-xs sm:text-sm text-gray-300">
              <a href="#footer" onClick={(e) => openModal(e, "legal")} className="hover:text-[#00b9ff] transition-colors py-0.5 cursor-pointer">
                Aviso Legal &amp; Disclaimer
              </a>
              <a href="#footer" onClick={(e) => openModal(e, "privacy")} className="hover:text-[#00b9ff] transition-colors py-0.5 cursor-pointer">
                Política de Privacidad (RGPD)
              </a>
              <a href="#footer" onClick={(e) => openModal(e, "data")} className="hover:text-[#00b9ff] transition-colors py-0.5 cursor-pointer">
                Uso de Datos &amp; APIs
              </a>
              <a href="#footer" onClick={(e) => openModal(e, "cookies")} className="hover:text-[#00b9ff] transition-colors py-0.5 cursor-pointer">
                Política de Cookies
              </a>
            </nav>
          </div>

          {/* Col 4: Help & FAQ */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-base font-bold font-['F1Title'] uppercase tracking-wider text-white mb-2">
              Get Help
            </h2>
            <div className="w-8 h-0.5 bg-[#00b9ff] mb-3 mx-auto sm:mx-0"></div>

            <nav className="flex flex-col gap-2 text-xs sm:text-sm text-gray-300">
              <a href="#footer" onClick={(e) => openModal(e, "faq")} className="hover:text-[#00b9ff] transition-colors py-0.5 cursor-pointer">
                Preguntas Frecuentes (FAQ)
              </a>
              <Link href="/about" className="hover:text-[#00b9ff] transition-colors py-0.5">
                Learn More
              </Link>
            </nav>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3 text-center sm:text-left">
          <p className="m-0">
            MOTORING COMMUNITY © 2026 — Web comunitaria y educativa sin ánimo de lucro creada por Christian Moreno Díaz.
          </p>
          <p className="m-0 text-gray-500 font-semibold">
            Formula 1® Fan Portal
          </p>
        </div>

      </footer>

      {/* MODALES LEGALES */}
      {activeModal !== "none" && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" 
          onClick={closeModal} 
          role="dialog" 
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-2xl shadow-2xl relative border border-gray-200 dark:border-gray-800" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-5 text-gray-500 hover:text-[#00b9ff] dark:text-gray-400 dark:hover:text-[#00b9ff] text-2xl font-bold transition-colors cursor-pointer bg-transparent border-none p-1 leading-none" 
              onClick={closeModal} 
              aria-label="Cerrar modal"
            >
              &times;
            </button>
            
            {/* AVISO LEGAL */}
            {activeModal === "legal" && (
              <div className="space-y-4 font-['F1Regular']">
                <h1 id="modal-title" className="text-2xl font-bold font-['F1Title'] border-b border-[#00b9ff] pb-2 text-black dark:text-white">
                  Aviso Legal y Términos de Uso
                </h1>
                
                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">1. Identificación y Finalidad</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  <strong>Motoring Community</strong> es un proyecto web comunitario, divulgativo y educativo creado con fines no lucrativos por Christian Moreno Díaz. Su objetivo es centralizar información pública sobre el Campeonato Mundial de Fórmula 1 y ofrecer un punto de encuentro a los aficionados al motor.
                </p>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">2. Exención de Responsabilidad sobre Marcas (Disclaimer F1)</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Esta web <strong>no es un sitio web oficial de la Fórmula 1 ni está afiliada, patrocinada, respaldada ni asociada en modo alguno con Formula One Licensing B.V., Formula One Management (FOM), la FIA (Federación Internacional del Automóvil) ni ninguna de sus escuderías o filiales</strong>.
                </p>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Las marcas, nombres comerciales, logotipos, imágenes de escuderías y pilotos son marcas registradas de sus respectivos titulares y se utilizan únicamente con fines descriptivos, divulgativos e informativos bajo el uso legítimo (<em>fair use</em>).
                </p>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">3. Fuentes de Datos y Créditos</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Los datos estadísticos, clasificaciones y calendarios se obtienen de fuentes públicas como <strong>Ergast Developer API / Jolpica F1</strong> y las noticias a través de <strong>NewsAPI</strong>. Las banderas de nacionalidad proceden de <strong>FlagCDN</strong>.
                </p>
              </div>
            )}

            {/* POLÍTICA DE PRIVACIDAD */}
            {activeModal === "privacy" && (
              <div className="space-y-4 font-['F1Regular']">
                <h1 id="modal-title" className="text-2xl font-bold font-['F1Title'] border-b border-[#00b9ff] pb-2 text-black dark:text-white">
                  Política de Privacidad (RGPD)
                </h1>
                
                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">1. Responsable del Tratamiento</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  En cumplimiento del Reglamento General de Protección de Datos (RGPD UE 2016/679) y la LOPDGDD 3/2018, se informa de que los datos tratados a través de esta web son gestionados bajo los más estrictos estándares de privacidad.
                </p>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">2. Datos que recopilamos</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  <li><strong>Preferencias locales:</strong> Configuración del tema (modo claro/oscuro) almacenada exclusivamente en tu navegador (LocalStorage).</li>
                  <li><strong>Formularios de Demostración:</strong> Los formularios de Login y Registro son simulaciones cliente que no almacenan contraseñas en servidores externos sin tu consentimiento expreso.</li>
                  <li><strong>Foro y Comunidad:</strong> Publicaciones voluntarias en los hilos del foro.</li>
                </ul>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">3. Derechos del Usuario (ARCO)</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Puedes ejercer en cualquier momento tus derechos de <strong>Acceso, Rectificación, Supresión, Oposición, Limitación del tratamiento y Portabilidad</strong> de tus datos contactando a través de los canales de la comunidad en GitHub o LinkedIn.
                </p>
              </div>
            )}

            {/* USO DE DATOS & APIS */}
            {activeModal === "data" && (
              <div className="space-y-4 font-['F1Regular']">
                <h1 id="modal-title" className="text-2xl font-bold font-['F1Title'] border-b border-[#00b9ff] pb-2 text-black dark:text-white">
                  Uso de Datos &amp; Servicios de Terceros
                </h1>
                
                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">1. Integraciones de Datos en Tiempo Real</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Para ofrecer clasificaciones, biografías y telemetría actualizada, esta web realiza peticiones seguras (HTTPS) a proveedores externos reconocidos:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  <li><strong>Ergast / Jolpica API:</strong> Consulta de clasificaciones de pilotos, constructores y circuitos históricos.</li>
                  <li><strong>News API:</strong> Agregación de noticias recientes de la Fórmula 1.</li>
                  <li><strong>FlagCDN:</strong> Visualización de banderas nacionales en formato SVG/PNG optimizado.</li>
                </ul>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">2. Seguridad de los Datos</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Toda la comunicación web se realiza bajo cifrado SSL/TLS de alta seguridad y estrictas políticas de cabeceras HTTP (<em>Permissions-Policy</em>, <em>X-Frame-Options</em>, <em>Content-Type-Options</em>).
                </p>
              </div>
            )}

            {/* POLÍTICA DE COOKIES */}
            {activeModal === "cookies" && (
              <div className="space-y-4 font-['F1Regular']">
                <h1 id="modal-title" className="text-2xl font-bold font-['F1Title'] border-b border-[#00b9ff] pb-2 text-black dark:text-white">
                  Política de Cookies
                </h1>
                
                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">1. ¿Qué son las Cookies?</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Las cookies y el almacenamiento local (<em>LocalStorage</em>) son pequeños ficheros que los sitios web colocan en tu dispositivo para recordar información sobre tu visita, como tu preferencia de tema o sesión.
                </p>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">2. Tipos de Cookies que utilizamos</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  <li><strong>Cookies Técnicas y Esenciales:</strong> Necesarias para recordar si prefieres el <em>Modo Claro</em> o <em>Modo Oscuro</em> y tu consentimiento de cookies.</li>
                  <li><strong>Servicios Externos:</strong> Fuentes de Google Fonts e imágenes optimizadas alojadas en CDNs seguras.</li>
                </ul>

                <h2 className="text-lg font-bold font-['F1Title'] text-[#00b9ff]">3. Cómo gestionar o deshabilitar Cookies</h2>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies.</li>
                  <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad y seguridad &gt; Cookies y datos del sitio.</li>
                  <li><strong>Safari:</strong> Preferencias &gt; Privacidad.</li>
                  <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
                </ul>
              </div>
            )}

            {/* PREGUNTAS FRECUENTES (FAQ) */}
            {activeModal === "faq" && (
              <div className="space-y-4 font-['F1Regular']">
                <h1 id="modal-title" className="text-2xl font-bold font-['F1Title'] border-b border-[#00b9ff] pb-2 text-black dark:text-white">
                  Preguntas Frecuentes (FAQ)
                </h1>
                <div className="space-y-2 mt-4">
                  {[
                    {
                      q: "¿Qué es Motoring Community?",
                      a: "Es una plataforma comunitaria creada para aficionados al deporte del motor donde consultar clasificaciones oficiales, noticias, datos históricos y debatir en el foro."
                    },
                    {
                      q: "¿Tiene algún coste o suscripción?",
                      a: "No. Motoring Community es 100% gratuita y sin ánimo de lucro. Todos los datos se ofrecen con fines educativos y de divulgación."
                    },
                    {
                      q: "¿De dónde proceden los datos y estadísticas?",
                      a: "Los resultados, puntos y posiciones históricas se obtienen de la base de datos de Ergast Developer API y las noticias de NewsAPI."
                    },
                    {
                      q: "¿Cómo se activa el Modo Oscuro o Claro?",
                      a: "Puedes pulsar en cualquier momento el icono de sol/luna ubicado en la barra de navegación superior tanto en ordenador como en móvil."
                    },
                    {
                      q: "¿Cómo se protegen mis datos personales?",
                      a: "Cumplimos con la normativa RGPD europea. No comercializamos con tus datos y tus preferencias se guardan de forma local en tu propio navegador."
                    }
                  ].map((faq, index) => (
                    <div className="border border-gray-300 dark:border-gray-700 rounded overflow-hidden" key={index}>
                      <button 
                        className="w-full p-3 font-bold cursor-pointer flex justify-between items-center bg-gray-100 dark:bg-[#2c2c30] text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#38383f] transition-colors text-left" 
                        aria-expanded={openAccordion === index} 
                        aria-controls={`content${index}`} 
                        id={`header${index}`}
                        onClick={() => toggleAccordion(index)}
                        onKeyDown={(e) => handleAccordionKeyDown(e, index)}
                      >
                        <span>{faq.q}</span>
                        <span className={`transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`}>&#9662;</span>
                      </button>
                      {openAccordion === index && (
                        <div className="p-4 text-sm bg-gray-50 dark:bg-[#252528] text-gray-800 dark:text-gray-200" id={`content${index}`} aria-labelledby={`header${index}`}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
