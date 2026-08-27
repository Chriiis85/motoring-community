/**
 * Device & Browser Permissions Utility Module
 * Safely manages Web Permissions API, Notifications, Clipboard, and WakeLock
 */

export type PermissionType = 'geolocation' | 'notifications' | 'clipboard-write' | 'screen-wake-lock';

/**
 * Check the status of a specific device / browser permission
 */
export async function checkPermissionStatus(permissionName: PermissionName): Promise<PermissionState | 'unsupported'> {
  if (typeof window === 'undefined' || !navigator.permissions) {
    return 'unsupported';
  }

  try {
    const status = await navigator.permissions.query({ name: permissionName });
    return status.state; // 'granted' | 'denied' | 'prompt'
  } catch (error) {
    console.warn(`Permission check for ${permissionName} not supported or failed:`, error);
    return 'unsupported';
  }
}

/**
 * Request notification permission (e.g. for race countdown alerts)
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
}

/**
 * Safely copy text to clipboard with permission fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Legacy fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text to clipboard:', err);
    return false;
  }
}

/**
 * Request Screen Wake Lock (keep display awake during countdown or telemetry)
 */
export async function requestScreenWakeLock(): Promise<{ release: () => Promise<void> } | null> {
  if (typeof window === 'undefined' || !('wakeLock' in navigator)) {
    return null;
  }

  try {
    const wakeLock = await (navigator as any).wakeLock.request('screen');
    return {
      release: async () => {
        if (wakeLock) {
          await wakeLock.release();
        }
      }
    };
  } catch (err) {
    console.warn('Screen WakeLock request failed:', err);
    return null;
  }
}
