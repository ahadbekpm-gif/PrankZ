
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

export const PRICING_PLANS = [
  {
    id: 'weekly',
    name: '⚡ Weekly',
    price: '$2.99',
    tokens: 20,
    popular: false,
    tag: '(impulse)',
    color: 'from-blue-500 to-cyan-500',
    link: 'https://buy.paddle.com/checkout/...' // Replace with real link
  },
  {
    id: 'monthly',
    name: '🔥 Monthly',
    price: '$7.99',
    tokens: 80,
    popular: true,
    tag: '(BEST VALUE)',
    color: 'from-purple-600 to-pink-600',
    link: 'https://buy.paddle.com/checkout/...' // Replace with real link
  },
  {
    id: 'yearly',
    name: '💀 Yearly',
    price: '$59.99',
    tokens: 1000,
    popular: false,
    tag: '(Most chaotic)',
    color: 'from-yellow-500 to-orange-600',
    link: 'https://buy.paddle.com/checkout/...' // Replace with real link
  }
];

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
