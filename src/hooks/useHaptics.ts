/**
 * useHaptics — Thin wrapper around web-haptics
 *
 * Provides contextual haptic patterns that match Helpa's interaction design:
 *   light    → nav taps, selection, chip toggles
 *   medium   → button presses, approvals
 *   heavy    → confirms, payment release, critical actions
 *   success  → job posted, payment received, onboarding complete
 *   warning  → dispute, overdue, offline toggle
 *   error    → failed action
 *   selection→ switching tabs/modes
 */
import { WebHaptics } from 'web-haptics';

let instance: WebHaptics | null = null;

function getInstance(): WebHaptics {
  if (!instance) {
    instance = new WebHaptics();
  }
  return instance;
}

export type HapticType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error'
  | 'selection';

export function useHaptics() {
  const haptic = (type: HapticType = 'light') => {
    if (!WebHaptics.isSupported) return;
    getInstance().trigger(type);
  };

  return { haptic, isSupported: WebHaptics.isSupported };
}
