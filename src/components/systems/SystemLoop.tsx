import type { Locale } from "@/lib/i18n";
import { ArrowDefs, Edge, Figure, Node } from "./diagram-primitives";

/**
 * Anatomy of a designed system: a six-node control loop with two inputs
 * (information, incentives) inside an environment boundary. The feedback
 * edge is the amber "adaptation" marker.
 *
 * ≥ sm: SVG. < sm: an ordered list with the same content.
 */

const labels = {
  bg: {
    env: "Външна среда",
    input: "вход",
    nodes: [
      ["Цели"],
      ["Архитектура", "и роли"],
      ["Правила и точки", "за решения"],
      ["Действия", "и продукти"],
      ["Резултати", "и ефективност"],
      ["Обратна връзка", "и контрол"],
    ],
    inputs: [["Информационни", "потоци"], ["Стимули и", "ограничения"]],
    list: [
      "Цели — предназначението на системата и измеримите резултати",
      "Архитектура и роли — участници, компоненти и компетентности",
      "Правила и точки за решения — формални и неформални правила и процедури",
      "Действия и продукти — какво системата произвежда",
      "Резултати и ефективност — измерени спрямо критериите",
      "Обратна връзка и контрол — коригира целите, архитектурата и правилата",
    ],
    inputsList: ["Информационни потоци захранват решенията", "Стимули и ограничения насочват действията"],
  },
  en: {
    env: "Environment",
    input: "input",
    nodes: [
      ["Goals"],
      ["Architecture", "and roles"],
      ["Rules and", "decision points"],
      ["Actions", "and outputs"],
      ["Outcomes and", "performance"],
      ["Feedback", "and control"],
    ],
    inputs: [["Information", "flows"], ["Incentives and", "constraints"]],
    list: [
      "Goals — the purpose of the system and its measurable outcomes",
      "Architecture and roles — actors, components and competences",
      "Rules and decision points — formal and informal rules and procedures",
      "Actions and outputs — what the system produces",
      "Outcomes and performance — measured against the criteria",
      "Feedback and control — corrects goals, architecture and rules",
    ],
    inputsList: ["Information flows feed the decisions", "Incentives and constraints steer the actions"],
  },
} as const;

export function SystemLoop({ locale, title, desc, caption }: { locale: Locale; title: string; desc: string; caption?: string }) {
  const L = labels[locale];
  const id = "sysloop";
  const W = 156;
  const H = 56;
  // Node origins (viewBox 600 × 460)
  const n1 = { x: 60, y: 48 };
  const n2 = { x: 384, y: 48 };
  const n3 = { x: 414, y: 202 };
  const n4 = { x: 384, y: 356 };
  const n5 = { x: 60, y: 356 };
  const n6 = { x: 30, y: 202 };
  const m1 = { x: 222, y: 140 };
  const m2 = { x: 222, y: 264 };

  return (
    <>
      <Figure title={title} desc={desc} caption={caption} className="hidden sm:block">
        <svg viewBox="0 0 600 460" className="h-auto w-full" aria-hidden="true">
          <ArrowDefs id={id} tone="ink" />
          {/* Environment boundary */}
          <rect x="12.5" y="12.5" width="575" height="435" fill="none" stroke="var(--color-line-strong)" strokeDasharray="3 5" />
          <text x="24" y="30" fontSize="9.5" letterSpacing="0.06em" className="font-mono" fill="var(--color-ink-3)">
            {L.env.toUpperCase()}
          </text>

          {/* Ring edges */}
          <Edge id={id} tone="ink" d={`M${n1.x + W},${n1.y + H / 2} H${n2.x - 2}`} />
          <Edge id={id} tone="ink" d={`M${n2.x + W / 2},${n2.y + H} V${(n2.y + H + n3.y) / 2} H${n3.x + W / 2} V${n3.y - 2}`} />
          <Edge id={id} tone="ink" d={`M${n3.x + W / 2},${n3.y + H} V${(n3.y + H + n4.y) / 2} H${n4.x + W / 2} V${n4.y - 2}`} />
          <Edge id={id} tone="ink" d={`M${n4.x},${n4.y + H / 2} H${n5.x + W + 2}`} />
          <Edge id={id} tone="ink" d={`M${n5.x + W / 2},${n5.y} V${(n6.y + H + n5.y) / 2} H${n6.x + W / 2} V${n6.y + H + 2}`} />
          {/* Feedback closes the loop — amber, dashed, drawn in */}
          <Edge id={id} tone="ink" amber dashed draw d={`M${n6.x + W / 2},${n6.y} V${(n1.y + H + n6.y) / 2} H${n1.x + W / 2} V${n1.y + H + 2}`} />
          {/* Inputs */}
          <Edge id={id} tone="ink" d={`M${m1.x + W},${m1.y + H / 2} H${(m1.x + W + n3.x) / 2} V${n3.y + H / 2} H${n3.x - 2}`} />
          <Edge id={id} tone="ink" d={`M${m2.x + W},${m2.y + H / 2} H${n4.x + 36} V${n4.y - 2}`} />

          {/* Nodes */}
          <Node x={n1.x} y={n1.y} code="01" lines={[...L.nodes[0]]} tone="ink" />
          <Node x={n2.x} y={n2.y} code="02" lines={[...L.nodes[1]]} tone="ink" />
          <Node x={n3.x} y={n3.y} code="03" lines={[...L.nodes[2]]} tone="ink" />
          <Node x={n4.x} y={n4.y} code="04" lines={[...L.nodes[3]]} tone="ink" />
          <Node x={n5.x} y={n5.y} code="05" lines={[...L.nodes[4]]} tone="ink" />
          <Node x={n6.x} y={n6.y} code="06" lines={[...L.nodes[5]]} tone="ink" emphasis />
          <Node x={m1.x} y={m1.y} code={L.input} lines={[...L.inputs[0]]} tone="ink" />
          <Node x={m2.x} y={m2.y} code={L.input} lines={[...L.inputs[1]]} tone="ink" />
        </svg>
      </Figure>

      {/* Mobile: the same content as a list */}
      <div className="border border-line p-4 sm:hidden">
        <p className="label">{L.env}</p>
        <ol className="mt-3 space-y-2.5 text-small text-ink-2">
          {L.list.map((item, i) => (
            <li key={item} className="flex gap-3">
              <span className="label mt-1 w-5 shrink-0 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <ul className="rule mt-4 space-y-2 pt-3 text-small text-ink-2">
          {L.inputsList.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="label mt-1 w-5 shrink-0 text-ink-3">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {caption ? <p className="mt-3 text-meta text-ink-3">{caption}</p> : null}
      </div>
    </>
  );
}
