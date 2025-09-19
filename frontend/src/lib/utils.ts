import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import golgappaSellerImage from "@/assets/golgappa-seller.jpg"
import makeupArtistImage from "@/assets/makeup-artist.jpg"
import vendorImage from "@/assets/vendor-story.jpg"
import dataAnalystImage from "@/assets/data-analyst.jpg"
import carpenterImage from "@/assets/carpenter.jpg"
import rickshawDriverImage from "@/assets/rickshaw-driver.jpg"
import graphicDesignerImage from "@/assets/graphic-designer.jpg"
import studentYoutuberImage from "@/assets/student-youtuber.jpg"
import mechanicImage from "@/assets/mechanic.jpg"
import homemakerBakerImage from "@/assets/homemaker-baker.jpg"
import creatorImage from "@/assets/creator-story.jpg"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Career thumbnail asset mapping
// Keeps homepage and detail page in sync when resolving images from src/assets
export const careerThumbnailById: Record<string, string> = {
  golgappa_seller: golgappaSellerImage,
  makeup_artist: makeupArtistImage,
  street_food_seller: vendorImage,
  data_analyst: dataAnalystImage,
  carpenter: carpenterImage,
  rickshaw_driver: rickshawDriverImage,
  graphic_designer: graphicDesignerImage,
  student_youtuber: studentYoutuberImage,
  mechanic: mechanicImage,
  baker: homemakerBakerImage,
}

export function getCareerThumbnail(id: string): string {
  return (careerThumbnailById as Record<string, string>)[id] || creatorImage
}