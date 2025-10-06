import { Link } from 'react-router-dom';

export default function LandingPage() {
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">FreelanceDesk</h1>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Preise</a>
            <Link to="/signin" className="text-blue-600 font-medium">Anmelden</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Dein Kundenportal für <span className="text-blue-600">Freelancer</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Projekte, Rechnungen, Dateien und Kommunikation – alles an einem Ort.
            Schluss mit E-Mail-Chaos!
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="#cta"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Kostenlos starten
            </a>
            <a
              href="#features"
              className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800">Alles, was du brauchst</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="font-semibold text-lg text-gray-700">Projektübersicht</h4>
            <p className="text-gray-600 mt-2">Behalte Deadlines, Aufgaben und Fortschritte im Blick.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="font-semibold text-lg text-gray-700">Rechnungen & Zahlungen</h4>
            <p className="text-gray-600 mt-2">Erstelle Rechnungen, exportiere PDFs und erhalte Zahlungen via Stripe.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="font-semibold text-lg text-gray-700">Dateien & Kommunikation</h4>
            <p className="text-gray-600 mt-2">Teile Dokumente, Designs und Updates direkt im Kundenportal.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Faire Preise</h3>
          <p className="mt-2 text-gray-600">Wähle den Plan, der zu dir passt.</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="text-lg font-semibold text-gray-700">Free</h4>
              <p className="mt-2 text-3xl font-bold">0 €</p>
              <p className="mt-2 text-gray-600">1 Kunde, 1 Projekt</p>
            </div>
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 transform scale-105">
              <h4 className="text-lg font-semibold">Pro</h4>
              <p className="mt-2 text-3xl font-bold">19 €/Monat</p>
              <p className="mt-2">Unbegrenzt, inkl. Stripe</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="text-lg font-semibold text-gray-700">Agentur</h4>
              <p className="mt-2 text-3xl font-bold">49 €/Monat</p>
              <p className="mt-2 text-gray-600">Teams & White-Label</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="bg-blue-600 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold">Starte jetzt kostenlos</h3>
          <p className="mt-2 text-blue-100">Teste FreelanceDesk und begeistere deine Kunden.</p>
          <a
            href="/signup"
            className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Kostenlos registrieren
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FreelanceDesk. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
