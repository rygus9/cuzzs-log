export default function cls(...classes: (string | boolean)[]): string {
  return classes.join(" ");
}
