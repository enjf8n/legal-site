document.addEventListener("DOMContentLoaded", () => {
  const mapWrappers = document.querySelectorAll(".js-lazy-map");
  if (!mapWrappers.length) return;

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const frame = entry.target.querySelector("iframe[data-src]");
      if (frame && !frame.src) {
        frame.src = frame.dataset.src;
      }
      observer.unobserve(entry.target);
    });
  };

  const observer = new IntersectionObserver(onIntersect, {
    root: null,
    threshold: 0.15,
  });

  mapWrappers.forEach((wrapper) => observer.observe(wrapper));
});
