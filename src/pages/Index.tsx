import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/593c80f2-0450-4e23-949c-ef6f42c27049/bucket/be510655-6dd7-4c49-b375-c62a52d0f708.png";
const IMG_HERO = "https://cdn.poehali.dev/projects/593c80f2-0450-4e23-949c-ef6f42c27049/files/83798991-f4d9-4055-938d-5ca5f069ce51.jpg";
const IMG_SPRAY = "https://cdn.poehali.dev/projects/593c80f2-0450-4e23-949c-ef6f42c27049/files/c16e6bd0-b095-4a0f-b063-31905e44cc9f.jpg";
const IMG_BEFORE = "https://cdn.poehali.dev/projects/593c80f2-0450-4e23-949c-ef6f42c27049/files/030eb885-7634-4f47-8630-5c59c8544a3d.jpg";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О нас", href: "#about" },
  { label: "Прайс", href: "#price" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  { icon: "Paintbrush", title: "Механизированная покраска", desc: "Профессиональное нанесение краски безвоздушным распылением. Идеально ровный слой без следов валика.", price: "от 350 ₽/м²" },
  { icon: "Layers", title: "Шпаклёвка стен и потолков", desc: "Финишная и стартовая шпаклёвка под покраску или обои. Геометрия стен без отклонений.", price: "от 450 ₽/м²" },
  { icon: "Building2", title: "Коммерческие помещения", desc: "Офисы, магазины, рестораны — работаем по проекту и в сжатые сроки.", price: "от 300 ₽/м²" },
  { icon: "Home", title: "Квартиры и дома", desc: "Полная отделка под ключ: от черновых работ до финишного покрытия.", price: "от 350 ₽/м²" },
  { icon: "Pencil", title: "Работа с дизайнерами", desc: "Реализуем авторские проекты: сложные текстуры, декоративные покрытия, цветовые акценты.", price: "по проекту" },
  { icon: "Wrench", title: "Подготовка поверхностей", desc: "Грунтование, армирование, исправление дефектов — залог долговечного результата.", price: "от 200 ₽/м²" },
];

const portfolioItems = [
  { img: IMG_HERO, title: "Жилая квартира", area: "120 м²", tag: "Покраска" },
  { img: IMG_SPRAY, title: "Коммерческий офис", area: "350 м²", tag: "Механизированная покраска" },
  { img: IMG_BEFORE, title: "Частный дом", area: "280 м²", tag: "Шпаклёвка + покраска" },
  { img: IMG_HERO, title: "Дизайнерский проект", area: "95 м²", tag: "По проекту" },
  { img: IMG_SPRAY, title: "Ресторан", area: "200 м²", tag: "Коммерческий объект" },
  { img: IMG_BEFORE, title: "Загородный дом", area: "450 м²", tag: "Полная отделка" },
];

const priceItems = [
  { service: "Грунтование поверхности", unit: "м²", price: "от 80 ₽" },
  { service: "Шпаклёвка стартовая", unit: "м²", price: "от 350 ₽" },
  { service: "Шпаклёвка финишная", unit: "м²", price: "от 300 ₽" },
  { service: "Шпаклёвка в 2 слоя (финиш)", unit: "м²", price: "от 450 ₽" },
  { service: "Покраска в 2 слоя (валик)", unit: "м²", price: "от 250 ₽" },
  { service: "Механизированная покраска", unit: "м²", price: "от 350 ₽" },
  { service: "Покраска потолка", unit: "м²", price: "от 300 ₽" },
  { service: "Декоративная штукатурка", unit: "м²", price: "от 800 ₽" },
  { service: "Выезд и замер", unit: "разово", price: "бесплатно" },
];

const reviews = [
  { name: "Александр М.", obj: "Квартира 85 м², Москва", text: "Команда сделала работу в срок. Стены идеально ровные, покраска без разводов. Механизированный способ — очень быстро и чисто. Рекомендую!", stars: 5 },
  { name: "Елена К.", obj: "Офис 200 м², Подмосковье", text: "Работали по проекту дизайнера. Всё реализовали точно по ТЗ, включая сложные переходы цвета. Качество на высшем уровне.", stars: 5 },
  { name: "Дмитрий В.", obj: "Частный дом 320 м²", text: "Брали полный цикл: шпаклёвка + покраска. Специалисты опытные, работают аккуратно. Результатом очень доволен, буду обращаться снова.", stars: 5 },
  { name: "Наталья О.", obj: "Ресторан 180 м²", text: "Срочный заказ выполнили за 4 дня. Всё чисто, профессионально, без лишних вопросов. Стоимость соответствует качеству.", stars: 5 },
];

const faqs = [
  { q: "Как рассчитать стоимость работ?", a: "Мы приезжаем на бесплатный замер, оцениваем объём и состояние поверхностей, после чего предоставляем точную смету. Замер занимает 30–60 минут." },
  { q: "Какие материалы вы используете?", a: "Работаем с профессиональными материалами брендов Knauf, Caparol, Dulux, Tikkurila и других. Можем работать с материалами заказчика." },
  { q: "Сколько времени занимает покраска квартиры?", a: "Квартиру площадью 60–80 м² механизированным способом красим за 1–2 дня. Полный цикл шпаклёвка + покраска — от 5 рабочих дней в зависимости от объёма." },
  { q: "Работаете ли вы с дизайнерами?", a: "Да, у нас большой опыт работы по дизайн-проектам. Реализуем авторские решения: фактурная штукатурка, колеровка по карте Farrow&Ball, RAL и другим системам." },
  { q: "Убираете ли вы за собой мусор?", a: "Да, после завершения работ проводим уборку рабочей зоны. Строительный мусор вывозим самостоятельно." },
  { q: "Даёте ли гарантию на работы?", a: "Даём гарантию 2 года на все виды работ. В случае появления дефектов по нашей вине устраняем их бесплатно." },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-lg">★</span>
      ))}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const aboutSection = useInView();
  const servicesSection = useInView();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#121212]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-3">
            <img src={LOGO} alt="Малярная лига" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block">
              <div style={{ fontFamily: "'Oswald', sans-serif", color: "white", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Малярная лига</div>
              <div style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Механизированная покраска</div>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-white/80 hover:text-white hover-gold text-sm font-medium tracking-wide uppercase transition-colors duration-200" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contacts" className="hidden lg:flex items-center gap-2 shimmer-btn text-[#121212] font-bold px-5 py-2.5 rounded text-sm uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <Icon name="Phone" size={15} />
            Заказать звонок
          </a>
          <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden text-white p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden fixed inset-0 top-16 bg-[#121212]/98 backdrop-blur-sm z-40 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-white text-2xl font-semibold uppercase tracking-wider hover-gold" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {l.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="shimmer-btn text-[#121212] font-bold px-8 py-3 rounded text-lg uppercase tracking-wider mt-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Заказать звонок
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-dark noise">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="hero" className="w-full h-full object-cover opacity-30" style={{ filter: "contrast(1.1) brightness(0.7)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(18,18,18,0.92) 0%, rgba(18,18,18,0.6) 50%, rgba(18,18,18,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-32 pt-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div style={{ width: 40, height: 2, background: "var(--gold)" }} />
              <span style={{ color: "var(--gold)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                Профессиональная отделка
              </span>
            </div>
            <h1 className="animate-fade-in-up delay-100 text-white uppercase leading-tight mb-6" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "0.04em" }}>
              Малярная<br />
              <span className="gold-text-gradient">лига</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 animate-fade-in-up delay-200 max-w-xl" style={{ fontFamily: "'Golos Text', sans-serif" }}>
              Механизированная покраска и шпаклёвка квартир, офисов и домов.<br className="hidden sm:block" />
              Русские мастера со стажем <strong className="text-white">более 10 лет</strong>. Работаем по проекту дизайнера.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <a href="#contacts" className="shimmer-btn text-[#121212] font-bold px-8 py-4 rounded text-base uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Получить расчёт
              </a>
              <a href="#portfolio" className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded text-base uppercase tracking-wider font-semibold transition-all duration-200 hover:border-[var(--gold)] hover:text-[var(--gold)]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Наши работы
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-14 animate-fade-in-up delay-400">
              {[
                { num: "10+", label: "лет опыта" },
                { num: "500+", label: "объектов сдано" },
                { num: "2 года", label: "гарантия" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-gold" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.num}</div>
                  <div className="text-white/50 text-sm uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600">
          <span className="text-white/30 text-xs uppercase tracking-widest">Листать</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-light">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className={`text-center mb-16 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">Что мы делаем</p>
            <h2 className="section-title text-[#121212] mb-4 gold-line-center">Наши услуги</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className={`service-card bg-white p-8 rounded border border-gray-100 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}>
                  <Icon name={s.icon} size={22} className="text-[#121212]" />
                </div>
                <h3 className="text-lg font-bold text-[#121212] mb-2 uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em" }}>{s.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-gold font-bold text-base" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.price}</span>
                  <a href="#contacts" className="text-xs text-[#121212] font-semibold uppercase tracking-wider hover-gold">Подробнее →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-dark relative overflow-hidden noise">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 55%)" }} />
        <div ref={aboutSection.ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={aboutSection.inView ? "animate-fade-in-up" : "opacity-0"}>
              <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">О компании</p>
              <h2 className="section-title text-white mb-6 gold-line">О нас</h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                <strong className="text-white">«Малярная лига»</strong> — команда профессиональных маляров с опытом более 10 лет. Специализируемся на механизированной покраске и шпаклёвке — технологии, которая даёт идеально ровное покрытие в несколько раз быстрее ручного нанесения.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Работаем с квартирами, коммерческими помещениями и частными домами. Имеем большой опыт реализации проектов совместно с дизайнерами интерьера.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Users", text: "Только русские специалисты" },
                  { icon: "Shield", text: "Гарантия 2 года" },
                  { icon: "Clock", text: "Соблюдаем сроки" },
                  { icon: "Star", text: "Работа по дизайн-проекту" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                      <Icon name={item.icon} size={16} className="text-gold" />
                    </div>
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${aboutSection.inView ? "animate-scale-in delay-300" : "opacity-0"}`}>
              <div className="relative rounded overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={IMG_SPRAY} alt="Работа команды" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom right, rgba(201,168,76,0.15), transparent)" }} />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-dark-3 border border-gold/30 rounded p-5 shadow-2xl">
                <div className="text-3xl font-bold text-gold" style={{ fontFamily: "'Oswald', sans-serif" }}>500+</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">завершённых объектов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">Наши работы</p>
            <h2 className="section-title text-[#121212] mb-4 gold-line-center">Портфолио</h2>
            <p className="text-[#555] max-w-xl mx-auto text-sm">Примеры завершённых объектов — квартиры, офисы, рестораны, частные дома</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems.map((item, i) => (
              <div key={i} className="portfolio-card rounded cursor-pointer" style={{ aspectRatio: "4/3", position: "relative" }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="portfolio-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <span className="text-xs text-gold uppercase tracking-widest font-medium">{item.tag}</span>
                  <div className="text-white font-bold text-lg mt-1" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.title}</div>
                  <div className="text-white/60 text-sm">{item.area}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contacts" className="inline-flex items-center gap-2 border border-[#121212] text-[#121212] px-8 py-3 rounded text-sm uppercase font-bold tracking-wider transition-all hover:bg-[#121212] hover:text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Запросить полное портфолио
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 bg-dark-2 relative noise">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.05) 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">Стоимость</p>
            <h2 className="section-title text-white mb-4 gold-line-center">Прайс-лист</h2>
            <p className="text-white/50 text-sm">Окончательная стоимость — после бесплатного выезда и замера</p>
          </div>
          <div className="rounded overflow-hidden border border-white/10">
            {priceItems.map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-b-0 ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}>
                <div className="text-white/85 text-sm font-medium">{item.service}</div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-white/30 text-xs hidden sm:block">{item.unit}</span>
                  <span className="text-gold font-bold text-base" style={{ fontFamily: "'Oswald', sans-serif", minWidth: 90, textAlign: "right" }}>{item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <a href="#contacts" className="shimmer-btn text-[#121212] font-bold px-8 py-4 rounded text-base uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Получить смету бесплатно
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">Отзывы клиентов</p>
            <h2 className="section-title text-[#121212] mb-4 gold-line-center">Что говорят о нас</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-8 rounded border border-gray-100 service-card">
                <Stars count={r.stars} />
                <p className="text-[#444] text-base leading-relaxed my-5 italic">«{r.text}»</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-[#121212]" style={{ fontFamily: "'Oswald', sans-serif" }}>{r.name}</div>
                  <div className="text-[#888] text-xs mt-0.5 uppercase tracking-wide">{r.obj}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-dark relative overflow-hidden noise">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(201,168,76,0.05) 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">Вопросы и ответы</p>
            <h2 className="section-title text-white mb-4 gold-line-center">FAQ</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <div key={i} className="border border-white/10 rounded overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-medium transition-colors hover:bg-white/5"
                  style={{ fontFamily: "'Golos Text', sans-serif" }}
                >
                  <span className="pr-4">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} className="flex-shrink-0 text-gold" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed animate-fade-in border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-3">Связаться с нами</p>
            <h2 className="section-title text-[#121212] mb-4 gold-line-center">Контакты</h2>
            <p className="text-[#555] max-w-xl mx-auto text-sm">Оставьте заявку — перезвоним в течение 30 минут и бесплатно выедем на замер</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#121212] mb-6 uppercase" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em" }}>Заявка на расчёт</h3>
              <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] transition-colors"
                />
                <select className="border border-gray-200 rounded px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[color:var(--gold)] transition-colors bg-white">
                  <option value="">Тип объекта</option>
                  <option>Квартира</option>
                  <option>Коммерческое помещение</option>
                  <option>Частный дом</option>
                  <option>Другое</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Опишите задачу (необязательно)"
                  className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[color:var(--gold)] transition-colors resize-none"
                />
                <button type="submit" className="shimmer-btn text-[#121212] font-bold py-4 rounded uppercase tracking-wider text-sm" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Отправить заявку
                </button>
                <p className="text-[#aaa] text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (XXX) XXX-XX-XX", hint: "Звонки с 8:00 до 21:00" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (XXX) XXX-XX-XX", hint: "Ответим в течение 15 минут" },
                { icon: "Mail", label: "Email", value: "info@malarnyaliga.ru", hint: "Для коммерческих запросов" },
                { icon: "MapPin", label: "Регион работы", value: "Москва и область", hint: "Выезжаем на объекты до 100 км от МКАД" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded border border-gray-100 service-card">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}>
                    <Icon name={c.icon} size={20} className="text-[#121212]" />
                  </div>
                  <div>
                    <div className="text-[#888] text-xs uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="text-[#121212] font-bold text-base" style={{ fontFamily: "'Oswald', sans-serif" }}>{c.value}</div>
                    <div className="text-[#aaa] text-xs mt-0.5">{c.hint}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Малярная лига" className="h-10 w-10 object-contain" />
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", color: "white", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Малярная лига</div>
              <div style={{ color: "var(--gold)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Механизированная покраска и отделка</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-white/40 hover:text-white/70 text-xs uppercase tracking-wider transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="text-white/25 text-xs text-center">© 2025 Малярная лига. Все права защищены.</div>
        </div>
      </footer>

    </div>
  );
}