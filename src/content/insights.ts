import type { Insight } from "./types";

/* Concept notes derived from the Center's founding documents. They restate
   the Center's own working framework; they are not research findings,
   publications or peer-reviewed outputs. */

export const insights: Insight[] = [
  {
    slug: "why-social-systems-behave-like-algorithms",
    type: "concept-note",
    title: {
      bg: "Защо социалните системи се държат като алгоритми",
      en: "Why social systems behave like algorithms",
    },
    summary: {
      bg: "Публичните институции, регулаторните режими, пазарите и организациите не действат произволно. Те работят чрез повтарящи се последователности – събиране на информация, класифициране, решение, прилагане, реакция, обратна връзка – и затова могат да се разглеждат като архитектура от взаимодействащи формални и неформални алгоритми.",
      en: "Public institutions, regulatory regimes, markets and organizations do not act at random. They work through recurring sequences — gathering information, classifying, deciding, applying, reacting, feeding back — and can therefore be seen as an architecture of interacting formal and informal algorithms.",
    },
    body: {
      bg: [
        "Социалните системи не са естествено възникнали механизми. Публичните институции, регулаторните режими, предприятията, пазарите, административните процеси и организираните форми на колективно поведение са създадени от човека системи, предназначени да постигат определени човешки цели.",
        "## Повтарящи се последователности",
        "Тези системи действат чрез повтарящи се последователности на:",
        "- събиране на информация;",
        "- класифициране и интерпретиране;",
        "- вземане на решения;",
        "- разпределяне на правомощия и ресурси;",
        "- прилагане на правила;",
        "- взаимодействие между институционални участници;",
        "- икономически и поведенчески реакции;",
        "- наблюдение и обратна връзка;",
        "- корекция или липса на корекция.",
        "Тези последователности имат по същество алгоритмична структура. Те преобразуват входни елементи – информация, капитал, труд, законодателство, стимули и потребителско търсене – в решения, действия и измерими икономически или обществени резултати.",
        "## Същите категории дефекти",
        "Както при техническите и изчислителните системи, дефектите във функционирането могат да произтичат от неправилно определени или противоречащи си цели, дефектна архитектура, непълни или закъснели входни данни, несъгласувани правила за вземане на решения, неправилно разпределени отговорности, несъвместими стимули, недостатъци в координацията, липсващи механизми за обратна връзка, прекомерна процедурна сложност, непредвидени резултати и неспособност за реакция при промени във външната среда.",
        "## Какво следва от това",
        "Ако една социално-институционална система може да бъде представена като архитектура от алгоритми, тя може да бъде картографирана, измервана, изпитвана спрямо целите, за които е създадена, и препроектирана – по аналогия със сложна инженерна система. Това е изходната постановка на научната програма на Центъра „Алгоритмизация на социалните процеси“ и на неговата оперативна методология ASAESIS.",
      ],
      en: [
        "Social systems are not naturally occurring mechanisms. Public institutions, regulatory regimes, enterprises, markets, administrative processes and organized forms of collective behaviour are human-designed systems intended to achieve particular human goals.",
        "## Recurring sequences",
        "These systems operate through recurring sequences of:",
        "- gathering information;",
        "- classifying and interpreting;",
        "- making decisions;",
        "- allocating authority and resources;",
        "- applying rules;",
        "- interaction between institutional actors;",
        "- economic and behavioural responses;",
        "- monitoring and feedback;",
        "- correction, or the absence of correction.",
        "These sequences have an essentially algorithmic structure. They transform inputs — information, capital, labour, legislation, incentives and consumer demand — into decisions, actions and measurable economic or social results.",
        "## The same categories of defect",
        "As with technical and computational systems, malfunctions can stem from ill-defined or contradictory goals, defective architecture, incomplete or delayed inputs, uncoordinated decision rules, misallocated responsibilities, incompatible incentives, weak communication and coordination, missing feedback mechanisms, excessive procedural complexity, unintended results and an inability to respond to changes in the environment.",
        "## What follows",
        "If a social-institutional system can be represented as an architecture of algorithms, it can be mapped, measured, tested against the goals it was created for, and redesigned — by analogy with a complex engineered system. This is the starting premise of the Center's research programme, Algorithmization of Social Processes, and of its operational methodology, ASAESIS.",
      ],
    },
    topics: {
      bg: ["Алгоритмизация на социалните процеси", "Системна архитектура", "Институционален дизайн"],
      en: ["Algorithmization of social processes", "Systems architecture", "Institutional design"],
    },
    relatedProjects: ["wine-sector-system-architecture"],
    source: {
      bg: "По стратегическия план на Центъра и научната рамка на предложението за първи приложен проект.",
      en: "Based on the Center's strategic plan and the scientific framework of the first applied-project proposal.",
    },
  },
  {
    slug: "asaesis-from-framework-to-method",
    type: "concept-note",
    title: {
      bg: "ASAESIS: от теоретична рамка към възпроизводим метод",
      en: "ASAESIS: from theoretical framework to reproducible method",
    },
    summary: {
      bg: "Алгоритмизацията на социалните процеси обяснява алгоритмичния характер на създадените от човека системи. ASAESIS – Алгоритмичен системен анализ и инженеринг на социално-институционални системи – превръща това обяснение във възпроизводима последователност от изследователски и инженерни стъпки.",
      en: "The algorithmization of social processes explains the algorithmic character of human-designed systems. ASAESIS — Algorithmic Systems Analysis and Engineering of Social-Institutional Systems — turns that explanation into a reproducible sequence of research and engineering steps.",
    },
    body: {
      bg: [
        "Една теоретична рамка е полезна дотолкова, доколкото може да бъде приложена по един и същ начин към различни системи и да даде сравними резултати. Затова Центърът отделя теорията – алгоритмизацията на социалните процеси – от метода – ASAESIS.",
        "## Какво прави методът",
        "ASAESIS разглежда една система като адаптивна алгоритмична архитектура от взаимосвързани подсистеми – производствени, пазарни, регулаторни, институционални, финансови, информационни и поведенчески – и преминава през ясно определени етапи: от дефинирането на целите и границите, през картографирането на архитектурата и алгоритмите, оценката на данните и измерването на резултатите, до анализа на отказите, моделирането на алтернативи, интегрираното препроектиране и адаптивното изпълнение.",
        "## Защо етапите имат значение",
        "Повечето съществуващи анализи разглеждат проблема секторно: земеделието анализира производството, туризмът – туристическия продукт, маркетингът – рекламата, икономистите – цените, администрацията – процедурите. Всеки от тези анализи може да бъде правилен сам по себе си, но оптимизирането на отделен компонент не гарантира оптимално функциониране на цялата система.",
        "Възпроизводимата последователност принуждава анализа да премине през цялата система, преди да предложи интервенция, и прави всяка препоръка проследима до конкретен установен дефект.",
        "## Стандартната методология на Центъра",
        "Публичната методология на Центъра следва десет етапа – от дефинирането на целите до непрекъснатото наблюдение и адаптация. Приложните проекти могат да я детайлизират според своята област, но не заобикалят нейната логика.",
      ],
      en: [
        "A theoretical framework is useful to the extent that it can be applied in the same way to different systems and yield comparable results. That is why the Center separates the theory — the algorithmization of social processes — from the method — ASAESIS.",
        "## What the method does",
        "ASAESIS treats a system as an adaptive algorithmic architecture of interconnected subsystems — production, market, regulatory, institutional, financial, information and behavioural — and moves through clearly defined stages: from defining goals and boundaries, through mapping the architecture and algorithms, assessing data and measuring results, to analysing failures, modelling alternatives, integrated redesign and adaptive implementation.",
        "## Why the stages matter",
        "Most existing analyses look at a problem sector by sector: agriculture analyses production, tourism the tourist product, marketing the advertising, economists the prices, administration the procedures. Each of these analyses may be correct on its own, but optimizing a single component does not guarantee that the whole system performs well.",
        "A reproducible sequence forces the analysis to traverse the entire system before proposing an intervention, and makes every recommendation traceable to a specific identified defect.",
        "## The Center's standard methodology",
        "The Center's public methodology follows ten stages — from defining goals to continuous monitoring and adaptation. Applied projects may detail it for their domain, but they do not bypass its logic.",
      ],
    },
    topics: {
      bg: ["ASAESIS", "Методология", "Системно инженерство"],
      en: ["ASAESIS", "Methodology", "Systems engineering"],
    },
    relatedProjects: ["wine-sector-system-architecture", "bulgarian-wine-bulgarian-tourism"],
    source: {
      bg: "По предложението за първи приложен научноизследователски проект и концепцията за пилотен проект.",
      en: "Based on the first applied research project proposal and the pilot project concept.",
    },
  },
  {
    slug: "testing-instead-of-assuming",
    type: "concept-note",
    title: {
      bg: "Проверка вместо предположение",
      en: "Testing instead of assuming",
    },
    summary: {
      bg: "Експертната препоръка сама по себе си не е доказателство, че системата ще функционира по-добре. Предложеният модел трябва да бъде проверен в реална среда – с базово измерване преди внедряването и същите показатели след него.",
      en: "An expert recommendation is not, by itself, evidence that a system will work better. The proposed model has to be tested in a real setting — with a baseline measured before implementation and the same indicators measured afterwards.",
    },
    body: {
      bg: [
        "Основна характеристика на методологията на Центъра е, че експертната препоръка сама по себе си не се приема за доказателство, че системата ще функционира по-добре.",
        "## Затворен цикъл",
        "Затова след основния анализ следва пилотна фаза. Преди внедряването се измерва базово състояние. След внедряването се измерват същите показатели. Методът следва затворен цикъл:",
        "- Проектиране",
        "- Внедряване",
        "- Измерване",
        "- Изпитване",
        "- Адаптиране",
        "Резултатът не е статична стратегия, а адаптивен модел, който може да бъде коригиран според измереното реално поведение на системата.",
        "## Какво означава това за проектите",
        "Първите приложни проекти на Центъра трябва да търсят видими и сравнително бързи резултати, а не само дългосрочни структурни ефекти. Приоритет получават решения, които могат да бъдат внедрени практически, създават измерим резултат, могат да бъдат пилотно проверени, използват по-добре съществуващи ресурси и намаляват системни и административни загуби. Това не изключва по-дълбоки реформи, когато анализът покаже, че именно те са необходимата предпоставка за устойчив резултат.",
        "## Очаквано не означава постигнато",
        "Същият принцип определя и начина, по който Центърът описва работата си публично: концепции, планирани дейности, активни пилоти, очаквани резултати и измерени резултати се разграничават ясно. Очакването никога не се представя като постижение.",
      ],
      en: [
        "A defining feature of the Center's methodology is that an expert recommendation is not, in itself, accepted as proof that the system will work better.",
        "## A closed loop",
        "That is why the main analysis is followed by a pilot phase. A baseline is measured before implementation. The same indicators are measured afterwards. The method follows a closed loop:",
        "- Design",
        "- Implement",
        "- Measure",
        "- Test",
        "- Adapt",
        "The result is not a static strategy but an adaptive model that can be corrected against the system's measured real behaviour.",
        "## What this means for projects",
        "The Center's first applied projects should seek visible and relatively quick results, not only long-term structural effects. Priority goes to solutions that can be implemented in practice, create a measurable result, can be piloted, make better use of existing resources and reduce systemic and administrative losses. This does not exclude deeper reforms where the analysis shows they are the necessary precondition for a sustainable result.",
        "## Expected is not achieved",
        "The same principle governs how the Center describes its work publicly: concepts, planned activities, active pilots, expected outcomes and measured results are kept clearly distinct. An expectation is never presented as an achievement.",
      ],
    },
    topics: {
      bg: ["Валидиране", "Пилотни проекти", "Измерване"],
      en: ["Validation", "Pilot projects", "Measurement"],
    },
    relatedProjects: ["bulgarian-wine-bulgarian-tourism"],
    source: {
      bg: "По концепцията за пилотен проект „Българско вино × Български туризъм“, раздел „Проверка вместо предположение“.",
      en: "Based on the pilot project concept \"Bulgarian Wine × Bulgarian Tourism\", section \"Testing instead of assuming\".",
    },
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
