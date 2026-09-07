import type { Project } from "./types";

/* Sources: „Българско вино × Български туризъм“ (project teaser) and
   „Wine mandate CST BG“ (proposal letter). Budgets, person-days and named
   addressees are internal negotiation details and are not published. */

export const projects: Project[] = [
  {
    slug: "bulgarian-wine-bulgarian-tourism",
    featured: true,
    status: "pilot-concept",
    type: { bg: "Приложен пилотен проект", en: "Applied pilot project" },
    domain: { bg: "Лозаро-винарски сектор × туризъм", en: "Wine sector × tourism" },
    methodologyName: "ASAESIS",
    title: { bg: "Българско вино × Български туризъм", en: "Bulgarian Wine × Bulgarian Tourism" },
    standfirst: {
      bg: "Системен модел за повишаване на пазарната реализация на българското вино чрез по-ефективна интеграция с туристическата индустрия.",
      en: "A system model for increasing the market realisation of Bulgarian wine through more effective integration with the tourism industry.",
    },
    summary: {
      bg: "България има едновременно значителен лозаро-винарски потенциал и развита туристическа индустрия, но туристическият поток не се превръща достатъчно ефективно в продажби, пазарен дял и разпознаваемост на българското вино. Пилотната концепция разглежда това като системен проблем и го анализира с методологията ASAESIS.",
      en: "Bulgaria has both significant wine-growing potential and a developed tourism industry, yet tourist flows do not translate effectively into sales, market share and recognition for Bulgarian wine. The pilot concept treats this as a system problem and analyses it with the ASAESIS methodology.",
    },
    systemProblem: {
      bg: [
        "България разполага едновременно със значителен лозаро-винарски производствен потенциал и с развита туристическа индустрия, която ежегодно създава голям поток от български и чуждестранни потребители на хотелски, ресторантьорски, развлекателни и културни услуги.",
        "Въпреки тази естествена взаимодопълняемост туристическият поток не се трансформира достатъчно ефективно в резултати за българското вино.",
        "Проблемът не може да бъде обяснен само с цената на виното, поведението на производителите, политиката на хотелите и ресторантите, вноса или действията на държавата. Той е системен – произтича от начина, по който функционират и взаимодействат производители, дистрибутори, туристически предприятия, потребители, браншови организации, публична администрация, регулации, финансови инструменти, информационни потоци и икономически стимули.",
      ],
      en: [
        "Bulgaria has both significant wine-production potential and a developed tourism industry that generates a large annual flow of Bulgarian and foreign consumers of hotel, restaurant, leisure and cultural services.",
        "Despite this natural complementarity, tourist flows do not translate effectively into results for Bulgarian wine.",
        "The problem cannot be explained by wine prices, producer behaviour, hotel and restaurant policy, imports or state action alone. It is systemic — it arises from how producers, distributors, tourism businesses, consumers, branch organizations, public administration, regulation, financial instruments, information flows and economic incentives operate and interact.",
      ],
    },
    symptoms: {
      bg: [
        "Недостатъчни продажби на български вина в туристическото потребление",
        "Неустойчив пазарен дял",
        "Ниска добавена стойност за лозари, производители и туристически оператори",
        "Слаба разпознаваемост на българските сортове, региони и производители",
        "Недоразвит винен, културен и регионален туризъм",
        "Малко последващо потребление след приключване на туристическото посещение",
      ],
      en: [
        "Insufficient sales of Bulgarian wine within tourist consumption",
        "Unstable market share",
        "Low added value for growers, producers and tourism operators",
        "Weak recognition of Bulgarian varieties, regions and producers",
        "Underdeveloped wine, cultural and regional tourism",
        "Little follow-on consumption after the tourist visit ends",
      ],
    },
    question: {
      bg: "Как следва да бъде усъвършенствана или препроектирана съществуващата институционална, регулаторна, икономическа и функционална архитектура, така че българската туристическа индустрия да се превърне в значително по-ефективен канал за конкурентна пазарна реализация, представяне и дългосрочно позициониране на българското вино?",
      en: "How should the existing institutional, regulatory, economic and functional architecture be improved or redesigned so that the Bulgarian tourism industry becomes a significantly more effective channel for the competitive market realisation, presentation and long-term positioning of Bulgarian wine?",
    },
    objective: {
      bg: [
        "Целта не е административно привилегироване на определен продукт или ограничаване на законната конкуренция. Целта е да се установи какво в съществуващата система пречи на по-ефективната връзка между българското вино и българския туризъм и как тази система може да бъде подобрена.",
      ],
      en: [
        "The aim is not to administratively privilege a product or to restrict lawful competition. It is to establish what in the existing system prevents a more effective link between Bulgarian wine and Bulgarian tourism, and how that system can be improved.",
      ],
    },
    scope: {
      intro: {
        bg: "Пилотният проект не е цялостна стратегия за реформа на лозаро-винарския сектор. Той е концентриран върху една конкретна пазарна верига и върху институционалната, административната, регулаторната и икономическата среда, която определя нейното функциониране.",
        en: "The pilot is not a comprehensive reform strategy for the wine sector. It concentrates on one specific market chain and on the institutional, administrative, regulatory and economic environment that determines how it functions.",
      },
      chain: {
        bg: ["Производител", "Дистрибуция", "Туристически бизнес / HoReCa", "Турист / потребител", "Покупка", "Потребителско преживяване", "Последващо потребление"],
        en: ["Producer", "Distribution", "Tourism business / HoReCa", "Tourist / consumer", "Purchase", "Consumer experience", "Follow-on consumption"],
      },
      items: {
        bg: [
          "Отношенията между производители, дистрибутори и туристически предприятия",
          "Механизмите за избор на доставчици и формиране на асортимент",
          "Винените листи, представянето и препоръчването на продукти",
          "Ценовите и търговските стимули",
          "Логистичните и договорните ограничения",
          "Знанията и мотивацията на персонала",
          "Потребителската информация и поведение",
          "Възможностите за свързване на туристическото преживяване с българско вино",
          "Виненият, кулинарният, културният и регионалният туризъм",
          "Взаимодействието между компетентните органи в областта на земеделието и туризма",
          "Ролята и функционалността на браншовите организации",
          "Съществуващата нормативна, административна и финансова рамка",
        ],
        en: [
          "Relationships between producers, distributors and tourism businesses",
          "Supplier-selection and assortment-formation mechanisms",
          "Wine lists, product presentation and recommendation",
          "Price and trade incentives",
          "Logistical and contractual constraints",
          "Staff knowledge and motivation",
          "Consumer information and behaviour",
          "Ways of linking the tourist experience to Bulgarian wine",
          "Wine, culinary, cultural and regional tourism",
          "Interaction between the competent authorities for agriculture and tourism",
          "The role and functioning of branch organizations",
          "The existing regulatory, administrative and financial framework",
        ],
      },
      note: {
        bg: "Това ограничаване на обхвата е необходимо, за да може първият проект на Центъра да произведе практически изпълним и измерим резултат в разумен срок.",
        en: "This scoping is necessary so that the Center's first project can produce a practically implementable and measurable result within a reasonable timeframe.",
      },
    },
    methodology: {
      intro: {
        bg: "Изходната постановка е, че разглежданата екосистема е създадена от човека, целево ориентирана система, която функционира чрез множество взаимосвързани формални и неформални алгоритми. Основният въпрос не е „какво още може да се направи“, а „в коя част от действащия алгоритъм системата престава да произвежда желания резултат и как трябва да бъде променена архитектурата ѝ“.",
        en: "The starting premise is that the ecosystem under study is a human-designed, goal-oriented system operating through many interconnected formal and informal algorithms. The core question is not \"what else can be done\" but \"where in the operating algorithm does the system stop producing the desired result, and how should its architecture be changed\".",
      },
      stages: [
        {
          code: "01",
          short: { bg: "Цели", en: "Goals" },
          title: { bg: "Определяне на целите", en: "Defining the goals" },
          body: {
            bg: "Формулиране на измерими системни цели: дял на българското вино в туристическото потребление, стойност на продажбите, добавена стойност, представяне на местни сортове и региони, последващи покупки, развитие на винения и гастрономическия туризъм.",
            en: "Formulating measurable system goals: the share of Bulgarian wine in tourist consumption, sales value, added value, presentation of local varieties and regions, follow-on purchases, development of wine and gastronomic tourism.",
          },
        },
        {
          code: "02",
          short: { bg: "Архитектура", en: "Architecture" },
          title: { bg: "Картографиране на съществуващата архитектура", en: "Mapping the existing architecture" },
          body: {
            bg: "Институции, нормативни компетентности, бизнес участници, договорни отношения, информационни потоци, механизми за снабдяване, формиране на асортимент, ценообразуване, икономически стимули, административни процедури и потребителски решения.",
            en: "Institutions, regulatory competences, business actors, contractual relationships, information flows, supply mechanisms, assortment formation, pricing, economic incentives, administrative procedures and consumer decisions.",
          },
        },
        {
          code: "03",
          short: { bg: "Алгоритми", en: "Algorithms" },
          title: { bg: "Реконструкция на действащите алгоритми", en: "Reconstructing the operating algorithms" },
          body: {
            bg: "Проследяване на реалните последователности, чрез които системата превръща ресурси в пазарен резултат: прекъснати връзки, ненужно сложни процедури, дублиращи се компетентности, липсващи функции, противоречиви стимули, информационни дефицити и тесни места.",
            en: "Tracing the actual sequences through which the system turns resources into market results: broken links, unnecessarily complex procedures, duplicated competences, missing functions, contradictory incentives, information deficits and bottlenecks.",
          },
        },
        {
          code: "04",
          short: { bg: "Измерване", en: "Measurement" },
          title: { bg: "Измерване и диагностика", en: "Measurement and diagnosis" },
          body: {
            bg: "Оценка по показатели за ефективност, ефикасност, разход, скорост, пазарен резултат, добавена стойност, надеждност, адаптивност, административна тежест, качество на координацията и потребителски резултат.",
            en: "Assessment against indicators of effectiveness, efficiency, cost, speed, market result, added value, reliability, adaptability, administrative burden, quality of coordination and consumer outcome.",
          },
        },
        {
          code: "05",
          short: { bg: "Дефекти", en: "Defects" },
          title: { bg: "Анализ на институционални и регулаторни дефекти", en: "Analysis of institutional and regulatory defects" },
          body: {
            bg: "Без предварителното допускане, че съществуващата рамка е оптимална: дали натрупването на нормативни актове, процедури, разпокъсани компетентности, несъгласувани политики, отчетни изисквания, режими на подпомагане и несвързани информационни системи е довело до еклектична архитектура и неефективно използване на ресурсите. Всяка препоръка се проверява за съответствие с правото на ЕС, конкуренцията, държавните помощи, пропорционалността и свободната пазарна икономика.",
            en: "Without assuming that the existing framework is optimal: whether the accumulation of legal acts, procedures, fragmented competences, uncoordinated policies, reporting requirements, support schemes and disconnected information systems has produced an eclectic architecture and inefficient use of resources. Every recommendation is checked for compliance with EU law, competition, state-aid rules, proportionality and the free-market economy.",
          },
        },
      ],
    },
    dataEvidence: {
      bg: [
        "Основната системна фаза стъпва предимно върху налични официални данни, секторна статистика, съществуващи изследвания, нормативна документация, данни на браншови организации, структурирани интервюта с ключови участници и ограничено целево събиране на допълнителна информация.",
        "Разширен вариант може да добави самостоятелно национално събиране на първични данни от хотели, ресторанти, туристически комплекси, туроператори, винопроизводители, дистрибутори, специализирана търговия, винени туристически обекти и регионални туристически организации, както и ограничено потребителско изследване.",
      ],
      en: [
        "The core system phase relies mainly on available official data, sector statistics, existing studies, regulatory documentation, branch-organization data, structured interviews with key actors and limited targeted collection of additional information.",
        "An extended variant may add independent national collection of primary data from hotels, restaurants, resorts, tour operators, wine producers, distributors, specialized retail, wine-tourism sites and regional tourism organizations, plus a limited consumer survey.",
      ],
    },
    stakeholders: {
      intro: {
        bg: "Проектът анализира интересите, компетентностите, стимулите и ограниченията на участниците във веригата. Изброените групи са предмет на анализ, а не потвърдени партньори.",
        en: "The project analyses the interests, competences, incentives and constraints of the actors in the chain. The groups listed are subjects of analysis, not confirmed partners.",
      },
      groups: {
        bg: ["Производители и дистрибутори", "Хотели, ресторанти и туристически предприятия", "Туроператори и регионални туристически организации", "Потребители – български и чуждестранни туристи", "Браншови и производителски организации", "Компетентни органи в областта на земеделието и туризма", "Общини и структури за регионално развитие", "Финансови институции"],
        en: ["Producers and distributors", "Hotels, restaurants and tourism businesses", "Tour operators and regional tourism organizations", "Consumers — Bulgarian and foreign tourists", "Branch and producer organizations", "Competent authorities for agriculture and tourism", "Municipalities and regional-development structures", "Financial institutions"],
      },
    },
    targetArchitecture: {
      intro: {
        bg: "Резултатът от анализа се използва за създаване на целева системна архитектура – модел на по-ефективно взаимодействие по цялата верига. Конкретните решения не се предпоставят; те произтичат от системния анализ и доказателствата.",
        en: "The analysis feeds a target system architecture — a model of more effective interaction along the whole chain. Specific solutions are not presupposed; they follow from the systems analysis and the evidence.",
      },
      relation: {
        bg: ["Публична власт", "Производители", "Браншови организации", "Дистрибуция", "Туристически бизнес", "Потребител"],
        en: ["Public authorities", "Producers", "Branch organizations", "Distribution", "Tourism business", "Consumer"],
      },
      components: {
        bg: ["Институционални промени", "Нормативни промени", "Административно опростяване", "Икономически стимули", "Доброволни индустриални стандарти", "Нови договорни и дистрибуционни модели", "Информационни решения", "Обучение", "Маркетингови механизми", "Поведенчески интервенции", "Цифрови инструменти", "Механизми за координация между земеделие и туризъм"],
        en: ["Institutional changes", "Regulatory changes", "Administrative simplification", "Economic incentives", "Voluntary industry standards", "New contractual and distribution models", "Information solutions", "Training", "Marketing mechanisms", "Behavioural interventions", "Digital tools", "Coordination mechanisms between agriculture and tourism"],
      },
    },
    outputs: {
      intro: {
        bg: "Крайният продукт не е само аналитичен доклад. Предвидените резултати са:",
        en: "The end product is not just an analytical report. The intended deliverables are:",
      },
      items: [
        { title: { bg: "Системна карта", en: "System Map" }, body: { bg: "Карта на действителната институционална, регулаторна и пазарна архитектура.", en: "A map of the actual institutional, regulatory and market architecture." } },
        { title: { bg: "Карта на алгоритмите и процесите", en: "Algorithm & Process Map" }, body: { bg: "Описание на ключовите процеси и алгоритми, чрез които се вземат решения и се формира пазарният резултат.", en: "A description of the key processes and algorithms through which decisions are made and the market result is formed." } },
        { title: { bg: "Карта на дефектите", en: "Failure Map" }, body: { bg: "Идентифициране на системните, институционалните, административните, икономическите и поведенческите дефекти.", en: "Identification of systemic, institutional, administrative, economic and behavioural defects." } },
        { title: { bg: "Целева архитектура", en: "Target Architecture" }, body: { bg: "Проект на подобрена институционална и функционална архитектура.", en: "A design for an improved institutional and functional architecture." } },
        { title: { bg: "Пакет от политики и интервенции", en: "Policy & Intervention Package" }, body: { bg: "Пакет от възможни законодателни, регулаторни, институционални, административни, икономически, маркетингови, образователни и поведенчески мерки.", en: "A package of possible legislative, regulatory, institutional, administrative, economic, marketing, educational and behavioural measures." } },
        { title: { bg: "Пътна карта за изпълнение", en: "Implementation Roadmap" }, body: { bg: "Кой следва да направи какво, в каква последователност, с какъв ресурс и в какъв срок.", en: "Who should do what, in what sequence, with what resources and by when." } },
        { title: { bg: "Рамка от показатели", en: "KPI Framework" }, body: { bg: "Измерими показатели за оценка на реалния резултат.", en: "Measurable indicators for assessing the real result." } },
        { title: { bg: "Дизайн на пилотното изпитване", en: "Pilot Test Design" }, body: { bg: "Проект за пилотно внедряване на избрани решения в реална туристическа среда.", en: "A design for piloting selected solutions in a real tourism setting." } },
      ],
    },
    validation: {
      intro: {
        bg: "Експертната препоръка сама по себе си не се приема за доказателство, че системата ще функционира по-добре. Предложеният модел трябва да бъде проверен в реална среда: преди внедряването се измерва базово състояние, след внедряването – същите показатели. Резултатът не е статична стратегия, а адаптивен модел, коригиран според измереното реално поведение на системата.",
        en: "An expert recommendation is not in itself accepted as proof that the system will work better. The proposed model must be tested in a real setting: a baseline is measured before implementation and the same indicators afterwards. The result is not a static strategy but an adaptive model corrected against the system's measured behaviour.",
      },
      loop: {
        bg: ["Проектиране", "Внедряване", "Измерване", "Изпитване", "Адаптиране"],
        en: ["Design", "Implement", "Measure", "Test", "Adapt"],
      },
      indicators: {
        bg: ["Обем продажби", "Пазарен дял на български вина", "Средна стойност на покупката", "Търговски марж", "Честота на препоръчване", "Потребителски избор", "Разпознаваемост", "Удовлетвореност", "Повторни покупки"],
        en: ["Sales volume", "Market share of Bulgarian wines", "Average purchase value", "Trade margin", "Recommendation frequency", "Consumer choice", "Recognition", "Satisfaction", "Repeat purchases"],
      },
    },
    successCriteria: {
      bg: ["Могат да бъдат внедрени практически", "Създават измерим икономически резултат", "Могат да бъдат пилотно проверени", "Използват по-добре съществуващи ресурси", "Намаляват системни и административни загуби", "Подобряват стимулите за бизнеса", "Могат да дадат първи резултати в рамките на един туристически сезон"],
      en: ["Can be implemented in practice", "Create a measurable economic result", "Can be tested in a pilot", "Make better use of existing resources", "Reduce systemic and administrative losses", "Improve incentives for business", "Can show first results within one tourist season"],
    },
    variants: [
      {
        title: { bg: "Вариант А – Основна системна фаза", en: "Variant A — Core system phase" },
        body: {
          bg: "Бърза, но достатъчно задълбочена системна диагностика, основана преимуществено на налични данни, съществуващи изследвания, нормативна документация и структурирани интервюта.",
          en: "A rapid but sufficiently deep systems diagnosis based mainly on available data, existing studies, regulatory documentation and structured interviews.",
        },
        duration: { bg: "Предполагаем срок: 6–8 седмици", en: "Indicative duration: 6–8 weeks" },
      },
      {
        title: { bg: "Вариант Б – Разширено национално изследване", en: "Variant B — Extended national study" },
        body: {
          bg: "Всички дейности по Вариант А плюс структурирано национално събиране на първични данни от реалния бизнес – за да се измери количествено как системата действително функционира в различни категории туристически и винени предприятия.",
          en: "All Variant A activities plus structured national collection of primary data from real businesses — to measure quantitatively how the system actually functions across categories of tourism and wine enterprises.",
        },
        duration: { bg: "Предполагаем срок: 10–14 седмици", en: "Indicative duration: 10–14 weeks" },
      },
    ],
    followUp: {
      bg: [
        "И при двата варианта се препоръчва след анализа да бъде възложена отделна фаза за пилотно внедряване и валидиране – в един туристически регион, група хотели, хотелска верига, ресторантьорска мрежа или комбинация от винопроизводители и туристически предприятия.",
      ],
      en: [
        "Under both variants a separate pilot implementation and validation phase is recommended after the analysis — in one tourism region, a group of hotels, a hotel chain, a restaurant network or a combination of wine producers and tourism businesses.",
      ],
    },
    proposedTo: {
      bg: "Концепцията е предложена за възлагане на бъдещ консултативен съвет с участието на компетентните органи в областта на земеделието и туризма и представителните браншови организации. Възлагане не е потвърдено.",
      en: "The concept is proposed for commissioning by a future advisory council including the competent authorities for agriculture and tourism and the representative branch organizations. No commissioning has been confirmed.",
    },
    statusNote: {
      bg: "Пилотна концепция. Проектът не е възложен и не е финансиран; не са произведени резултати. Всички описани продукти и показатели са предвидени, не постигнати.",
      en: "Pilot concept. The project has not been commissioned or funded; no results have been produced. All deliverables and indicators described are intended, not achieved.",
    },
    sourceNote: {
      bg: "По документа „Концепция за пилотен приложен проект – Българско вино × Български туризъм“ на Центъра.",
      en: "Based on the Center's document \"Pilot applied project concept — Bulgarian Wine × Bulgarian Tourism\".",
    },
    related: ["wine-sector-system-architecture"],
    relatedInsights: ["testing-instead-of-assuming", "asaesis-from-framework-to-method"],
  },
  {
    slug: "wine-sector-system-architecture",
    status: "proposed-mandate",
    type: { bg: "Приложно научноизследователско изследване", en: "Applied research study" },
    domain: { bg: "Лозаро-винарски сектор", en: "Wine sector" },
    methodologyName: "ASAESIS",
    title: {
      bg: "Системна архитектура и стратегическа трансформация на българския лозаро-винарски сектор",
      en: "System architecture and strategic transformation of the Bulgarian wine sector",
    },
    standfirst: {
      bg: "Предложение за първия приложен научноизследователски проект на Центъра: секторът като сложна социално-институционална система.",
      en: "Proposal for the Center's first applied research project: the sector as a complex social-institutional system.",
    },
    summary: {
      bg: "Предложен мандат за анализ на българския лозаро-винарски сектор като сложна социално-институционална система – реконструкция на реалните алгоритми, по които функционира, сравнение на резултатите с целите, на които следва да служи, и интегрирана програма от законосъобразни и пропорционални мерки.",
      en: "A proposed mandate to analyse the Bulgarian wine sector as a complex social-institutional system — reconstructing the actual algorithms by which it operates, comparing its results with the goals it should serve, and developing an integrated programme of lawful and proportionate measures.",
    },
    systemProblem: {
      bg: [
        "Българският лозаро-винарски сектор се намира в продължителен процес на отслабване на своята конкурентоспособност, вътрешен пазарен дял и способност за генериране на приходи и добавена стойност. Този спад е резултат от взаимодействието на множество регулаторни, институционални, икономически, финансови, търговски, технологични, демографски, психологически и културни фактори.",
        "Последните инициативи на представители на сектора показват нарастващо разбиране, че тези проблеми не могат да бъдат решени чрез отделни и несъгласувани мерки.",
      ],
      en: [
        "The Bulgarian wine sector is in a prolonged process of weakening competitiveness, domestic market share and capacity to generate revenue and added value. This decline results from the interaction of many regulatory, institutional, economic, financial, commercial, technological, demographic, psychological and cultural factors.",
        "Recent initiatives by sector representatives show a growing understanding that these problems cannot be solved through isolated, uncoordinated measures.",
      ],
    },
    symptoms: {
      bg: ["Нарастване на вноса на вина в ниския ценови сегмент", "Изместване на българските продукти от важни сегменти на вътрешния пазар", "Търговските и снабдителните политики на големите вериги", "Слаба координация между отговорните държавни институции", "Фрагментирано представителство на лозарите и винопроизводителите", "Недостатъчен секторен аналитичен и експертен капацитет", "Ограничена интеграция между производството на вино и туризма", "Липса на последователна дългосрочна национална стратегия"],
      en: ["Rising imports of low-price-segment wines", "Displacement of Bulgarian products from key domestic market segments", "The trading and sourcing policies of large retail chains", "Weak coordination between responsible state institutions", "Fragmented representation of growers and producers", "Insufficient sector analytical and expert capacity", "Limited integration between wine production and tourism", "Absence of a consistent long-term national strategy"],
    },
    objective: {
      bg: [
        "Целта не е да бъдат защитавани интересите на отделен производител, сдружение или пазарен участник, нито да се предлагат протекционистични ограничения, несъвместими с европейското право. Целта е да бъдат идентифицирани структурните дефицити, които пречат на българските лозари и винопроизводители да се конкурират успешно, и да бъде разработена интегрирана програма от законосъобразни и пропорционални мерки, които:",
      ],
      en: [
        "The aim is neither to defend the interests of any single producer, association or market participant, nor to propose protectionist restrictions incompatible with European law. It is to identify the structural deficits that prevent Bulgarian growers and producers from competing successfully, and to develop an integrated programme of lawful and proportionate measures that:",
      ],
    },
    objectiveItems: {
      bg: ["подобряват функционирането на сектора", "укрепват неговата вътрешна и международна конкурентоспособност", "увеличават капацитета му да създава добавена стойност и устойчиви приходи", "развиват синергии с туризма, културата и регионалното развитие", "съхраняват жизнеспособните лозарски райони и местните сортове", "съответстват на правото на ЕС, принципите на Единния пазар и лоялната конкуренция"],
      en: ["improve the functioning of the sector", "strengthen its domestic and international competitiveness", "increase its capacity to create added value and sustainable revenue", "develop synergies with tourism, culture and regional development", "preserve viable wine-growing regions and local varieties", "comply with EU law, Single Market principles and fair competition"],
    },
    methodology: {
      intro: {
        bg: "Проектът е предвиден като първото цялостно практическо приложение на научната рамка на Центъра за алгоритмизация на социалните процеси чрез методологията ASAESIS. Секторът се разглежда като адаптивна алгоритмична архитектура от взаимосвързани производствени, пазарни и дистрибуционни, регулаторни, институционални, финансови, туристически, културни и информационни системи.",
        en: "The project is envisaged as the first comprehensive practical application of the Center's scientific framework for the algorithmization of social processes through the ASAESIS methodology. The sector is treated as an adaptive algorithmic architecture of interconnected production, market and distribution, regulatory, institutional, financial, tourism, cultural and information systems.",
      },
      stages: [
        { code: "01", short: { bg: "Цели", en: "Goals" }, title: { bg: "Определяне на целите", en: "Defining the goals" }, body: { bg: "Обществените, икономическите, социалните, регионалните и културните цели, на които следва да служи секторът – и дали са ясни, съгласувани, измерими и съвместими.", en: "The public, economic, social, regional and cultural goals the sector should serve — and whether they are clear, coherent, measurable and compatible." } },
        { code: "02", short: { bg: "Граници", en: "Boundaries" }, title: { bg: "Определяне на границите на системата", en: "Defining the system boundaries" }, body: { bg: "Институциите, пазарите, участниците, дейностите и външните условия, които са част от системата или действат като ограничения на средата.", en: "The institutions, markets, actors, activities and external conditions that are part of the system or act as environmental constraints." } },
        { code: "03", short: { bg: "Архитектура", en: "Architecture" }, title: { bg: "Картографиране на системната архитектура", en: "Mapping the system architecture" }, body: { bg: "Основните компоненти на лозаро-винарската екосистема и структурните отношения между тях.", en: "The main components of the wine ecosystem and the structural relationships between them." } },
        { code: "04", short: { bg: "Алгоритми", en: "Algorithms" }, title: { bg: "Картографиране на алгоритмите и процесите", en: "Mapping algorithms and processes" }, body: { bg: "Формалните и неформалните алгоритми на политиките, регулациите, субсидиите, лозовите насаждения, изкупуването, производството, ценообразуването, дистрибуцията, търговските вериги, туризма, износа и потребителския избор.", en: "The formal and informal algorithms of policy, regulation, subsidies, vineyard management, grape purchasing, production, pricing, distribution, retail listing, tourism supply, export promotion and consumer choice." } },
        { code: "05", short: { bg: "Стимули", en: "Incentives" }, title: { bg: "Заинтересовани страни, отговорности и стимули", en: "Stakeholders, responsibilities and incentives" }, body: { bg: "Интересите, компетентностите, стимулите, ограниченията и поведенческите реакции на участниците по цялата верига – от лозарите до потребителите и публичните органи.", en: "The interests, competences, incentives, constraints and behavioural responses of actors along the whole chain — from growers to consumers and public bodies." } },
        { code: "06", short: { bg: "Данни", en: "Data" }, title: { bg: "Оценка на данните и входната информация", en: "Assessing data and input information" }, body: { bg: "Наличност, надеждност, съгласуваност и навременност на статистическата, финансовата, пазарната и административната информация.", en: "Availability, reliability, consistency and timeliness of statistical, financial, market and administrative information." } },
        { code: "07", short: { bg: "Резултати", en: "Results" }, title: { bg: "Измерване на резултатите", en: "Measuring results" }, body: { bg: "Пазарен дял, добавена стойност, рентабилност, производителност, износ, инвестиции, заетост, устойчивост на насажденията, разпознаваемост, интеграция с туризма, институционална ефективност, регулаторна резултатност, адаптивност.", en: "Market share, added value, profitability, productivity, exports, investment, employment, vineyard sustainability, recognition, tourism integration, institutional efficiency, regulatory effectiveness, adaptability." } },
        { code: "08", short: { bg: "Откази", en: "Failures" }, title: { bg: "Анализ на алгоритмичните откази", en: "Analysing algorithmic failures" }, body: { bg: "Тесни места, противоречиви правила, изкривени стимули, координационни дефицити, липсваща обратна връзка, информационни асиметрии и непредвидени последици.", en: "Bottlenecks, contradictory rules, distorted incentives, coordination deficits, missing feedback, information asymmetries and unintended consequences." } },
        { code: "09", short: { bg: "Алтернативи", en: "Alternatives" }, title: { bg: "Моделиране на алтернативни архитектури", en: "Modelling alternative architectures" }, body: { bg: "Алтернативни конфигурации на политиките, институциите, пазарите и организациите, проверени – където данните позволяват – спрямо очаквани резултати, разходи, рискове и разпределителни ефекти.", en: "Alternative configurations of policies, institutions, markets and organizations, tested — where data allow — against expected results, costs, risks and distributional effects." } },
        { code: "10", short: { bg: "Препроектиране", en: "Redesign" }, title: { bg: "Интегрирано системно препроектиране", en: "Integrated system redesign" }, body: { bg: "Съгласуван пакет от препоръки за политики, регулаторни подобрения, институционални реформи, финансови инструменти, пазарни мерки, туристически, потребителски, културни и образователни инициативи и цифрови системи.", en: "A coherent package of policy recommendations, regulatory improvements, institutional reforms, financial instruments, market measures, tourism, consumer, cultural and educational initiatives and digital systems." } },
        { code: "11", short: { bg: "Съответствие", en: "Compliance" }, title: { bg: "Оценка за съответствие с правото и пазарните принципи", en: "Legal and market-principle compliance assessment" }, body: { bg: "Проверка на всяка интервенция спрямо правото на ЕС, Общата селскостопанска политика, правилата за конкуренция и държавни помощи, свободното движение на стоки, обществените поръчки, пропорционалността, прозрачността и недискриминацията.", en: "Checking every intervention against EU law, the Common Agricultural Policy, competition and state-aid rules, free movement of goods, public procurement, proportionality, transparency and non-discrimination." } },
        { code: "12", short: { bg: "Изпълнение", en: "Implementation" }, title: { bg: "Изпълнение и адаптивно управление", en: "Implementation and adaptive management" }, body: { bg: "Отговорности, точки за вземане на решения, последователност, финансиране, етапи и показатели, с механизми за обратна връзка и периодичен преглед.", en: "Responsibilities, decision points, sequencing, funding, milestones and indicators, with feedback mechanisms and periodic review." } },
      ],
    },
    outputs: {
      intro: { bg: "Предвидени основни резултати:", en: "Intended main outputs:" },
      items: [
        { title: { bg: "Доклад за системна диагностика", en: "System diagnostic report" }, body: { bg: "Цялостна оценка на архитектурата и настоящото функциониране на екосистемата.", en: "A comprehensive assessment of the ecosystem's architecture and current functioning." } },
        { title: { bg: "Модел на системната архитектура", en: "System architecture model" }, body: { bg: "Структурирано представяне на компонентите, решенията, информационните потоци, стимулите, обратната връзка и взаимозависимостите.", en: "A structured representation of components, decisions, information flows, incentives, feedback and interdependencies." } },
        { title: { bg: "Анализ на алгоритмичните откази и възможностите", en: "Analysis of algorithmic failures and opportunities" }, body: { bg: "Структурни неефективности, регулаторни противоречия, пазарни дефекти, координационни дефицити и възможности за добавена стойност.", en: "Structural inefficiencies, regulatory contradictions, market defects, coordination deficits and value-creation opportunities." } },
        { title: { bg: "Интегрирана програма за политики и трансформация", en: "Integrated policy and transformation programme" }, body: { bg: "Съгласуван пакет от регулаторни, институционални, икономически, финансови, пазарни, туристически, културни, образователни и поведенчески препоръки.", en: "A coherent package of regulatory, institutional, economic, financial, market, tourism, cultural, educational and behavioural recommendations." } },
        { title: { bg: "Оценка за съответствие с правото на ЕС", en: "EU-law compliance assessment" }, body: { bg: "Законосъобразност, пропорционалност и конкурентна неутралност на предложените мерки.", en: "Lawfulness, proportionality and competitive neutrality of the proposed measures." } },
        { title: { bg: "Пътна карта за изпълнение", en: "Implementation roadmap" }, body: { bg: "Отговорни институции, заинтересовани страни, законодателни и административни действия, финансиране, приоритети, етапи, рискове, показатели и процедури за наблюдение.", en: "Responsible institutions, stakeholders, legislative and administrative actions, funding, priorities, milestones, risks, indicators and monitoring procedures." } },
        { title: { bg: "Резюме за изпълнителната власт", en: "Executive summary for government" }, body: { bg: "Кратък, практически ориентиран документ за официално представяне пред компетентните органи.", en: "A concise, practically oriented document for formal presentation to the competent authorities." } },
      ],
    },
    statusNote: {
      bg: "Предложен изследователски мандат. Проектът е на етап предварителна оценка на необходимите човешки, технически и финансови ресурси. Не е възложен и не е финансиран; не са произведени резултати.",
      en: "Proposed research mandate. The project is at the stage of preliminary estimation of the human, technical and financial resources required. It has not been commissioned or funded; no results have been produced.",
    },
    sourceNote: {
      bg: "По предложението за първи приложен научноизследователски проект на Центъра.",
      en: "Based on the proposal for the Center's first applied research project.",
    },
    related: ["bulgarian-wine-bulgarian-tourism"],
    relatedInsights: ["asaesis-from-framework-to-method", "why-social-systems-behave-like-algorithms"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]!;
