import { Facebook, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import logo from "@/assets/logo-ttcu.jpg.asset.json";
import { systemSettings } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-10 bg-brand text-brand-foreground">
      <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-3 py-8 sm:px-5 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))_auto]">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="Logo Trung tâm Cung ứng dịch vụ công phường Phú Thạnh"
            width={96}
            height={96}
            loading="lazy"
            className="size-16 shrink-0 rounded-full bg-card object-contain p-0.5"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase leading-tight">{systemSettings.org_name}</p>
            <p className="text-sm font-bold uppercase leading-tight">{systemSettings.org_name_2}</p>
            <p className="text-xs font-semibold italic text-gold">{systemSettings.slogan}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
          <span>
            {systemSettings.address},<br />
            {systemSettings.address_2}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <Phone className="mt-0.5 size-5 shrink-0" aria-hidden />
            <span>
              {systemSettings.hotline}
              <br />
              {systemSettings.hotline_note}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <Mail className="mt-0.5 size-5 shrink-0" aria-hidden />
            <a href={`mailto:${systemSettings.email}`} className="hover:text-gold">
              {systemSettings.email}
            </a>
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <Globe className="mt-0.5 size-5 shrink-0" aria-hidden />
            {systemSettings.website}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Kết nối với chúng tôi</p>
          <div className="flex gap-2">
            <a
              href={systemSettings.facebook_url}
              target="_blank"
              rel="noreferrer"
              aria-label="Fanpage Facebook phường Phú Thạnh"
              className="inline-flex size-9 items-center justify-center rounded-full bg-card text-brand transition-transform hover:scale-105"
            >
              <Facebook className="size-5" aria-hidden />
            </a>
            <a
              href={systemSettings.zalo_url}
              target="_blank"
              rel="noreferrer"
              aria-label="Zalo OA Trung tâm"
              className="inline-flex size-9 items-center justify-center rounded-full bg-card text-brand transition-transform hover:scale-105"
            >
              <MessageCircle className="size-5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-foreground/20">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 px-3 py-3 text-xs sm:flex-row sm:justify-between sm:px-5">
          <p>© 2026 Trung tâm Cung ứng dịch vụ công phường Phú Thạnh. All rights reserved.</p>
          <p>Thiết kế và phát triển bởi Trung tâm</p>
        </div>
      </div>
    </footer>
  );
}