import type { TestimonialItem } from "@/components/users/testimonial-card";

export type ReviewPlatform = "product-hunt" | "twitter";

export type HomeReview = Readonly<{
  quote: string;
  name: string;
  platform: ReviewPlatform;
  href: string;
  avatar: string;
  role?: string;
  rating?: number;
}>;

export const HOME_REVIEWS: HomeReview[] = [
  {
    quote:
      "The way each component feels cohesive without being overly uniform is genuinely impressive. Spacing, type, and interaction details across 33 categories usually fall apart at scale, but this holds together with real care.",
    name: "Niyazi Gözkenç",
    platform: "product-hunt",
    href: "https://www.producthunt.com/products/opensource-ui?comment=5555039",
    avatar: "/profile-picture.png",
  },
  {
    quote:
      "The attention to detail in each component really shows, especially how the spacing and typography stay consistent across so many categories. Feels like a curated set rather than a dump of files.",
    name: "Boran",
    platform: "product-hunt",
    href: "https://www.producthunt.com/products/opensource-ui?comment=5558524",
    avatar: "/woman.png",
  },
  {
    quote:
      "I stumbled via Twitter on your component library. It's pretty neat. I ended up looking around your site and saw your device playground — that definitely got my attention.",
    name: "Seam",
    platform: "twitter",
    href: "https://www.seam.co/",
    avatar: "/profile-picture.png",
    role: "The CEO of Seam",
    rating: 5,
  },
  {
    quote: "pretty cool collection mate! upvoted",
    name: "Saïd Aitmbarek",
    platform: "twitter",
    href: "https://x.com/SaidAitmbarek/status/2075990328574616022?s=20",
    avatar: "/profile-picture.png",
    role: "The founder of Microlaunch",
    rating: 5,
  },
  {
    quote:
      "Genuinely well put together — 154 components across 26 categories is no joke, and the tone throughout feels intentional, not templated",
    name: "Patrick Chen",
    platform: "twitter",
    href: "https://x.com/sublimeartsio",
    avatar: "/profile-picture.png",
    role: "The founder of runs.space",
    rating: 5,
  },
];

export const PRODUCT_HUNT_TESTIMONIALS: TestimonialItem[] = HOME_REVIEWS.filter(
  (review) => review.platform === "product-hunt",
).map((review) => ({
  quote: review.quote,
  name: review.name,
  role: "Product Hunt",
  rating: 5,
  avatar: review.avatar,
}));

export const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/products/opensource-ui";
