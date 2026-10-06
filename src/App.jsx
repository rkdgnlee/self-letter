import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import we from "/public/we.gif"

/* ✏️ 여기만 수정하면 돼요 ------------------------------------ */
const TO = "우리 유미니에게 🤍";
const DATE = "2026. 10. 06";
const FROM = "이강휘 💛👃🕳️";
const PHOTO = we
const PHOTO_CAPTION = "";
// 스크롤하면 문단이 하나씩 나오고 이전 글은 위로 쌓여요. **이렇게 감싸면** 형광펜 강조
const PARAGRAPHS = [
  "오늘은 우리의 3주년이답. 1000일을 지난지도 벌써 100일이나 지났다니 좀 시간이 이렇게 빠르다니 싶으면서도 새로울 때가 있어 ! ",
  "어제는 씻는데 갑자기 울 유미니가 예전에 썼던 편지가 궁금한거야? 그래서 작년 내 생일 때 써줬던 햄스터 편지도 읽고, 1000일 때 편지도 읽고 했거든 !",
  "근데 이제는 우리 유미니를 정말 잘 안다고 생각하는데도, 편지와 울 유미니의 평소 말하는 방식이 다른 느낌이 있는거야 ! ",
  "나는 이제 늙어가는 건지 시간이 지나면서 뭔가 예전에 했던 추억들을 이야기하면 너무 즐겁고 재밌어서, 평소에 옛날 이야기를 많이 하는거 알지 걍 개 **늙크크**누 ㅋㅋ ",
  "암튼 나랑 반대로 울 유미니는 평소에는 이런 옛날 이야기를 잘안하는 것 같아",
  "나는 그렇게 느끼는데 갑자기 이렇게 적으니까 **아닌데?** 라고 할 것 같은 유미니구요 반박은 안받슴둥.",
  "아무튼 편지를 읽으니까 예전에 내가 해준 것들을 생각하면서 예전 이야기들을 속마음과 함께 적혀있는 부분이 많은거야.",
  "읽으면서, 당연히 직접 글을 적는거니까 다를 수 밖에 없는 것 같지만, 뭔가 나만 아는 울 유미니의 모습을 하나 더 추가한것 같아서 기분이 좋았어",
  "그래서 최근에 스트레칭도 하고 울 유미니랑 잼게 시간 보내서 잠도 푹 자고 나면? 낮에 일할 때도 울 유미니랑 카톡할 때도 기분이 좋고, 같이 점심에 산책나가서 전화하고 오면 오후 일에 집중도 잘돼서 너무 잘 끝나는 것 같아. ",
  "그래서 또 생각난게  **???: 오빠는 내가 왜 좋아?**  이 말을 들으면 내가 주로 하는 말 알지 ㅋㅋ",
  "나는 진짜 울 유미니 없으면 삶의 의미가 대부분 사라져버리는 것 같고, 있으면 너무 행복하고 불완전한 내가 완전해진다고 하는데, 진짜 그것만큼 정확하게 설명할 수가 없는 것 같아.",
  "만약 울 유미니가 한 순간에 사라지면, 나는 진짜 일상생활이고 나발이고, 그냥 울유미니랑 지금까지 다녔던 모든 곳들.. 월계동, 첨단, 수완, 여수, 순천, 고성, 거창, 전주, 대전, 부산, 제주, 삿포로, 시드니 등 진짜 혼이 빠져나가서 멍하니 걷고, 그냥 울 유미니 없는 세상에 뭐하러 사나.. 산속에 들어가서 그냥 뇌에서 지능을 빼버리고 살라나..",
  "아무튼 씻으면서 갑자기 F력 터져서 울유미니가 갑자기 사라졌는데, 아무도 울유미니를 기억못하고 나만 유미니를 기억하는 상황이 오면 어떨까..? 하면서 그랬어 ㅋㅋㅋ",
  "벌써 2026년도 끝나가는데, 요새 울 유미니도 스트레스도 많이 받고 ㅠㅠ 직장때문에 힘들지..",
  "더 좋은 사람들과 좋은 곳에서 일도 재미나게 했으면 좋겠다 라는 생각을 하는 것 같아.",
  "광주에서 좋은곳으로 가면 괜찮은데 만약 진짜 혹할만한 좋은 곳에서 오퍼가 왔는데 만약 경기도권이면 어쩌지..? 이런 생각도 하고 ",
  "동시에 나도 이직한다고 서울에 있는 회사도 찾는데 차라리 그러면 바짝 일하고 고향으로 내려가면 좋을 것 같기도해.",
  "근데 타지생활을 한번도 안해본 울 유미니가 타지역가서 살면 너무 고향을 떠나서 적응하는데 시간이 오래걸릴 것 같기도 하고.. 걱정도 돼.",
  "미래는 아무도 모르니까 두서없이 이것저것 적었는데 결론은 나는 울 유미니가 힘들어도 금방 이겨낼 수 있게 돕고 싶을 뿐이고 그냥 평생 늙어죽을 때까지 같이 살고 함께 하고 싶을 뿐이라는 것..!이라는 결론을 말하고 싶어서 적었구요",
  "ㅎㅎ 울 유미니 나랑 3년동안 지내니까 어땠어? 처음에 막 남자는 변한다 하는데 나는 그래도 안변한 부분이 있어? 이강휘는 말로 안해 ^^",
  "아무튼 울 유미니 나랑 3주년 축하하고 100주년까지 97년 남았으니까 꼭 함께 하쟈 🩷🩷"

];
/* ------------------------------------------------------------- */


const N = PARAGRAPHS.length;
const COLORS = ["#ff8fb1", "#ffe9a8", "#cdf3e4", "#c9d6ff"];

// 구간 선형 보간 (범위 밖은 양 끝값 고정)
function interp(x, xs, ys) {
  if (x <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (x <= xs[i]) {
      const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      return ys[i - 1] + (ys[i] - ys[i - 1]) * t;
    }
  }
  return ys[ys.length - 1];
}
const rich = (text) =>
  text.split("**").map((s, i) => (i % 2 ? <b key={i} className="hl">{s}</b> : <span key={i}>{s}</span>));

const Polaroid = ({ className = "" }) => (
  <div className={`photo ${className}`}>
    <div className="img">{PHOTO ? <img src={PHOTO} alt="" /> : "🎞️ GIF를 넣어주세요"}</div>
    <small>{PHOTO_CAPTION}</small>
  </div>
);

/* PNG 저장용: 화면 밖에 있는 완성본 편지 (스크롤 상태와 무관하게 항상 전체가 담겨요) */
const ExportLetter = forwardRef((_, ref) => (
  <div className="export-wrap" aria-hidden>
    <div ref={ref} className="letter" style={{ width: 440 }}>
      <div className="tape" />
      <h1 className="to"><span>{TO}</span></h1>
      <div className="date">{DATE}</div>
      {PARAGRAPHS.map((t, i) => <p key={i} className="p">{rich(t)}</p>)}
      <Polaroid />
      <div className="sign">from.<br /><strong>{FROM}</strong></div>
    </div>
  </div>
));


const FLOATERS = ["💗", "✨", "🌸", "⭐", "🫧", "🍓", "☁️", "🎀"];

function Floaters() {
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        e: FLOATERS[i % FLOATERS.length],
        left: Math.random() * 96,
        top: Math.random() * 92,
        size: 16 + Math.random() * 20,
        dur: 4 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );
  return items.map((f, i) => (
    <motion.span
      key={i}
      className="float"
      style={{ left: `${f.left}%`, top: `${f.top}%`, fontSize: f.size, opacity: 0.75 }}
      animate={{ y: [0, -18, 0], rotate: [-8, 8, -8] }}
      transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {f.e}
    </motion.span>
  ));
}


/* 💌 진입 화면: 봉투의 하트 씰을 누르면 열려요 */
function Intro({ onDone }) {
  const [open, setOpen] = useState(false);
  const go = () => {
    if (open) return;
    setOpen(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, shapes: ["circle"],
      colors: ["#ff8fb1", "#ffe9a8", "#ffffff"], scalar: 0.9 });
    setTimeout(onDone, 1900);
  };
  return (
    <motion.div className="intro" exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
      transition={{ duration: 0.6 }}>
      <motion.p className="intro-title" animate={{ opacity: open ? 0 : 1 }}>
        {TO.replace("에게", "")}에게<br />편지가 도착했어요
      </motion.p>

      <motion.div className="env" onClick={go}
        initial={{ y: 30, opacity: 0, rotate: -4 }}
        animate={{ y: 0, opacity: 1, rotate: open ? 0 : [-2, 2, -2] }}
        transition={open ? { duration: 0.4 } : { rotate: { duration: 4, repeat: Infinity }, duration: 0.8 }}>
        <div className="env-back" />
        <motion.div className="env-letter"
          animate={{ y: open ? -120 : 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", damping: 14 }}>
          <i /><i /><i style={{ width: "50%" }} />
        </motion.div>
        <div className="env-front" />
        <motion.div className="env-flap"
          animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 3 }}
          transition={{ duration: 0.7 }} />
        <motion.button className="seal" aria-label="편지 열기"
          animate={open ? { scale: 0, opacity: 0 } : { scale: [1, 1.15, 1] }}
          transition={open ? { duration: 0.3 } : { duration: 1.4, repeat: Infinity }}>
          💗
        </motion.button>
      </motion.div>

      <motion.p className="intro-hint" animate={{ opacity: open ? 0 : [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}>
        하트를 톡 눌러보세요 ☝️
      </motion.p>
    </motion.div>
  );
}


/* 📜 스크롤 리더: 지난 글은 위로 쌓이며 작아지고, 새 글이 아래에서 올라와요 */
function Reader() {
  const scrollerRef = useRef(null);
  const zoneRef = useRef(null);
  const itemRefs = useRef([]);
  const exportRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [m, setM] = useState({ tops: PARAGRAPHS.map(() => 0), zoneH: 400 });

  const { scrollYProgress } = useScroll({ target: scrollerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  const [p, setP] = useState(0);
  useMotionValueEvent(smooth, "change", setP);

  useLayoutEffect(() => {
    const measure = () =>
      setM({ tops: itemRefs.current.map((e) => (e ? e.offsetTop : 0)), zoneH: zoneRef.current.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(zoneRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  const pos = p * N;               // 0 → 첫 문단, N-1 → 마지막 문단, N → 피날레
  const finale = pos > N - 0.35;
  useEffect(() => {
    if (!finale) return;
    const t = setTimeout(() => confetti({ particleCount: 90, spread: 90, origin: { y: 0.7 }, colors: COLORS }), 450);
    return () => clearTimeout(t);
  }, [finale]);

  const anchor = m.zoneH * 0.36;
  const stackY = anchor - interp(pos, PARAGRAPHS.map((_, i) => i), m.tops);

  const save = async () => {
    if (!exportRef.current || saving) return;
    setSaving(true);
    try {
      const url = await toPng(exportRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: "#dfe6ff" });
      const a = document.createElement("a");
      a.download = "love-letter.png";
      a.href = url;
      a.click();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.85 }, scalar: 1.1, colors: COLORS });
    } catch (e) {
      alert("저장에 실패했어요 😢 다시 시도해주세요");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };
  const replay = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <motion.div className="topbar" style={{ scaleX: smooth }} />
      <div ref={scrollerRef} className="scroller" style={{ "--len": `${N * 60}vh` }}>
        <div className="pin">
          <motion.div className="sheet" initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 90, damping: 14 }}>
            <div className="tape" />
            <motion.span className="sticker" style={{ right: 18, top: 18 }}
              animate={{ rotate: [0, 12, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>💌</motion.span>
            <div className="sheet-head">
              <h1 className="to"><span>{TO}</span></h1>
              <div className="date">{DATE}</div>
            </div>

            <div ref={zoneRef} className="zone">
              <div className="stack" style={{ transform: `translateY(${stackY}px)`,
                opacity: interp(pos, [N - 1, N], [1, 0.1]) }}>
                {PARAGRAPHS.map((t, i) => {
                  const d = pos - i;
                  return (
                    <div key={i} ref={(el) => (itemRefs.current[i] = el)} className="item"
                      style={{
                        opacity: interp(d, [-0.9, 0, 1, 2, 3], [0, 1, 0.55, 0.28, 0.14]),
                        transform: `translateY(${interp(d, [-0.9, 0], [26, 0])}px) scale(${interp(d, [0, 1, 3], [1, 0.92, 0.78])})`,
                        filter: `blur(${interp(d, [-0.9, 0, 2, 3], [6, 0, 0.4, 1.4])}px)`,
                      }}>
                      <p className="p">{rich(t)}</p>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {finale && (
                  <motion.div key="finale" className="finale" exit={{ opacity: 0, scale: 0.8 }}>
                    <motion.div initial={{ scale: 0.3, rotate: 14, opacity: 0, y: 60 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 140, damping: 11 }}>
                      <Polaroid className="stage-photo" />
                    </motion.div>
                    <motion.div className="sign" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}>
                      from.<br /><strong>{FROM}</strong>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hint-scroll" style={{ opacity: interp(pos, [0, 0.25], [1, 0]) }}>
              스크롤해서 읽어보세요 <span>↓</span>
            </div>
          </motion.div>

          <div className="actions" style={{ opacity: finale ? 1 : 0, pointerEvents: finale ? "auto" : "none" }}>
            <motion.button className="btn" onClick={save} disabled={saving} whileTap={{ scale: 0.97 }}>
              {saving ? "저장하는 중… ✨" : "💌 편지 이미지로 저장하기"}
            </motion.button>
            <button className="link" onClick={replay}>↺ 처음부터 다시 읽기</button>
          </div>
        </div>
      </div>
      <ExportLetter ref={exportRef} />
    </>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="page">
      <Floaters />
      <AnimatePresence mode="wait">
        {!opened && <Intro key="intro" onDone={() => setOpened(true)} />}
      </AnimatePresence>
      {opened && <Reader />}
    </div>
  );
}