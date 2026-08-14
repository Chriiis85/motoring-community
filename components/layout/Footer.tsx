'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import "./footer.css"; // Import the exact original CSS with custom modal styles added

type ModalType = "none" | "privacy" | "data" | "cookies" | "faq";

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
      <footer id="footer">
        <section className="footer-top">
          <article className="footer-top-col1">
            <div>
              <h1>Motoring Community</h1>
            </div>
            {/* REDES SOCIALES CONTENEDOR */}
            <div className="social-buttons">
              <a target="_blank" title="Go to Chris GitHub Page" href="https://github.com/Chriiis85" className="social-button github" aria-label="GitHub" rel="noopener noreferrer">
                <svg className="cf-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19" aria-hidden="true">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path>
                </svg>
              </a>
              <a target="_blank" title="Go to Chris LinkedIn Page" href="https://www.linkedin.com/in/christian-moreno-díaz-109024292/" className="social-button linkedin" aria-label="LinkedIn" rel="noopener noreferrer">
                <svg viewBox="0 -2 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" transform="translate(-702.000000, -265.000000)"></path>
                </svg>
              </a>
            </div>
            <p>&quot;The home of all the race fans, where we can meet together.&quot;</p>
          </article>
          {/* CONTENEDORES PARA LOS MENUS Y SECCIONES */}
          <article className="footer-top-col2">
            <h1>Menu</h1>
            <div className="footer-top-col2-bar"></div>
            <Link title="Go to Main Page" href="/">Main Page</Link>
            <Link title="Go to About F1 Page" href="/about">About Formula One</Link>
            <Link title="Go to ForumPage" href="/forum">Motoring Community Forum</Link>
          </article>
          <article className="footer-top-col2">
            <h1>Privacy Policy</h1>
            <div className="footer-top-col2-bar"></div>
            <a title="Go to Footer Section" href="#footer" onClick={(e) => openModal(e, "privacy")}>Privacy Policy</a>
            <a title="Go to Footer Section" href="#footer" onClick={(e) => openModal(e, "data")}>Data Usage</a>
            <a title="Go to Footer Section" href="#footer" onClick={(e) => openModal(e, "cookies")}>Cookies Usage</a>
          </article>
          <article className="footer-top-col2">
            <h1>Get Help</h1>
            <div className="footer-top-col2-bar"></div>
            <a title="Go to Footer Section" href="#footer" onClick={(e) => openModal(e, "faq")}>F&amp;Q</a>
            <Link title="Go to About F1 Page" href="/about">Learn More</Link>
          </article>
        </section>
        <section className="footer-bot">
          <p>
            WEBPAGE MADE BY CHRISTIAN MORENO DIAZ - ALL RIGHTS RESERVED 2026®™
          </p>
        </section>
      </footer>

      {/* MODALES */}
      {activeModal !== "none" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} aria-label="Close modal">&times;</button>
            
            {activeModal === "cookies" && (
              <div>
                <h1>Cookie Policy</h1>
                <p>Our website uses cookies to enhance user experience and to help us understand how our site is used. Cookies are
                  small text files that are stored on your device when you visit our website.
                  By using our website, you consent to the use of cookies in accordance with this policy. If you do not accept the use
                  of these cookies, please disable cookies by following the instructions provided by your Internet browser.</p>

                <h1>Third-Party Cookies</h1>
                <p>In some special cases, we also use cookies provided by trusted third parties. The following section details which
                  third-party cookies you may encounter through this site.</p>
                <p>We hope this cookie policy has clarified things for you and, as mentioned above, if there is something you are not
                  sure whether you need or not, it is usually safer to leave cookies enabled in case you interact with one of the
                  features you use on our site.
                  However, if you are still looking for more information, you can contact us through one of our preferred contact
                  methods.</p>
              </div>
            )}

            {activeModal === "privacy" && (
              <div>
                <h1>Privacy Policy</h1>
                <p>At Motoring Community, we are committed to protecting the privacy of our users and ensuring that their personal
                  information remains confidential and secure. This policy describes how we collect, use, and protect the information
                  we obtain through our online services.</p>
              </div>
            )}

            {activeModal === "data" && (
              <div>
                <h2>Data Usage</h2>
                <p>At Motoring Community, we take the privacy of our users and the protection of their personal data very seriously.
                  This policy describes how we collect, use, and protect the information we obtain through our online services.</p>
              </div>
            )}

            {activeModal === "faq" && (
              <div>
                <h2>Frecuently Asked Questions (F&amp;Q)</h2>
                <div className="accordion">
                  {[
                    {
                      q: "¿What are the cookies?",
                      a: "Cookies are text files that contain small amounts of information which are downloaded to your device when you visit a website. Cookies are widely used to make websites work more efficiently, as well as to provide information to the site owners."
                    },
                    {
                      q: "¿How do we use cookies?",
                      a: "We use cookies for several reasons, which are detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave all cookies enabled if you are unsure whether you need them or not, in case they are used to provide a service that you use."
                    },
                    {
                      q: "¿What data do we save?",
                      a: "We collect personal information in various ways, including direct interactions when you provide us with information by creating an account, completing forms on our website or in our applications, or when communicating with us via email, phone, or other means. We also collect information automatically when you use our services, including information about your device and browsing activity, through the use of cookies and other similar technologies."
                    },
                    {
                      q: "¿How do we use your data?",
                      a: "We use the information we collect to provide, maintain, and improve our services, as well as to personalize your experience and to communicate with you. This may include sending marketing communications if you have given consent to receive them. We do not sell or rent your personal information to third parties without your explicit consent. However, we may share your information with third-party service providers who assist us in operating our business and providing services on your behalf, provided they commit to maintaining the confidentiality of your information."
                    },
                    {
                      q: "Data Protection",
                      a: "We take measures to protect the security of your personal information and to ensure that it is used in accordance with this policy. This includes implementing technical and organizational measures to protect against unauthorized access, disclosure, alteration, or destruction of your personal information."
                    },
                    {
                      q: "User Rights",
                      a: "You have certain rights regarding your personal data, including the right to access, correct, delete, restrict, or object to the processing of your personal information. If you wish to exercise any of these rights, please contact us using the contact information provided at the end of this policy."
                    },
                    {
                      q: "Politics changes",
                      a: "We may update this policy from time to time to reflect changes in our data collection and usage practices. We recommend that you periodically review this page for the latest information on our privacy policies and practices."
                    }
                  ].map((faq, index) => (
                    <div className="accordion-item" key={index}>
                      <h3 
                        className="accordion-header" 
                        tabIndex={0} 
                        aria-expanded={openAccordion === index} 
                        aria-controls={`content${index}`} 
                        id={`header${index}`}
                        onClick={() => toggleAccordion(index)}
                        onKeyDown={(e) => handleAccordionKeyDown(e, index)}
                      >
                        {faq.q} <span className={`arrow ${openAccordion === index ? "open" : ""}`}>&#9662;</span>
                      </h3>
                      {openAccordion === index && (
                        <div className="accordion-content" id={`content${index}`} aria-labelledby={`header${index}`}>
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
