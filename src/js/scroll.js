export default function scrollTo (element, duration) {
  var e = document.documentElement
  if (e.scrollTop === 0) {
    var t = e.scrollTop
    ++e.scrollTop
    e = t + 1 === e.scrollTop-- ? e : document.body
  }
  scrollToC(e, e.scrollTop, element, duration)
}

export function scrollToC (element, from, to, duration) {
  if (duration < 0) return
  if (typeof from === 'object')from = from.offsetTop
  if (typeof to === 'object')to = to.offsetTop
  scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic)
}

export function scrollToX (element, x1, x2, t, v, step, operacion) {
  if (t < 0 || t > 1 || v <= 0) return
  element.scrollTop = x1 - (x1 - x2) * operacion(t)
  t += v * step
  setTimeout(function () {
    scrollToX(element, x1, x2, t, v, step, operacion)
  }, step)
}

export function easeOutCuaic (t) {
  t--
  return t * t * t + 1
}
