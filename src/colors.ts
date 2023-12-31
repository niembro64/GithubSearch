export const getColorFromLanguage = (language: any): string => {
  if (typeof language !== 'string' || language === '') {
    return colors.transparent;
  }

  // @ts-ignore
  return languageColors[language] || '#444';
};

const languageColors = {
  JavaScript: '#ac9739',
  TypeScript: '#2b7489',
  Ruby: '#701516',
  Java: '#b07219',
  Python: '#3572A5',
  PHP: '#4F5D95',
  'C#': '#178600',
  C: '#555555',
  'C++': '#f34b7d',
  'Objective-C': '#438eff',
  Shell: '#89e051',
  Go: '#00ADD8',
  'Visual Basic': '#945db7',
  Kotlin: '#F18E33',
  Rust: '#dea584',
  'Rust Analyzer': '#dea584',
  Scala: '#c22d40',
  Swift: '#ffac45',
  Dart: '#00B4AB',
  Lua: '#000080',
  Perl: '#0298c3',
  CoffeeScript: '#244776',
  PowerShell: '#012456',
  Elixir: '#6e4a7e',
  Erlang: '#B83998',
  Crystal: '#000100',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#2c3e50',
  Dockerfile: '#384d54',
  Assembly: '#6E4C13',
  R: '#198CE7',
  Haskell: '#5e5086',
  OCaml: '#3be133',
  Clojure: '#db5855',
  Groovy: '#e69f56',
  Julia: '#a270ba',
  TeX: '#3D6117',
  'Vim script': '#199f4b',
  D: '#ba595e',
  'F#': '#b845fc',
  Roff: '#ecdebe',
  'Common Lisp': '#3fb68b',
  Puppet: '#302B6D',
  Elm: '#60B5CC',
  PureScript: '#1D222D',
  'Emacs Lisp': '#c065db',
};

const palette = {
  // -----------------------------
  // SLP IMAGE COLORS
  // -----------------------------
  slpIconBlue: '#2b2d88',
  slpIconGreen: '#42b54a',

  // -----------------------------
  // TAILWIND COLORS
  // -----------------------------

  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
  slate950: '#020617',

  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray190: '#f0f0f0',
  gray200: '#e5e7eb',
  gray250: '#e1e1e1',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  gray950: '#030712',

  zinc50: '#fafafa',
  zinc100: '#f4f4f5',
  zinc200: '#e4e4e7',
  zinc300: '#d4d4d8',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  zinc600: '#52525b',
  zinc700: '#3f3f46',
  zinc800: '#27272a',
  zinc900: '#18181b',
  zinc950: '#09090b',

  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0a0a0a',

  stone50: '#fafaf9',
  stone100: '#f5f5f4',
  stone200: '#e7e5e4',
  stone300: '#d6d3d1',
  stone400: '#a8a29e',
  stone500: '#78716c',
  stone600: '#57534e',
  stone700: '#44403c',
  stone800: '#292524',
  stone900: '#1c1917',
  stone950: '#0c0a09',

  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',
  red950: '#450a0a',

  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange300: '#fdba74',
  orange400: '#fb923c',
  orange500: '#f97316',
  orange600: '#ea580c',
  orange700: '#c2410c',
  orange800: '#9a3412',
  orange900: '#7c2d12',
  orange950: '#431407',

  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber200: '#fde68a',
  amber300: '#fcd34d',
  amber400: '#fbbf24',
  amber500: '#f59e0b',
  amber600: '#d97706',
  amber700: '#b45309',
  amber800: '#92400e',
  amber900: '#78350f',
  amber950: '#451a03',

  yellow50: '#fefce8',
  yellow100: '#fef9c3',
  yellow200: '#fef08a',
  yellow300: '#fde047',
  yellow400: '#facc15',
  yellow500: '#eab308',
  yellow600: '#ca8a04',
  yellow700: '#a16207',
  yellow800: '#854d0e',
  yellow900: '#713f12',
  yellow950: '#422006',

  lime50: '#f7fee7',
  lime100: '#ecfccb',
  lime200: '#d9f99d',
  lime300: '#bef264',
  lime400: '#a3e635',
  lime500: '#84cc16',
  lime600: '#65a30d',
  lime700: '#4d7c0f',
  lime800: '#3f6212',
  lime900: '#365314',
  lime950: '#1a2e05',

  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',
  green950: '#052e16',

  emerald50: '#ecfdf5',
  emerald100: '#d1fae5',
  emerald200: '#a7f3d0',
  emerald300: '#6ee7b7',
  emerald400: '#34d399',
  emerald500: '#10b981',
  emerald600: '#059669',
  emerald700: '#047857',
  emerald800: '#065f46',
  emerald900: '#064e3b',
  emerald950: '#022c22',

  teal50: '#f0fdfa',
  teal100: '#ccfbf1',
  teal200: '#99f6e4',
  teal300: '#5eead4',
  teal400: '#2dd4bf',
  teal500: '#14b8a6',
  teal600: '#0d9488',
  teal700: '#0f766e',
  teal800: '#115e59',
  teal900: '#134e4a',
  teal950: '#042f2e',

  cyan50: '#ecfeff',
  cyan100: '#cffafe',
  cyan200: '#a5f3fc',
  cyan300: '#67e8f9',
  cyan400: '#22d3ee',
  cyan500: '#06b6d4',
  cyan600: '#0891b2',
  cyan700: '#0e7490',
  cyan800: '#155e75',
  cyan900: '#164e63',
  cyan950: '#052639',

  sky50: '#f0f9ff',
  sky100: '#e0f2fe',
  sky200: '#bae6fd',
  sky300: '#7dd3fc',
  sky400: '#38bdf8',
  sky500: '#0ea5e9',
  sky600: '#0284c7',
  sky700: '#0369a1',
  sky800: '#075985',
  sky900: '#0c4a6e',
  sky950: '#032d44',

  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',
  blue950: '#0c234a',

  indigo50: '#eef2ff',
  indigo100: '#e0e7ff',
  indigo200: '#c7d2fe',
  indigo300: '#a5b4fc',
  indigo400: '#818cf8',
  indigo500: '#6366f1',
  indigo600: '#4f46e5',
  indigo700: '#4338ca',
  indigo800: '#3730a3',
  indigo900: '#312e81',
  indigo950: '#1a1736',

  violet50: '#f5f3ff',
  violet100: '#ede9fe',
  violet200: '#ddd6fe',
  violet300: '#c4b5fd',
  violet400: '#a78bfa',
  violet500: '#8b5cf6',
  violet600: '#7c3aed',
  violet700: '#6d28d9',
  violet800: '#5b21b6',
  violet900: '#4c1d95',
  violet950: '#270d4f',

  purple50: '#faf5ff',
  purple100: '#f3e8ff',
  purple200: '#e9d5ff',
  purple300: '#d8b4fe',
  purple400: '#c084fc',
  purple500: '#a855f7',
  purple600: '#9333ea',
  purple700: '#7e22ce',
  purple800: '#6b21a8',
  purple900: '#581c87',
  purple950: '#2e0e46',

  fuchsia50: '#fdf4ff',
  fuchsia100: '#fae8ff',
  fuchsia200: '#f5d0fe',
  fuchsia300: '#f0abfc',
  fuchsia400: '#e879f9',
  fuchsia500: '#d946ef',
  fuchsia600: '#c026d3',
  fuchsia700: '#a21caf',
  fuchsia800: '#86198f',
  fuchsia900: '#701a75',
  fuchsia950: '#3b0d3e',

  pink50: '#fdf2f8',
  pink100: '#fce7f3',
  pink200: '#fbcfe8',
  pink300: '#f9a8d4',
  pink400: '#f472b6',
  pink500: '#ec4899',
  pink600: '#db2777',
  pink700: '#be185d',
  pink800: '#9d174d',
  pink900: '#831843',
  pink950: '#460b26',

  rose50: '#fff1f2',
  rose100: '#ffe4e6',
  rose200: '#fecdd3',
  rose300: '#fda4af',
  rose400: '#fb7185',
  rose500: '#f43f5e',
  rose600: '#e11d48',
  rose700: '#be123c',
  rose800: '#9f1239',
  rose900: '#881337',
  rose950: '#480b1b',

  //----------------------------------------
  // GRAYS AND TRANSPARENCIES
  //----------------------------------------

  blackA50: 'rgba(0, 0, 0, 0.05)',
  blackA100: 'rgba(0, 0, 0, 0.1)',
  blackA200: 'rgba(0, 0, 0, 0.2)',
  blackA300: 'rgba(0, 0, 0, 0.3)',
  blackA400: 'rgba(0, 0, 0, 0.4)',
  blackA500: 'rgba(0, 0, 0, 0.5)',
  blackA600: 'rgba(0, 0, 0, 0.6)',
  blackA700: 'rgba(0, 0, 0, 0.7)',
  blackA800: 'rgba(0, 0, 0, 0.8)',
  blackA900: 'rgba(0, 0, 0, 0.9)',
  blackA950: 'rgba(0, 0, 0, 0.95)',

  darkA50: 'rgba(25, 16, 21, 0.05)',
  darkA100: 'rgba(25, 16, 21, 0.1)',
  darkA200: 'rgba(25, 16, 21, 0.2)',
  darkA300: 'rgba(25, 16, 21, 0.3)',
  darkA400: 'rgba(25, 16, 21, 0.4)',
  darkA500: 'rgba(25, 16, 21, 0.5)',
  darkA600: 'rgba(25, 16, 21, 0.6)',
  darkA700: 'rgba(25, 16, 21, 0.7)',
  darkA800: 'rgba(25, 16, 21, 0.8)',
  darkA900: 'rgba(25, 16, 21, 0.9)',
  darkA950: 'rgba(25, 16, 21, 0.95)',

  grayA50: 'rgba(99, 116, 139, 0.05)',
  grayA100: 'rgba(99, 116, 139, 0.1)',
  grayA200: 'rgba(99, 116, 139, 0.2)',
  grayA300: 'rgba(99, 116, 139, 0.3)',
  grayA400: 'rgba(99, 116, 139, 0.4)',
  grayA500: 'rgba(99, 116, 139, 0.5)',
  grayA600: 'rgba(99, 116, 139, 0.6)',
  grayA700: 'rgba(99, 116, 139, 0.7)',
  grayA800: 'rgba(99, 116, 139, 0.8)',
  grayA900: 'rgba(99, 116, 139, 0.9)',
  grayA950: 'rgba(99, 116, 139, 0.95)',

  lightA50: 'rgba(203, 200, 212, 0.05)',
  lightA100: 'rgba(203, 200, 212, 0.1)',
  lightA200: 'rgba(203, 200, 212, 0.2)',
  lightA300: 'rgba(203, 200, 212, 0.3)',
  lightA400: 'rgba(203, 200, 212, 0.4)',
  lightA500: 'rgba(203, 200, 212, 0.5)',
  lightA600: 'rgba(203, 200, 212, 0.6)',
  lightA700: 'rgba(203, 200, 212, 0.7)',
  lightA800: 'rgba(203, 200, 212, 0.8)',
  lightA900: 'rgba(203, 200, 212, 0.9)',
  lightA950: 'rgba(203, 200, 212, 0.95)',

  whiteA50: 'rgba(255, 255, 255, 0.05)',
  whiteA100: 'rgba(255, 255, 255, 0.1)',
  whiteA200: 'rgba(255, 255, 255, 0.2)',
  whiteA300: 'rgba(255, 255, 255, 0.3)',
  whiteA400: 'rgba(255, 255, 255, 0.4)',
  whiteA500: 'rgba(255, 255, 255, 0.5)',
  whiteA600: 'rgba(255, 255, 255, 0.6)',
  whiteA700: 'rgba(255, 255, 255, 0.7)',
  whiteA800: 'rgba(255, 255, 255, 0.8)',
  whiteA900: 'rgba(255, 255, 255, 0.9)',
  whiteA950: 'rgba(255, 255, 255, 0.95)',

  yellowA50: 'rgba(255, 200, 0, 0.05)',
  yellowA100: 'rgba(255, 200, 0, 0.1)',
  yellowA200: 'rgba(255, 200, 0, 0.2)',
  yellowA300: 'rgba(255, 200, 0, 0.3)',
  yellowA400: 'rgba(255, 200, 0, 0.4)',
  yellowA500: 'rgba(255, 200, 0, 0.5)',
  yellowA600: 'rgba(255, 200, 0, 0.6)',
  yellowA700: 'rgba(255, 200, 0, 0.7)',
  yellowA800: 'rgba(255, 200, 0, 0.8)',
  yellowA900: 'rgba(255, 200, 0, 0.9)',
  yellowA950: 'rgba(255, 200, 0, 0.95)',

  brownA50: 'rgba(121, 85, 72, 0.05)',
  brownA100: 'rgba(121, 85, 72, 0.1)',
  brownA200: 'rgba(121, 85, 72, 0.2)',
  brownA300: 'rgba(121, 85, 72, 0.3)',
  brownA400: 'rgba(121, 85, 72, 0.4)',
  brownA500: 'rgba(121, 85, 72, 0.5)',
  brownA600: 'rgba(121, 85, 72, 0.6)',
  brownA700: 'rgba(121, 85, 72, 0.7)',
  brownA800: 'rgba(121, 85, 72, 0.8)',
  brownA900: 'rgba(121, 85, 72, 0.9)',
  brownA950: 'rgba(121, 85, 72, 0.95)',

  yellowBrownA50: 'rgba(175, 130, 80, 0.05)',
  yellowBrownA100: 'rgba(175, 130, 80, 0.1)',
  yellowBrownA200: 'rgba(175, 130, 80, 0.2)',
  yellowBrownA300: 'rgba(175, 130, 80, 0.3)',
  yellowBrownA400: 'rgba(175, 130, 80, 0.4)',
  yellowBrownA500: 'rgba(175, 130, 80, 0.5)',
  yellowBrownA600: 'rgba(175, 130, 80, 0.6)',
  yellowBrownA700: 'rgba(175, 130, 80, 0.7)',
  yellowBrownA800: 'rgba(175, 130, 80, 0.8)',
  yellowBrownA900: 'rgba(175, 130, 80, 0.9)',
  yellowBrownA950: 'rgba(175, 130, 80, 0.95)',

  white: '#ffffff',
  black: '#000000',

  //----------------------------------------
  // BRONZE SILVER GOLD PLATINUM
  //----------------------------------------
  bronze100: '#F9E0C4',
  bronze200: '#F0C991',
  bronze300: '#E8B25E',
  bronze400: '#E09C40',
  bronze500: '#CD7F32',
  bronze600: '#B6712B',
  bronze700: '#9F6323',
  bronze800: '#874C1C',
  bronze900: '#6F3515',

  silver100: '#F0F0F0',
  silver200: '#E1E1E1',
  silver300: '#D3D3D3',
  silver400: '#C4C4C4',
  silver500: '#C0C0C0',
  silver600: '#A9A9A9',
  silver700: '#919191',
  silver800: '#787878',
  silver900: '#606060',

  gold100: '#FFF9E0',
  gold200: '#FFF4C1',
  gold300: '#FFEF9F',
  gold400: '#FFE97C',
  gold500: '#FFD700',
  gold600: '#E5C200',
  gold700: '#CCAD00',
  gold800: '#B29800',
  gold900: '#998300',

  platinum100: '#F0F0F0',
  platinum200: '#E1E1E1',
  platinum300: '#D3D3D3',
  platinum400: '#C4C4C4',
  platinum500: '#C0C0C0',
  platinum600: '#A9A9A9',
  platinum700: '#919191',
  platinum800: '#787878',
  platinum900: '#606060',
} as const;

const actionColors = {
  created: palette.zinc500,
  started: palette.green600,
  finished: palette.blue500,
  scanned: palette.fuchsia500,
  open: palette.orange500,
  rewarded: palette.blue500,
  barrel: palette.gold700,
  course: palette.gold700,
  referral: palette.gold700,
  bonus: palette.gold700,
  spend: palette.gold700,
  adjustment: palette.gold700,
};

interface Colors {
  palette: typeof palette;
  appJsonBlueColor: string;
  appJsonExpoNotificationsColor: string;
  primary: string;
  secondary: string;
  transparent: string;
  underlayColor: string;
  textDark: string;
  textMuted: string;
  textDisabled: string;
  textLight: string;
  cancelButtonBackground: string;
  background: string;
  border: string;
  tint: string;
  separator: string;
  success: string;
  successBackground: string;
  error: string;
  errorBackground: string;
  action: typeof actionColors;
}

export const colors: Colors = {
  palette,
  appJsonBlueColor: '#2c2d6c',
  appJsonExpoNotificationsColor: '#55ffff',
  primary: palette.blue500,
  secondary: palette.green500,
  transparent: 'rgba(0, 0, 0, 0)',
  underlayColor: palette.darkA50,
  textDark: palette.gray800,
  textMuted: palette.gray600,
  textDisabled: palette.gray400,
  textLight: palette.gray200,
  cancelButtonBackground: palette.gray200,
  background: palette.gray100,
  border: palette.gray300,
  tint: palette.slpIconGreen,
  separator: palette.gray300,
  success: palette.green500,
  successBackground: palette.green100,
  error: palette.red500,
  errorBackground: palette.red100,
  action: actionColors,
};
