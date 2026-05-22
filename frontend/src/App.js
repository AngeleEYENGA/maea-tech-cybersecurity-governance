import { useState } from 'react';
import './App.css';

const tabs = [
  { id: 'dashboard', label: 'Accueil' },
  { id: 'inventory', label: 'Inventaire' },
  { id: 'alerts', label: 'Alertes' },
  { id: 'compliance', label: 'Conformité' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      <header className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1>Maea Tech Cybersecurity Governance</h1>
            <p className="slide-in" style={{ marginTop: '8px', color: '#4b5563' }}>
              Supervision des risques, contrôle des actifs et conformité réglementaire.
            </p>
          </div>
          <button className="btn btn-primary">Nouvelle analyse</button>
        </div>
      </header>

      <nav className="nav-tabs" style={{ marginTop: '20px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        <section className="card" style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <article className="kpi-card" style={{ flex: '1 1 220px' }}>
              <div className="kpi-value">8</div>
              <div className="kpi-label">Vulnérabilités critiques</div>
            </article>
            <article className="kpi-card" style={{ flex: '1 1 220px', borderLeftColor: '#16A34A' }}>
              <div className="kpi-value">42</div>
              <div className="kpi-label">Contrôles conformes</div>
            </article>
            <article className="kpi-card" style={{ flex: '1 1 220px', borderLeftColor: '#EA580C' }}>
              <div className="kpi-value">3</div>
              <div className="kpi-label">Incidents ouverts</div>
            </article>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Voir les détails</button>
            <button className="btn btn-secondary">Exporter</button>
          </div>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: '12px' }}>Résumé rapide</h2>
          <div className="alert" style={{ background: '#f8fafc', color: '#111827' }}>
            8 problèmes de sécurité critiques détectés. Priorisez les correctifs pour réduire le risque.
          </div>
          <p>
            Cet écran montre les principaux indicateurs de santé de votre programme de gouvernance et les actions recommandées.
          </p>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: '12px' }}>Détails du module</h2>
          {activeTab === 'dashboard' && <p>Vue d’ensemble du statut de sécurité et de la conformité.</p>}
          {activeTab === 'inventory' && <p>Liste des actifs, applications et environnements sous surveillance.</p>}
          {activeTab === 'alerts' && <p>Alertes récentes et incidents à traiter.</p>}
          {activeTab === 'compliance' && <p>État de conformité des politiques et des rapports réglementaires.</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
