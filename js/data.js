/**
 * Vow & Co. - Mock Data Repository
 * Realistic Indian Wedding Marketplace Vendors, Articles, Checklist, & Defaults
 */

const VOW_DATA = {
  categories: [
    { id: 'venues', name: 'Wedding Venues', count: '1,420+ Locations', icon: 'M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3M9 11h2v3H9zm4 0h2v3h-2z' },
    { id: 'photographers', name: 'Photographers & Cinema', count: '890+ Curated Artists', icon: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { id: 'bridal-wear', name: 'Bridal Couture & Groom', count: '640+ Designers', icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' },
    { id: 'makeup', name: 'Bridal Makeup & Hair', count: '780+ Master Stylists', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
    { id: 'mehendi', name: 'Mehendi & Henna Artists', count: '410+ Traditional Artisans', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z' },
    { id: 'catering', name: 'Gourmet Catering & Bar', count: '320+ Culinary Teams', icon: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3' },
    { id: 'decor', name: 'Floral & Thematic Decor', count: '510+ Scenographers', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: 'invitations', name: 'E-Invites & Stationery', count: '240+ Calligraphers', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6' }
  ],

  vendors: [
    {
      id: 'v-101',
      name: 'The Oberoi Rajvilas',
      category: 'venues',
      categoryName: 'Palace Resort & Venue',
      city: 'Jaipur, Rajasthan',
      rating: 4.95,
      reviewCount: 142,
      price: '₹3,50,000 onwards / night',
      priceRaw: 350000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Built in the style of Rajasthani fortresses surrounded by 32 acres of landscaped gardens, reflecting pools, and heritage pavilions. Perfect for regal royal weddings with up to 600 esteemed guests.',
      featured: true,
      priceBeatEligible: true,
      capacity: '300 - 800 Guests',
      features: ['Royal Heritage Architecture', 'In-house Rajasthani & Continental Chefs', 'Valet Parking for 200 Cars', 'Bridal Suites with Private Plunge Pools', 'Licensed Late Night Music Lawn']
    },
    {
      id: 'v-102',
      name: 'Stories by Joseph Radhik',
      category: 'photographers',
      categoryName: 'Cinematography & Fine-Art Photo',
      city: 'Mumbai & Global',
      rating: 4.98,
      reviewCount: 215,
      price: '₹4,00,000 / day',
      priceRaw: 400000,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Globally celebrated celebrity wedding photographers capturing raw, unfiltered romantic moments, cinematic heirlooms, and timeless wedding films across India, Italy, and beyond.',
      featured: true,
      priceBeatEligible: false,
      capacity: 'Multi-day Weddings',
      features: ['Fine-Art Coffee Table Book', '4K Drone Aerial Coverage', 'Teaser in 72 Hours', 'Director-led 10-person Crew']
    },
    {
      id: 'v-103',
      name: 'Sabyasachi Heritage Flagship',
      category: 'bridal-wear',
      categoryName: 'Bridal Lehengas & Sherwanis',
      city: 'Kolkata & New Delhi',
      rating: 4.92,
      reviewCount: 98,
      price: '₹2,75,000 onwards',
      priceRaw: 275000,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'The defining voice of Indian bridal grandeur. Handcrafted antique zardozi embroidery, bespoke velvet canopies, and heirloom silks created in the artisan ateliers of Kolkata.',
      featured: true,
      priceBeatEligible: false,
      capacity: 'Private Appointments Only',
      features: ['Personal Styling Consultation', 'Master Tailor Fittings', 'Authenticity Certificate', 'Custom Monogram Embroidery']
    },
    {
      id: 'v-104',
      name: 'Taj Falaknuma Palace',
      category: 'venues',
      categoryName: 'Heritage Palace & Ballroom',
      city: 'Hyderabad, Telangana',
      rating: 4.96,
      reviewCount: 164,
      price: '₹5,00,000 onwards / night',
      priceRaw: 500000,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'The Mirror of the Sky palace perched 2,000 feet above Hyderabad. Arrive in a horse-drawn carriage and dine along the world famous 101-seat dining table under Venetian chandeliers.',
      featured: true,
      priceBeatEligible: true,
      capacity: '200 - 1,200 Guests',
      features: ['Historic Nizami Banquet Menus', 'Carriage Arrival Experience', 'Private Presidential Terraces', 'Butler Service For All Rooms']
    },
    {
      id: 'v-105',
      name: 'Namrata Soni Bridal Studio',
      category: 'makeup',
      categoryName: 'Celebrity Makeup & Hair Styling',
      city: 'Mumbai, Maharashtra',
      rating: 4.89,
      reviewCount: 112,
      price: '₹85,000 per function',
      priceRaw: 85000,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Renowned for luminous, radiant, skin-like bridal makeup that endures long ritual ceremonies and high-definition wedding cinema with effortless elegance.',
      featured: false,
      priceBeatEligible: false,
      capacity: 'Destination & On-Site',
      features: ['Airbrush & HD Foundations', 'Premium International Kits', 'Bridal Dupatta Draping', 'Assistant Team for Bridal Party']
    },
    {
      id: 'v-106',
      name: 'Altair Decor by Janki Patel',
      category: 'decor',
      categoryName: 'Luxury Florals & Scenic Design',
      city: 'New Delhi & NCR',
      rating: 4.91,
      reviewCount: 78,
      price: '₹6,50,000 onwards',
      priceRaw: 650000,
      image: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Architectural mandaps draped in imported Dutch tuberoses, ambient brass lantern pathways, and sustainable floral installations for royal and contemporary celebrations.',
      featured: false,
      priceBeatEligible: true,
      capacity: 'Turnkey Scenography',
      features: ['3D CAD Architectural Renders', 'Custom Moodboards & Light Programming', 'Artisanal Brassware Hire', 'Fresh Floral Sourcing Direct from Bangalore & Holland']
    },
    {
      id: 'v-107',
      name: 'Veena Nagda Mehendi Creation',
      category: 'mehendi',
      categoryName: 'Bridal Henna Artisan',
      city: 'Mumbai & Ahmedabad',
      rating: 4.97,
      reviewCount: 189,
      price: '₹35,000 onwards',
      priceRaw: 35000,
      image: 'https://images.unsplash.com/photo-1560932684-5e552e2894e9?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1560932684-5e552e2894e9?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'The iconic Bollywood mehendi queen. Intricate bridal story portraits, baraat processions, and sacred Radha-Krishna motifs rendered with 100% natural organic henna oil.',
      featured: false,
      priceBeatEligible: false,
      capacity: 'Full Bridal + Guest Teams',
      features: ['Custom Couple Portrait Inlay', 'Pure Sojat Organic Henna', 'Dark Stain Guarantee', '12 Assistant Artists']
    },
    {
      id: 'v-108',
      name: 'Copper Chimney Royal Banqueting',
      category: 'catering',
      categoryName: 'Royal Feast & Contemporary Buffets',
      city: 'Bengaluru & Chennai',
      rating: 4.88,
      reviewCount: 94,
      price: '₹2,200 per plate',
      priceRaw: 2200,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Live interactive tandoor counters, slow-cooked Dum pukht biryanis, coastal delicacies, and bespoke artisanal mithai bars curated by award-winning culinary directors.',
      featured: false,
      priceBeatEligible: true,
      capacity: '150 to 2,500 Guests',
      features: ['Live Chaat Stalls from Chandni Chowk', 'Molecular Dessert Counters', 'Silver Plated Cutlery Options', 'FSSAI Certified Luxury Service Team']
    }
  ],

  destinations: [
    { name: 'Udaipur, Rajasthan', tag: 'The City of Lakes', count: '140+ Palatial Venues', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    { name: 'Goa', tag: 'Sun-drenched Beachside', count: '95+ Cliffside & Sand Resorts', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
    { name: 'Jaipur, Rajasthan', tag: 'Pink City Grandeur', count: '180+ Heritage Forts', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80' },
    { name: 'Jim Corbett & Rishikesh', tag: 'Riverside Wilderness', count: '65+ Forest Retreats', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }
  ],

  articles: [
    {
      id: 'art-01',
      title: 'Auspicious Vivah Muhurat & Lagan Dates for 2026–2027',
      category: 'Wedding Calendar & Traditions',
      readTime: '6 min read',
      date: 'Updated Oct 2026',
      excerpt: 'Comprehensive Vedic calendar guide detailing auspicious planetary alignments, Tithi, Nakshatra, and ideal time windows for Hindu weddings.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'art-02',
      title: 'How to Budget for a 500-Guest Royal Destination Wedding',
      category: 'Finance & Planning',
      readTime: '8 min read',
      date: 'Sep 2026',
      excerpt: 'Realistic cost breakdown across palace venues, hospitality logistics, royal baraat provisions, and multi-tier catering across 3 days.',
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'art-03',
      title: 'The Modern Bride’s Guide to Curating Heirloom Jewelry',
      category: 'Bridal Fashion',
      readTime: '5 min read',
      date: 'Aug 2026',
      excerpt: 'Navigating Jadau, Polki, Kundan, and temple gold jewellery with expert pointers on gemstone authenticity, certifications, and resale value.',
      image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=900&q=80'
    }
  ],

  defaultChecklist: [
    { id: 1, title: 'Finalize estimated wedding budget & primary sponsor contributions', category: 'Budget', done: true, due: '12 Months Prior' },
    { id: 2, title: 'Decide on destination vs hometown city and guest count ballpark', category: 'Strategy', done: true, due: '10 Months Prior' },
    { id: 3, title: 'Book wedding venue and secure auspicious Muhurat dates with Pandit Ji', category: 'Venue', done: true, due: '9 Months Prior' },
    { id: 4, title: 'Hire lead photographer, cinematographer, and drone director', category: 'Photography', done: false, due: '7 Months Prior' },
    { id: 5, title: 'Schedule bespoke bridal lehenga and groom sherwani consultations', category: 'Attire', done: false, due: '6 Months Prior' },
    { id: 6, title: 'Engage scenic decor designer and sign off on floral mandap moodboards', category: 'Decor', done: false, due: '5 Months Prior' },
    { id: 7, title: 'Send digital Save-the-Date invites and launch couple website', category: 'Stationery', done: false, due: '4 Months Prior' },
    { id: 8, title: 'Conduct food tasting sessions for Sangeet & Reception banquet menus', category: 'Catering', done: false, due: '3 Months Prior' },
    { id: 9, title: 'Book Mehendi artist, makeup trials, and hair stylist appointments', category: 'Beauty', done: false, due: '2 Months Prior' },
    { id: 10, title: 'Finalize RSVP list, hotel room allocations, and airport transfer shuttles', category: 'Logistics', done: false, due: '3 Weeks Prior' }
  ],

  defaultBudget: {
    total: 3500000,
    categories: [
      { id: 'b-venue', name: 'Palace Venue & Accommodations', allocated: 1400000, spent: 1400000 },
      { id: 'b-catering', name: 'Multi-Cuisine Catering & Bar', allocated: 850000, spent: 700000 },
      { id: 'b-decor', name: 'Scenic Mandap & Floral Decor', allocated: 450000, spent: 300000 },
      { id: 'b-photo', name: 'Photography & Cinematic Films', allocated: 350000, spent: 200000 },
      { id: 'b-attire', name: 'Bridal & Groom Couture', allocated: 300000, spent: 250000 },
      { id: 'b-music', name: 'Live Band, DJ & Entertainment', allocated: 150000, spent: 100000 }
    ]
  },

  defaultGuests: [
    { id: 'g-1', name: 'Vikram & Sunita Mehra', relation: 'Bride’s Uncle & Family', side: 'Bride', count: 4, rsvp: 'Attending', diet: 'Pure Vegetarian' },
    { id: 'g-2', name: 'Ananya Singhania', relation: 'College Best Friend', side: 'Groom', count: 2, rsvp: 'Attending', diet: 'Non-Vegetarian' },
    { id: 'g-3', name: 'Col. R.K. Varma', relation: 'Family Elder', side: 'Groom', count: 2, rsvp: 'Pending', diet: 'Jain Meal' },
    { id: 'g-4', name: 'Pooja & Rohan Kapur', relation: 'Cousin', side: 'Bride', count: 3, rsvp: 'Attending', diet: 'Vegetarian' },
    { id: 'g-5', name: 'Devendra Chopra', relation: 'Business Partner', side: 'Groom', count: 1, rsvp: 'Declined', diet: '-' }
  ]
};

// Safe LocalStorage Helper
const StorageHelper = {
  get: function(key, fallback) {
    try {
      const item = localStorage.getItem('vow_and_co_' + key);
      return item ? JSON.parse(item) : fallback;
    } catch(e) {
      console.warn('LocalStorage error:', e);
      return fallback;
    }
  },
  set: function(key, val) {
    try {
      localStorage.setItem('vow_and_co_' + key, JSON.stringify(val));
    } catch(e) {
      console.warn('LocalStorage write failed:', e);
    }
  }
};
