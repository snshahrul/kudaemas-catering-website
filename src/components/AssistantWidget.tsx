'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Send, X } from 'lucide-react';
import { HorseMark } from '@/components/logo';
import { useLanguage } from '@/i18n/LanguageContext';
import { CATALOG } from '@/lib/catalog';
import { useCalculator } from '@/components/calculator-context';

type Msg = { role: 'user' | 'assistant'; content: string };

type Booking = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  pax: number;
  notes?: string;
};

// Chatbot eventType vocabulary → booking API enum values.
const EVENT_TYPE_MAP: Record<string, string> = {
  wedding: 'wedding-reception',
  perkahwinan: 'wedding-reception',
  reception: 'wedding-reception',
  'wedding & reception': 'wedding-reception',
  corporate: 'corporate-summit',
  korporat: 'corporate-summit',
  summit: 'corporate-summit',
  government: 'government-institution',
  kerajaan: 'government-institution',
  private: 'private-celebration',
  celebration: 'private-celebration',
  other: 'other',
};

export default function AssistantWidget() {
  const { t, language } = useLanguage();
  const { confirmed } = useCalculator();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bilingual greeting (re-greet when language changes and no chat yet).
  const greeting: Msg = {
    role: 'assistant',
    content:
      language === 'ms'
        ? 'Salam! 🐴 Saya Kuda, concierge digital KudaEmas Katering. Boleh saya bantu dengan menu, harga, atau tempahan acara anda?'
        : "Hello! 🐴 I'm Kuda, the digital concierge for KudaEmas Katering. May I help with menus, pricing, or booking your event?",
  };
  if (messages.length === 0) setMessages([greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  async function submitBooking(booking: Booking) {
    setBookingStatus('submitting');
    try {
      // Map the chatbot's free-form fields onto the booking API's enum contract.
      const pax = Number(booking.pax);
      const eventType = EVENT_TYPE_MAP[booking.eventType.trim().toLowerCase()] ?? 'other';

      // Include the confirmed calculator selection, if any, like the Event Inquiry does.
      const dishNames = t('calculator.dishes') as Record<string, string[]>;
      const menuSummary = confirmed
        ? CATALOG.map((c) => {
            const names = dishNames[c.key];
            const dish = names?.[confirmed.selection[c.key]] ?? c.dishes[confirmed.selection[c.key]].name;
            return `${dish}`;
          }).join(' · ')
        : null;
      const parts = [
        'Booked via Kuda AI assistant chat.',
        menuSummary ? `Calculator selection: ${menuSummary} (${confirmed!.pax} pax ≈ MYR ${confirmed!.grandTotal.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}).` : null,
        booking.notes ? `Notes: ${booking.notes}` : null,
      ].filter(Boolean);

      const payload = {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        eventDate: booking.eventDate,
        eventType,
        guests: pax,
        package: 'custom',
        message: parts.join('\n'),
      };
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.errors ? JSON.stringify(data.errors) : await res.text());
      setBookingStatus('done');
      const ref = `KE-${String(data.id).padStart(4, '0')}`;
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            language === 'ms'
              ? `✅ Permintaan tempahan diterima — rujukan ${ref} untuk ${booking.pax} pax pada ${booking.eventDate}. Pengarah acara kami akan menghubungi ${booking.email} dalam satu hari bekerja. Terima kasih!`
              : `✅ Booking request received — reference ${ref} for ${booking.pax} pax on ${booking.eventDate}. Our event director will reach ${booking.email} within one working day. Thank you!`,
        },
      ]);
    } catch (err) {
      console.error('[booking] failed:', err);
      setBookingStatus('error');
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            language === 'ms'
              ? '⚠️ Maaf, saya tidak dapat menghantar tempahan itu. Sila cuba lagi atau WhatsApp kami di +6011-3979 4166.'
              : "⚠️ Sorry, I couldn't submit the booking. Please try again, or WhatsApp us at +6011-3979 4166.",
        },
      ]);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Assistant error');

      let reply: string = data.reply ?? '';

      // Detect booking payload
      const marker = '[[BOOKING_READY]]';
      const idx = reply.indexOf(marker);
      let booking: Booking | null = null;
      if (idx !== -1) {
        const jsonPart = reply.slice(idx + marker.length).trim();
        reply =
          reply.slice(0, idx).trim() ||
          (language === 'ms'
            ? 'Baik, saya ada semua yang diperlukan — menghantar tempahan anda sekarang…'
            : 'Got everything I need — submitting your booking now…');
        try {
          booking = JSON.parse(jsonPart) as Booking;
        } catch {
          console.warn('Failed to parse booking JSON:', jsonPart);
        }
      }

      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      if (booking) await submitBooking(booking);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            language === 'ms'
              ? 'Maaf, ada masalah sekejap tadi. Sila cuba lagi.'
              : 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const ui = {
    status:
      bookingStatus === 'submitting'
        ? language === 'ms'
          ? 'Menghantar tempahan…'
          : 'Submitting booking…'
        : language === 'ms'
          ? 'Dalam talian'
          : 'Online',
    placeholder: language === 'ms' ? 'Taip mesej anda…' : 'Type your message…',
    title: 'Kuda · KudaEmas',
    close: language === 'ms' ? 'Tutup' : 'Close',
  };

  return (
    <>
      {/* Floating button */}
      <button
        aria-label={open ? ui.close : 'Open assistant'}
        onClick={() => setOpen((o) => !o)}
        className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-fern text-gold shadow-[0_8px_30px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-gold hover:bg-pine hover:shadow-[0_0_36px_rgba(201,162,75,0.35)]"
      >
        <span className="absolute inset-0 rounded-full bg-gold/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        {open ? (
          <X className="relative h-5 w-5" />
        ) : (
          <HorseMark className="relative h-7 w-7" />
        )}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-forest bg-gold" />
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-gold/25 bg-fern shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-gold/20 bg-pine/80 px-4 py-3.5">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <HorseMark className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="font-display text-sm font-semibold tracking-tight text-cream">{ui.title}</div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold/80">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  {ui.status}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={ui.close}
                className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-gold/50 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-fern p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={[
                      'max-w-[85%] whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'rounded-2xl rounded-br-sm bg-gold text-forest'
                        : 'rounded-2xl rounded-bl-sm border border-cream/10 bg-pine/70 text-cream/90',
                    ].join(' ')}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-cream/10 bg-pine/70 px-4 py-3">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-gold/20 bg-pine/60 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={ui.placeholder}
                className="flex-1 rounded-full border border-cream/15 bg-forest/70 px-4 py-2.5 text-sm text-cream placeholder:text-cream/35 outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-forest transition-all hover:bg-gold-bright hover:shadow-[0_0_24px_rgba(201,162,75,0.4)] disabled:opacity-40"
                aria-label="Send"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
