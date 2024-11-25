import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const detectDevice = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent;
  const devices = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return devices.some((device) => device.test(userAgent));
};

export const getParamWithoutCookie = (paramName: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName) ?? '';
};

export const getBrowserName = () => {
  if (typeof window === 'undefined') return 'undefined';
  const agent = window.navigator.userAgent.toLowerCase();
  if (agent.includes('edge')) return 'edge';
  if (agent.includes('opr') && 'opr' in window) return 'opera';
  if (agent.includes('chrome') && 'chrome' in window) return 'chrome';
  if (agent.includes('trident')) return 'ie';
  if (agent.includes('firefox')) return 'firefox';
  if (agent.includes('safari')) return 'safari';
  return 'other';
};
