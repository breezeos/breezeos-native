export default function generateId() {
  let count = 0;
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}