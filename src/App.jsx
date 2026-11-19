import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Heart,
  Volume2,
  VolumeX,
  Camera,
  RotateCcw,
  Sparkles,
  X,
  Grid,
} from 'lucide-react';

const DIARY_ENTRIES = [
  {
    letter: 'A',
    title: 'Authentic',
    text: 'Tum jaisi ho waisi hi rehti ho, koi dikhawa nahi. Tumhare saath mujhe bhi kabhi fake banne ki zaroorat nahi padti.',
    caption: '100% real, zero filters ✨',
    tilt: '-1.5deg',
    accent: '#e11d48',
    bg: '#fff1f2',
  },
  {
    letter: 'B',
    title: 'Beautiful (andar aur bahar se)',
    text: 'Tumhari smile jitni pyari hai, tumhara dil usse bhi zyada saaf aur khoobsurat hai.',
    caption: 'Pure heart & brightest smile 🌸',
    tilt: '1.4deg',
    accent: '#db2777',
    bg: '#fdf2f8',
  },
  {
    letter: 'C',
    title: 'Confidante',
    text: 'Koi bhi gossip ho, khushkhabri ho ya koi crisis, sabse pehle tumhara hi naam yaad aata hai.',
    caption: 'My #1 emergency speed-dial ☕',
    tilt: '-1.2deg',
    accent: '#d97706',
    bg: '#fffbeb',
  },
  {
    letter: 'D',
    title: 'Drama-queen (par meri favourite)',
    text: 'Thoda drama toh banta hai, par sach kahoon toh tumhare bina life bilkul boring lagti hai.',
    caption: 'Oscar-worthy expressions 🎭',
    tilt: '1.8deg',
    accent: '#9333ea',
    bg: '#faf5ff',
  },
  {
    letter: 'E',
    title: 'Empowering',
    text: 'Jab bhi mera confidence low hota hai, tum mujhe hype up karke meri asli worth yaad dilati ho.',
    caption: 'My personal hype squad 🚀',
    tilt: '-1.6deg',
    accent: '#2563eb',
    bg: '#eff6ff',
  },
  {
    letter: 'F',
    title: 'Fierce',
    text: 'Apne logon ke liye tum kisi se bhi bhid sakti ho, aur tumhari yahi loyalty mujhe sabse zyada pasand hai.',
    caption: 'Bodyguard mode: always ON 🔥',
    tilt: '1.3deg',
    accent: '#dc2626',
    bg: '#fef2f2',
  },
  {
    letter: 'G',
    title: 'Genuine',
    text: 'Aajkal ke zamane mein tumhare jaisa saccha aur bharosemand insaan milna kisi blessing se kam nahi.',
    caption: 'Rare gem in a fake world 💎',
    tilt: '-1.4deg',
    accent: '#059669',
    bg: '#ecfdf5',
  },
  {
    letter: 'H',
    title: 'Hamesha saath',
    text: 'Chahe waqt accha ho ya bura, tumne kabhi mera saath nahi chhoda.',
    caption: 'Through sunshine & storms ☔',
    tilt: '1.5deg',
    accent: '#0284c7',
    bg: '#f0f9ff',
  },
  {
    letter: 'I',
    title: 'Irreplaceable',
    text: 'Tumhari jagah meri life mein koi aur kabhi nahi le sakta.',
    caption: 'One of one, forever 🧩',
    tilt: '-1.7deg',
    accent: '#e11d48',
    bg: '#fff1f2',
  },
  {
    letter: 'J',
    title: 'Jaan',
    text: 'Dost toh bahut hain, par tum meri jaan aur meri strength ho.',
    caption: 'My lifeline & strength ❤️',
    tilt: '1.2deg',
    accent: '#be123c',
    bg: '#ffe4e6',
  },
  {
    letter: 'K',
    title: 'Kind-hearted',
    text: 'Tum sabki itni care karti ho aur bina soche sabki madad ke liye khadi rehti ho.',
    caption: 'Softest heart in the room 🌷',
    tilt: '-1.3deg',
    accent: '#ea580c',
    bg: '#fff7ed',
  },
  {
    letter: 'L',
    title: 'Loyal',
    text: 'Mere peeth peeche bhi hamesha mera stand lene ke liye dil se thank you.',
    caption: 'Ride or die, always 🤝',
    tilt: '1.6deg',
    accent: '#4f46e5',
    bg: '#eef2ff',
  },
  {
    letter: 'M',
    title: 'Mastikhor',
    text: 'Tumhare saath bitaya hua har ek pal ek memorable aur funny story ban jaata hai.',
    caption: 'Non-stop laughter & chaos 🎉',
    tilt: '-1.8deg',
    accent: '#ca8a04',
    bg: '#fefce8',
  },
  {
    letter: 'N',
    title: 'Non-judgmental',
    text: 'Main tumhe apni koi bhi galti ya ajeeb baat bina soche bata sakti hoon, kyunki tum kabhi judge nahi karti.',
    caption: 'My safe space, zero judgment 🕊️',
    tilt: '1.4deg',
    accent: '#0d9488',
    bg: '#f0fdfa',
  },
  {
    letter: 'O',
    title: "Overthinker's cure",
    text: 'Jab bhi mera dimag zyada chalta hai, tumhari ek baat saari tension door kar deti hai.',
    caption: 'Instant peace of mind 🌈',
    tilt: '-1.2deg',
    accent: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    letter: 'P',
    title: 'Positive vibes',
    text: 'Tumhari energy aur hasi kisi bhi kharab din ko turant theek kar deti hai.',
    caption: 'Walking bundle of sunshine ☀️',
    tilt: '1.7deg',
    accent: '#d97706',
    bg: '#fffbeb',
  },
  {
    letter: 'Q',
    title: 'Queen',
    text: 'Tum jis confidence se rehti ho, wo mujhe bhi har din strong rehne ki inspiration deta hai.',
    caption: 'Straighten your crown 👑',
    tilt: '-1.5deg',
    accent: '#b45309',
    bg: '#fef3c7',
  },
  {
    letter: 'R',
    title: 'Reliable',
    text: 'Raat ke 2 baje bhi agar mujhe zaroorat pade, toh mujhe pata hai tumhara phone zaroor uthega.',
    caption: '2:00 AM helpline always open 📞',
    tilt: '1.3deg',
    accent: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    letter: 'S',
    title: 'Soul sister',
    text: 'Khoon ka rishta nahi hai humara, par tum meri sagi behen se bhi badhkar ho.',
    caption: 'Sisters by heart & soul 👯‍♀️',
    tilt: '-1.6deg',
    accent: '#db2777',
    bg: '#fdf2f8',
  },
  {
    letter: 'T',
    title: 'Thoughtful',
    text: 'Tumhe meri chhoti-chhoti pasand aur details yaad rehti hain, jo mujhe bahut special feel karata hai.',
    caption: 'Notices every little detail 🎁',
    tilt: '1.5deg',
    accent: '#e11d48',
    bg: '#fff1f2',
  },
  {
    letter: 'U',
    title: 'Understanding',
    text: 'Bina kuch kahe meri aankhein padh lena aur mera mood samajh jaana sirf tumhe aata hai.',
    caption: 'Telepathy level: 100% 🧠💫',
    tilt: '-1.3deg',
    accent: '#4338ca',
    bg: '#eef2ff',
  },
  {
    letter: 'V',
    title: 'Vibrant',
    text: 'Tum jahan bhi jaati ho, wahan apni baaton aur muskurahat se raunak le aati ho.',
    caption: 'Life of every single room 🎨',
    tilt: '1.6deg',
    accent: '#c026d3',
    bg: '#fdf4ff',
  },
  {
    letter: 'W',
    title: 'Wise',
    text: 'Jab mujhe sacchai sunne ki zaroorat hoti hai, tum hamesha mujhe sahi aur practical advice deti ho.',
    caption: 'Best reality-checks & advice 🦉',
    tilt: '-1.4deg',
    accent: '#047857',
    bg: '#ecfdf5',
  },
  {
    letter: 'X',
    title: 'X-factor',
    text: 'Tum mein ek alag hi charm aur spark hai jo tumhe sabse khaas banata hai.',
    caption: 'Unmatched aura & magic ⚡',
    tilt: '1.5deg',
    accent: '#7e22ce',
    bg: '#faf5ff',
  },
  {
    letter: 'Y',
    title: 'Yaadon ka khazana',
    text: 'Humari late-night baatein, unplanned outings aur endless hasi meri life ki best memories hain.',
    caption: 'Core memories unlocked 📸',
    tilt: '-1.5deg',
    accent: '#b91c1c',
    bg: '#fef2f2',
  },
  {
    letter: 'Z',
    title: 'Zindagi',
    text: 'Sach kahoon toh tumhare bina meri zindagi adhoori si lagti hai.',
    caption: 'My whole world in one person 🌍❤️',
    tilt: '1.2deg',
    accent: '#be123c',
    bg: '#fff1f2',
  },
];

function LetterIllustration({ entry }) {
  const { letter, accent, bg } = entry;
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-sm"
      style={{ backgroundColor: bg }}
    >
      <svg viewBox="0 0 240 200" className="w-full h-full">
        <defs>
          <radialGradient id={`glow-${letter}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="100" r="86" fill={`url(#glow-${letter})`} />
        <circle
          cx="120"
          cy="100"
          r="68"
          fill="none"
          stroke={accent}
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        <g fill={accent} opacity="0.65">
          <path d="M46 44 L49 51 L56 54 L49 57 L46 64 L43 57 L36 54 L43 51 Z" />
          <path d="M192 138 L194 143 L199 145 L194 147 L192 152 L190 147 L185 145 L190 143 Z" />
          <circle cx="186" cy="52" r="3" />
          <circle cx="54" cy="148" r="3.5" />
        </g>

        <circle
          cx="120"
          cy="96"
          r="46"
          fill="#ffffff"
          stroke={accent}
          strokeWidth="2.5"
        />
        <text
          x="120"
          y="113"
          textAnchor="middle"
          fill={accent}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '54px',
            fontWeight: 700,
          }}
        >
          {letter}
        </text>

        <rect
          x="64"
          y="154"
          width="112"
          height="22"
          rx="11"
          fill={accent}
          fillOpacity="0.14"
        />
        <text
          x="120"
          y="168"
          textAnchor="middle"
          fill={accent}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
          }}
        >
          CHAPTER {letter}
        </text>
      </svg>
    </div>
  );
}

function DiaryNotePage({ entry, index, total }) {
  return (
    <div className="diary-lined-paper relative w-full h-full px-6 py-6 sm:px-9 sm:py-8 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between border-b border-rose-200/70 pb-2 pl-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-semibold">
          Friendship Diary
        </span>
        <span className="text-xs font-serif-display italic text-rose-700/80">
          {String(index + 1).padStart(2, '0')} / {total}
        </span>
      </div>

      <div
        className="pointer-events-none absolute right-4 bottom-4 font-serif-display font-bold select-none leading-none opacity-[0.06]"
        style={{ fontSize: '11rem', color: entry.accent }}
      >
        {entry.letter}
      </div>

      <div className="relative z-10 my-auto pl-6 pr-1 space-y-4">
        <div className="flex items-baseline gap-3">
          <span
            className="font-serif-display text-5xl sm:text-6xl font-bold leading-none"
            style={{ color: entry.accent }}
          >
            {entry.letter}
          </span>
          <span className="text-stone-400 font-serif-display text-xl">–</span>
          <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-stone-800 leading-snug">
            {entry.title}
          </h2>
        </div>

        <p className="text-stone-700 text-[15px] sm:text-[17px] leading-[30px] font-normal">
          “{entry.text}”
        </p>
      </div>

      <div className="relative z-10 pl-6 pt-2 flex items-center justify-between text-xs text-stone-400">
        <span className="font-handwriting text-lg text-rose-600/80">
          Always grateful for you ♥
        </span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
      </div>
    </div>
  );
}

function PolaroidPage({ entry, customPhoto, onUploadPhoto }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadPhoto(entry.letter, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-full bg-[#faf5ec] px-5 py-5 sm:px-8 sm:py-7 flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#cbbba0 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div
        className="relative z-10 w-full max-w-[270px] sm:max-w-[295px] bg-white p-3 sm:p-3.5 pb-4 rounded-[3px] shadow-[0_12px_28px_rgba(45,25,15,0.16)] border border-stone-200/80 transition-transform duration-300"
        style={{ transform: `rotate(${entry.tilt})` }}
      >
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 shadow-sm"
          style={{
            backgroundColor: entry.accent,
            clipPath: 'polygon(4% 0%, 96% 2%, 100% 98%, 0% 95%)',
            opacity: 0.25,
          }}
        />

        <div className="relative aspect-[4/3.4] w-full bg-stone-100 overflow-hidden border border-stone-100">
          {customPhoto ? (
            <img
              src={customPhoto}
              alt={`${entry.letter} - ${entry.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <LetterIllustration entry={entry} />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            title="Upload your own photo for this letter"
            className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-white/90 hover:bg-white text-stone-700 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-md border border-stone-200/80 backdrop-blur-sm transition"
          >
            <Camera className="w-3 h-3 text-rose-600" />
            <span>{customPhoto ? 'Change' : 'Add Photo'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="pt-3 text-center">
          <p className="font-handwriting text-xl sm:text-2xl text-stone-700 leading-tight">
            {entry.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

function FrontCover({ onOpen }) {
  return (
    <div className="leather-cover relative w-full h-full p-6 sm:p-10 flex flex-col items-center justify-between text-center text-amber-50 overflow-hidden">
      <div className="absolute inset-3.5 sm:inset-5 border-2 border-[#d4af37]/60 rounded-sm pointer-events-none" />
      <div className="absolute inset-5 sm:inset-7 border border-[#d4af37]/30 rounded-sm pointer-events-none" />

      <div className="relative z-10 pt-3 flex items-center gap-2 text-[#e6c768]">
        <Sparkles className="w-4 h-4" />
        <span className="text-[11px] uppercase tracking-[0.28em] font-semibold">
          Personal Keepsake Edition
        </span>
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="relative z-10 max-w-sm space-y-4 px-3">
        <div className="mx-auto w-14 h-14 rounded-full border border-[#d4af37]/60 bg-[#420d17]/70 flex items-center justify-center shadow-inner">
          <Heart className="w-6 h-6 text-[#e6c768] fill-[#e6c768]/30" />
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f8e7b9] leading-tight drop-shadow">
          A to Z:
          <span className="block text-2xl sm:text-3xl font-normal italic mt-1 text-amber-100">
            Why You Are My Best Friend
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 max-w-xs mx-auto leading-relaxed">
          26 letters, 26 reasons, and endless memories celebrating the friendship that makes life complete.
        </p>
      </div>

      <div className="relative z-10 pb-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e5c158] to-[#cfa336] text-[#3a0b14] font-semibold text-sm shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:brightness-105 active:scale-95 transition"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Diary</span>
        </button>
      </div>
    </div>
  );
}

function BackCover({ onRestart }) {
  return (
    <div className="leather-cover relative w-full h-full p-6 sm:p-10 flex flex-col items-center justify-between text-center text-amber-50 overflow-hidden">
      <div className="absolute inset-3.5 sm:inset-5 border-2 border-[#d4af37]/60 rounded-sm pointer-events-none" />
      <div className="absolute inset-5 sm:inset-7 border border-[#d4af37]/30 rounded-sm pointer-events-none" />

      <div className="relative z-10 pt-4 text-[11px] uppercase tracking-[0.28em] text-[#e6c768]">
        The End — Or Just The Beginning
      </div>

      <div className="relative z-10 max-w-sm space-y-4 px-3">
        <Heart className="w-9 h-9 text-[#e6c768] fill-[#e6c768] mx-auto animate-pulse" />
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#f8e7b9]">
          Forever &amp; Always
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-amber-100/95 leading-snug">
          “No matter how many chapters life adds, you will always be my favourite story.”
        </p>
      </div>

      <div className="relative z-10 pb-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRestart();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#e6c768]/70 bg-[#420d17]/80 hover:bg-[#591320] text-[#f8e7b9] font-medium text-sm shadow-lg active:scale-95 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Read Again from A</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [flipAngle, setFlipAngle] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [showIndex, setShowIndex] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customPhotos, setCustomPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('atoz_diary_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const dragRef = useRef({
    active: false,
    startX: 0,
    currentAngle: 0,
    direction: null,
  });
  const audioCtxRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const playPageFlipSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const duration = 0.24;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI) * (1 - progress * 0.4);
        data[i] = (Math.random() * 2 - 1) * envelope * 0.35;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + duration);
      filter.Q.value = 1.4;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Ignore audio restrictions if blocked
    }
  }, [soundEnabled]);

  const handleUploadPhoto = (letter, dataUrl) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev, [letter]: dataUrl };
      try {
        localStorage.setItem('atoz_diary_photos', JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });
  };

  const turnPage = useCallback(
    (direction) => {
      if (isAnimating) return;
      if (direction === 'next' && pageIndex >= 27) return;
      if (direction === 'prev' && pageIndex <= 0) return;

      playPageFlipSound();
      setIsAnimating(true);
      setFlipDirection(direction);

      if (direction === 'next') {
        setFlipAngle(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setFlipAngle(-180));
        });
        setTimeout(() => {
          setPageIndex((p) => Math.min(27, p + 1));
          setFlipDirection(null);
          setFlipAngle(0);
          setIsAnimating(false);
        }, 560);
      } else {
        setFlipAngle(-180);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setFlipAngle(0));
        });
        setTimeout(() => {
          setPageIndex((p) => Math.max(0, p - 1));
          setFlipDirection(null);
          setFlipAngle(0);
          setIsAnimating(false);
        }, 560);
      }
    },
    [isAnimating, pageIndex, playPageFlipSound]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showIndex) {
        if (e.key === 'Escape') setShowIndex(false);
        return;
      }
      if (e.key === 'ArrowRight') turnPage('next');
      if (e.key === 'ArrowLeft') turnPage('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnPage, showIndex]);

  const handlePointerDown = (e) => {
    if (isAnimating || showIndex) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      currentAngle: 0,
      direction: null,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active || isAnimating) return;
    const deltaX = e.clientX - dragRef.current.startX;
    if (Math.abs(deltaX) < 8 && !dragRef.current.direction) return;

    const dir = deltaX < 0 ? 'next' : 'prev';
    if (dir === 'next' && pageIndex >= 27) return;
    if (dir === 'prev' && pageIndex <= 0) return;

    dragRef.current.direction = dir;
    setFlipDirection(dir);

    const span = Math.min(window.innerWidth * 0.65, 420);
    const ratio = Math.min(1, Math.max(0, Math.abs(deltaX) / span));
    const angle = dir === 'next' ? -ratio * 180 : -(1 - ratio) * 180;
    dragRef.current.currentAngle = angle;
    setFlipAngle(angle);
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    const { direction, currentAngle } = dragRef.current;
    dragRef.current.active = false;

    if (!direction) return;

    setIsAnimating(true);
    if (direction === 'next') {
      const shouldComplete = currentAngle <= -45;
      if (shouldComplete) {
        playPageFlipSound();
        setFlipAngle(-180);
        setTimeout(() => {
          setPageIndex((p) => Math.min(27, p + 1));
          setFlipDirection(null);
          setFlipAngle(0);
          setIsAnimating(false);
        }, 420);
      } else {
        setFlipAngle(0);
        setTimeout(() => {
          setFlipDirection(null);
          setIsAnimating(false);
        }, 320);
      }
    } else {
      const shouldComplete = currentAngle >= -135;
      if (shouldComplete) {
        playPageFlipSound();
        setFlipAngle(0);
        setTimeout(() => {
          setPageIndex((p) => Math.max(0, p - 1));
          setFlipDirection(null);
          setFlipAngle(0);
          setIsAnimating(false);
        }, 420);
      } else {
        setFlipAngle(-180);
        setTimeout(() => {
          setFlipDirection(null);
          setIsAnimating(false);
        }, 320);
      }
    }
  };

  const renderSpreadLeft = (idx) => {
    if (idx <= 0 || idx >= 27) return null;
    const entry = DIARY_ENTRIES[idx - 1];
    return <DiaryNotePage entry={entry} index={idx - 1} total={26} />;
  };

  const renderSpreadRight = (idx) => {
    if (idx === 0) return <FrontCover onOpen={() => turnPage('next')} />;
    if (idx === 27) return <BackCover onRestart={() => setPageIndex(0)} />;
    const entry = DIARY_ENTRIES[idx - 1];
    return (
      <PolaroidPage
        entry={entry}
        customPhoto={customPhotos[entry.letter]}
        onUploadPhoto={handleUploadPhoto}
      />
    );
  };

  const renderMobilePage = (idx) => {
    if (idx === 0) return <FrontCover onOpen={() => turnPage('next')} />;
    if (idx === 27) return <BackCover onRestart={() => setPageIndex(0)} />;
    const entry = DIARY_ENTRIES[idx - 1];
    const customPhoto = customPhotos[entry.letter];
    return (
      <div className="diary-lined-paper w-full h-full flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-rose-200/70 pb-1.5 pl-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">
            A to Z Diary
          </span>
          <span className="text-xs font-serif-display italic text-rose-700">
            {String(idx).padStart(2, '0')} / 26
          </span>
        </div>

        <div className="pl-6 pr-1 my-2 space-y-1.5">
          <div className="flex items-baseline gap-2">
            <span
              className="font-serif-display text-4xl font-bold leading-none"
              style={{ color: entry.accent }}
            >
              {entry.letter}
            </span>
            <span className="text-stone-400">–</span>
            <h2 className="font-serif-display text-lg font-semibold text-stone-800 leading-tight">
              {entry.title}
            </h2>
          </div>
          <p className="text-stone-700 text-[14px] leading-[24px]">
            “{entry.text}”
          </p>
        </div>

        <div className="pl-4 pt-1 flex justify-center">
          <div
            className="w-full max-w-[235px] bg-white p-2.5 pb-3 rounded-[3px] shadow-md border border-stone-200"
            style={{ transform: `rotate(${entry.tilt})` }}
          >
            <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
              {customPhoto ? (
                <img
                  src={customPhoto}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <LetterIllustration entry={entry} />
              )}
              <label
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="cursor-pointer absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-white/90 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-full shadow border border-stone-200"
              >
                <Camera className="w-2.5 h-2.5 text-rose-600" />
                <span>Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === 'string') {
                        handleUploadPhoto(entry.letter, reader.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <p className="font-handwriting text-lg text-center text-stone-700 pt-1.5 leading-none">
              {entry.caption}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const activeBaseIndex =
    flipDirection === 'prev' ? Math.max(0, pageIndex - 1) : pageIndex;
  const activeNextIndex =
    flipDirection === 'next' ? Math.min(27, pageIndex + 1) : pageIndex;

  const flipProgress = Math.abs(flipAngle) / 180;
  const midFlipShadow = Math.sin(flipProgress * Math.PI);

  const isCoverSpread = !isMobile && (activeBaseIndex === 0 || activeBaseIndex === 27);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between py-4 px-2 sm:px-6 overflow-hidden">
      <header className="w-full max-w-5xl flex items-center justify-between px-2 z-30">
        <button
          type="button"
          onClick={() => setShowIndex(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 text-xs sm:text-sm font-medium shadow-sm border border-stone-200/80 backdrop-blur-sm transition"
        >
          <Grid className="w-3.5 h-3.5 text-rose-600" />
          <span>A–Z Index</span>
        </button>

        <div className="text-center hidden sm:block">
          <span className="font-serif-display italic text-stone-600 text-sm">
            {pageIndex === 0
              ? 'Front Cover'
              : pageIndex === 27
              ? 'Back Cover'
              : `Letter ${DIARY_ENTRIES[pageIndex - 1].letter} — ${
                  DIARY_ENTRIES[pageIndex - 1].title
                }`}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled((s) => !s)}
          title={soundEnabled ? 'Mute page sound' : 'Enable page sound'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 text-xs font-medium shadow-sm border border-stone-200/80 backdrop-blur-sm transition"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-rose-600" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          )}
          <span className="hidden sm:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
        </button>
      </header>

      <main className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2">
        <button
          type="button"
          onClick={() => turnPage('prev')}
          disabled={pageIndex === 0 || isAnimating}
          aria-label="Previous Page"
          className={`z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border shadow-lg transition-all mr-1.5 sm:mr-4 ${
            pageIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-white/60 border-stone-200 text-stone-400'
              : 'bg-white/95 hover:bg-amber-50 border-amber-300/80 text-stone-800 hover:scale-105 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="book-stage relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {isMobile ? (
            <div className="relative w-[82vw] max-w-[370px] h-[68vh] max-h-[540px] preserve-3d">
              <div
                className="absolute top-1.5 bottom-1.5 -right-2 w-2 rounded-r-sm pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(to right, #f5efe6 0px, #e4d8c5 1.5px, #f5efe6 3px)',
                  boxShadow: '3px 8px 18px rgba(45, 25, 10, 0.22)',
                }}
              />

              <div
                className="absolute -top-2 right-7 w-4 h-10 bg-rose-700 z-20 shadow-md pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                }}
              />

              <div className="absolute inset-0 rounded-r-xl rounded-l-md overflow-hidden shadow-[0_18px_40px_rgba(38,20,10,0.28)] border border-stone-300/80 bg-[#fdfaf4]">
                {flipDirection === 'next'
                  ? renderMobilePage(activeNextIndex)
                  : renderMobilePage(activeBaseIndex)}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent" />
              </div>

              {flipDirection && (
                <div
                  className="absolute inset-0 preserve-3d pointer-events-none"
                  style={{
                    transformOrigin: 'left center',
                    transform: `rotateY(${flipAngle}deg)`,
                    transition: dragRef.current.active
                      ? 'none'
                      : 'transform 0.52s cubic-bezier(0.22, 0.61, 0.36, 1)',
                    zIndex: 25,
                  }}
                >
                  <div className="backface-hidden absolute inset-0 rounded-r-xl rounded-l-md overflow-hidden border border-stone-300/80 bg-[#fdfaf4] shadow-xl">
                    {renderMobilePage(activeBaseIndex)}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ opacity: midFlipShadow * 0.22 }}
                    />
                  </div>
                  <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-l-xl rounded-r-md overflow-hidden border border-stone-300/80 bg-[#f6efe4] shadow-xl">
                    <div className="w-full h-full diary-lined-paper opacity-90 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-rose-300/60" />
                    </div>
                    <div
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ opacity: midFlipShadow * 0.28 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`relative transition-all duration-500 preserve-3d ${
                isCoverSpread
                  ? 'w-[410px] lg:w-[440px] h-[530px] lg:h-[560px]'
                  : 'w-[740px] lg:w-[860px] h-[510px] lg:h-[550px]'
              }`}
            >
              <div className="absolute -inset-2.5 rounded-xl leather-cover shadow-[0_26px_55px_rgba(32,14,8,0.38)] pointer-events-none" />

              {!isCoverSpread && (
                <>
                  <div
                    className="absolute top-1 bottom-1 -left-1.5 w-2 rounded-l-sm pointer-events-none"
                    style={{
                      background:
                        'repeating-linear-gradient(to right, #e5d8c5 0px, #faf5ed 1.5px, #e5d8c5 3px)',
                    }}
                  />
                  <div
                    className="absolute top-1 bottom-1 -right-1.5 w-2 rounded-r-sm pointer-events-none"
                    style={{
                      background:
                        'repeating-linear-gradient(to right, #faf5ed 0px, #e5d8c5 1.5px, #faf5ed 3px)',
                    }}
                  />
                </>
              )}

              <div
                className="absolute -top-3 right-12 w-5 h-12 bg-rose-700 z-30 shadow-md pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                }}
              />

              {isCoverSpread && !flipDirection ? (
                <div className="relative w-full h-full rounded-r-lg rounded-l-sm overflow-hidden shadow-inner border border-amber-400/20">
                  {renderSpreadRight(activeBaseIndex)}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                </div>
              ) : (
                <div className="relative w-full h-full grid grid-cols-2 rounded-md overflow-visible bg-[#fdfaf4] shadow-inner">
                  <div className="relative w-full h-full rounded-l-md overflow-hidden border-r border-stone-300/70">
                    {activeBaseIndex === 0 ? (
                      <div className="w-full h-full leather-cover opacity-95" />
                    ) : (
                      renderSpreadLeft(activeBaseIndex)
                    )}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/15 via-black/5 to-transparent" />
                  </div>

                  <div className="relative w-full h-full rounded-r-md overflow-hidden">
                    {flipDirection === 'next'
                      ? renderSpreadRight(activeNextIndex)
                      : renderSpreadRight(activeBaseIndex)}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
                  </div>

                  <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-stone-400/40 z-20" />

                  {flipDirection && (
                    <div
                      className="absolute top-0 bottom-0 left-1/2 w-1/2 preserve-3d pointer-events-none"
                      style={{
                        transformOrigin: 'left center',
                        transform: `rotateY(${flipAngle}deg)`,
                        transition: dragRef.current.active
                          ? 'none'
                          : 'transform 0.56s cubic-bezier(0.22, 0.61, 0.36, 1)',
                        zIndex: 25,
                      }}
                    >
                      <div className="backface-hidden absolute inset-0 rounded-r-md overflow-hidden bg-[#faf5ec] shadow-2xl border-l border-stone-300/60">
                        {renderSpreadRight(activeBaseIndex)}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/15 to-transparent" />
                        <div
                          className="pointer-events-none absolute inset-0 bg-black"
                          style={{ opacity: midFlipShadow * 0.25 }}
                        />
                      </div>

                      <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-l-md overflow-hidden bg-[#fdfaf4] shadow-2xl border-r border-stone-300/60">
                        {activeNextIndex === 27 ? (
                          <div className="w-full h-full leather-cover" />
                        ) : (
                          renderSpreadLeft(activeNextIndex)
                        )}
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/15 to-transparent" />
                        <div
                          className="pointer-events-none absolute inset-0 bg-black"
                          style={{ opacity: midFlipShadow * 0.25 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => turnPage('next')}
          disabled={pageIndex === 27 || isAnimating}
          aria-label="Next Page"
          className={`z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border shadow-lg transition-all ml-1.5 sm:ml-4 ${
            pageIndex === 27
              ? 'opacity-30 cursor-not-allowed bg-white/60 border-stone-200 text-stone-400'
              : 'bg-white/95 hover:bg-amber-50 border-amber-300/80 text-stone-800 hover:scale-105 active:scale-95'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </main>

      <footer className="w-full max-w-xl flex flex-col items-center gap-1.5 z-20">
        <p className="text-[11px] sm:text-xs text-stone-500">
          Swipe / drag page directly with your finger or use the side arrows
        </p>
        <div className="w-48 sm:w-64 h-1.5 bg-stone-300/70 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-600 transition-all duration-300 rounded-full"
            style={{ width: `${(pageIndex / 27) * 100}%` }}
          />
        </div>
      </footer>

      {showIndex && (
        <div
          onClick={() => setShowIndex(false)}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#fdfaf4] rounded-2xl shadow-2xl border border-stone-200 p-5 sm:p-6 max-h-[82vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-stone-800">
                  A to Z Chapters
                </h3>
                <p className="text-xs text-stone-500">
                  Jump directly to any letter in the diary
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowIndex(false)}
                className="p-1.5 rounded-full hover:bg-stone-200/70 text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPageIndex(0);
                  setShowIndex(false);
                }}
                className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition ${
                  pageIndex === 0
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white hover:bg-rose-50 text-stone-700 border-stone-200'
                }`}
              >
                📖 Front Cover
              </button>

              {DIARY_ENTRIES.map((item, idx) => {
                const targetPage = idx + 1;
                const active = pageIndex === targetPage;
                return (
                  <button
                    key={item.letter}
                    type="button"
                    onClick={() => {
                      setPageIndex(targetPage);
                      setShowIndex(false);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition flex items-center gap-2 ${
                      active
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white hover:bg-rose-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span
                      className={`font-serif-display font-bold text-base ${
                        active ? 'text-white' : 'text-rose-600'
                      }`}
                    >
                      {item.letter}
                    </span>
                    <span className="text-xs truncate">{item.title}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setPageIndex(27);
                  setShowIndex(false);
                }}
                className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition ${
                  pageIndex === 27
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white hover:bg-rose-50 text-stone-700 border-stone-200'
                }`}
              >
                ❤️ Back Cover
              </button>
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}