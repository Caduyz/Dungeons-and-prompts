export const SCREEN_FPS = 20;
export let showAlert: boolean = false;

export function changeAlertState(value: boolean) {
  if (showAlert === value) return;
  showAlert = value;
}