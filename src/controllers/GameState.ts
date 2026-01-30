export const SCREEN_FPS = 30;
export const EXP_NEEDED_MULTIPLIER = 1;
export const EXP_GAIN_MULTIPLIER = 1;
export let showAlert: boolean = false;

export function changeAlertState(value: boolean) {
  if (showAlert === value) return;
  showAlert = value;
}

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
