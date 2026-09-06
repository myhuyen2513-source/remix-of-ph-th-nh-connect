import heroVanhoa from "@/assets/hero-vanhoa.jpg";
import heroMoitruong from "@/assets/hero-moitruong.jpg";
import heroThethao from "@/assets/hero-thethao.jpg";
import heroDothi from "@/assets/hero-dothi.jpg";
import newsHoinghi from "@/assets/news-hoinghi.jpg";
import khongGianHcm from "@/assets/khong-gian-hcm.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/hero-vanhoa.jpg": heroVanhoa,
  "/src/assets/hero-moitruong.jpg": heroMoitruong,
  "/src/assets/hero-thethao.jpg": heroThethao,
  "/src/assets/hero-dothi.jpg": heroDothi,
  "/src/assets/news-hoinghi.jpg": newsHoinghi,
  "/src/assets/khong-gian-hcm.jpg": khongGianHcm,
};

export function resolveImage(path: string): string {
  if (!path) return "";
  return imageMap[path] ?? path;
}
