
import { useState, type FormEvent } from "react";
import "./App.css";

type Page = "home" | "create" | "settings";
type Loader = "Vanilla" | "Fabric" | "Forge" | "NeoForge";

type Instance = {
  id: number;
  name: string;
  version: string;
  loader: Loader;
};

function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [instances, setInstances] = useState<Instance[]>([]);

  const [instanceName, setInstanceName] = useState("");
  const [mcVersion, setMcVersion] = useState("1.21.1");
  const [loader, setLoader] = useState<Loader>("Fabric");

  function createInstance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newInstance: Instance = {
      id: Date.now(),
      name: instanceName.trim() || `Instance ${instances.length + 1}`,
      version: mcVersion,
      loader,
    };

    setInstances((current) => [...current, newInstance]);
    setInstanceName("");
    setActivePage("home");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div className="brand-text">
            <span className="brand-name">SPIRIT</span>
            <span className="brand-caption">MINECRAFT LAUNCHER</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="section-label">LIBRARY</span>

          <button
            className={`nav-item ${activePage === "home" ? "active" : ""}`}
            onClick={() => setActivePage("home")}
          >
            <span className="nav-icon">⌂</span>
            <span>Home</span>
          </button>

          <button
            className={`nav-item ${activePage === "create" ? "active" : ""}`}
            onClick={() => setActivePage("create")}
          >
            <span className="nav-icon">＋</span>
            <span>Create Instance</span>
          </button>
        </div>

        <div className="sidebar-bottom">
          <button
            className={`nav-item ${activePage === "settings" ? "active" : ""}`}
            onClick={() => setActivePage("settings")}
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </button>

          <div className="sidebar-version">
            <span className="version-dot" />
            DEVELOPMENT BUILD
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            SPIRIT <span>/</span>{" "}
            {activePage === "home"
              ? "HOME"
              : activePage === "create"
                ? "CREATE INSTANCE"
                : "SETTINGS"}
          </div>

          <div className="topbar-status">
            <span className="status-dot" />
            LOCAL PREVIEW
          </div>
        </header>

        <div className="page-content">
          {activePage === "home" && (
            <section className="page">
              <div className="page-heading">
                <div>
                  <span className="eyebrow">YOUR LIBRARY</span>
                  <h1>Welcome to Spirit</h1>
                  <p className="page-description">
                    Your Minecraft worlds, all in one place.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("create")}
                >
                  <span>＋</span> Create Instance
                </button>
              </div>

              <div className="content-divider" />

              <div className="section-heading">
                <div>
                  <h2>Your Instances</h2>
                  <span className="item-count">
                    {instances.length} INSTANCES
                  </span>
                </div>
              </div>

              {instances.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">▧</div>
                  <h3>Your library is empty</h3>
                  <p>
                    Create your first Minecraft instance to get started.
                  </p>
                  <button
                    className="secondary-button"
                    onClick={() => setActivePage("create")}
                  >
                    Create your first instance
                  </button>
                </div>
              ) : (
                <div className="instance-list">
                  {instances.map((instance) => (
                    <div className="instance-card" key={instance.id}>
                      <div className="instance-icon">▦</div>

                      <div className="instance-info">
                        <h3>{instance.name}</h3>
                        <span>
                          Minecraft {instance.version} · {instance.loader}
                        </span>
                      </div>

                      <span className="preview-label">PREVIEW</span>
                      <button className="launch-button" disabled>
                        Launch
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activePage === "create" && (
            <section className="page">
              <div className="page-heading">
                <div>
                  <span className="eyebrow">NEW INSTANCE</span>
                  <h1>Create Instance</h1>
                  <p className="page-description">
                    Set up a new Minecraft environment.
                  </p>
                </div>
              </div>

              <div className="content-divider" />

              <form className="create-form" onSubmit={createInstance}>
                <div className="form-section">
                  <h2>General</h2>

                  <label className="field">
                    <span>Instance Name</span>
                    <input
                      type="text"
                      value={instanceName}
                      onChange={(event) =>
                        setInstanceName(event.currentTarget.value)
                      }
                      placeholder="My Minecraft Instance"
                    />
                  </label>
                </div>

                <div className="form-section">
                  <h2>Game Configuration</h2>

                  <label className="field">
                    <span>Minecraft Version</span>
                    <input
                      type="text"
                      value={mcVersion}
                      onChange={(event) =>
                        setMcVersion(event.currentTarget.value)
                      }
                      placeholder="e.g. 1.21.1"
                      required
                    />
                  </label>

                  <label className="field">
                    <span>Mod Loader</span>
                    <select
                      value={loader}
                      onChange={(event) =>
                        setLoader(event.currentTarget.value as Loader)
                      }
                    >
                      <option value="Vanilla">Vanilla</option>
                      <option value="Fabric">Fabric</option>
                      <option value="Forge">Forge</option>
                      <option value="NeoForge">NeoForge</option>
                    </select>
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setActivePage("home")}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="primary-button">
                    Create Instance
                  </button>
                </div>
              </form>
            </section>
          )}

          {activePage === "settings" && (
            <section className="page">
              <div className="page-heading">
                <div>
                  <span className="eyebrow">PREFERENCES</span>
                  <h1>Settings</h1>
                  <p className="page-description">
                    Configure your Spirit experience.
                  </p>
                </div>
              </div>

              <div className="content-divider" />

              <div className="settings-placeholder">
                <div className="empty-icon">⚙</div>
                <h3>Settings are coming soon</h3>
                <p>
                  Launcher preferences and appearance options will live here.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
