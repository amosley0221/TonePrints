// cart-checkout.jsx — Cart drawer, quick-view modal, checkout

const { useState: cuState, useEffect: cuEffect } = React;

function CartDrawer({ open, onClose, cart, setCart, navigate }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 60 ? 0 : 4.50;
  const total = subtotal + shipping;

  const updateQty = (idx, delta) => {
    setCart(cart.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + delta) } : it).filter(it => it.qty > 0));
  };
  const remove = (idx) => setCart(cart.filter((_, i) => i !== idx));

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em' }}>Your basket</h2>
            <span className="eyebrow" style={{ marginTop: 4, display: 'inline-block' }}>
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--mute)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ink)', fontWeight: 400 }}>Your basket is empty.</p>
              <p style={{ marginTop: 8, fontSize: 14 }}>Let's find something cozy.</p>
              <button className="btn btn-sage" style={{ marginTop: 24 }} onClick={() => { onClose(); navigate('shop'); }}>
                Browse the shop <span className="arrow">→</span>
              </button>
            </div>
          ) : (
            cart.map((it, i) => (
              <div key={`${it.id}-${it.size}-${i}`} className="cart-row">
                <div className="cart-row-thumb">
                  <ToneArt seed={it.id.charCodeAt(3)} motif={it.motif}/>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--mute)', fontWeight: 600, marginTop: 4 }}>{it.size} · {it.edition}</div>
                  <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="qty-stepper">
                      <button onClick={() => updateQty(i, -1)}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(i, +1)}>+</button>
                    </div>
                    <button onClick={() => remove(i)} style={{ fontSize: 12, color: 'var(--mute)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>€{(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="summary-line"><span>Subtotal</span><span style={{ fontWeight: 700 }}>€{subtotal.toFixed(2)}</span></div>
            <div className="summary-line">
              <span>Shipping</span>
              <span style={{ fontWeight: 700 }}>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
            </div>
            {shipping === 0 && <div style={{ fontSize: 12, color: 'var(--sage-deep)', fontWeight: 700, marginTop: 4 }}>✓ Free EU shipping unlocked</div>}
            <div className="summary-line total"><span>Total</span><span>€{total.toFixed(2)}</span></div>
            <button className="btn btn-sage btn-block" style={{ marginTop: 16 }} onClick={() => { onClose(); navigate('checkout'); }}>
              Checkout <span className="arrow">→</span>
            </button>
            <p style={{ fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 14, fontWeight: 600 }}>
              🔒 Secured by Stripe · VAT included
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function QuickView({ product, onClose, addToCart, navigate }) {
  const [size, setSize] = cuState(product?.sizes?.[0] || 'Hardcover');
  cuEffect(() => { if (product) setSize(product.sizes[0]); }, [product]);

  if (!product) return <div className="modal-backdrop" onClick={onClose}></div>;

  const sizePrice = (s) => product.price + product.sizes.indexOf(s) * 12;

  return (
    <div className={`modal-backdrop ${product ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ background: 'var(--cream-2)', position: 'relative' }}>
          <ToneArt seed={product.id.charCodeAt(3)} motif={product.motif} label={product.title} edition={product.edition}/>
        </div>
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <button className="icon-btn" style={{ position: 'absolute', top: 16, right: 16 }} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <span className="eyebrow">{product.category} · {product.edition}</span>
          <h2 className="font-display" style={{ fontSize: 40, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px' }}>{product.title}</h2>
          <div style={{ fontSize: 22, fontWeight: 700 }}>€{sizePrice(size)}.00</div>
          <p style={{ marginTop: 20, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            {product.sub} on {product.paper}. Made with care in our Amsterdam studio.
          </p>
          <div className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>Format</div>
          <div className="option-grid" style={{ gridTemplateColumns: `repeat(${product.sizes.length}, 1fr)` }}>
            {product.sizes.map(s => (
              <button key={s} className={`option ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                <div className="option-name">{s}</div>
                <div className="option-meta">€{sizePrice(s)}</div>
              </button>
            ))}
          </div>
          <button className="btn btn-sage btn-block" style={{ marginTop: 'auto' }}
                  onClick={() => { addToCart({ ...product, size, qty: 1 }); onClose(); }}>
            Add to basket — €{sizePrice(size)}
          </button>
          <button className="btn btn-ghost" style={{ marginTop: 8, justifyContent: 'center' }}
                  onClick={() => { onClose(); navigate(`product:${product.id}`); }}>
            See full details <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({ cart, setCart, navigate, addToast }) {
  const [shipMethod, setShipMethod] = cuState('standard');
  const [paymentMethod, setPaymentMethod] = cuState('card');
  const [placing, setPlacing] = cuState(false);
  const [done, setDone] = cuState(false);

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = shipMethod === 'express' ? 8 : (subtotal > 60 ? 0 : 4.50);
  const tax = subtotal * 0.09;
  const total = subtotal + shipping + tax;

  const place = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setDone(true);
      setCart([]);
      addToast('Order placed — thank you!');
    }, 1400);
  };

  if (done) {
    return (
      <div className="page" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--sage)', color: 'var(--paper)', display: 'grid', placeItems: 'center', margin: '0 auto', fontSize: 40 }}>✓</div>
          <span className="eyebrow" style={{ marginTop: 24, display: 'block' }}>Order confirmed · #TP-2815</span>
          <h1 className="font-display" style={{ fontSize: 64, fontWeight: 400, letterSpacing: '-0.02em', marginTop: 14, lineHeight: 1 }}>Thank you!</h1>
          <p style={{ marginTop: 20, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            Your order will be packed in the studio and shipped within two working days. We've sent a confirmation to your email.
          </p>
          <button className="btn btn-sage" style={{ marginTop: 32 }} onClick={() => navigate('home')}>
            Back to TonePrints <span className="arrow">→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="topbar">
        <div className="topbar-inner" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
          <a className="brand" onClick={() => navigate('home')} style={{ cursor: 'pointer', justifySelf: 'start' }}>
            <span className="brand-mark">t</span>
            <span>TonePrints</span>
          </a>
          <span style={{ justifySelf: 'center' }} className="eyebrow">🔒 Secure checkout</span>
          <button className="btn btn-ghost" onClick={() => navigate('home')}>Cancel</button>
        </div>
      </div>

      <div className="container">
        <div className="checkout">
          <div>
            <section className="checkout-section">
              <h3 data-step="1">Contact</h3>
              <div className="field-row cols-2">
                <div className="field"><span className="field-lbl">Email</span><input type="email" defaultValue="maya@hey.com"/></div>
                <div className="field"><span className="field-lbl">Phone</span><input type="tel" defaultValue="+31 6 1234 5678"/></div>
              </div>
            </section>

            <section className="checkout-section">
              <h3 data-step="2">Shipping address</h3>
              <div className="field-row cols-2" style={{ marginBottom: 16 }}>
                <div className="field"><span className="field-lbl">First name</span><input defaultValue="Maya"/></div>
                <div className="field"><span className="field-lbl">Last name</span><input defaultValue="Yamasaki"/></div>
              </div>
              <div className="field" style={{ marginBottom: 16 }}>
                <span className="field-lbl">Street address</span><input defaultValue="Prinsengracht 263"/>
              </div>
              <div className="field-row cols-3">
                <div className="field"><span className="field-lbl">City</span><input defaultValue="Amsterdam"/></div>
                <div className="field"><span className="field-lbl">Postal</span><input defaultValue="1016 GV"/></div>
                <div className="field"><span className="field-lbl">Country</span>
                  <select defaultValue="NL">
                    <option value="NL">Netherlands</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>United States</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h3 data-step="3">Shipping method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { v: 'standard', name: 'Standard (3–5 days)', price: subtotal > 60 ? 'Free' : '€4.50' },
                  { v: 'express', name: 'Express (1–2 days)', price: '€8.00' },
                ].map(m => (
                  <label key={m.v} className={`option ${shipMethod === m.v ? 'active' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 18, cursor: 'pointer' }}>
                    <span style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <span style={{ width: 18, height: 18, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                        {shipMethod === m.v && <span style={{ width: 10, height: 10, background: 'var(--sage)', borderRadius: '50%' }}></span>}
                      </span>
                      <input type="radio" name="ship" value={m.v} checked={shipMethod === m.v} onChange={() => setShipMethod(m.v)} style={{ display: 'none' }}/>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                    </span>
                    <span style={{ fontWeight: 700 }}>{m.price}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="checkout-section">
              <h3 data-step="4">Payment</h3>
              <div className="field-row cols-3" style={{ marginBottom: 16 }}>
                {['card', 'ideal', 'paypal'].map(m => (
                  <button key={m} className={`option ${paymentMethod === m ? 'active' : ''}`} onClick={() => setPaymentMethod(m)} style={{ textAlign: 'center', padding: 18 }}>
                    <div className="option-name">{m === 'ideal' ? 'iDEAL' : m === 'paypal' ? 'PayPal' : 'Card'}</div>
                    <div className="option-meta">{m === 'card' ? 'Visa, MC, AmEx' : m === 'ideal' ? 'Bank transfer' : 'Account'}</div>
                  </button>
                ))}
              </div>
              {paymentMethod === 'card' && (
                <>
                  <div className="field" style={{ marginBottom: 14 }}>
                    <span className="field-lbl">Card number</span>
                    <input defaultValue="4242 4242 4242 4242"/>
                  </div>
                  <div className="field-row cols-3">
                    <div className="field"><span className="field-lbl">Exp.</span><input defaultValue="08 / 28"/></div>
                    <div className="field"><span className="field-lbl">CVC</span><input defaultValue="•••"/></div>
                    <div className="field"><span className="field-lbl">Postal</span><input defaultValue="1016 GV"/></div>
                  </div>
                </>
              )}
            </section>

            <button className="btn btn-sage btn-block" onClick={place} disabled={placing}>
              {placing ? <><span className="spinner" style={{ borderTopColor: 'var(--paper)', borderColor: 'rgba(255,255,255,0.3)' }}></span> Processing…</> :
                <>Place order — €{total.toFixed(2)}</>}
            </button>
          </div>

          <aside className="checkout-summary">
            <h3 className="font-display" style={{ fontSize: 24, fontWeight: 500, marginBottom: 20 }}>Your order</h3>
            {cart.map((it, i) => (
              <div key={i} className="summary-item">
                <div className="placeholder-img">
                  <ToneArt seed={it.id.charCodeAt(3)} motif={it.motif}/>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{it.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--mute)', fontWeight: 600, marginTop: 4 }}>{it.size} · ×{it.qty}</div>
                </div>
                <div style={{ fontWeight: 700 }}>€{(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <div className="summary-line"><span>Subtotal</span><span style={{ fontWeight: 700 }}>€{subtotal.toFixed(2)}</span></div>
              <div className="summary-line"><span>Shipping</span><span style={{ fontWeight: 700 }}>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span></div>
              <div className="summary-line"><span>VAT (9%)</span><span style={{ fontWeight: 700 }}>€{tax.toFixed(2)}</span></div>
              <div className="summary-line total"><span>Total</span><span>€{total.toFixed(2)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CartDrawer, QuickView, CheckoutPage });
