// storefront.jsx — TonePrints customer pages: children's books + photo prints

const { useState, useEffect, useRef, useMemo } = React;

// ─── Top bar ─────────────────────────────────────────────────────────────
function TopBar({ route, navigate, cartCount, onOpenCart, onOpenAccount, customer }) {
  if (route.startsWith('admin')) return null;
  const isActive = (r) => route === r || (r === 'shop' && route.startsWith('product')) || (r === 'account' && route === 'account');
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="nav" style={{ justifySelf: 'start' }}>
          <a className={isActive('shop') ? 'active' : ''} onClick={() => navigate('shop')}>Shop</a>
          <a className={isActive('collections') ? 'active' : ''} onClick={() => navigate('collections')}>Collections</a>
          <a className={isActive('about') ? 'active' : ''} onClick={() => navigate('about')}>About</a>
        </div>
        <a className="brand" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          <span className="brand-mark">t</span>
          <span>TonePrints</span>
        </a>
        <div className="topbar-actions">
          <button className="icon-btn" title="Search" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12.5" y1="12.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            className={`icon-btn ${isActive('account') ? 'active' : ''}`}
            title={customer ? 'Your account' : 'Sign in'}
            aria-label="Account"
            onClick={() => customer ? navigate('account') : onOpenAccount()}
          >
            {customer ? (
              <span className="avatar avatar-sm" aria-hidden="true">
                {customer.name.split(' ').map(s => s[0]).join('').slice(0, 2)}
              </span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 16c.7-3 3.2-4.5 6-4.5s5.3 1.5 6 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <button className="icon-btn" title="Cart" aria-label="Cart" onClick={onOpenCart}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 5h12l-1.2 9H4.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6.5 5V4a2.5 2.5 0 015 0v1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────
function Footer({ route }) {
  if (route.startsWith('admin') || route === 'checkout') return null;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-mark">TonePrints</div>
            <p style={{ opacity: 0.8, maxWidth: '34ch', fontSize: 14, lineHeight: 1.6 }}>
              A small studio making picture books and photo prints. Made with care in the USA, shipped worldwide.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a>Picture books</a></li>
              <li><a>Chapter books</a></li>
              <li><a>Photo prints</a></li>
              <li><a>Gift sets</a></li>
            </ul>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li><a>About us</a></li>
              <li><a>Our authors</a></li>
              <li><a>Press</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a>Shipping</a></li>
              <li><a>Returns</a></li>
              <li><a>Care guide</a></li>
              <li><a>FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TonePrints — printed with care</span>
          <span>Charlotte, NC · Est. 2026</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Product card ────────────────────────────────────────────────────────
function ProductCard({ p, navigate, onQuickView, idx = 0 }) {
  return (
    <div className="product-card" style={{ animationDelay: `${idx * 0.04}s` }}>
      <div className="product-card-img" onClick={() => navigate(`product:${p.id}`)}>
        <ToneArt seed={p.id.charCodeAt(3) + idx} motif={p.motif} label={p.title} edition={p.edition}/>
        {p.badge && <span className={`tag product-card-tag ${p.badge === 'Bestseller' ? 'butter' : ''}`}>{p.badge}</span>}
        <div className="product-card-quick" onClick={(e) => { e.stopPropagation(); onQuickView(p); }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Quick add
        </div>
      </div>
      <div className="product-card-meta">
        <div className="product-card-title">{p.title}</div>
        <div className="product-card-sub">{p.sub}</div>
        <div className="product-card-price">${p.price}</div>
      </div>
    </div>
  );
}

// ─── HOME — Stadium (default warm/playful) ──────────────────────────────
function HomeStadium({ navigate, onQuickView }) {
  const featured = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.slice(0, 8);
  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">Picture books · Photo prints</span>
            <h1 style={{ marginTop: 18 }}>
              <span className="text-reveal"><span style={{ animationDelay: '0.05s' }}>Stories</span></span>{' '}
              <span className="text-reveal"><span style={{ animationDelay: '0.13s' }}>and</span></span><br/>
              <span className="text-reveal"><span style={{ animationDelay: '0.21s' }}><em>pictures,</em></span></span><br/>
              <span className="text-reveal"><span style={{ animationDelay: '0.29s' }}>printed</span></span>{' '}
              <span className="text-reveal"><span style={{ animationDelay: '0.37s' }}>with care.</span></span>
            </h1>
            <p>A small studio making picture books for little readers and photo prints for the homes that hold them.</p>
            <div className="hero-actions">
              <button className="btn btn-sage" onClick={() => navigate('shop')}>
                Shop the books <span className="arrow">→</span>
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('collections')}>
                Browse photo prints
              </button>
            </div>
          </div>

          <div className="hero-collage">
            <div><ToneArt seed={2} motif="critter"/></div>
            <div><ToneArt seed={3} motif="balloon"/></div>
            <div><ToneArt seed={5} motif="photo-soft"/></div>
            <div className="hero-sticker">
              <div>Free US<br/>shipping<br/>over $60</div>
            </div>
          </div>
        </section>

        <section className="category-strip stagger">
          <div className="cat-card" onClick={() => navigate('shop')}>
            <div className="cat-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="5" width="18" height="20" rx="1.5" stroke="#536B47" strokeWidth="1.6"/>
                <line x1="9" y1="10" x2="19" y2="10" stroke="#536B47" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="9" y1="14" x2="19" y2="14" stroke="#536B47" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="9" y1="18" x2="15" y2="18" stroke="#536B47" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="cat-count">12 books</div>
            <h3>Picture books</h3>
            <p>Ages 0–7 · hardcover & board</p>
          </div>
          <div className="cat-card" onClick={() => navigate('shop')}>
            <div className="cat-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="4" width="20" height="20" rx="2" stroke="#8A6328" strokeWidth="1.6"/>
                <circle cx="11" cy="11" r="2" stroke="#8A6328" strokeWidth="1.4"/>
                <path d="M4 19l5-4 5 3 6-5 4 3" stroke="#8A6328" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="cat-count">24 prints</div>
            <h3>Photo prints</h3>
            <p>Open & limited editions</p>
          </div>
          <div className="cat-card" onClick={() => navigate('shop')}>
            <div className="cat-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 8h18v15H5z" stroke="#8A4339" strokeWidth="1.6" strokeLinejoin="round"/>
                <line x1="5" y1="13" x2="23" y2="13" stroke="#8A4339" strokeWidth="1.4"/>
                <path d="M9 8c0-2 1.8-3.5 5-3.5s5 1.5 5 3.5" stroke="#8A4339" strokeWidth="1.6"/>
              </svg>
            </div>
            <div className="cat-count">6 sets</div>
            <h3>Gift sets</h3>
            <p>Books + prints, gift-wrapped</p>
          </div>
          <div className="cat-card" onClick={() => navigate('shop')}>
            <div className="cat-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 5l2.4 5.7L22 11.4l-4.3 3.9L19 21l-5-3-5 3 1.3-5.7L6 11.4l5.6-.7z" stroke="#436670" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="cat-count">8 books</div>
            <h3>Chapter books</h3>
            <p>Ages 7+ · gentle stories</p>
          </div>
        </section>

        <div className="section-head">
          <div>
            <span className="eyebrow">New this season</span>
            <h2 style={{ marginTop: 12 }}>Fresh off the press</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('shop')}>
            See everything <span className="arrow">→</span>
          </button>
        </div>
        <div className="grid-products stagger">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={onQuickView} idx={i}/>
          ))}
        </div>

        <section className="feature-band">
          <div className="feature-band-image">
            <ToneArt seed={6} motif="photo-landscape"/>
          </div>
          <div>
            <span className="eyebrow">Photo prints</span>
            <h3 style={{ marginTop: 14 }}>Made <em>just for you,</em> on archival paper.</h3>
            <p>Every print is made to order on Hahnemühle photo rag and signed in pencil on the back. Open editions start at $32, limited editions at $58.</p>
            <button className="btn btn-sage" onClick={() => navigate('shop')}>
              Browse prints <span className="arrow">→</span>
            </button>
          </div>
        </section>

        <div className="section-head">
          <div>
            <span className="eyebrow">From little readers</span>
            <h2 style={{ marginTop: 12 }}>Loved at <em>bedtime.</em></h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {[
            { stars: '★★★★★', text: 'My three-year-old asks for "the fox book" every single night. The illustrations are so warm and soft.', name: 'Amelia P.', loc: 'Utrecht' },
            { stars: '★★★★★', text: 'Bought a print as a baby gift. The colors are dreamy and it arrived beautifully packaged. The new parents adored it.', name: 'David K.', loc: 'Charlotte' },
            { stars: '★★★★★', text: 'Quality is wonderful — thick paper, lovely binding. Feels like a book that will be passed down.', name: 'Sarah M.', loc: 'Portland, OR' },
          ].map((t, i) => (
            <div key={i} className="testimonial">
              <div className="stars">{t.stars}</div>
              <p>"{t.text}"</p>
              <div className="author">
                <div className="author-avatar">{t.name.split(' ').map(s => s[0]).join('')}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div style={{ color: 'var(--mute)', fontSize: 12 }}>{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="trust-strip">
          <div className="trust-item">
            <div className="ti-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 7l7-4 7 4v6l-7 4-7-4z" stroke="#536B47" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
            <div><h4>Free US shipping</h4><p>On orders over $60</p></div>
          </div>
          <div className="trust-item">
            <div className="ti-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8a5 5 0 1110 0v3a5 5 0 11-10 0z" stroke="#8A6328" strokeWidth="1.5"/></svg></div>
            <div><h4>Made to order</h4><p>Each print, just for you</p></div>
          </div>
          <div className="trust-item">
            <div className="ti-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10c2-3 5-5 7-5s5 2 7 5c-2 3-5 5-7 5s-5-2-7-5z" stroke="#8A4339" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="10" cy="10" r="2" stroke="#8A4339" strokeWidth="1.5"/></svg></div>
            <div><h4>FSC paper</h4><p>Sustainably sourced</p></div>
          </div>
          <div className="trust-item">
            <div className="ti-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 11l3 3 7-7" stroke="#436670" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            <div><h4>30-day returns</h4><p>No questions asked</p></div>
          </div>
        </div>

        <section className="newsletter">
          <div>
            <h3>A letter from <em>the studio,</em> once a month.</h3>
            <p>New releases, behind-the-scenes from the press, and small gifts for our readers — never any spam.</p>
          </div>
          <div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your email"/>
              <button type="submit" className="btn btn-butter">Subscribe</button>
            </form>
            <p style={{ fontSize: 11, opacity: 0.5, marginTop: 12 }}>Unsubscribe any time. We won't share your address.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── HOME — Storybook variation (very kid-forward, full bleed) ──────────
function HomeStorybook({ navigate, onQuickView }) {
  const grid = PRODUCTS.slice(0, 8);
  return (
    <div className="page">
      <section style={{ padding: '40px 0 60px', background: 'linear-gradient(180deg, var(--sage-pale) 0%, var(--cream) 100%)', borderBottomLeftRadius: 'var(--radius-xl)', borderBottomRightRadius: 'var(--radius-xl)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', minHeight: 540 }}>
          <div>
            <span className="tag">📚 Spring 2026 catalogue</span>
            <h1 className="font-display" style={{ fontSize: 'clamp(64px, 8vw, 112px)', fontWeight: 350, lineHeight: 0.96, letterSpacing: '-0.025em', marginTop: 20 }}>
              <span className="text-reveal"><span>Once</span></span>
              <br/>
              <span className="text-reveal"><span style={{ animationDelay: '0.12s' }}>upon a</span></span>
              <br/>
              <span className="text-reveal"><span style={{ animationDelay: '0.24s', fontStyle: 'italic', color: 'var(--sage-deep)' }}>page.</span></span>
            </h1>
            <p style={{ marginTop: 24, fontSize: 17, color: 'var(--ink-soft)', maxWidth: '38ch' }}>
              Hand-illustrated picture books and warm photo prints, made in our Charlotte studio.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('shop')}>Shop everything <span className="arrow">→</span></button>
            </div>
          </div>
          <div style={{ position: 'relative', height: 540 }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', width: '70%', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', transform: 'rotate(-3deg)' }}>
              <ToneArt seed={2} motif="critter"/>
            </div>
            <div style={{ position: 'absolute', bottom: 20, right: 0, width: '50%', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', transform: 'rotate(4deg)' }}>
              <ToneArt seed={5} motif="balloon"/>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">All books & prints</span>
            <h2 style={{ marginTop: 12 }}>The full library.</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('shop')}>Shop everything <span className="arrow">→</span></button>
        </div>
        <div className="grid-products stagger">
          {grid.map((p, i) => (
            <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={onQuickView} idx={i}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HOME — Cozy split (books left / prints right) ─────────────────────
function HomeCozy({ navigate, onQuickView }) {
  const books = PRODUCTS.filter(p => p.category.includes('Book')).slice(0, 4);
  const prints = PRODUCTS.filter(p => p.category === 'Photo Prints').slice(0, 3);

  return (
    <div className="page">
      <div className="container">
        <section style={{ padding: '60px 0 40px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <span className="eyebrow">Picture books · Photo prints · Made in USA</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 350, letterSpacing: '-0.025em', lineHeight: 0.98, marginTop: 18 }}>
            <span className="text-reveal"><span>Books and prints</span></span><br/>
            <span className="text-reveal"><span style={{ animationDelay: '0.12s', fontStyle: 'italic', color: 'var(--sage-deep)' }}>for cozy days.</span></span>
          </h1>
        </section>

        <section className="cozy-split" style={{ marginTop: 48 }}>
          <div className="cozy-card cozy-card-sage">
            <span className="eyebrow">Picture books</span>
            <h2 className="font-display cozy-card-h2">For little readers.</h2>
            <div className="cozy-card-grid">
              {books.map((p, i) => (
                <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={onQuickView} idx={i}/>
              ))}
            </div>
            <button className="btn btn-sage" onClick={() => navigate('shop')} style={{ marginTop: 28 }}>All books <span className="arrow">→</span></button>
          </div>
          <div className="cozy-card cozy-card-butter">
            <span className="eyebrow">Photo prints</span>
            <h2 className="font-display cozy-card-h2">For warm walls.</h2>
            <div className="cozy-card-grid cozy-card-grid-1col">
              {prints.slice(0, 2).map((p, i) => (
                <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={onQuickView} idx={i}/>
              ))}
            </div>
            <button className="btn btn-butter" onClick={() => navigate('shop')} style={{ marginTop: 28 }}>All prints <span className="arrow">→</span></button>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── SHOP grid page ──────────────────────────────────────────────────────
function ShopPage({ navigate, onQuickView }) {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');

  const filtered = useMemo(() => {
    let list = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    if (sort === 'Price ↑') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price ↓') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'A → Z') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [filter, sort]);

  const cats = ['All', 'Picture Books', 'Chapter Books', 'Photo Prints'];

  return (
    <div className="page">
      <div className="container">
        <section className="shop-head">
          <div>
            <span className="eyebrow">All works · {filtered.length} items</span>
            <h1 style={{ marginTop: 14 }}>
              <span className="text-reveal"><span>The </span></span>
              <span className="text-reveal"><span style={{ animationDelay: '0.1s', fontStyle: 'italic', color: 'var(--sage-deep)' }}>shop.</span></span>
            </h1>
          </div>
          <p>Picture books, chapter books, and photo prints from our Charlotte studio. New work added on the first Friday of each month.</p>
        </section>

        <div className="filter-bar">
          {cats.map(c => (
            <button key={c} className={`filter-pill ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
          <span className="filter-spacer"></span>
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Newest</option>
            <option>Price ↑</option>
            <option>Price ↓</option>
            <option>A → Z</option>
          </select>
        </div>

        <div key={`${filter}-${sort}`} className="grid-products stagger">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={onQuickView} idx={i}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT detail page ─────────────────────────────────────────────────
function ProductDetail({ id, navigate, addToCart }) {
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const [size, setSize] = useState(p.sizes[0]);
  const [thumbIdx, setThumbIdx] = useState(0);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart({ ...p, size, qty: 1 });
      setAdding(false);
    }, 600);
  };

  const sizePrice = (s) => {
    const idx = p.sizes.indexOf(s);
    return p.price + idx * 12;
  };

  const isPrint = p.category === 'Photo Prints';
  const altMotifs = ['meadow', 'critter', 'cottage', 'rabbit'];

  return (
    <div className="page">
      <div className="container">
        <div style={{ padding: '20px 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--mute)' }}>
          <a onClick={() => navigate('shop')} style={{ cursor: 'pointer' }}>Shop</a>
          {' / '}
          <a onClick={() => navigate('shop')} style={{ cursor: 'pointer' }}>{p.category}</a>
          {' / '}<span style={{ color: 'var(--ink)' }}>{p.title}</span>
        </div>
        <section className="pdp">
          <div className="pdp-gallery">
            <div className="pdp-main-image" key={thumbIdx}>
              <div style={{ animation: 'page-in 0.5s var(--ease-out)', width: '100%', height: '100%' }}>
                <ToneArt seed={p.id.charCodeAt(3) + thumbIdx} motif={thumbIdx === 0 ? p.motif : altMotifs[thumbIdx]} label={p.title} edition={p.edition}/>
              </div>
            </div>
            <div className="pdp-thumbs">
              {[0, 1, 2, 3].map(i => (
                <button key={i}
                        className={`pdp-thumb ${i === thumbIdx ? 'active' : ''}`}
                        onClick={() => setThumbIdx(i)}>
                  <ToneArt seed={p.id.charCodeAt(3) + i} motif={i === 0 ? p.motif : altMotifs[i]}/>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-info">
            <span className="eyebrow">{p.category} · {p.edition}</span>
            <h1 className="pdp-title">{p.title}</h1>
            <div className="pdp-rating">
              <span className="stars">★★★★★</span>
              <span>4.9 · 127 reviews</span>
            </div>
            <div className="pdp-price">${sizePrice(size)}.00</div>

            <p className="pdp-desc">
              {isPrint
                ? `A ${p.sub.toLowerCase()} printed to order on archival ${p.paper}. Each print is signed in pencil on the back and shipped flat in protective sleeves. Frame not included.`
                : `${p.sub}. Hand-illustrated and printed on FSC-certified ${p.paper}. Sturdy enough for little hands, beautiful enough to keep on the shelf.`}
            </p>

            <div className="eyebrow" style={{ marginBottom: 12 }}>{isPrint ? 'Print size' : 'Format'}</div>
            <div className="option-grid">
              {p.sizes.map(s => (
                <button key={s} className={`option ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                  <div className="option-name">{s}</div>
                  <div className="option-meta">${sizePrice(s)}</div>
                </button>
              ))}
            </div>

            <button className="btn btn-sage btn-block" onClick={handleAdd} disabled={adding}>
              {adding ? <><span className="spinner" style={{ borderTopColor: 'var(--paper)', borderColor: 'rgba(255,255,255,0.3)' }}></span> Adding…</> :
                <>Add to cart — ${sizePrice(size)}</>}
            </button>

            <ul className="spec-list">
              <li><dt>Format</dt><dd>{p.edition}</dd></li>
              <li><dt>Paper</dt><dd>{p.paper}</dd></li>
              <li><dt>Year</dt><dd>{p.year}</dd></li>
              <li><dt>Made in</dt><dd>Charlotte, NC</dd></li>
              <li><dt>Shipping</dt><dd>{isPrint ? 'Flat in protective sleeve · 3–8 days' : 'Sturdy mailer · 3–8 days'}</dd></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── COLLECTIONS page ────────────────────────────────────────────────────
function CollectionsPage({ navigate, onQuickView }) {
  return (
    <div className="page">
      <div className="container">
        <section className="shop-head">
          <div>
            <span className="eyebrow">Curated · 03 collections</span>
            <h1 style={{ marginTop: 14 }}>
              <span className="text-reveal"><span>Collections.</span></span>
            </h1>
          </div>
          <p>Hand-picked groupings — for new readers, gift-giving, or filling a wall with warm light.</p>
        </section>

        <div className="stagger" style={{ marginTop: 48 }}>
          {COLLECTIONS.map((c, i) => {
            const items = PRODUCTS.slice(i * 3, i * 3 + 4);
            return (
              <section key={c.id} style={{ marginBottom: 80, paddingBottom: 80, borderBottom: '1px dashed var(--line)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 32, alignItems: 'end' }}>
                  <div>
                    <span className="eyebrow">No. {String(i + 1).padStart(2, '0')}</span>
                    <h2 className="font-display" style={{ fontSize: 48, lineHeight: 1.05, marginTop: 10, fontWeight: 400, letterSpacing: '-0.02em' }}>{c.title}</h2>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, color: 'var(--ink-soft)', maxWidth: '60ch', lineHeight: 1.6 }}>{c.desc}</p>
                    <button className="btn btn-ghost" style={{ marginTop: 20 }}>
                      View {c.count} items <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
                <div className="grid-products">
                  {items.map((p, j) => (
                    <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={onQuickView} idx={j}/>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT page ──────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  return (
    <div className="page">
      <div className="container">
        <section className="about-hero">
          <span className="eyebrow">Studio note · est. 2026</span>
          <h1 style={{ marginTop: 24 }}>
            <span className="text-reveal"><span>A small studio</span></span><br/>
            <span className="text-reveal"><span style={{ animationDelay: '0.12s', fontStyle: 'italic', color: 'var(--sage-deep)' }}>making warm</span></span><br/>
            <span className="text-reveal"><span style={{ animationDelay: '0.24s' }}>printed things.</span></span>
          </h1>
        </section>

        <section style={{ aspectRatio: '21/9', background: 'var(--sage-pale)', overflow: 'hidden', margin: '40px 0', borderRadius: 'var(--radius-xl)' }}>
          <ToneArt seed={6} motif="meadow"/>
        </section>

        <section className="about-cols">
          <div>
            <span className="eyebrow">The work</span>
            <p style={{ marginTop: 16 }}>TonePrints is a small studio based in Charlotte, making picture books for small readers and photo prints for the homes that hold them. We work with a handful of illustrators and photographers, mostly local, mostly friends.</p>
            <p>Each new title is announced on the first Friday of the month. We print in small runs and ship from our studio, usually within a day.</p>
          </div>
          <div>
            <span className="eyebrow">The process</span>
            <p style={{ marginTop: 16 }}>Books are printed on FSC-certified paper, sewn and bound to last through many bedtimes. Photo prints are made to order on Hahnemühle archival paper, signed in pencil on the back.</p>
            <p>If something arrives less than perfect, we'll replace it — or refund you, no questions asked.</p>
          </div>
        </section>

        <section style={{ padding: '60px 0 100px', borderTop: '1px dashed var(--line)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }} className="stagger">
          {[
            ['24', 'titles in print'],
            ['8', 'illustrators & photographers'],
            ['38', 'countries shipped to'],
            ['9.4k', 'happy little readers'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display" style={{ fontSize: 80, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--sage-deep)' }}>{n}</div>
              <div className="eyebrow" style={{ marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

// ─── Account: sign-in modal ──────────────────────────────────────────────
function AccountModal({ open, onClose, onSignIn, onAdmin, adminHint }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) { setEmail(''); setPassword(''); setName(''); setMode('signin'); setError(''); }
  }, [open]);

  useEffect(() => { setError(''); }, [mode]);

  const submit = (e) => {
    e.preventDefault();
    if (mode === 'admin') {
      const ok = onAdmin({ email, password });
      if (!ok) setError('Incorrect admin email or password.');
      return;
    }
    onSignIn({
      name: name || 'Maya Yamasaki',
      email: email || 'maya@hey.com',
      joined: 'November 2024',
    });
  };

  const isAdmin = mode === 'admin';

  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className={`account-modal ${isAdmin ? 'account-modal-admin' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn account-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.4"/></svg>
        </button>
        <div className="account-modal-body">
          <div className="account-modal-mark">
            <span className="brand-mark" style={{ width: 40, height: 40, fontSize: 18, background: isAdmin ? 'var(--ink)' : 'var(--sage)' }}>{isAdmin ? '◆' : 't'}</span>
          </div>
          {isAdmin && <div className="account-modal-tag">Studio admin</div>}
          <h2 className="font-display account-modal-title">
            {mode === 'signin' && 'Welcome back'}
            {mode === 'signup' && 'Create account'}
            {mode === 'admin' && 'Studio sign in'}
          </h2>
          <p className="account-modal-sub">
            {mode === 'signin' && 'Sign in to view orders, addresses, and saved payment.'}
            {mode === 'signup' && 'A few details and you’re set.'}
            {mode === 'admin' && 'Authorized staff only. Enter your admin credentials to manage the store.'}
          </p>
          <form onSubmit={submit} className="account-form">
            {mode === 'signup' && (
              <div className="field"><span className="field-lbl">Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required/>
              </div>
            )}
            <div className="field"><span className="field-lbl">{isAdmin ? 'Admin email' : 'Email'}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isAdmin ? 'studio@toneprints.com' : 'you@email.com'} required autoFocus={isAdmin}/>
            </div>
            <div className="field"><span className="field-lbl">{isAdmin ? 'Admin password' : 'Password'}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required/>
            </div>
            {!isAdmin && mode === 'signin' && (
              <a className="account-forgot">Forgot password?</a>
            )}
            {error && <div className="account-error">{error}</div>}
            <button type="submit" className={`btn btn-block ${isAdmin ? 'btn-primary' : 'btn-sage'}`}>
              {mode === 'signin' && 'Sign in →'}
              {mode === 'signup' && 'Create account →'}
              {mode === 'admin' && 'Sign in to admin →'}
            </button>
            {isAdmin && adminHint && (
              <p className="account-hint">{adminHint}</p>
            )}
          </form>

          {!isAdmin && (
            <>
              <div className="account-or"><span/>OR<span/></div>
              <button className="btn btn-ghost btn-block" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
                {mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}
              </button>
              <div className="account-admin-row">
                <button onClick={() => setMode('admin')} className="account-admin-link">Studio admin sign in →</button>
              </div>
            </>
          )}

          {isAdmin && (
            <div className="account-admin-row">
              <button onClick={() => setMode('signin')} className="account-admin-link">← Back to customer sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Customer account page ───────────────────────────────────────────────
function CustomerAccount({ navigate, customer, cart, onSignOut }) {
  const [tab, setTab] = useState('orders');
  const myOrders = useMemo(() => {
    const owned = ORDERS.filter(o => o.email === customer.email);
    return (owned.length ? owned : ORDERS.slice(0, 3)).map((o, i) => ({
      ...o,
      tracking: i === 0 ? null : '1Z' + (5000 + i) + 'TP' + (200 + i),
    }));
  }, [customer.email]);

  const wishlist = PRODUCTS.slice(2, 5);
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="page">
      <div className="container">
        <section className="account-hero">
          <span className="eyebrow">Your account</span>
          <h1 className="font-display account-title">
            Hi, <em>{customer.name.split(' ')[0]}</em>.
          </h1>
          <p className="account-sub">
            Member since {customer.joined} · {myOrders.length} orders · {cartCount} item{cartCount === 1 ? '' : 's'} in your cart
          </p>
          <div className="account-hero-actions">
            <button className="btn btn-ghost" onClick={() => navigate('shop')}>← Continue shopping</button>
            <button className="btn btn-ghost" onClick={onSignOut}>Sign out</button>
          </div>
        </section>

        <div className="account-tabs">
          {[
            ['orders', 'Orders'],
            ['cart', 'Cart'],
            ['profile', 'Profile'],
            ['addresses', 'Addresses'],
            ['payment', 'Payment'],
            ['wishlist', 'Wishlist'],
          ].map(([id, label]) => (
            <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
              {label}
              {id === 'cart' && cartCount > 0 && <span className="account-tab-badge">{cartCount}</span>}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="account-panel">
            {myOrders.map((o, i) => (
              <div key={o.id} className="account-order">
                <div className="account-order-head">
                  <div>
                    <div className="font-mono account-order-id">{o.id}</div>
                    <div className="account-order-date">Placed {o.date} · {o.items} item{o.items === 1 ? '' : 's'}</div>
                  </div>
                  <span className={`status-pill status-${o.status}`}>{o.status}</span>
                </div>
                <div className="account-order-body">
                  <div className="account-order-line"><span>Total</span><span className="font-mono">${o.total.toFixed(2)}</span></div>
                  <div className="account-order-line"><span>Shipping</span><span>{o.ship}</span></div>
                  <div className="account-order-line">
                    <span>Tracking</span>
                    {o.tracking
                      ? <span className="font-mono">{o.tracking}</span>
                      : <span style={{ color: 'var(--mute)' }}>Awaiting label</span>}
                  </div>
                </div>
                <div className="account-order-foot">
                  <button className="filter-pill">View details</button>
                  {o.status === 'shipped' && <button className="filter-pill">Track package</button>}
                  {o.status === 'delivered' && <button className="filter-pill">Buy again</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'cart' && (
          <div className="account-panel">
            {cart.length === 0 ? (
              <div className="account-empty">
                <p>Your cart is empty.</p>
                <button className="btn btn-sage" onClick={() => navigate('shop')}>Browse the shop →</button>
              </div>
            ) : (
              <>
                {cart.map((it, i) => (
                  <div key={i} className="account-cart-row">
                    <div>
                      <div style={{ fontWeight: 700 }}>{it.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--mute)' }}>{it.size} · qty {it.qty}</div>
                    </div>
                    <div className="font-mono" style={{ fontWeight: 700 }}>${(it.price * it.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                  <button className="btn btn-sage" onClick={() => navigate('checkout')}>Checkout →</button>
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'profile' && (
          <div className="account-panel">
            <div className="field-row cols-2">
              <div className="field"><span className="field-lbl">Name</span><input defaultValue={customer.name}/></div>
              <div className="field"><span className="field-lbl">Email</span><input defaultValue={customer.email}/></div>
            </div>
            <div className="field-row cols-2" style={{ marginTop: 16 }}>
              <div className="field"><span className="field-lbl">Phone</span><input defaultValue="(704) 555-0142"/></div>
              <div className="field"><span className="field-lbl">Newsletter</span><select><option>Subscribed</option><option>Unsubscribed</option></select></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button className="btn btn-sage">Save changes</button>
            </div>
          </div>
        )}

        {tab === 'addresses' && (
          <div className="account-panel">
            <div className="account-address">
              <div className="account-address-tag">Default · shipping</div>
              <div className="account-address-body">
                {customer.name}<br/>
                123 N Tryon St<br/>
                Charlotte, NC 28202<br/>
                United States
              </div>
              <div className="account-address-actions">
                <button className="filter-pill">Edit</button>
                <button className="filter-pill">Remove</button>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 16 }}>+ Add address</button>
          </div>
        )}

        {tab === 'payment' && (
          <div className="account-panel">
            <div className="account-card">
              <div className="account-card-brand">VISA</div>
              <div>
                <div style={{ fontWeight: 700 }}>•••• •••• •••• 4242</div>
                <div style={{ fontSize: 12, color: 'var(--mute)' }}>Expires 09/29 · Default</div>
              </div>
              <div className="account-address-actions">
                <button className="filter-pill">Edit</button>
                <button className="filter-pill">Remove</button>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 16 }}>+ Add payment method</button>
          </div>
        )}

        {tab === 'wishlist' && (
          <div className="grid-products" style={{ marginTop: 8 }}>
            {wishlist.map((p, i) => (
              <ProductCard key={p.id} p={p} navigate={navigate} onQuickView={() => {}} idx={i}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  TopBar, Footer, ProductCard,
  HomeStadium, HomeStorybook, HomeCozy,
  ShopPage, ProductDetail, CollectionsPage, AboutPage,
  AccountModal, CustomerAccount,
});
