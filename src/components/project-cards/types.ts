export interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  spawnTime: number;
}

export interface ThemeColors {
  main: string;
  glow: string;
  text: string;
  pillBg: string;
  pillText: string;
  gradientFrom: string;
  gradientTo: string;
  gridCell: string;
  bgColor: string;
}