export function assertNotNil<T>(
  v: T,
  message?: string,
): asserts v is NonNullable<T> {
  if (v == null) {
    throw new Error(message ?? 'Must not be null or undefined');
  }
}

/**
 * 获取浏览器名称
 * @see https://codepedia.info/detect-browser-in-javascript
 * @returns 浏览器名称
 */
export function getBrowserName() {
  if (typeof navigator === 'undefined') {
    return 'other';
  }
  const agent = navigator.userAgent.toLowerCase();
  console.log('🐔', agent);

  switch (
    true // case agent.indexOf("edge") > -1: return "MS Edge";
  ) {
    // case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
    // case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
    // case agent.indexOf("chrome") > -1 && !!window.chrome!: return "Chrome";
    case agent.includes('chrome'):
      return 'Chrome';
    // case agent.indexOf("trident") > -1: return "MS IE";
    case agent.includes('firefox'):
      return 'Mozilla Firefox';
    case agent.includes('safari'):
      return 'Safari';
    default:
      return 'other';
  }
}
