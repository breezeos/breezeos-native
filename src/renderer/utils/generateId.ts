export default function generateId() {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % 10;
}
