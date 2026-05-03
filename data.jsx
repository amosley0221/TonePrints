// data.jsx — TonePrints catalog: children's books + photo prints

const PALETTES = [
  ['#7B9A6E', '#C5D4BA', '#E4ECDC', '#FBF9F4'],  // sage
  ['#E8B87A', '#F5DDB6', '#FBF1DC', '#FFFDF8'],  // butter
  ['#C97A6F', '#E5B5AC', '#F2D8D4', '#FBF9F4'],  // berry
  ['#A8C5D0', '#C8DBE2', '#DCE8EC', '#FFFDF8'],  // sky
  ['#536B47', '#7B9A6E', '#C5D4BA', '#FBF9F4'],  // deep sage
  ['#B5854A', '#E0BC85', '#F2DBB6', '#FFFDF8'],  // honey
];

// Storybook-style cover art: each motif evokes a children's book or a soft photographic print.
function ToneArt({ seed = 0, motif = 'meadow', label, edition }) {
  const palette = PALETTES[seed % PALETTES.length];
  const [a, b, c, paper] = palette;

  const renderMotif = () => {
    switch (motif) {
      case 'meadow':  // little hill with sun — picture book
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            <circle cx="320" cy="120" r="48" fill={a} opacity="0.7"/>
            <path d="M 0 360 Q 100 280 220 320 T 400 300 L 400 500 L 0 500 Z" fill={b}/>
            <path d="M 0 420 Q 140 360 280 400 T 400 380 L 400 500 L 0 500 Z" fill={a}/>
            {[80, 160, 240, 320].map((x, i) => (
              <g key={i}>
                <rect x={x-1} y={380 - i*4} width="2" height="20" fill={paper} opacity="0.5"/>
                <circle cx={x} cy={378 - i*4} r="3" fill={paper}/>
              </g>
            ))}
          </>
        );
      case 'critter':  // friendly fox/bear silhouette — children's book
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            <circle cx="200" cy="280" r="120" fill={a}/>
            <ellipse cx="160" cy="180" rx="30" ry="40" fill={a}/>
            <ellipse cx="240" cy="180" rx="30" ry="40" fill={a}/>
            <circle cx="170" cy="260" r="8" fill={paper}/>
            <circle cx="230" cy="260" r="8" fill={paper}/>
            <ellipse cx="200" cy="300" rx="14" ry="9" fill={b}/>
            <path d="M 100 420 Q 200 460 300 420" stroke={paper} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
          </>
        );
      case 'balloon':  // hot air balloon — adventure book
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            <ellipse cx="200" cy="200" rx="110" ry="130" fill={a}/>
            <path d="M 90 200 Q 200 230 310 200" stroke={paper} strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M 170 320 L 145 380 M 230 320 L 255 380" stroke={paper} strokeWidth="2" opacity="0.6"/>
            <rect x="160" y="380" width="80" height="44" fill={b} rx="6"/>
            {[80, 320, 350, 60].map((x, i) => (
              <circle key={i} cx={x} cy={80 + i*80} r="3" fill={paper} opacity="0.5"/>
            ))}
          </>
        );
      case 'photo-soft':  // soft golden-hour photo composition
        return (
          <>
            <rect width="400" height="500" fill={paper}/>
            <rect x="20" y="20" width="360" height="420" fill={b}/>
            <circle cx="280" cy="180" r="60" fill={paper} opacity="0.85"/>
            <path d="M 20 340 Q 130 280 250 320 T 380 300 L 380 440 L 20 440 Z" fill={a}/>
            <text x="200" y="475" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="10" fill={a} letterSpacing="2" fontWeight="700">
              GOLDEN HOUR · 0224
            </text>
          </>
        );
      case 'photo-portrait':
        return (
          <>
            <rect width="400" height="500" fill={paper}/>
            <rect x="40" y="40" width="320" height="380" fill={a}/>
            <circle cx="200" cy="180" r="60" fill={c}/>
            <path d="M 110 420 Q 200 280 290 420 Z" fill={c}/>
            <rect x="40" y="40" width="320" height="380" fill="none" stroke={paper} strokeWidth="14"/>
          </>
        );
      case 'photo-landscape':
        return (
          <>
            <rect width="400" height="500" fill={paper}/>
            <rect x="20" y="60" width="360" height="380" fill={c}/>
            <rect x="20" y="60" width="360" height="220" fill={b}/>
            <path d="M 20 280 L 120 200 L 200 250 L 280 180 L 380 240 L 380 280 Z" fill={a} opacity="0.8"/>
            <path d="M 20 280 L 100 240 L 200 280 L 300 230 L 380 270 L 380 280 Z" fill={a}/>
            <circle cx="290" cy="140" r="22" fill={paper} opacity="0.85"/>
          </>
        );
      case 'cottage':  // tiny house — children's story
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            <rect x="0" y="380" width="400" height="120" fill={b}/>
            <rect x="130" y="240" width="160" height="160" fill={paper}/>
            <polygon points="115,240 305,240 210,150" fill={a}/>
            <rect x="190" y="320" width="40" height="80" fill={a}/>
            <rect x="150" y="270" width="30" height="30" fill={c}/>
            <rect x="240" y="270" width="30" height="30" fill={c}/>
            <path d="M 270 220 L 270 180 L 285 180 L 285 230" fill={a}/>
            <circle cx="320" cy="100" r="28" fill={a} opacity="0.6"/>
          </>
        );
      case 'stars':  // bedtime book
        return (
          <>
            <rect width="400" height="500" fill={a}/>
            <circle cx="100" cy="380" r="40" fill={paper} opacity="0.9"/>
            <circle cx="120" cy="370" r="36" fill={a}/>
            {[
              [80, 100], [180, 60], [280, 120], [340, 200],
              [60, 200], [220, 180], [320, 320], [160, 280],
              [240, 360], [100, 280]
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill={paper} opacity={0.5 + (i%4)*0.15}/>
              </g>
            ))}
          </>
        );
      case 'ocean':
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            <rect x="0" y="0" width="400" height="220" fill={c}/>
            <circle cx="320" cy="100" r="44" fill={b}/>
            <rect x="0" y="220" width="400" height="280" fill={a}/>
            {[280, 320, 360, 400].map((y, i) => (
              <path key={i} d={`M -20 ${y} Q 100 ${y-15} 200 ${y} T 420 ${y}`} stroke={paper} strokeWidth="2" fill="none" opacity={0.4-i*0.08}/>
            ))}
          </>
        );
      case 'garden':
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            {[
              [80, 360, a], [160, 380, b], [240, 360, a],
              [320, 380, b], [120, 420, a], [200, 440, b], [280, 420, a]
            ].map(([x, y, fill], i) => (
              <g key={i}>
                <line x1={x} y1={y} x2={x} y2={y+50} stroke={a} strokeWidth="3"/>
                <circle cx={x} cy={y} r="14" fill={fill}/>
                <circle cx={x} cy={y} r="5" fill={paper}/>
              </g>
            ))}
            <path d="M 0 460 L 400 460 L 400 500 L 0 500 Z" fill={a} opacity="0.6"/>
          </>
        );
      case 'rabbit':
        return (
          <>
            <rect width="400" height="500" fill={c}/>
            <ellipse cx="200" cy="350" rx="100" ry="80" fill={paper}/>
            <ellipse cx="200" cy="240" rx="60" ry="55" fill={paper}/>
            <ellipse cx="170" cy="160" rx="14" ry="50" fill={paper}/>
            <ellipse cx="170" cy="160" rx="6" ry="38" fill={b}/>
            <ellipse cx="230" cy="160" rx="14" ry="50" fill={paper}/>
            <ellipse cx="230" cy="160" rx="6" ry="38" fill={b}/>
            <circle cx="185" cy="240" r="4" fill={a}/>
            <circle cx="215" cy="240" r="4" fill={a}/>
            <circle cx="200" cy="258" r="4" fill={b}/>
          </>
        );
      case 'lettering':
        return (
          <>
            <rect width="400" height="500" fill={a}/>
            <text x="200" y="280" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="180" fontWeight="400" fill={paper}>
              {(label || 'Tp').slice(0, 1)}
            </text>
            <text x="200" y="430" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="11" fill={paper} opacity="0.7" letterSpacing="3" fontWeight="700">
              TONEPRINTS
            </text>
          </>
        );
      default:
        return <rect width="400" height="500" fill={a}/>;
    }
  };

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg" className="tone-art">
      {renderMotif()}
      {edition && (
        <text x="20" y="485" fontFamily="Nunito, sans-serif" fontSize="9" fill={paper} opacity="0.7" letterSpacing="1.5" fontWeight="700">
          {edition}
        </text>
      )}
    </svg>
  );
}

const PRODUCTS = [
  { id: 'tp001', title: 'The Quiet Meadow', sub: "Picture book · Ages 3–6", price: 22, category: 'Picture Books', motif: 'meadow', edition: '40 PAGES', sizes: ['Hardcover', 'Softcover'], year: 2026, paper: 'FSC matte board', stock: 84, badge: 'New' },
  { id: 'tp002', title: 'Fox & the Lantern', sub: "Picture book · Ages 4–7", price: 24, category: 'Picture Books', motif: 'critter', edition: '48 PAGES', sizes: ['Hardcover'], year: 2025, paper: 'FSC matte board', stock: 56, badge: 'Bestseller' },
  { id: 'tp003', title: 'Up, Up, Up!', sub: "Picture book · Ages 2–5", price: 19, category: 'Picture Books', motif: 'balloon', edition: '32 PAGES', sizes: ['Board book', 'Hardcover'], year: 2025, paper: 'Board / FSC', stock: 120 },
  { id: 'tp004', title: 'Golden Hour, No. 02', sub: 'Photo print · Open edition', price: 38, category: 'Photo Prints', motif: 'photo-soft', edition: '8×10 / 11×14 / 16×20', sizes: ['8×10', '11×14', '16×20'], year: 2026, paper: 'Hahnemühle photo rag', stock: 32 },
  { id: 'tp005', title: 'A Little Garden', sub: "Chapter book · Ages 7–10", price: 12, category: 'Chapter Books', motif: 'garden', edition: '128 PAGES', sizes: ['Softcover'], year: 2024, paper: 'FSC cream', stock: 68 },
  { id: 'tp006', title: 'Sea Light', sub: 'Photo print · Limited ed.', price: 65, category: 'Photo Prints', motif: 'ocean', edition: 'ED. 12/50', sizes: ['11×14', '16×20', '20×24'], year: 2026, paper: 'Hahnemühle photo rag', stock: 12 },
  { id: 'tp007', title: 'Goodnight, Little Star', sub: "Bedtime story · Ages 0–3", price: 16, category: 'Picture Books', motif: 'stars', edition: '24 PAGES', sizes: ['Board book'], year: 2025, paper: 'Recycled board', stock: 200, badge: 'Bestseller' },
  { id: 'tp008', title: 'The Snug Cottage', sub: "Picture book · Ages 3–6", price: 22, category: 'Picture Books', motif: 'cottage', edition: '40 PAGES', sizes: ['Hardcover'], year: 2024, paper: 'FSC matte board', stock: 38 },
  { id: 'tp009', title: 'Window Light, Spring', sub: 'Photo print · Open edition', price: 32, category: 'Photo Prints', motif: 'photo-portrait', edition: '8×10 / 11×14', sizes: ['8×10', '11×14'], year: 2026, paper: 'Mohawk Superfine', stock: 48 },
  { id: 'tp010', title: 'Where the Hills Begin', sub: 'Photo print · Limited ed.', price: 58, category: 'Photo Prints', motif: 'photo-landscape', edition: 'ED. 04/40', sizes: ['11×14', '16×20'], year: 2025, paper: 'Hahnemühle photo rag', stock: 18 },
  { id: 'tp011', title: 'Honey & Hazel', sub: "Picture book · Ages 3–7", price: 24, category: 'Picture Books', motif: 'rabbit', edition: '44 PAGES', sizes: ['Hardcover'], year: 2026, paper: 'FSC matte board', stock: 42, badge: 'New' },
  { id: 'tp012', title: 'A First Alphabet', sub: "Learning book · Ages 2–4", price: 18, category: 'Picture Books', motif: 'lettering', edition: '52 PAGES', sizes: ['Board book'], year: 2024, paper: 'Recycled board', stock: 96 },
  // ── Travel poster series · digital downloads ─────────────────────────
  { id: 'tp013', title: 'Cape Town', sub: 'Travel poster · South Africa', price: 10, category: 'Photo Prints', motif: 'photo-landscape', edition: 'DIGITAL DOWNLOAD', sizes: ['Digital download'], year: 2026, paper: 'High-resolution PNG + PDF', stock: 9999, image: 'images/photo-prints/cape-town.jpg', digital: true, badge: 'New' },
  { id: 'tp014', title: 'Florence', sub: 'Travel poster · Italy', price: 10, category: 'Photo Prints', motif: 'photo-landscape', edition: 'DIGITAL DOWNLOAD', sizes: ['Digital download'], year: 2026, paper: 'High-resolution PNG + PDF', stock: 9999, image: 'images/photo-prints/florence.jpg', digital: true, badge: 'New' },
  { id: 'tp015', title: 'London', sub: 'Travel poster · United Kingdom', price: 10, category: 'Photo Prints', motif: 'photo-landscape', edition: 'DIGITAL DOWNLOAD', sizes: ['Digital download'], year: 2026, paper: 'High-resolution PNG + PDF', stock: 9999, image: 'images/photo-prints/london.jpg', digital: true, badge: 'New' },
  { id: 'tp016', title: 'Philadelphia', sub: 'Travel poster · Pennsylvania', price: 10, category: 'Photo Prints', motif: 'photo-landscape', edition: 'DIGITAL DOWNLOAD', sizes: ['Digital download'], year: 2026, paper: 'High-resolution PNG + PDF', stock: 9999, image: 'images/photo-prints/philadelphia.jpg', digital: true, badge: 'New' },
  { id: 'tp017', title: 'Tampa', sub: 'Travel poster · Florida', price: 10, category: 'Photo Prints', motif: 'photo-landscape', edition: 'DIGITAL DOWNLOAD', sizes: ['Digital download'], year: 2026, paper: 'High-resolution PNG + PDF', stock: 9999, image: 'images/photo-prints/tampa.jpg', digital: true, badge: 'New' },
];

const COLLECTIONS = [
  { id: 'c1', title: 'Bedtime Favorites', desc: 'Soft, dreamy stories for the end of the day.', count: 8 },
  { id: 'c2', title: 'New This Spring', desc: 'Picture books and prints fresh off the press.', count: 6 },
  { id: 'c3', title: 'Photo Prints — Open Edition', desc: 'Affordable prints, made to order on archival paper.', count: 12 },
];

const ORDERS = [
  { id: '#TP-2814', customer: 'Maya Yamasaki', email: 'maya@hey.com', date: '2026-04-25', total: 64.00, status: 'pending', items: 3, ship: 'Standard · US' },
  { id: '#TP-2813', customer: 'Adesola Folarin', email: 'adesola@kindred.studio', date: '2026-04-25', total: 138.00, status: 'processing', items: 4, ship: 'Express · UK' },
  { id: '#TP-2812', customer: 'Jonas Bergmann', email: 'jb@bergmann.co', date: '2026-04-24', total: 38.00, status: 'shipped', items: 1, ship: 'Standard · DE' },
  { id: '#TP-2811', customer: 'Sade Okafor', email: 'sade@thirdroom.io', date: '2026-04-24', total: 92.00, status: 'shipped', items: 3, ship: 'Standard · US' },
  { id: '#TP-2810', customer: 'Leo Costa', email: 'leo@costa.fm', date: '2026-04-23', total: 187.00, status: 'delivered', items: 5, ship: 'Express · PT' },
  { id: '#TP-2809', customer: 'Noora Aaltonen', email: 'noora@hey.fi', date: '2026-04-23', total: 46.00, status: 'delivered', items: 2, ship: 'Standard · FI' },
  { id: '#TP-2808', customer: 'Rosa Eriksson', email: 'rosa@eriksson.se', date: '2026-04-22', total: 24.00, status: 'cancelled', items: 1, ship: 'Standard · SE' },
  { id: '#TP-2807', customer: 'Elena Mendez', email: 'em@mendez.work', date: '2026-04-22', total: 110.00, status: 'delivered', items: 4, ship: 'Express · ES' },
];

const CUSTOMERS = [
  { name: 'Maya Yamasaki', email: 'maya@hey.com', orders: 4, spent: 248.00, location: 'Charlotte, NC', joined: '2024-11' },
  { name: 'Adesola Folarin', email: 'adesola@kindred.studio', orders: 7, spent: 612.50, location: 'London, UK', joined: '2024-03' },
  { name: 'Jonas Bergmann', email: 'jb@bergmann.co', orders: 2, spent: 86.00, location: 'Berlin, DE', joined: '2025-08' },
  { name: 'Sade Okafor', email: 'sade@thirdroom.io', orders: 5, spent: 312.00, location: 'Charlotte, NC', joined: '2024-07' },
  { name: 'Leo Costa', email: 'leo@costa.fm', orders: 12, spent: 940.00, location: 'Lisbon, PT', joined: '2023-09' },
  { name: 'Noora Aaltonen', email: 'noora@hey.fi', orders: 3, spent: 124.00, location: 'Helsinki, FI', joined: '2025-02' },
  { name: 'Rosa Eriksson', email: 'rosa@eriksson.se', orders: 1, spent: 24.00, location: 'Stockholm, SE', joined: '2026-01' },
  { name: 'Elena Mendez', email: 'em@mendez.work', orders: 6, spent: 388.00, location: 'Madrid, ES', joined: '2024-05' },
];

const SHIPPING_ZONES = [
  { id: 'z1', name: 'Domestic — United States', countries: 'US', rates: [
    { name: 'Standard (3–5 days)', price: 4.50, free_over: 35 },
    { name: 'Express (1–2 days)', price: 8.00, free_over: 75 },
  ]},
  { id: 'z2', name: 'Canada & Mexico', countries: 'CA, MX', rates: [
    { name: 'Standard (5–8 days)', price: 12.00, free_over: 75 },
    { name: 'Express (2–4 days)', price: 24.00, free_over: 150 },
  ]},
  { id: 'z3', name: 'United Kingdom', countries: 'UK', rates: [
    { name: 'Standard (5–8 days)', price: 14.00, free_over: 90 },
  ]},
  { id: 'z4', name: 'European Union', countries: 'BE, DE, FR, IT, ES +20', rates: [
    { name: 'Standard (7–14 days)', price: 18.00, free_over: 100 },
    { name: 'Express (3–5 days)', price: 38.00, free_over: 200 },
  ]},
  { id: 'z5', name: 'Rest of world', countries: 'AU, JP, KR +35', rates: [
    { name: 'Standard (10–18 days)', price: 24.00, free_over: 150 },
  ]},
];

// ProductImage — renders a real photograph if `product.image` is set,
// otherwise falls back to the in-house ToneArt SVG illustration.
function ProductImage({ product, alt, idx = 0 }) {
  if (product && product.image) {
    return (
      <img
        src={product.image}
        alt={alt || product.title}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  }
  return <ToneArt
    seed={(product?.id?.charCodeAt(3) || 0) + idx}
    motif={product?.motif}
    label={product?.title}
    edition={product?.edition}
  />;
}

// fmt — money formatter that preserves cents only when needed.
function fmt(n) {
  return Number(n).toFixed(2).replace(/\.00$/, '');
}

Object.assign(window, { ToneArt, ProductImage, fmt, PRODUCTS, COLLECTIONS, ORDERS, CUSTOMERS, SHIPPING_ZONES });
