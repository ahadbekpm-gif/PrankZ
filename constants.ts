
import { Translation, Preset } from './types';

export const TRANSLATIONS: Translation = {
  app_name: { en: "Prank-Z" },
  credits_remaining: { en: "Credits Remaining" },
  out_of_tokens: { en: "Out of Credits" },
  upgrade_to_continue: { en: "Upgrade to continue creating" },
  generate_btn: {
    en: "Generate Image ⚡"
  },
  generating: { en: "Creating magic..." },
  wait_tip_1: { en: "AI is working its magic..." },
  gallery: { en: "Gallery" },
  try_examples: { en: "Quick Pranks" },
  prompt_placeholder: {
    en: "Turn me into a zombie in a dark alley, cinematic lighting, ultra realistic...",
  },
  premium_modal_title: { en: "You’ve Started Something Dangerous 😈" },
  premium_desc: {
    en: "Your free chaos credit is gone.\nWant unlimited damage?",
  },
  your_creations: { en: "Your Creations" },
  no_history: { en: "No creations yet" },
  cost_hint: {
    en: "⚡ Uses 1 credit · ~15–30 seconds"
  },
  privacy_deleted: {
    en: "🔒 Photos auto-deleted after 24 hours"
  },
  privacy_no_train: {
    en: "👁 We never train on your images"
  },
  privacy_policy: {
    en: "Privacy Policy"
  },
  loading_messages: {
    en: [
      "Summoning chaos...",
      "Corrupting reality...",
      "Pixelating the truth...",
      "Distorting dimensions...",
      "Cursing the pixels...",
      "Unleashing the troll...",
      "Bending the laws of physics...",
      "Injecting artifacts...",
      "Hacking the mainframe...",
      "Calibrating the absurdity..."
    ].join('|') // Joining as a string to fit the Translation type structure easily
  }
};

export const PRICING_PLANS = {
  monthly: [
    {
      id: 'starter_monthly',
      name: '🔹 Starter',
      price: '$9',
      period: '/ month',
      tokens: 30,
      popular: false,
      tag: '',
      color: 'from-blue-500 to-cyan-500',
      link: 'https://buy.paddle.com/checkout/...',
      description: 'For quick laughs & casual pranks',
      bestFor: 'first-time users and casual fun',
      features: [
        "30 AI prank images per month",
        "Image-to-image prank generation",
        "Basic prank styles (Zombie, Meme, Glitch)",
        "Standard generation speed",
        "Simple prompt input",
        "Download generated images",
        "Personal use only"
      ]
    },
    {
      id: 'pro_monthly',
      name: '⭐ Pro',
      price: '$19',
      period: '/ month',
      tokens: 80,
      popular: true,
      tag: 'Most Popular',
      color: 'from-purple-600 to-pink-600',
      link: 'https://buy.paddle.com/checkout/...',
      description: 'For creators who prank often',
      bestFor: 'meme creators, content pages, heavy users',
      features: [
        "80 AI prank images per month",
        "Full prank style library",
        "Faster image generation",
        "Advanced prompt control",
        "High-quality image downloads",
        "Share-ready output",
        "Priority over free users",
        "Personal use"
      ]
    },
    {
      id: 'unlimited_monthly',
      name: '👑 Power',
      price: '$39',
      period: '/ month',
      tokens: 150,
      popular: false,
      tag: 'Maximum Chaos',
      color: 'from-yellow-500 to-orange-600',
      link: 'https://buy.paddle.com/checkout/...',
      description: 'Built for nonstop prank creators',
      bestFor: 'power users & daily prank content',
      features: [
        "150 AI prank images per month",
        "All prank styles available",
        "Priority generation speed",
        "Full prompt control",
        "High-resolution image downloads",
        "Priority processing queue",
        "Fair-use protection",
        "Unlimited within fair use (150/mo)"
      ]
    }
  ],
  yearly: [
    {
      id: 'starter_yearly',
      name: '🟢 Starter Yearly',
      price: '$59',
      period: '/ year',
      originalPrice: '$108', // deduced from 9x12
      tokens: 300,
      popular: false,
      tag: 'Save Big',
      color: 'from-green-500 to-emerald-600',
      link: 'https://buy.paddle.com/checkout/...',
      description: 'Same fun, lower price',
      bestFor: 'Casual users who want a year of laughs',
      features: [
        "300 AI prank images per year",
        "Image-to-image prank generation",
        "Basic prank styles",
        "Standard generation speed",
        "Image downloads",
        "Personal use"
      ]
    },
    {
      id: 'pro_yearly',
      name: '🔥 Pro Yearly',
      price: '$89',
      period: '/ year',
      originalPrice: '$228', // deduced from 19x12
      tokens: 400,
      popular: true,
      tag: 'BEST DEAL',
      color: 'from-purple-600 to-pink-600',
      link: 'https://buy.paddle.com/checkout/...',
      description: 'Maximum value for creators',
      bestFor: 'Creators wanting lowest cost per image',
      features: [
        "400 AI prank images per year",
        "Full prank style library",
        "Faster image generation",
        "Advanced prompt control",
        "High-quality downloads",
        "Priority queue access"
      ]
    },
    {
      id: 'unlimited_yearly',
      name: '🟣 Power Yearly',
      price: '$129',
      period: '/ year',
      originalPrice: '$468', // deduced from 39x12
      tokens: 600,
      popular: false,
      tag: 'All Power',
      color: 'from-yellow-500 to-orange-600',
      link: 'https://buy.paddle.com/checkout/...',
      description: 'All power, one payment',
      bestFor: 'Power users committed to chaos',
      features: [
        "600 AI prank images per year",
        "All prank styles unlocked",
        "Priority generation speed",
        "Full prompt control",
        "High-resolution downloads",
        "Priority processing",
        "Fair-use protection"
      ]
    }
  ]
};

export const EXAMPLES = [
  {
    id: 'zombie',
    label: { en: "Zombie" },
    prompt: "Zombie apocalypse survivor, decayed skin, torn clothes, dramatic cinematic lighting, horror style",
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 'old',
    label: { en: "80 Years Old" },
    prompt: "Add realistic aging, deep wrinkles, white hair, 80 years old, photorealistic portrait",
    image: "https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 'cyberpunk',
    label: { en: "Cyberpunk" },
    prompt: "Cyberpunk 2077 style, neon facial implants, futuristic clothes, dark urban night lighting",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 'statue',
    label: { en: "Statue" },
    prompt: "Turn person into an ancient Roman marble statue, white cracked stone texture, museum museum lighting",
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 'gta',
    label: { en: "GTA Style" },
    prompt: "GTA loading screen art style, bold black outlines, vibrant colors, comic book vector shading",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 'renaissance',
    label: { en: "Renaissance" },
    prompt: "Renaissance oil painting style, chiaroscuro lighting, classic masterpiece portrait, canvas texture",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=300&q=80"
  }
];

export const PRESETS: Preset[] = [
  {
    id: 'zombie',
    label: { en: "🧟 Zombie Apocalypse" },
    prompt: "Zombie apocalypse survivor, decayed skin, horror style",
    icon: "🧟",
    cost: 1,
    popular: true
  },
  {
    id: 'cyberpunk',
    label: { en: "🤖 Main Character Energy" },
    prompt: "Cyberpunk 2077 style, neon facial implants, futuristic",
    icon: "🤖",
    cost: 2,
    popular: true,
    premium: true
  },
  {
    id: 'meme',
    label: { en: "😂 Instant Meme" },
    prompt: "Classic viral internet meme aesthetic, funny reaction face, deep fried",
    icon: "😂",
    cost: 1
  },
  {
    id: 'old',
    label: { en: "👴 Future You (Cursed)" },
    prompt: "Realistic aging, deep wrinkles, 90 years old, ancient",
    icon: "👴",
    cost: 1
  },
  {
    id: 'glitch',
    label: { en: "👾 Reality.exe Broken" },
    prompt: "Vibrant glitch art style, digital distortion, datamoshing",
    icon: "👾",
    cost: 1
  },
  {
    id: 'clown',
    label: { en: "🤡 Clown World" },
    prompt: "Turn person into a colorful but creepy clown, circus makeup, chaotic energy, cinematic lighting",
    icon: "🤡",
    cost: 1,
    premium: true
  }
];
