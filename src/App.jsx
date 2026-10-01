import { useEffect, useMemo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact', href: '/contact' },
];

const featuredDishes = [
  {
    id: 1,
    name: 'Charred Pepper Jollof',
    description: 'Smoky Nigerian-inspired jollof infused with roasted peppers, citrus, and a slow-simmered tomato base.',
    price: 8500,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    tag: 'Chef’s Choice',
  },
  {
    id: 2,
    name: 'Citrus Grilled Salmon',
    description: 'Locally sourced salmon with herb butter, charred greens, and a bright garlic-caper finish.',
    price: 13800,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    tag: 'Popular',
  },
  {
    id: 3,
    name: 'Lemon Herb Chicken',
    description: 'Crisp-skinned chicken served with whipped yam, steamed greens, and house pepper glaze.',
    price: 9700,
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    tag: 'Signature',
  },
  {
    id: 4,
    name: 'Cocoa Crème Brûlée',
    description: 'Silky vanilla custard with dark chocolate notes and a freshly caramelized sugar crust.',
    price: 5200,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    tag: 'Dessert',
  },
];

const menuItems = [
  { name: 'Peppered Goat Meat', category: 'Starters', price: 7500, description: 'Tender goat meat in a rich pepper sauce with aromatic Nigerian spices.', popular: true, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80' },
  { name: 'Plantain Crisps', category: 'Starters', price: 2800, description: 'Thinly sliced plantain, lightly fried and seasoned with lemon pepper.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80' },
  { name: 'Coconut Fish Stew', category: 'Main Courses', price: 11000, description: 'Fresh fish simmered in vibrant coconut broth with tomatoes, spinach, and herbs.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80' },
  { name: 'Smoked Jollof Rice', category: 'Main Courses', price: 9500, description: 'A deeply savory rice dish finished with smoked notes and grilled peppers.', popular: true, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { name: 'Crispy Chicken Skewers', category: 'Grills', price: 8900, description: 'Char-grilled skewers glazed with garlic scotch bonnet reduction.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80' },
  { name: 'Seafood Rice Bowl', category: 'Seafood', price: 12600, description: 'A mix of prawns, calamari, and rice with saffron and lime butter.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80' },
  { name: 'Braised Short Ribs', category: 'Grills', price: 14500, description: 'Slow-cooked beef ribs with caramelized onion jus and roasted vegetables.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { name: 'Coconut Panna Cotta', category: 'Desserts', price: 4300, description: 'Silky coconut cream layered with berry compote and toasted granola.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mango Basil Spritz', category: 'Drinks', price: 3200, description: 'Fresh mango, basil, lime, and sparkling tonic for a bright finish.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { name: 'Cocoa Espresso Shake', category: 'Drinks', price: 3600, description: 'A velvety blend of coffee, cocoa, and vanilla bean over crushed ice.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80' },
  { name: 'Garden Fresh Salad', category: 'Breakfast', price: 5100, description: 'Seasonal greens, avocado, citrus vinaigrette, and toasted seeds.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80' },
  { name: 'Spiced Breakfast Bowl', category: 'Breakfast', price: 6400, description: 'Crisp potatoes, sautéed greens, fried egg, and pepper relish.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
];

const allDishes = [...menuItems, ...featuredDishes.map((dish) => ({ ...dish, category: 'Chef’s selection' }))];

const galleryItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', alt: 'Elegant interior dining space' },
  { id: 2, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', alt: 'Restaurant plating and ambiance' },
  { id: 3, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80', alt: 'Signature dish with grilled vegetables' },
  { id: 4, image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80', alt: 'Chef preparing a signature entrée' },
  { id: 5, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80', alt: 'Guests enjoying a warm evening at the restaurant' },
  { id: 6, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80', alt: 'Exterior of a warm and inviting restaurant' },
  { id: 7, image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=80', alt: 'A freshly prepared meal served at the table' },
  { id: 8, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80', alt: 'Seasonal greens with colorful vegetables' },
  { id: 9, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80', alt: 'Grilled food prepared over an open flame' },
  { id: 10, image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80', alt: 'A carefully plated grilled main course' },
  { id: 11, image: 'https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=900&q=80', alt: 'A dinner dish ready to be shared' },
  { id: 12, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80', alt: 'A colorful bowl made with fresh ingredients' },
];

const legalPages = {
  '/privacy': {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    updated: 'Last updated: October 1, 2026',
    sections: [
      ['Information we collect', 'When you use the reservation, contact, or checkout forms, this demo may ask for details such as your name, email address, phone number, and visit or delivery information. The current website does not send these details to a restaurant server.'],
      ['How information is used', 'Information entered into forms is used only to demonstrate the requested website flow. Cart selections are stored in your browser so they remain available while you navigate the site.'],
      ['Payments and service providers', 'No payment information is collected or processed by this website. A payment provider, secure order service, retention schedule, and operational privacy contact must be configured before launch.'],
      ['Your choices', 'You can clear saved cart information by removing items from your cart or clearing this site’s browser storage. Do not enter sensitive personal or payment information into this prototype.'],
      ['Contact', 'For privacy questions, contact hello@emberandoak.com. This is sample restaurant contact information and should be confirmed before publication.'],
    ],
  },
  '/terms': {
    eyebrow: 'Legal',
    title: 'Terms of service',
    updated: 'Last updated: October 1, 2026',
    sections: [
      ['Website status', 'This website is a restaurant prototype. Menu items, prices, availability, opening hours, and contact details are illustrative and may not represent a live business.'],
      ['Orders and reservations', 'Submitting a form in this prototype does not create a confirmed restaurant order or reservation. Confirmation, fulfillment, cancellation, and refund policies must be provided by the restaurant before this site is used for real transactions.'],
      ['Pricing and availability', 'All listed prices are sample values in Nigerian naira. A live restaurant must verify prices, taxes, delivery charges, allergens, and availability before accepting orders.'],
      ['Payments', 'This site does not process payments. Do not submit card details. Any future payment flow must use a properly configured payment provider and secure server-side order handling.'],
      ['Contact', 'Questions about these terms may be directed to hello@emberandoak.com. Confirm this contact address and have these terms reviewed for the applicable business and jurisdiction before launch.'],
    ],
  },
  '/cookies': {
    eyebrow: 'Legal',
    title: 'Cookie policy',
    updated: 'Last updated: October 1, 2026',
    sections: [
      ['Browser storage', 'This prototype uses local browser storage to remember your cart between pages and visits. It does not currently use advertising or analytics cookies.'],
      ['Managing stored data', 'You can remove cart items from the cart page or clear site data in your browser settings. Clearing site data removes the saved cart.'],
      ['Future integrations', 'Analytics, maps, embedded media, or payment tools may set additional cookies if added later. The policy and any required consent controls should be updated before those integrations are enabled.'],
    ],
  },
};

const testimonials = [
  {
    name: 'Aisha K.',
    review: 'The food was breathtaking, the service was warm, and the room felt intimate without losing energy. It is now our favorite date-night spot.',
    rating: 5,
  },
  {
    name: 'Tunde O.',
    review: 'A beautiful balance of culture, elegance, and comfort. Every course felt intentional and full of flavor.',
    rating: 5,
  },
  {
    name: 'Ruth M.',
    review: 'From the welcome to dessert, the experience felt polished and personal. The grilled fish was exceptional.',
    rating: 5,
  },
  {
    name: 'Daniel A.',
    review: 'The staff were attentive, the design is stunning, and the menu feels both familiar and adventurous.',
    rating: 4,
  },
];

const reasons = [
  { title: 'Fresh Ingredients', description: 'We work closely with trusted suppliers to bring in seasonal produce and premium proteins.', icon: '✦' },
  { title: 'Authentic Flavours', description: 'Traditional techniques meet modern presentation in every dish we serve.', icon: '◎' },
  { title: 'Warm Hospitality', description: 'Every guest is welcomed with attentive service and genuine care.', icon: '❋' },
  { title: 'Memorable Experiences', description: 'Crafted space, mood, and cuisine come together for unforgettable dining moments.', icon: '✧' },
];

const openingHours = [
  { day: 'Monday – Thursday', hours: '10:00 AM – 10:00 PM' },
  { day: 'Friday – Saturday', hours: '10:00 AM – 11:30 PM' },
  { day: 'Sunday', hours: '12:00 PM – 10:00 PM' },
];

const menuCategories = ['All', 'Breakfast', 'Starters', 'Main Courses', 'Grills', 'Seafood', 'Desserts', 'Drinks'];

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
}

function createMenuSlug(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = featuredDishes[0].image;
}

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isMenu = pathname === '/menu';
  const isGallery = pathname === '/gallery';
  const isCart = pathname === '/cart';
  const isCheckout = pathname === '/checkout';
  const isReservation = pathname === '/reservations';
  const isContact = pathname === '/contact';
  const legalPage = legalPages[pathname];
  const requestedFoodSlug = pathname.startsWith('/menu/') ? pathname.slice('/menu/'.length) : '';
  const selectedFood = allDishes.find((dish) => createMenuSlug(dish.name) === requestedFoodSlug);
  const isFoodDetail = Boolean(selectedFood);
  const isUnknownFood = requestedFoodSlug !== '' && !selectedFood;
  const pageIntro = {
    '/about': ['Our story', 'More than just a meal', 'West African heritage, contemporary craft, and hospitality come together around the table.'],
    '/menu': ['Our menu', 'Crafted for every appetite', 'Explore vibrant, seasonal dishes inspired by West African heritage and prepared with a modern touch.'],
    '/gallery': ['Gallery', 'Moments worth lingering over', 'A glimpse inside Ember & Oak, from the room and the table to the dishes we love to share.'],
    '/cart': ['Your order', 'Good choices, gathered here', 'Review your selections before continuing to checkout.'],
    '/checkout': ['Checkout', 'Complete your order', 'Choose delivery or collection and share the details needed to prepare your meal.'],
    '/reservations': ['Reservations', 'A table is waiting', 'Tell us when you are coming. We will take care of the rest.'],
    '/contact': ['Get in touch', 'Let’s make it memorable', 'For celebrations, private dining, or simply a question, our team is here to help.'],
  }[pathname];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('ember-oak-cart') || '[]');
      return Array.isArray(savedCart) ? savedCart : [];
    } catch {
      return [];
    }
  });
  const [fulfillment, setFulfillment] = useState('delivery');
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [reservationStatus, setReservationStatus] = useState('');
  const [contactStatus, setContactStatus] = useState('');

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 0 && fulfillment === 'delivery' ? 2000 : 0;
  const total = subtotal + deliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    try {
      localStorage.setItem('ember-oak-cart', JSON.stringify(cart));
    } catch {
      return;
    }
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedGalleryIndex === null) return;
      if (event.key === 'Escape') setSelectedGalleryIndex(null);
      if (event.key === 'ArrowRight') setSelectedGalleryIndex((prev) => (prev + 1) % galleryItems.length);
      if (event.key === 'ArrowLeft') setSelectedGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIndex]);

  const openGallery = (index) => setSelectedGalleryIndex(index);
  const closeGallery = () => setSelectedGalleryIndex(null);

  const addToCart = (item) => {
    setOrderConfirmation(null);
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.name === item.name);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...current, { id: Date.now(), name: item.name, price: item.price, image: item.image, qty: 1 }];
    });
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const deliveryAddress = (form.get('address') || '').toString().trim();

    if (fulfillment === 'delivery' && !deliveryAddress) return;

    setOrderConfirmation({ reference: `EO-${Date.now().toString().slice(-8)}`, total });
    setCart([]);
    event.currentTarget.reset();
    setFulfillment('delivery');
  };

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleReservationSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const name = (form.get('name') || '').toString().trim();
    const email = (form.get('email') || '').toString().trim();
    const date = (form.get('date') || '').toString();
    const time = (form.get('time') || '').toString();

    if (!name || !email || !date || !time) {
      setReservationStatus('Please complete all required reservation details.');
      return;
    }

    setReservationStatus('Your details are valid, but online reservations are not connected yet. Please call +234 800 000 0000 to confirm your table.');
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const name = (form.get('name') || '').toString().trim();
    const email = (form.get('email') || '').toString().trim();
    const message = (form.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      setContactStatus('Please fill in your name, email, and message.');
      return;
    }

    setContactStatus('Your details are valid, but online messages are not connected yet. Please email hello@emberandoak.com directly.');
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Ember and Oak home">
            <span className="brand-mark">E</span>
            <span>
              Ember & Oak
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link key={item.href} to={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link to="/cart" className="cart-link" aria-label={`Cart, ${cartCount} items`}>
              <ShoppingBag size={21} strokeWidth={1.8} aria-hidden="true" />
              <span className="cart-count">{cartCount}</span>
            </Link>
            <Link to="/reservations" className="button button-primary">Reserve a Table</Link>
            <button
              className={mobileMenuOpen ? 'menu-toggle is-open' : 'menu-toggle'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="mobile-menu">
            <nav aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link to="/reservations" className="button button-primary mobile-menu-button" onClick={() => setMobileMenuOpen(false)}>
              Reserve a Table
            </Link>
          </div>
        )}
      </header>

      <main id="home">
        {pageIntro && (
          <section className="page-intro">
            <div className="container">
              <div className="eyebrow">{pageIntro[0]}</div>
              <h1>{pageIntro[1]}</h1>
              <p>{pageIntro[2]}</p>
            </div>
          </section>
        )}
        {legalPage && (
          <section className="page-intro">
            <div className="container">
              <div className="eyebrow">{legalPage.eyebrow}</div>
              <h1>{legalPage.title}</h1>
              <p>{legalPage.updated}</p>
            </div>
          </section>
        )}

        {isHome && (
        <section className="hero">
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="eyebrow">Fine dining • Lagos</div>
            <h1>Taste. Tradition. Experience.</h1>
            <p>
              Exceptional food, carefully crafted ingredients, and an atmosphere made for unforgettable moments.
            </p>
            <div className="hero-actions">
              <Link to="/reservations" className="button button-primary">Reserve a Table</Link>
              <Link to="/menu" className="button button-secondary">Explore Our Menu</Link>
            </div>
            <div className="hero-meta">
              <span>Chef-driven cuisine</span>
              <span>Live music Fridays</span>
              <span>Private events</span>
            </div>
          </div>
          <div className="scroll-cue" aria-label="Scroll to content">Scroll</div>
        </section>
        )}

        {isAbout && <section className="story section-spacing" id="about">
          <div className="container intro-layout">
            <div className="story-copy">
              <div className="eyebrow">Our story</div>
              <h2>More Than Just a Meal</h2>
              <p>
                Ember & Oak brings together exceptional ingredients, thoughtful preparation, and a warm atmosphere to create memorable dining experiences that feel personal from the first welcome to the final sip.
              </p>
              <p>
                Inspired by West African heritage and contemporary culinary craft, our kitchen blends flavour, technique, and hospitality into a dining experience designed for celebrations and everyday indulgence alike.
              </p>
              <Link to="/menu" className="button button-primary">Discover Our Story</Link>
            </div>
            <div className="story-visual">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80"
                alt="Restaurant guests enjoying a refined evening meal"
              />
            </div>
          </div>
        </section>}

        {isHome && <section className="featured section-spacing">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">Curated favourites</div>
                <h2>A Taste of What We Do</h2>
              </div>
              <Link to="/menu" className="text-link">View Full Menu</Link>
            </div>

            <div className="dish-grid">
              {featuredDishes.map((dish) => (
                <article key={dish.id} className="dish-card">
                  <div className="dish-image-wrap">
                    <img src={dish.image} alt={dish.name} onError={handleImageError} />
                    <span className="dish-badge">{dish.tag}</span>
                  </div>
                  <div className="dish-body">
                    <h3><Link to={`/menu/${createMenuSlug(dish.name)}`}>{dish.name}</Link></h3>
                    <p>{dish.description}</p>
                    <div className="dish-footer">
                      <strong>{formatCurrency(dish.price)}</strong>
                      <div className="dish-footer-actions">
                        <Link className="text-link" to={`/menu/${createMenuSlug(dish.name)}`}>View dish</Link>
                        <button className="button button-primary compact" onClick={() => addToCart(dish)}>Add to order</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {(isHome || isMenu) && <section className="menu section-spacing" id="menu">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">Menu</div>
                <h2>Crafted for every appetite</h2>
              </div>
            </div>

            <div className="filter-row" role="tablist" aria-label="Menu categories">
              {menuCategories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? 'filter-pill active' : 'filter-pill'}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {filteredMenu.map((item) => (
                <article key={item.name} className="menu-item">
                  <img src={item.image} alt={item.name} onError={handleImageError} />
                  <div className="menu-item-content">
                    <div className="menu-item-header">
                      <div>
                        <h3><Link to={`/menu/${createMenuSlug(item.name)}`}>{item.name}</Link></h3>
                        <span>{item.category}</span>
                      </div>
                      <strong>{formatCurrency(item.price)}</strong>
                    </div>
                    <p>{item.description}</p>
                    <div className="menu-item-actions">
                      {item.popular && <span className="menu-tag">Popular</span>}
                      <Link className="text-link" to={`/menu/${createMenuSlug(item.name)}`}>View details</Link>
                      <button className="button button-secondary compact" onClick={() => addToCart(item)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {isFoodDetail && <section className="food-detail section-spacing">
          <div className="container food-detail-layout">
            <div className="food-detail-image">
              <img src={selectedFood.image} alt={selectedFood.name} onError={handleImageError} />
            </div>
            <div className="food-detail-copy">
              <Link to="/menu" className="text-link back-to-menu">← Back to menu</Link>
              <div className="eyebrow">{selectedFood.category}</div>
              <h1>{selectedFood.name}</h1>
              <p className="food-detail-description">{selectedFood.description}</p>
              <strong className="food-detail-price">{formatCurrency(selectedFood.price)}</strong>
              <p className="food-detail-note">Please contact our team about ingredients, allergens, or dietary requirements before ordering.</p>
              <div className="food-detail-actions">
                <button className="button button-primary" onClick={() => addToCart(selectedFood)}>Add to cart</button>
                <Link to="/cart" className="button button-secondary detail-cart-link">View cart ({cartCount})</Link>
              </div>
            </div>
          </div>
        </section>}

        {isUnknownFood && <section className="section-spacing">
          <div className="container order-confirmation">
            <div className="eyebrow">Menu</div>
            <h2>We couldn’t find that dish.</h2>
            <p>It may have moved from the menu. Browse the current selection to find something delicious.</p>
            <Link to="/menu" className="button button-primary">Browse the menu</Link>
          </div>
        </section>}

        {isAbout && <section className="chef section-spacing">
          <div className="container chef-layout">
            <div className="chef-portrait">
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80"
                alt="Chef in the kitchen preparing a plated dish"
              />
            </div>
            <div className="chef-copy">
              <div className="eyebrow">Meet the chef</div>
              <h2>Chef Ada Okafor</h2>
              <p className="quote">
                “Our kitchen is built around respect for ingredients, tradition, and the people we serve.”
              </p>
              <p>
                With a passion for West African cuisine and refined technique, Ada crafts menus that honor cultural roots while creating a polished, modern dining language.
              </p>
              <div className="signature-line">
                <span>Signature style</span>
                <strong>Bold • Layered • Warm</strong>
              </div>
            </div>
          </div>
        </section>}

        {isAbout && <section className="why-us section-spacing">
          <div className="container">
            <div className="section-heading-row center">
              <div>
                <div className="eyebrow">Why choose us</div>
                <h2>Dining that feels personal and memorable</h2>
              </div>
            </div>

            <div className="reasons-grid">
              {reasons.map((reason) => (
                <article key={reason.title} className="reason-card">
                  <div className="reason-icon" aria-hidden="true">{reason.icon}</div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {(isHome || isGallery) && <section className="gallery section-spacing" id="gallery">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">Gallery</div>
                <h2>Moments worth lingering over</h2>
              </div>
            </div>

            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <button key={item.id} className={`gallery-item ${index % 3 === 0 ? 'tall' : ''}`} onClick={() => openGallery(index)}>
                  <img src={item.image} alt={item.alt} onError={handleImageError} />
                </button>
              ))}
            </div>
          </div>
        </section>}

        {isHome && <section className="testimonials section-spacing">
          <div className="container">
            <div className="section-heading-row center">
              <div>
                <div className="eyebrow">Testimonials</div>
                <h2>Guests who keep coming back</h2>
              </div>
            </div>

            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="testimonial-card">
                  <div className="stars" aria-label={`${testimonial.rating} star review`}>
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p>“{testimonial.review}”</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {isReservation && <section className="reservations section-spacing" id="reservations">
          <div className="container reservation-layout">
            <div className="reservation-copy">
              <div className="eyebrow">Reservations</div>
              <h2>Book your table</h2>
              <p>
                Whether it is an intimate dinner, family celebration, or business gathering, our team is ready to welcome you.
              </p>
              <ul className="detail-list">
                <li>Private dining available</li>
                <li>Group bookings welcome</li>
                <li>Special requests accommodated</li>
              </ul>
            </div>

            <form className="reservation-form" onSubmit={handleReservationSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field-group">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" type="tel" placeholder="(234) 000-0000" required />
              </div>
              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="date">Date</label>
                  <input id="date" name="date" type="date" required />
                </div>
                <div className="field-group">
                  <label htmlFor="time">Time</label>
                  <input id="time" name="time" type="time" required />
                </div>
              </div>
              <div className="field-group">
                <label htmlFor="guests">Guests</label>
                <select id="guests" name="guests" defaultValue="2">
                  <option value="2">2 guests</option>
                  <option value="4">4 guests</option>
                  <option value="6">6 guests</option>
                  <option value="8">8 guests</option>
                  <option value="10+">10+ guests</option>
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="request">Special request</label>
                <textarea id="request" name="request" rows="3" placeholder="Dietary notes or celebrations"></textarea>
              </div>
              <button type="submit" className="button button-primary full-width">Reserve a Table</button>
              {reservationStatus && <p className="form-status" role="status">{reservationStatus}</p>}
            </form>
          </div>
        </section>}

        {(isHome || isCart) && <section className="order section-spacing" id="order">
          <div className="container order-layout">
            <div className="order-copy">
              <div className="eyebrow">Order online</div>
              <h2>{isCart ? 'Review your order' : 'Your cart'}</h2>
              <p>Fresh, fast, and ready for delivery or takeaway.</p>
              {isCart && <Link to="/menu" className="text-link">Continue browsing the menu</Link>}
            </div>

            <div className="cart-panel">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty.</p>
                  <Link to="/menu" className="button button-primary">Browse the menu</Link>
                </div>
              ) : (
                <div className="cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img className="cart-thumb" src={item.image || featuredDishes[0].image} alt="" onError={handleImageError} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{formatCurrency(item.price)} each</span>
                      </div>
                      <div className="cart-controls">
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="totals">
                <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
                <div><span>Delivery</span><strong>{formatCurrency(deliveryFee)}</strong></div>
                <div className="total-row"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
              </div>

              {cart.length > 0 && <Link to="/checkout" className="button button-primary full-width">Continue to checkout</Link>}
            </div>
          </div>
        </section>}

        {isCheckout && <section className="checkout section-spacing">
          <div className="container checkout-layout">
            {orderConfirmation ? (
              <div className="order-confirmation">
                <div className="eyebrow">Demo checkout</div>
                <h2>Thank you for choosing Ember & Oak.</h2>
                <p>Your local demo reference is <strong>{orderConfirmation.reference}</strong> for {formatCurrency(orderConfirmation.total)}.</p>
                <p>This prototype does not transmit orders or process payments. Please contact the restaurant directly to confirm a real order.</p>
                <Link to="/menu" className="button button-primary">Back to menu</Link>
              </div>
            ) : cart.length === 0 ? (
              <div className="order-confirmation">
                <div className="eyebrow">Checkout</div>
                <h2>Your cart is empty.</h2>
                <p>Choose a few favourites from the menu before checking out.</p>
                <Link to="/menu" className="button button-primary">Browse the menu</Link>
              </div>
            ) : (
              <>
                <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                  <div className="eyebrow">Your details</div>
                  <h2>Where should we send your order?</h2>
                  <div className="field-row">
                    <div className="field-group">
                      <label htmlFor="checkout-name">Full name</label>
                      <input id="checkout-name" name="name" type="text" autoComplete="name" required />
                    </div>
                    <div className="field-group">
                      <label htmlFor="checkout-phone">Phone number</label>
                      <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required />
                    </div>
                  </div>
                  <div className="field-group">
                    <label htmlFor="checkout-email">Email</label>
                    <input id="checkout-email" name="email" type="email" autoComplete="email" required />
                  </div>
                  <div className="field-group">
                    <label htmlFor="fulfillment">Order type</label>
                    <select id="fulfillment" name="fulfillment" value={fulfillment} onChange={(event) => setFulfillment(event.target.value)}>
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>
                  {fulfillment === 'delivery' && <div className="field-group">
                    <label htmlFor="checkout-address">Delivery address</label>
                    <textarea id="checkout-address" name="address" rows="3" autoComplete="street-address" required />
                  </div>}
                  <div className="field-group">
                    <label htmlFor="checkout-notes">Order notes</label>
                    <textarea id="checkout-notes" name="notes" rows="2" placeholder="Allergies or delivery instructions" />
                  </div>
                  <p className="checkout-notice">Payment is not collected on this prototype. No card details are requested.</p>
                  <button type="submit" className="button button-primary full-width">Place order request</button>
                </form>
                <aside className="cart-panel checkout-summary">
                  <h3>Order summary</h3>
                  {cart.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>{item.qty} × {item.name}</span>
                      <strong>{formatCurrency(item.price * item.qty)}</strong>
                    </div>
                  ))}
                  <div className="totals">
                    <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
                    <div><span>{fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}</span><strong>{formatCurrency(deliveryFee)}</strong></div>
                    <div className="total-row"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
                  </div>
                  <Link to="/cart" className="text-link">Edit cart</Link>
                </aside>
              </>
            )}
          </div>
        </section>}

        {legalPage && <section className="legal-page section-spacing">
          <div className="container legal-content">
            {legalPage.sections.map(([heading, content]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{content}</p>
              </section>
            ))}
          </div>
        </section>}

        {(isReservation || isContact) && <section className="location section-spacing" id="location">
          <div className="container location-layout">
            <div className="location-card">
              <div className="eyebrow">Visit us</div>
              <h2>Ember & Oak</h2>
              <p>42 Marina Crescent, Lekki Phase I, Lagos, Nigeria</p>
              <div className="hours-list">
                {openingHours.map((entry) => (
                  <div key={entry.day} className="hours-row">
                    <span>{entry.day}</span>
                    <strong>{entry.hours}</strong>
                  </div>
                ))}
              </div>
              <div className="contact-line">
                <a href="tel:+2348000000000">+234 800 000 0000</a>
                <a href="mailto:hello@emberandoak.com">hello@emberandoak.com</a>
              </div>
              <a href="https://maps.google.com" className="button button-secondary">Get Directions</a>
            </div>

            <div className="map-placeholder" aria-label="Map of restaurant location">
              <img
                src="https://images.unsplash.com/photo-1521009772009-451b2606f6a9?auto=format&fit=crop&w=1200&q=80"
                alt="Restaurant location in a lively city area"
              />
            </div>
          </div>
        </section>}

        {isContact && <section className="contact section-spacing" id="contact">
          <div className="container contact-layout">
            <div className="contact-info">
              <div className="eyebrow">Contact</div>
              <h2>Tell us about your occasion</h2>
              <p>We would love to help plan a memorable meal, gathering, or event with our team.</p>
              <div className="contact-list">
                <span>Email: hello@emberandoak.com</span>
                <span>Phone: +234 800 000 0000</span>
                <span>Instagram: @emberandoak</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="field-group">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="field-group">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" name="subject" type="text" placeholder="How can we help?" />
              </div>
              <div className="field-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="5" placeholder="Tell us about your plans" required></textarea>
              </div>
              <button type="submit" className="button button-primary full-width">Send Message</button>
              {contactStatus && <p className="form-status" role="status">{contactStatus}</p>}
            </form>
          </div>
        </section>}
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <span className="brand-mark">E</span>
              <span>Ember & Oak</span>
            </Link>
            <p>Modern dining shaped by culture, craft, and hospitality in the heart of Lagos.</p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Your cart</Link></li>
            </ul>
          </div>

          <div>
            <h3>Visit</h3>
            <ul>
              <li>42 Marina Crescent</li>
              <li>+234 800 000 0000</li>
              <li>hello@emberandoak.com</li>
              <li>Mon–Sun • 10am–11:30pm</li>
            </ul>
          </div>

          <div>
            <h3>Follow us</h3>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer">X</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Ember & Oak. All rights reserved.</span>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </footer>

      {selectedGalleryIndex !== null && (
        <div className="lightbox" aria-modal="true" role="dialog" onClick={closeGallery}>
          <button className="lightbox-close" onClick={closeGallery} aria-label="Close gallery">
            ×
          </button>
          <button
            className="lightbox-nav left"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img src={galleryItems[selectedGalleryIndex].image} alt={galleryItems[selectedGalleryIndex].alt} />
          <button
            className="lightbox-nav right"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedGalleryIndex((prev) => (prev + 1) % galleryItems.length);
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
