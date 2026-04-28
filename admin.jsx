// admin.jsx — TonePrints admin: dashboard, products, orders, customers, settings

const { useState: aState, useEffect: aEffect, useRef: aRef, useMemo: aMemo } = React;

// ─── Sidebar ─────────────────────────────────────────────────────────────
function AdminSide({ adminRoute, setAdminRoute, navigate }) {
  const item = (id, label, icon) => (
    <a key={id} className={adminRoute === id ? 'active' : ''} onClick={() => setAdminRoute(id)}>
      <span style={{ width: 16, height: 16, opacity: 0.8 }}>{icon}</span>
      <span>{label}</span>
    </a>
  );
  const ic = {
    dash: <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/></svg>,
    prod: <svg viewBox="0 0 16 16" fill="none"><rect x="2.5" y="3" width="11" height="10" stroke="currentColor" strokeWidth="1.2"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1.2"/></svg>,
    ord: <svg viewBox="0 0 16 16" fill="none"><path d="M3 4h10l-1 8H4z" stroke="currentColor" strokeWidth="1.2"/><line x1="3" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2"/></svg>,
    cus: <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M3 14c.7-2.5 2.7-4 5-4s4.3 1.5 5 4" stroke="currentColor" strokeWidth="1.2"/></svg>,
    ship: <svg viewBox="0 0 16 16" fill="none"><rect x="1.5" y="5" width="8" height="6" stroke="currentColor" strokeWidth="1.2"/><path d="M9.5 7h3l2 2v2h-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="4.5" cy="12.5" r="1.2" stroke="currentColor" strokeWidth="1.2"/><circle cx="11.5" cy="12.5" r="1.2" stroke="currentColor" strokeWidth="1.2"/></svg>,
    pay: <svg viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/><line x1="1.5" y1="6.5" x2="14.5" y2="6.5" stroke="currentColor" strokeWidth="1.2"/></svg>,
  };

  return (
    <aside className="admin-side">
      <div className="admin-brand">
        <span className="brand-mark" style={{ background: 'var(--cream)' }}></span>
        <span>TonePrints<br/><small>Studio admin</small></span>
      </div>
      <nav className="admin-nav">
        <a className="admin-back" onClick={() => navigate('home')}>
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14" style={{ flexShrink: 0 }}><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Back to store</span>
        </a>
        <div className="admin-nav-section" style={{ paddingTop: 0 }}>Studio</div>
        {item('dash', 'Dashboard', ic.dash)}
        {item('orders', 'Orders', ic.ord)}
        {item('products', 'Products', ic.prod)}
        {item('customers', 'Customers', ic.cus)}
        <div className="admin-nav-section">Settings</div>
        {item('shipping', 'Shipping', ic.ship)}
        {item('payments', 'Payments', ic.pay)}
      </nav>
      <div className="admin-side-foot">
        <span className="avatar">TP</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Studio</div>
          <div style={{ fontSize: 10, opacity: 0.55, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>HELLO@TONEPRINTS.STUDIO</div>
        </div>
        <button onClick={() => navigate('home')} title="View store" style={{ color: 'currentColor', opacity: 0.6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 1l5 6-5 6" stroke="currentColor" strokeWidth="1.3"/></svg>
        </button>
      </div>
    </aside>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard() {
  // Build a sparkline path
  const pts = [42, 58, 51, 72, 64, 88, 82, 96, 105, 112, 98, 124, 118, 132];
  const w = 800, h = 240, pad = 20;
  const max = Math.max(...pts), min = Math.min(...pts);
  const stepX = (w - pad * 2) / (pts.length - 1);
  const path = pts.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  const area = path + ` L ${pad + (pts.length - 1) * stepX} ${h - pad} L ${pad} ${h - pad} Z`;

  return (
    <div className="page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">Saturday, 25 April 2026</span>
          <h1 style={{ marginTop: 8 }}>Good morning, Studio.</h1>
          <p>Two orders awaiting fulfillment. Three new customers this week.</p>
        </div>
        <div className="admin-actions">
          <select className="sort-select"><option>Last 14 days</option><option>This month</option><option>Last 90 days</option></select>
          <button className="btn btn-primary">+ New product</button>
        </div>
      </div>

      <div className="stat-grid stagger">
        {[
          { l: 'Revenue', v: '$8,420', d: '+12.4%', up: true },
          { l: 'Orders', v: '47', d: '+6 vs prev', up: true },
          { l: 'Avg. order', v: '$179', d: '+$12', up: true },
          { l: 'Conversion', v: '3.8%', d: '−0.3pt', up: false },
        ].map(s => (
          <div key={s.l} className="stat-card">
            <span className="stat-card-label">{s.l}</span>
            <span className="stat-card-value">{s.v}</span>
            <span className={`stat-card-delta ${s.up ? 'up' : 'down'}`}>
              <span>{s.up ? '↑' : '↓'}</span> {s.d}
            </span>
          </div>
        ))}
      </div>

      <div className="admin-grid admin-grid-2-1">
        <div className="admin-card">
          <div className="admin-card-head">
            <div>
              <h3>Revenue · last 14 days</h3>
              <span className="eyebrow" style={{ marginTop: 4, display: 'inline-block' }}>$8,420 total</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="filter-pill active">Revenue</button>
              <button className="filter-pill">Orders</button>
            </div>
          </div>
          <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.16"/>
                <stop offset="100%" stopColor="var(--ink)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map(p => (
              <line key={p} x1={pad} x2={w - pad} y1={pad + (h - pad * 2) * p} y2={pad + (h - pad * 2) * p}
                    stroke="var(--line)" strokeDasharray="2 4"/>
            ))}
            <path d={area} fill="url(#sparkfill)"/>
            <path d={path} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {pts.map((v, i) => {
              const x = pad + i * stepX;
              const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
              return <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 4 : 2} fill="var(--ink)"/>;
            })}
          </svg>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h3>Top works</h3>
          </div>
          {PRODUCTS.slice(0, 5).map((p, i) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--line-soft)' : 0, alignItems: 'center' }}>
              <div style={{ width: 40, height: 50, overflow: 'hidden', background: 'var(--cream-2)' }}>
                <ToneArt seed={p.id.charCodeAt(3)} motif={p.motif}/>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.title}</div>
                <div className="eyebrow" style={{ marginTop: 2 }}>{p.edition}</div>
              </div>
              <div className="font-mono" style={{ fontSize: 12 }}>{12 - i * 2}×</div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-card-head">
          <h3>Recent orders</h3>
          <button className="filter-pill">View all →</button>
        </div>
        <div className="table-wrap" style={{ border: 0 }}>
          <table className="table">
            <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {ORDERS.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td className="font-mono">{o.id}</td>
                  <td>{o.customer}</td>
                  <td className="font-mono" style={{ fontSize: 12, color: 'var(--mute)' }}>{o.date}</td>
                  <td>{o.items}</td>
                  <td className="font-mono">${o.total.toFixed(2)}</td>
                  <td><span className={`status-pill status-${o.status}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Products list + create/edit ────────────────────────────────────────
function AdminProducts({ openProduct }) {
  const [search, setSearch] = aState('');
  const filtered = PRODUCTS.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">Catalogue · {PRODUCTS.length} works</span>
          <h1 style={{ marginTop: 8 }}>Products</h1>
          <p>Manage editions, books, and printed objects.</p>
        </div>
        <div className="admin-actions">
          <input className="sort-select" style={{ paddingRight: 14, width: 240, backgroundImage: 'none' }}
                 placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button className="btn btn-primary" onClick={() => openProduct('new')}>+ New product</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}></th>
              <th>Title</th>
              <th>Category</th>
              <th>Edition</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} onClick={() => openProduct(p)} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ width: 40, height: 50, overflow: 'hidden', background: 'var(--cream-2)' }}>
                    <ToneArt seed={p.id.charCodeAt(3)} motif={p.motif}/>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--mute)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginTop: 2 }}>{p.id.toUpperCase()}</div>
                </td>
                <td>{p.category}</td>
                <td className="font-mono" style={{ fontSize: 11 }}>{p.edition}</td>
                <td className="font-mono">{p.stock}</td>
                <td className="font-mono">${p.price}</td>
                <td>
                  <span className={`status-pill ${p.stock < 5 ? 'status-low' : p.stock === 0 ? 'status-out' : 'status-active'}`}>
                    {p.stock === 0 ? 'sold out' : p.stock < 5 ? 'low' : 'active'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--mute)' }}>→</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Product editor (slideover) ──────────────────────────────────────────
function ProductEditor({ open, product, onClose, addToast }) {
  const isNew = product === 'new';
  const initial = isNew ? {
    id: 'new', title: '', sub: 'Picture book · Ages 3–6', price: 0, category: 'Picture Books',
    motif: 'meadow', edition: '', sizes: ['Hardcover'], stock: 0, paper: '', year: 2026
  } : (product || PRODUCTS[0]);

  const [form, setForm] = aState(initial);
  const [images, setImages] = aState(() => ['meadow', 'critter', 'cottage', 'rabbit'].slice(0, isNew ? 0 : 4));
  const [dragIdx, setDragIdx] = aState(null);
  const [overIdx, setOverIdx] = aState(null);

  aEffect(() => {
    if (open) {
      setForm(initial);
      setImages(isNew ? [] : ['meadow', 'critter', 'cottage', 'rabbit']);
    }
  }, [open, product]);

  const onDragStart = (i) => () => setDragIdx(i);
  const onDragOver = (i) => (e) => { e.preventDefault(); setOverIdx(i); };
  const onDrop = (i) => (e) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    const next = [...images];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    setImages(next);
    setDragIdx(null);
    setOverIdx(null);
  };
  const addImage = () => {
    const motifs = ['meadow', 'critter', 'balloon', 'photo-soft', 'cottage', 'stars', 'ocean', 'garden', 'rabbit', 'lettering'];
    setImages([...images, motifs[Math.floor(Math.random() * motifs.length)]]);
  };
  const removeImage = (i) => setImages(images.filter((_, j) => j !== i));

  return (
    <>
      <div className={`slideover-backdrop ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`slideover ${open ? 'open' : ''}`}>
        <div className="slideover-head">
          <div>
            <span className="eyebrow">{isNew ? 'New work' : `Editing · ${form.id?.toUpperCase()}`}</span>
            <h2>{isNew ? 'Add new work' : form.title || 'Untitled'}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.2"/></svg>
          </button>
        </div>

        <div className="slideover-body">
          <section style={{ marginBottom: 32 }}>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Images</h3>
            <p style={{ fontSize: 12, color: 'var(--mute)', marginBottom: 16 }}>Drag to reorder. The first image is used as the cover.</p>
            <div className="dropzone">
              {images.map((m, i) => (
                <div key={i}
                     className={`drop-tile ${dragIdx === i ? 'dragging' : ''} ${overIdx === i ? 'over' : ''}`}
                     draggable
                     onDragStart={onDragStart(i)}
                     onDragOver={onDragOver(i)}
                     onDragLeave={() => setOverIdx(null)}
                     onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
                     onDrop={onDrop(i)}>
                  <ToneArt seed={i + 7} motif={m}/>
                  {i === 0 && <span className="drop-badge">COVER</span>}
                  <button className="drop-rm" onClick={() => removeImage(i)}>✕</button>
                </div>
              ))}
              <div className="drop-tile drop-tile-add" onClick={addImage}>
                <div style={{ textAlign: 'center', color: 'var(--mute)', fontSize: 11 }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>+</div>
                  <div className="font-mono" style={{ letterSpacing: '0.06em' }}>UPLOAD</div>
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>Details</h3>
            <div className="field" style={{ marginBottom: 18 }}>
              <span className="field-lbl">Title</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Stillwater"/>
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <span className="field-lbl">Description</span>
              <textarea rows="3" defaultValue="A two-color archival pigment print in an edition of fifty. Hand-numbered and signed in pencil on the verso."/>
            </div>
            <div className="field-row cols-3" style={{ marginBottom: 18 }}>
              <div className="field"><span className="field-lbl">Category</span>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Picture Books</option><option>Chapter Books</option><option>Photo Prints</option>
                </select>
              </div>
              <div className="field"><span className="field-lbl">Year</span>
                <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: +e.target.value })}/>
              </div>
              <div className="field"><span className="field-lbl">Edition</span>
                <input value={form.edition} onChange={(e) => setForm({ ...form, edition: e.target.value })} placeholder="ED. 24/50"/>
              </div>
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <span className="field-lbl">Paper / material</span>
              <input value={form.paper} onChange={(e) => setForm({ ...form, paper: e.target.value })} placeholder="Hahnemühle 308gsm"/>
            </div>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>Pricing & inventory</h3>
            <div className="field-row cols-3">
              <div className="field"><span className="field-lbl">Price (USD)</span>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })}/>
              </div>
              <div className="field"><span className="field-lbl">Stock</span>
                <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })}/>
              </div>
              <div className="field"><span className="field-lbl">SKU</span>
                <input defaultValue={form.id?.toUpperCase()} placeholder="TP-NEW"/>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>Visibility</h3>
            <div className="setting-row">
              <div>
                <h4>Publish to store</h4>
                <p>When off, the work is saved as a draft and not visible on the storefront.</p>
              </div>
              <Switch defaultOn={!isNew}/>
            </div>
            <div className="setting-row">
              <div>
                <h4>Featured</h4>
                <p>Display on the home page hero and in the editorial selection.</p>
              </div>
              <Switch defaultOn={false}/>
            </div>
          </section>
        </div>

        <div className="slideover-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {!isNew && <button className="btn btn-ghost" style={{ color: '#B5471F' }}>Delete</button>}
            <button className="btn btn-primary" onClick={() => { addToast(isNew ? 'Product created' : 'Saved'); onClose(); }}>
              {isNew ? 'Publish' : 'Save changes'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Switch({ defaultOn = false }) {
  const [on, setOn] = aState(defaultOn);
  return <button className={`switch ${on ? 'on' : ''}`} onClick={() => setOn(!on)}><i/></button>;
}

// ─── Orders ──────────────────────────────────────────────────────────────
function AdminOrders({ openOrder }) {
  const [filter, setFilter] = aState('all');
  const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);
  const counts = {
    all: ORDERS.length,
    pending: ORDERS.filter(o => o.status === 'pending').length,
    processing: ORDERS.filter(o => o.status === 'processing').length,
    shipped: ORDERS.filter(o => o.status === 'shipped').length,
  };

  return (
    <div className="page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">{ORDERS.length} orders · this month</span>
          <h1 style={{ marginTop: 8 }}>Orders</h1>
          <p>Process orders, print labels, mark items shipped.</p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-ghost">Export CSV</button>
          <button className="btn btn-primary">Print queue ({counts.pending + counts.processing})</button>
        </div>
      </div>

      <div className="filter-bar" style={{ position: 'static', borderBottom: 0, marginBottom: 16 }}>
        {[
          ['all', 'All'], ['pending', 'Pending'], ['processing', 'Processing'],
          ['shipped', 'Shipped'], ['delivered', 'Delivered'], ['cancelled', 'Cancelled']
        ].map(([k, l]) => (
          <button key={k} className={`filter-pill ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>
            {l}{counts[k] != null && filter !== k ? ` · ${counts[k]}` : ''}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Shipping</th><th>Total</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} onClick={() => openOrder(o)} style={{ cursor: 'pointer' }}>
                <td className="font-mono" style={{ fontWeight: 500 }}>{o.id}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{o.customer}</div>
                  <div style={{ fontSize: 11, color: 'var(--mute)' }}>{o.email}</div>
                </td>
                <td className="font-mono" style={{ fontSize: 12, color: 'var(--mute)' }}>{o.date}</td>
                <td>{o.items}</td>
                <td className="font-mono" style={{ fontSize: 11 }}>{o.ship}</td>
                <td className="font-mono">${o.total.toFixed(2)}</td>
                <td><span className={`status-pill status-${o.status}`}>{o.status}</span></td>
                <td style={{ textAlign: 'right', color: 'var(--mute)' }}>→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Order detail (slideover with mark-shipped flow) ────────────────────
function OrderDetail({ open, order, onClose, addToast }) {
  const [stage, setStage] = aState(0);
  const [shipping, setShipping] = aState(false);

  aEffect(() => {
    if (!order) return;
    const map = { pending: 0, processing: 1, shipped: 2, delivered: 3, cancelled: 0 };
    setStage(map[order.status] ?? 0);
  }, [order]);

  if (!order) return (
    <>
      <div className={`slideover-backdrop ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`slideover ${open ? 'open' : ''}`}></aside>
    </>
  );

  const advance = () => {
    setShipping(true);
    setTimeout(() => {
      setStage(Math.min(stage + 1, 3));
      setShipping(false);
      addToast(`Order ${order.id} marked ${stage === 0 ? 'processing' : stage === 1 ? 'shipped' : 'delivered'}`);
    }, 900);
  };

  const steps = [
    { name: 'Order placed', meta: order.date, done: stage >= 0 },
    { name: 'Payment captured', meta: '$' + order.total.toFixed(2) + ' · Stripe', done: stage >= 1 },
    { name: 'Shipped', meta: stage >= 2 ? 'Track: NL-2026-04-' + order.id.replace('#', '') : 'Awaiting label', done: stage >= 2 },
    { name: 'Delivered', meta: stage >= 3 ? 'Confirmed' : 'In transit', done: stage >= 3 },
  ];

  const item = PRODUCTS[order.id.charCodeAt(4) % PRODUCTS.length];

  return (
    <>
      <div className={`slideover-backdrop ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`slideover ${open ? 'open' : ''}`}>
        <div className="slideover-head">
          <div>
            <span className="eyebrow">{order.date}</span>
            <h2>{order.id}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className={`status-pill status-${order.status}`}>{order.status}</span>
            <button className="icon-btn" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
        </div>

        <div className="slideover-body">
          <div className="admin-grid">
            <div className="admin-card">
              <span className="eyebrow">Customer</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginTop: 8, fontWeight: 400 }}>{order.customer}</div>
              <div style={{ fontSize: 12, color: 'var(--mute)', marginTop: 4 }}>{order.email}</div>
              <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.6 }}>
                123 N Tryon St<br/>Charlotte, NC 28202<br/>United States
              </div>
            </div>
            <div className="admin-card">
              <span className="eyebrow">Shipping & payment</span>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ fontSize: 12, color: 'var(--mute)' }}>Method</span><span style={{ fontSize: 13 }}>{order.ship}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ fontSize: 12, color: 'var(--mute)' }}>Carrier</span><span style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>USPS</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ fontSize: 12, color: 'var(--mute)' }}>Payment</span><span style={{ fontSize: 13 }}>Visa •••• 4242</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ fontSize: 12, color: 'var(--mute)' }}>Total paid</span><span className="font-mono" style={{ fontSize: 13, fontWeight: 500 }}>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ marginBottom: 24 }}>
            <div className="admin-card-head">
              <h3>Fulfillment</h3>
              {stage < 3 && (
                <button className="btn btn-primary" onClick={advance} disabled={shipping} style={{ padding: '10px 18px' }}>
                  {shipping ? <><span className="spinner" style={{ borderTopColor: 'var(--cream)', borderColor: 'rgba(245,241,232,0.3)' }}/> Updating…</> :
                    stage === 0 ? 'Mark processing' : stage === 1 ? 'Mark as shipped →' : 'Mark delivered'}
                </button>
              )}
            </div>
            <div className="timeline">
              {steps.map((s, i) => (
                <div key={i} className={`timeline-step ${s.done ? 'done' : ''} ${i === stage + 1 ? 'active' : ''}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <strong>{s.name}</strong>
                    <small style={{ display: 'block', marginTop: 2 }}>{s.meta}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-head"><h3>Items · {order.items}</h3></div>
            {Array.from({ length: order.items }).map((_, i) => {
              const p = PRODUCTS[(order.id.charCodeAt(4) + i) % PRODUCTS.length];
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto auto', gap: 16, padding: '14px 0', borderBottom: i < order.items - 1 ? '1px solid var(--line-soft)' : 0, alignItems: 'center' }}>
                  <div style={{ width: 60, height: 75, overflow: 'hidden', background: 'var(--cream-2)' }}>
                    <ToneArt seed={p.id.charCodeAt(3)} motif={p.motif}/>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{p.title}</div>
                    <div className="eyebrow" style={{ marginTop: 2 }}>{p.sizes[0]} · {p.edition}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--mute)' }}>×1</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>${p.price}.00</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="slideover-foot">
          <button className="btn btn-ghost">Print packing slip</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost">Refund</button>
            <button className="btn btn-primary">Email customer</button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Customers ───────────────────────────────────────────────────────────
function AdminCustomers() {
  return (
    <div className="page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">{CUSTOMERS.length} customers</span>
          <h1 style={{ marginTop: 8 }}>Customers</h1>
          <p>Collectors, repeat buyers, and one-time orders.</p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-ghost">Export</button>
          <button className="btn btn-primary">+ Invite</button>
        </div>
      </div>

      <div className="stat-grid stat-grid-3 stagger">
        <div className="stat-card"><span className="stat-card-label">Total customers</span><span className="stat-card-value">{CUSTOMERS.length}</span><span className="stat-card-delta up">↑ +3 this month</span></div>
        <div className="stat-card"><span className="stat-card-label">Repeat rate</span><span className="stat-card-value">62%</span><span className="stat-card-delta up">↑ +4 pt</span></div>
        <div className="stat-card"><span className="stat-card-label">Avg. lifetime value</span><span className="stat-card-value">$1,540</span><span className="stat-card-delta up">↑ +$120</span></div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Customer</th><th>Location</th><th>Joined</th><th>Orders</th><th>Lifetime value</th><th></th></tr></thead>
          <tbody>
            {CUSTOMERS.map(c => (
              <tr key={c.email}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="avatar" style={{ background: 'var(--cream-3)', color: 'var(--ink)' }}>{c.name.split(' ').map(s => s[0]).join('').slice(0, 2)}</span>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--mute)' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td>{c.location}</td>
                <td className="font-mono" style={{ fontSize: 12, color: 'var(--mute)' }}>{c.joined}</td>
                <td className="font-mono">{c.orders}</td>
                <td className="font-mono">${c.spent.toFixed(2)}</td>
                <td style={{ textAlign: 'right', color: 'var(--mute)' }}>→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Shipping settings ───────────────────────────────────────────────────
function AdminShipping({ addToast }) {
  const [zones, setZones] = aState(SHIPPING_ZONES);

  return (
    <div className="page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">{zones.length} zones · {zones.reduce((s, z) => s + z.rates.length, 0)} rates</span>
          <h1 style={{ marginTop: 8 }}>Shipping</h1>
          <p>Define zones and rates by region.</p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={() => addToast('New zone added')}>+ Add zone</button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-head">
          <h3>General</h3>
        </div>
        <div className="setting-row">
          <div>
            <h4>Free shipping threshold (EU)</h4>
            <p>Orders over this amount qualify for free standard shipping within the EU.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--mute)' }}>$</span>
            <input defaultValue="150" style={{ width: 80, border: '1px solid var(--line)', borderRadius: 8, padding: '8px 12px', textAlign: 'right', fontFamily: 'inherit' }}/>
          </div>
        </div>
        <div className="setting-row">
          <div>
            <h4>Default packaging</h4>
            <p>Used to calculate volumetric weight for express carriers.</p>
          </div>
          <select className="sort-select"><option>Rolled tube · 80×8×8 cm</option><option>Flat envelope · 35×25×2 cm</option></select>
        </div>
      </div>

      <div>
        {zones.map((z, i) => (
          <div key={z.id} className="zone">
            <div className="zone-head">
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{z.name}</div>
                <div style={{ fontSize: 11, color: 'var(--mute)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginTop: 2 }}>
                  {z.countries}
                </div>
              </div>
              <span className="status-pill status-active">{z.rates.length} {z.rates.length === 1 ? 'rate' : 'rates'}</span>
              <button style={{ color: 'var(--mute)', fontSize: 12 }}>Edit zone →</button>
            </div>
            <div className="zone-body">
              <div className="zone-rate-row" style={{ borderBottom: '1px solid var(--line)', marginBottom: 4 }}>
                <span className="eyebrow">Method</span>
                <span className="eyebrow">Price</span>
                <span className="eyebrow">Free over</span>
                <span></span>
              </div>
              {z.rates.map((r, j) => (
                <div key={j} className="zone-rate-row">
                  <span>{r.name}</span>
                  <span className="font-mono">${r.price.toFixed(2)}</span>
                  <span className="font-mono" style={{ color: 'var(--mute)' }}>${r.free_over}</span>
                  <button style={{ color: 'var(--mute)' }}>···</button>
                </div>
              ))}
              <button style={{ marginTop: 12, fontSize: 12, color: 'var(--mute)' }}>+ Add rate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Payments settings ──────────────────────────────────────────────────
function AdminPayments() {
  return (
    <div className="page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">3 active providers</span>
          <h1 style={{ marginTop: 8 }}>Payments</h1>
          <p>Connected payment providers, payouts, and tax settings.</p>
        </div>
      </div>

      <div className="admin-grid">
        {[
          { name: 'Stripe', meta: 'Cards, Apple Pay, Google Pay', balance: '$2,840.50', payout: 'Apr 28', on: true },
          { name: 'Cash App Pay', meta: 'Block · United States', balance: '$1,120.00', payout: 'Apr 27', on: true },
          { name: 'PayPal', meta: 'Business account', balance: '$340.00', payout: 'Apr 30', on: true },
          { name: 'Klarna', meta: 'Pay in 3 · BNPL', balance: '—', payout: 'Not connected', on: false },
        ].map(p => (
          <div key={p.name} className="admin-card">
            <div className="admin-card-head">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)' }}>{p.name}</h3>
                <div style={{ fontSize: 11, color: 'var(--mute)', marginTop: 2, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{p.meta}</div>
              </div>
              <Switch defaultOn={p.on}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--mute)' }}>Balance</span>
              <span className="font-mono" style={{ fontWeight: 500 }}>{p.balance}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--mute)' }}>Next payout</span>
              <span className="font-mono">{p.payout}</span>
            </div>
            {p.on && <button className="btn btn-ghost btn-block" style={{ marginTop: 12 }}>Manage →</button>}
            {!p.on && <button className="btn btn-primary btn-block" style={{ marginTop: 12 }}>Connect</button>}
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-card-head"><h3>Sales tax</h3></div>
        <div className="setting-row">
          <div><h4>Charge sales tax</h4><p>Automatically calculate and charge sales tax on US orders by state.</p></div>
          <Switch defaultOn={true}/>
        </div>
        <div className="setting-row">
          <div><h4>EIN</h4><p>Display on receipts and invoices.</p></div>
          <span className="font-mono" style={{ fontSize: 13 }}>EIN 88-1234567</span>
        </div>
        <div className="setting-row">
          <div><h4>Default rate (NC)</h4><p>Sales tax rate applied to orders shipping within North Carolina.</p></div>
          <span className="font-mono" style={{ fontSize: 13 }}>7.25%</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  AdminSide, AdminDashboard, AdminProducts, ProductEditor, Switch,
  AdminOrders, OrderDetail, AdminCustomers, AdminShipping, AdminPayments,
});
