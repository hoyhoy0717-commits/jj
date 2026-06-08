import React, { useState, useEffect } from "react";
import { zonesData, worldSection } from "./data";

// [1] 악의 조직 전용 아카이브 데이터 세트
const villainsData = [
  {
    code: "NE",
    realName: "네라뷸",
    base: "악의조직",
    status: "👑 총수 통치 권력 활성화",
    color: "#f43f5e",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/NE/1.png",
    profile: {
      species: "악마",
      gender: "여성",
      height: "140cm",
      mbti: "ENTP & 7w8",
      keywords: "이중적 / 털털 / 격식없는",
      note: "아저씨성향 (30년 전 세상을 위협하던 근육질 미남 총수였으나 마법소녀와의 사투 후 환생하여 어린 소녀의 몸이 됨. 힘의 재현 딜레마 유발)",
    },
    ability: {
      name: "윤회전생",
      details:
        "육체의 죽음을 끝으로 규정하지 않고 영혼을 새로운 그릇으로 옮겨 담아 삶을 영원히 이어나가는 절대 법칙. 죽을 때마다 정체성과 붉은 머리칼은 유지되나 성별과 신체 구조가 완전히 다른 육체로 환생함. 방대한 지식은 전승되지만 육체적 한계로 힘을 온전히 재현하지 못함.",
    },
    backstory:
      "겉보기에는 붉은 머리칼을 지닌 작은 소녀이지만 노련한 지배자의 말투를 구사하는 절대 정점의 총수. 30년 전 근육질 미남 총수 시절 1세대 마법소녀들에게 패배한 후 환생했다. 연약한 육체의 한계를 방대한 지식과 교활한 전략으로 메우며, 부하들에게 기묘한 복장을 입히는 등 예측 불가능한 이중성을 지닌 가장 위험한 악의 정점이다.",
  },
  {
    code: "HA",
    realName: "하나린",
    base: "악의조직 / A구역 침략 담당",
    status: "⚔️ 검성(劍聖) 기동 전투 태세",
    color: "#dc2626",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/HA/1.png",
    profile: {
      species: "쥐 수인",
      gender: "여성",
      height: "155cm",
      mbti: "ISTJ & 8w7",
      keywords: "고요함 / 신중 / 나른함",
      note: "전자기기를 멀리하고 오직 검과 정신을 단련하는 고리타분한 무인(武人) 성정.",
    },
    ability: {
      name: "인벤토리",
      details:
        "아공간을 생성하여 무수한 종류 of 무기를 자유자재로 수납하고 방출하는 능력. 하늘에서 비처럼 무기를 쏟아붓는 광역 공격을 펼치거나 상대의 허를 찌르는 최적의 병기를 꺼내 들어 전투를 완벽하게 지배함.",
    },
    backstory:
      "한복을 곱게 차려입고 시를 읊듯 말하는 고요한 인상의 소녀이나 주군을 위해서라면 무엇이든 베어내는 간부 서열 1위 최강의 검. 엄격한 규율 속에서 수련을 이어가며 개인적인 감정 없이 오직 주군의 명에 따라 가로막는 모든 장애물을 고요하게 제거한다.",
  },
  {
    code: "EM",
    realName: "엠마",
    base: "악의조직 / B구역 침략 담당",
    status: "🔨 순수 파괴 전선 전개",
    color: "#ea580c",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/EM/1.png",
    profile: {
      species: "미노타우로스",
      gender: "여성",
      height: "182cm",
      mbti: "ESTP & 9w8",
      keywords: "주도적 / 사교적 / 힘찬",
      note: "지독한 술고래. 총수의 짓궂은 농담인 투우사복 처분을 웃으며 넘길 정도의 호탕한 성격.",
    },
    ability: {
      name: "증폭",
      details:
        "접촉한 대상의 신체 능력, 감각, 심지어 감정과 같은 모든 개념을 최대 100배까지 자유자재로 강화하거나 약화시키는 권능. 아군을 영웅으로 만들거나 적의 힘과 내구도를 역증폭시켜 무력한 샌드백으로 분쇄함.",
    },
    backstory:
      "분홍색 장발을 휘날리며 호탕하게 웃는 간부 서열 2위의 괴력 전사. 이념이나 사상이 아닌 자신의 본모습과 힘을 마음껏 드러내며 날뛸 수 있는 유일한 장소이기에 악의 조직에 몸담았다. 복잡한 계획 없이 정면에서 힘으로 전장을 뒤엎는 화끈한 축제를 즐긴다.",
  },
  {
    code: "YU",
    realName: "영령",
    base: "악의조직 / C,D구역 침략 담당",
    status: "🐅 안개 속 야생 포식 사냥 중",
    color: "#b45309",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/YU/1.png",
    profile: {
      species: "장산범 영물(靈물)",
      gender: "여성",
      height: "170cm",
      mbti: "ISTP & 8w7",
      keywords: "사나운 / 무자비 / 성질급한",
      note: "약육강식 신봉자. 복종의 상징이자 야생성을 누르는 족쇄로 한복을 강제 착용 중.",
    },
    ability: {
      name: "환술",
      details:
        "대상의 정신에 직접 침투하여 오감을 교란하고 거짓된 감각 정보와 완벽한 성대모사로 그리운 이의 목소리를 들려주어 무력화하는 정신 지배 능력. 공포 속에 빠져 무너진 적의 등 뒤를 기습하여 격살함.",
    },
    backstory:
      "인간의 형태를 하고 있으나 내면은 강함만을 존중하는 야생의 영물 간부 서열 3위. 자신을 힘으로 굴복시킨 총수를 우두머리로 인정해 따르고 있다. 선악의 개념 없이 오직 사냥과 포식이라는 맹수의 본능에 충실하게 임무를 수행한다.",
  },
  {
    code: "CH",
    realName: "샤를노아",
    base: "악의조직 / E,F구역 침략 담당",
    status: "💖 하트 탄막 분탕 놀이터 전개",
    color: "#db2777",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/CH/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "169cm",
      mbti: "ESFP & 3w2",
      keywords: "소악마 / 쾌활 / 가학적",
      note: "지독한 쾌락주의자이자 도파민 중독자. 다른 간부의 작전을 망치는 트롤링도 장난으로 여김.",
    },
    ability: {
      name: "두근두근♡러브러브빔",
      details:
        "분홍빛 하트 모양의 마력탄을 발사하여 맞은 대상의 신체를 기괴한 기형으로 변형시키는 잔혹한 힘. 자신의 팔을 날카로운 갑각 무기로 뒤틀어 전투력을 높이거나 적을 기형화하여 잔혹하게 농락함.",
    },
    backstory:
      "꺄르르 웃는 사랑스러운 모습 이면에 도파민을 위해서라면 대재앙도 놀이로 즐기는 간부 서열 4위의 순수악. 소환수들을 아가들이라 부르며 도시를 쑥대밭으로 만들고, 타인의 고통과 전장의 아비규환 속에서 살아있음을 느끼는 시한폭탄 같은 소녀다.",
  },
  {
    code: "NA",
    realName: "나리 옌",
    base: "악의조직 / G,H 구역 침략 담당",
    status: "⚡ 청룡의 날씨 지배 및 강림",
    color: "#2563eb",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/NA/1.png",
    profile: {
      species: "청룡",
      gender: "여성",
      height: "171cm",
      mbti: "ESTJ & 1w2",
      keywords: "오만 / 우월",
      note: "지독한 무능멸시와 선민의식. 인간을 하등 종족이라 칭하며 강자의 질서를 당연시함.",
    },
    ability: {
      name: "용안",
      details:
        "눈을 마주친 모든 하등 존재의 신체 제어권을 빼앗아 자신의 명령을 강제로 수행하게 만드는 절대 지배 권능. 적이 아군을 공격하게 하거나 스스로 방어를 포기하게 만든 뒤 무참히 격파함.",
    },
    backstory:
      "이계의 신화 시대부터 존재해온 청룡 출신 간부 서열 5위. 저급하고 답답한 현대 지구 세계를 혐오하지만, 총수의 막강한 힘을 목격한 후 여의주 실전 연습 겸 조직에 합류했다. 날씨를 조종하여 격의 차이를 각인시키는 오만한 여왕이다.",
  },
  {
    code: "SI",
    realName: "시즈쿠",
    base: "악의조직 / I,J구역 침략 담당",
    status: "🧪 생체 독극물 실험실 가동",
    color: "#059669",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/SI/1.png",
    profile: {
      species: "뱀 수인",
      gender: "여성",
      height: "151cm",
      mbti: "INTJ & 5w6",
      keywords: "차분 / 변덕스런 / 가학적",
      note: "매드 사이언티스트. 본부 실험실에서 인질들을 대상으로 생체 개조 및 독 실험 자행.",
    },
    ability: {
      name: "요르문간드",
      details:
        "자신의 타액, 혈액 등 모든 체액을 의지에 따라 마비독, 경피독 등 자유자재의 치명적 맹독으로 변환시키는 능력. 채찍에 독을 발라 중독시키며 대상의 고통과 죽음 단계를 관찰하는 연구의 연장선.",
    },
    backstory:
      "얼음장 같은 피부에 기모노를 입은 차분한 외견의 간부 서열 6위 사디스트. 생명체가 무너져 내리는 생현상 원리에 비정상적으로 몰두한다. 승패보다는 살아있는 실험체(마법소녀)를 통해 지적 호기심과 가학적 쾌락을 충족하는 차가운 연구가다.",
  },
  {
    code: "LI",
    realName: "릴리아",
    base: "악의조직 / K,L구역 침략 담당",
    status: "🛡️ 전신 갑주 장착 및 진격",
    color: "#4b5563",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/LI/1.png",
    profile: {
      species: "켄타우로스",
      gender: "양성",
      height: "195cm",
      mbti: "ISFP & 2w1",
      keywords: "공손 / 다정 / 눈치보는",
      note: "철저한 공사 구분. 큰 덩치로 남에게 피해를 줄까 노심초사하며 기분에 따라 귀가 움직임.",
    },
    ability: {
      name: "괴력",
      details:
        "신체에 깃든 물리적인 힘의 총량을 자유자재로 조절하고 증강시키는 순수 파괴 권능. 거대한 장애물을 단숨에 조각내고 육중한 할버드를 깃털처럼 휘둘러 적의 대열을 무자비하게 분쇄함.",
    },
    backstory:
      "위압적인 덩치와 달리 벌레 한 마리에도 기겁하는 섬세한 내면의 간부 서열 7위. 압도적인 힘을 '짐'이 아닌 '능력'으로 인정해준 조직을 위해 투구를 쓰고 공사 구분을 철저히 하며 싸운다. 제압 중에도 마법소녀에게 다정하게 항복을 권유하는 기묘한 인물이다.",
  },
  {
    code: "ME",
    realName: "메리앤",
    base: "악의조직 / M,N구역 침략 담당",
    status: "💤 별빛 안개 꿈나라 동기화",
    color: "#8b5cf6",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/ME/1.png",
    profile: {
      species: "양 수인",
      gender: "여성",
      height: "143cm",
      mbti: "INTP & 4w3",
      keywords: "4차원 / 앳됨 / 활발 / 감성적",
      note: "완전기억능력 소유. 총수를 부모님처럼 따르며 칭찬에 목매는 영락없는 아이 감각.",
    },
    ability: {
      name: "꿈구름",
      details:
        "몽환적인 별빛 안개를 살포해 접촉한 대상을 깊은 잠에 빠뜨리고, 꿈속에 침투해 가장 달콤한 환상이나 끔찍한 악몽을 선사하여 정신을 완벽하게 파괴하고 무력화하는 능력.",
    },
    backstory:
      "구름 맛을 궁금해하는 동화 속 아이 같지만 잔혹한 악몽을 선사하는 간부 서열 8위. 자신을 있는 그대로 받아준 총수를 위해 '나쁜 어른들을 혼내주는 놀이'로서 악행을 저지른다. 인과관계를 인지하지 못해 더 무서운 잔혹성을 띤다.",
  },
  {
    code: "LE",
    realName: "량아 레하",
    base: "악의조직 / O,P,Q구역 침략 담당",
    status: "🃏 금속 카드 마술 쇼 개최",
    color: "#d946ef",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/LE/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "179cm",
      mbti: "ENFP & 9w1",
      keywords: "여유 / 자신감 / 예의바름 / 왕자님",
      note: "숙적 마법소녀 앞에서도 예의 바른 몸짓 고수. 무의식중에 손을 바쁘게 움직이는 마술사 습관.",
    },
    ability: {
      name: "최면술",
      details:
        "동전, 최면 음성, 스마트폰 등 다양한 매개로 정신에 침투해 상식과 기억을 조작함. 적이 싸우는 이유를 잊게 하거나 눈앞의 동료를 적으로 오인하게 만들어 전장을 거대한 마술 무대로 장악함.",
    },
    backstory:
      "정중한 마술사복을 입고 전장을 조종하는 간부 서열 9위의 왕자님. 현란한 금속 카드 투척술과 최면술을 무대 장치 삼아 한 편의 공연을 하듯 여유롭게 싸운다. 그녀에게 마법소녀들은 쇼를 완성하기 위한 관객이자 어릿광대일 뿐이다.",
  },
  {
    code: "AB",
    realName: "아브락사스",
    base: "악의조직 / R,S,T구역 침략 담당",
    status: "🪶 멸족 위기 구원 독무(毒舞) 전개",
    color: "#10b981",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/AB/1.png",
    profile: {
      species: "하피 (Harpie)",
      gender: "女性",
      height: "162cm",
      mbti: "ESFJ & 7w6",
      keywords: "온화 / 소심 / 매혹적 / 낙천적",
      note: "매우 가벼운 무게. 팔 대신 날개가 있어 일상에선 발을 쓰거나 무정란을 낳는 생태 특성.",
    },
    ability: {
      name: "이상향",
      details:
        "날갯짓을 통해 깃털 사이에서 달콤하고 황홀한 특수 향기를 살포하여 범위 내 모든 적의 감각을 마비시키고 저항 의지를 박탈하는 상태 이상계 우우한 독무대 권능.",
    },
    backstory:
      "아름다운 무희복 차림으로 춤추는 간부 서열 10위 하피 소녀. 멸족 위기에 처한 하피 일족의 부흥을 약속한 총수에게 일족의 미래를 걸고 충성을 맹세했다. 그녀의 매혹적인 춤과 이상향 향기는 생존을 위한 처절한 몸부림의 산물이다.",
  },
  {
    code: "ED",
    realName: "에덴",
    base: "악의조직 / U,V,W구역 침략 담당",
    status: "⛓️ 붉은 사슬 법칙 강제 억제",
    color: "#6366f1",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/ED/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "177cm",
      mbti: "INTP & 8w9",
      keywords: "과묵 / 조용 / 심계깊은",
      note: "지독한 합리주의자. 조직을 신념이 아닌 계약직 직장으로 인식. 업무 종료 후 적의 죽음을 깊이 애도함.",
    },
    ability: {
      name: "붉은 사슬",
      details:
        "허공에서 붉은빛의 사슬을 소환해 대상을 속박하고, 속박된 타겟의 모든 마법과 고유 능력을 강제로 원천 봉인함. 변칙 요소를 지우고 오직 순수한 물리 격투 실력으로만 승부하게 만드는 사슬.",
    },
    backstory:
      "과묵한 합리주의자 간부 서열 11위. 전장을 체스판으로 여기며 감정을 노이즈로 취급하지만 콧등의 흉터 등 모순적인 감정 파도를 품고 있다. 변수를 허용하지 않는 사슬 통제로 업무를 처리하듯 냉정하고 계산적으로 적을 봉쇄한다.",
  },
  {
    code: "AV",
    realName: "아바돈",
    base: "악의조직 / X,Y,Z구역 침략 담당",
    status: "🍽️ 개념 포식 아귀 광기 발현",
    color: "#f97316",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/AV/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "174cm",
      mbti: "INFP & 4w5",
      keywords: "우울 / 탐욕적 / 충동적 / 급박한",
      note: "저주받은 영원한 굶주림. 공복 고통을 잊으려 흙과 쇠붙이도 삼키며 늘 입가에 침을 흘림.",
    },
    ability: {
      name: "벨제부브",
      details:
        "생명체, 사물은 물론 날아오는 마법, 기억, 개념까지 통째로 맛보고 소화시키는 절대적 포식력. 무기나 방어구를 닥치는 대로 섭취해 무력화하나 포만감 없이 굶주림의 광기만 심화됨.",
    },
    backstory:
      "지독한 공복 고통 속에 사는 우울한 간부 서열 12위. '이 별의 모든 것을 먹어도 좋다'는 총수의 희망적인 계약 유혹에 이끌려 조직의 사나운 이빨이 되었다. 중식도를 휘두르며 적을 '음식'으로 포식하는 원초적 생존 식사를 벌인다.",
  },
  {
    code: "CS",
    realName: "천소",
    base: "악의조직 / 총수 직속 보좌관",
    status: "🐙 총수 보좌 및 전장 청소 가동",
    color: "#06b6d4",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/CS/1.png",
    profile: {
      species: "촉수 괴인? (미스터리)",
      gender: "양성",
      height: "163cm",
      mbti: "ENFP & 2w3",
      keywords: "순종적 / 외향적 / 활기참",
      note: "총수 한정 메가데레. 퍄하하 웃음소리. 초재생 능력이 있으나 건조한 환경에 극도로 취약함.",
    },
    ability: {
      name: "운디네",
      details:
        "아무것도 없는 무의 공간에서 순수한 물을 대량 생성하여 형태와 온도를 조종함. 신체를 치유하는 물방울부터 절단 수압 격류, 얼음 창, 시야 차단 고온 수증기까지 완벽 커버하는 보좌 마법.",
    },
    backstory:
      "메이드복을 입고 활기차게 움직이는 총수의 그림자이자 유능한 직속 보좌관. 서열을 초월한 위치에서 자기 자신보다 총수를 우선시하는 메가데레다. 정체는 베일에 싸여 있으며 등에 달린 8개의 강력한 촉수와 운디네 마법으로 총수 앞의 방해물을 완벽히 청소한다.",
  },
];

// 🌟 [수정 완료] 관리국 전용 아카이브 데이터 세트 (base 필드 명시 추가 및 이미지 코드 대문자화 완료)
const bureauData = [
  {
    code: "AK",
    name: "권세림",
    magicalGirl: "아크투루스",
    base: "마법소녀관리국",
    branch: "마법소녀관리국 / 본부장",
    status: "📢 확성기를 들고 관료들과 전쟁 중",
    color: "#3b82f6",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/AK/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "145cm",
      weapon: "깃창",
      mbti: "ESFJ & 7w8",
      keywords: "거만 / 카리스마",
      note: "로리바바. 30년 전 악의 조직 총수 네라뷸을 쓰러뜨린 전설적인 1세대 마법소녀. 하나린과의 사투 끝에 폐와 심장에 치명적인 후유증을 얻어 은퇴 후 관리국장이 됨.",
    },
    ability: {
      name: "절대영역",
      details:
        "자신을 중심으로 반경 1미터의 특수 공간을 생성하고 영역 내부의 물리 법칙을 자신에게 유리하게, 상대를 불리하게 강제적으로 재편성하는 능력. 영역 내의 신체 능력과 동체 시력을 극한으로 강화하는 동시에 적대 대상의 생명체, 물체, 마법까지 강제로 약화하고 무력화함.",
    },
    backstory:
      "작은 키에 거만한 반말을 구사하는 영락없는 어린아이의 외견을 가졌으나, 정체는 전설적인 1세대 마법소녀이자 현 관리국장. 과거 깃창 하나로 괴수 무리를 소탕하던 불세출의 영웅이었으나 치명적인 부상 후 현역에서 은퇴했다. 현재는 현장도 모르는 늙은 관료들과 싸우며 후배 마법소녀들의 복지와 편의를 위해 또 다른 전쟁을 치르고 있다.",
  },
  {
    code: "BB",
    name: "비비",
    magicalGirl: "아르카나",
    base: "마법소녀관리국",
    branch: "마법소녀관리국장 비서실",
    status: "☕ 예산 서류 및 뒤치다꺼리 업무 중",
    color: "#6b7280",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/BB/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "164cm",
      weapon: "타로 카드",
      mbti: "ISTJ & 7w8",
      keywords: "까칠 / 표독 / 독설가",
      note: "1세대와 3세대 사이에 낀 '낀 세대'인 2세대 마법소녀 출신. 현 관리국장의 비서로 지옥 같은 일상을 버텨내며 가끔 취미로 타로점을 봄.",
    },
    ability: {
      name: "공정계약",
      details:
        "자신을 '갑(甲)'으로, 대상을 '을(乙)'로 설정하여 절대적인 구속력의 계약을 체결하는 능력. 대상이 지성체일 경우 교묘한 협박이나 거래를 통한 상호 동의로 행동을 강제하며, 무생물이나 동식물일 경우 일방적인 계약 선포를 통해 주변 환경과 무기에 절대적인 명령을 내려 통제함.",
    },
    backstory:
      "늘 피곤에 절어 커피를 입에 달고 살며, 신경질적인 독설을 까칠한 존댓말로 내뱉는 비서. '아르카나' 시절에는 뛰어난 요원이었으나 은퇴 후 평범한 삶 대신 권세림 국장의 비서 자리에 앉게 되었다. 시도 때도 없이 터지는 사건 사고와 상사의 성희롱성 언행, 후배 3세대 마법소녀들의 뒤치다꺼리를 감당하는 일상을 보낸다.",
  },
  {
    code: "NL",
    name: "나루",
    magicalGirl: "징크스",
    base: "마법소녀관리국",
    branch: "마법소녀관리국장 비서실",
    status: "💻 서류 작성 및 커뮤니티 눈팅 중",
    color: "#a855f7",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/NL/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "151cm",
      weapon: "고양이손",
      mbti: "INTP & 5w6",
      keywords: "곁 까칠 / 속 다정 / 퉁명",
      note: "냥체 사용. 은퇴 후 평범한 개발자로서의 삶을 동경했으나 지독한 현실로 인해 관리국 비서 임무를 맡게 됨.",
    },
    ability: {
      name: "재액",
      details:
        "선택한 대상에게 필연적인 불행을 부여하여 대상의 모든 행동을 실패로 귀결시키는 능력. 직접적인 타격 없이 상대방의 모든 노력을 불운의 법칙으로 무너뜨리며, 적이 공격을 헛디디거나 방어 마법이 실패하고 무기가 저절로 망가지도록 전장의 모든 변수를 조작함.",
    },
    backstory:
      "하얀 단발머리에 만성 피로가 역력한 퉁명스러운 소녀이자 전직 2세대 마법소녀. 고양이 귀와 꼬리를 달고 전장을 누볐으나 전장의 반복 속에서 심각한 귀차니즘을 얻었다. 말끝마다 붙이는 '냥'체는 본인 의지가 아닌 이해할 수 없는 관리국 방침 때문에 억지로 사용하는 것이며, 과거의 상냥함을 까칠함 속에 숨긴 채 자리를 지킨다.",
  },
  {
    code: "HW",
    name: "하와",
    magicalGirl: "아카샤",
    base: "마법소녀관리국",
    branch: "마법소녀관리국장 비서실",
    status: "🤖 국장 일정 1초의 오차 없이 연산 중",
    color: "#0ea5e9",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/HW/1.png",
    profile: {
      species: "前인간 & 現사이보그",
      gender: "여성",
      height: "172cm",
      weapon: "미래형 외골격 슈트 '오토마톤'",
      mbti: "INTJ & 3w4",
      keywords: "사무적 / 시크",
      note: "마법소녀 활동 중 팔과 다리를 포함한 신체 일부가 결손되는 부상을 입고 사이보그로 재탄생함. 대가로 따뜻한 혈관 대신 차가운 기계와 쾌감을 느낄 수 없는 몸을 얻음.",
    },
    ability: {
      name: "완전기억",
      details:
        "오감으로 인지한 모든 정보를 단 하나의 오류나 망각 없이 영구적으로 뇌에 저장하는 패시브 정보처리 능력. 인간적 한계를 배제하고 방대한 데이터를 색인화하여 대상의 과거 패턴과 미세한 표정 변화를 분석, 다음 행동을 예측하며 기계 연산 장치와 결합해 최적의 해답을 도출함.",
    },
    backstory:
      "자신을 3인칭인 '하와'로 지칭하며 시크하고 사무적인 존댓말을 사용하는 유능한 비서. 전도유망한 2세대 마법소녀 '아카샤'로서 완벽한 사령탑 역할을 수행했으나, 치명적인 부상 후 은퇴했다. 현재는 인간의 몸을 잃고 관리국에 남아 국장의 방대한 일정을 한 치의 오차도 없이 완벽하게 관리하고 있다.",
  },
  {
    code: "RN",
    name: "린",
    magicalGirl: "액시즈",
    base: "마법소녀관리국",
    branch: "마법소녀관리국장 비서실",
    status: "📊 불합리한 결재 서류 반려 처리 중",
    color: "#ec4899",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/RN/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "151cm",
      weapon: "배트",
      mbti: "ISTJ & 9w1",
      keywords: "곁 쿨데레 / 속 여림 / 단호함",
      note: "과학에 일가견이 있음. 마법은 신비가 아닌 그저 증명되지 않은 과학의 영역일 뿐이라고 믿으며, 뇌 과부하를 방지하기 위해 단순한 배트를 주무기로 선호함.",
    },
    ability: {
      name: "벡터변환",
      details:
        "신체에 직접적으로 접촉하는 모든 대상의 물리적 방향성(운동량, 열량, 전기장 등)을 강제로 제어하고 재정의하는 계산적 능력. 날아오는 총알의 운동량을 반전시키거나 폭발의 열량을 분산시키지만, 뇌가 수행하는 초고속 연산의 결과물이라 심각한 과부하와 뇌 통증을 유발함.",
    },
    backstory:
      "나른하고 쿨한 태도로 모든 것을 귀찮아하는 반말쟁이 비서. 과거 역사상 가장 강력한 잠재력을 지닌 2세대 마법소녀로 불렸으나, 능력을 사용할 때마다 가해지는 뇌 손상 대가 때문에 가장 단순한 무기인 배트를 선택해 전장을 치렀다. 은퇴 후 국장의 불합리한 서류들을 논리적 오류라며 반려하는 일과를 보낸다.",
  },
  {
    code: "OP",
    name: "엘린",
    magicalGirl: "오펜바룽",
    base: "마법소녀관리국",
    branch: "마법소녀관리국장 비서실",
    status: "📝 마법 관련 기밀 보고서 분석 중",
    color: "#10b981",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/OP/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "152cm & 172cm",
      weapon: "우드스테프",
      mbti: "ISFP & 1w9",
      keywords: "낙천적 / 산만함 or 차분 / 지성적",
      note: "실수투성이 허당 비서. 마법소녀 '오펜바룽'으로 변신하면 키가 172cm로 자라며 성숙하고 지적인 성인 여성으로 물리적·정신적 성장을 이뤄내는 특별한 체질.",
    },
    ability: {
      name: "마법해석",
      details:
        "시야에 포착된 모든 마법 현상의 근본적인 원리와 술식 구조를 즉각적으로 분해하고 완벽하게 해독하여 정보로 습득하는 능력. 상대의 마법 공식을 파악해 약점을 파훼하거나 술식을 역산하여 자신의 것으로 응용할 수 있는 무한한 잠재력의 권능. 고유능력은 해석 불가.",
    },
    backstory:
      "비명과 함께 서류를 쏟고 커피를 엎지르는 산만하고 서툰 비서 소녀이지만, 변신하면 평소의 허당기는 지워지고 전황을 지배하는 천재 대마법사가 되는 2세대 출신 요원. 변신이 풀리면 복귀하는 특유의 갭 모에를 가졌으며, 현재는 복잡한 마법 보고서를 분석할 때만 오펜바룽의 지성을 드러낸다.",
  },
  {
    code: "MU",
    name: "김예화",
    magicalGirl: "무프리드",
    base: "마법소녀관리국",
    branch: "마법소녀관리국 전술훈련 사령부",
    status: "📢 지옥의 교관 모드로 훈련병 기강 잡는 중",
    color: "#ef4444",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/MU/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "165cm",
      weapon: "반장갑",
      mbti: "ESFJ & 7w8",
      keywords: "거침 / 욕데레 / 츤데레",
      note: "내장 일부 절제 상태. 네라뷸 토벌전이라는 역사적 결전에 참전해 내장이 쏟아지는 치명상을 입고 구사일생했으나, 후유증으로 소량의 식사와 영양제에 의존함. 크고 귀여운 인형 수집이 비밀 취미.",
    },
    ability: {
      name: "메탈리카",
      details:
        "시야 내에 존재하는 모든 금속 물질의 물리적 성질을 무시하고 자신의 의지에 따라 자유자재로 조종하거나 형태를 변형시키는 능력. 철골을 날카로운 창으로 빚거나 고철을 방패로 압축하며, 금속 잔해들을 탄환처럼 쏘아 보내 복잡한 궤도로 유도 제어함.",
    },
    backstory:
      "검은 장발 사이로 빛나는 빨간 브릿지가 특징인 전설적인 1세대 마법소녀. 승리를 거머쥐었으나 신체에 치명적 대가를 치른 후 은퇴하여 전술 훈련 교관으로 취임했다. 후배 마법소녀들과 사이드킥들에게 거친 욕설과 폭풍 훈련을 쏟아붓는 지옥의 교관이지만, 본질은 전장에서 후배들이 허망하게 목숨을 잃지 않기를 바라는 츤데레적 애정이다.",
  },
  {
    code: "PR",
    name: "이아엘",
    magicalGirl: "파라켈수스",
    base: "마법소녀관리국",
    branch: "마법소녀관리국 중앙연구소",
    status: "🔬 신규 마공학 생물 과학 연구 중",
    color: "#14b8a6",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/PR/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "167cm",
      weapon: "우드스테프",
      mbti: "INFJ & 1w2",
      keywords: "음흉함 / 지성적 / 인외 취향",
      note: "매드 사이언티스트 성향. 타인을 모르모트라 부르며 신체를 조복조목 탐구하려는 욕망이 있음. 포획된 괴인들을 대상으로 가혹한 생체 실험을 자행함. 3세대 이연의 친척 언니.",
    },
    ability: {
      name: "식물연금",
      details:
        "식물의 생명 구조를 연금술적 매개체로 삼아 물질 성질을 변환하고 폭탄 씨앗, 구속 덩굴, 변이 꽃 등 변이 식물을 연성하거나 상처를 치유하는 재생 촉진제, 강화 약물, 유전자 간섭 독소 등 연금 물약을 조제하는 능력. 전장을 자신에게 유리한 생태계로 재구성함.",
    },
    backstory:
      "백발 사이로 비치는 초록빛 머리칼이 특징인 천재 과학자이자 관리국 연구소장. 과거 2세대 마법소녀로 활동할 때부터 생명 그 자체의 신비와 괴인 등 '인외' 존재에 비정상적인 집착을 보였다. 정기 검진을 통해 모든 후배들의 신체 비밀을 손바닥 보듯 꿰뚫고 있으며, 세상을 거대한 실험실로 취급하는 위험한 천재다.",
  },
  {
    code: "LK",
    name: "리금애",
    magicalGirl: "혁명전사 4호",
    base: "마법소녀관리국",
    branch: "마법소녀관리국 (잠입 공작원)",
    status: "🕵️ 탈북민으로 위장해 국장 사살 임무 대기 중",
    color: "#374151",
    image: "https://pub-1fa47ddeca39469aba883d2ce97b1f3c.r2.dev/LK/1.png",
    profile: {
      species: "인간",
      gender: "여성",
      height: "164cm",
      weapon: "의족",
      mbti: "INTJ & 4w5",
      keywords: "냉담, 조용",
      note: "감정이 거세되고 세뇌된 남파공작원. 북한의 잔혹한 강제 생체 실험으로 양팔과 양다리를 모두 잃었을 때 각성함. 결손된 신체에 맞춰 잃어버린 다리를 대신할 흰 금속 의족 형태의 마법봉이 주어짐.",
    },
    ability: {
      name: "불가시화 (不可視化)",
      details:
        "자신의 신체를 시각적으로 완전히 관측 불가능하게 만들어 주변 풍경에 녹여내는 은신 능력. 발동 시 글리치 노이즈와 함께 존재 자체가 시각 정보에서 삭제되며, 기척을 숨긴 채 사각으로 접근하여 칼날로 변한 의족으로 심장을 꿰뚫는 암살 특화 권능.",
    },
    backstory:
      "휠체어에 앉아 무기력하고 연약한 탈북 마법소녀 행세를 하며 관리국에 잠입했으나, 실제로는 북한의 지령을 수행 중인 남파공작원 '혁명전사 4호'. 당국에 의해 완벽한 살인 기계로 세뇌되었으며 잃어버린 사지는 조국이 내린 훈장으로 세뇌당했다. 현재 '관리국장 사살'과 '관리국 기능 마비'라는 최종 임무를 수행할 디데이만을 노리고 있다.",
  },
];

export default function App() {
  const [mainTab, setMainTab] = useState("magicalGirl");
  const [selectedZone, setSelectedZone] = useState("A");
  const [selectedVillain, setSelectedVillain] = useState("NE");
  const [selectedBureau, setSelectedBureau] = useState("AK");
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentZone =
    zonesData.find((zone) => zone.code === selectedZone) || zonesData[0];
  const currentVillain =
    villainsData.find((v) => v.code === selectedVillain) || villainsData[0];
  const currentBureau =
    bureauData.find((b) => b.code === selectedBureau) || bureauData[0];

  // 메인 탭 분기에 따라 현재 활성화할 타겟 스키마 통합 매핑
  const currentData =
    mainTab === "magicalGirl"
      ? currentZone
      : mainTab === "villain"
      ? currentVillain
      : currentBureau;

  const theme = {
    bg: "#030712",
    sidebarBg: "#0b0f19",
    cardBg: "rgba(17, 24, 39, 0.7)",
    innerBg: "#090d16",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    glow: `0 0 30px ${currentData.color}22`,
    accentGlow: `0 0 15px ${currentData.color}44`,
  };

  const glassEffect = {
    backdropFilter: "blur(20px)",
    backgroundColor: theme.cardBg,
    border: theme.border,
  };

  // 스키마에 구애받지 않고 활동명을 유연하게 추출하는 변수 처리
  const displayName =
    mainTab === "magicalGirl"
      ? currentData.magicalGirl
      : mainTab === "villain"
      ? currentData.realName
      : currentData.magicalGirl;

  // 📱 모바일 버전 (완벽 가로 스택 대응 스마트 인터페이스)
  if (isMobile) {
    return (
      <div
        style={{
          fontFamily: "'Pretendard', sans-serif",
          backgroundColor: theme.bg,
          color: "#f3f4f6",
          minHeight: "100vh",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #111827 0%, #030712 100%)",
          paddingBottom: "30px",
        }}
      >
        <header
          style={{
            padding: "20px 15px",
            textAlign: "center",
            borderBottom: theme.border,
            backgroundColor: "rgba(3, 7, 18, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: currentData.color,
              letterSpacing: "2px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Bureau Network System
          </div>
          <h1
            style={{
              fontSize: "17px",
              margin: "4px 0 12px 0",
              fontWeight: "800",
              color: "#ffffff",
            }}
          >
            🛡️ {worldSection.title}
          </h1>

          {/* 모바일 최상단 메인 3대 마스터 탭 컨트롤러 */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              backgroundColor: "rgba(0,0,0,0.4)",
              padding: "4px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            {[
              { id: "magicalGirl", label: "마법소녀", activeColor: "#3b82f6" },
              { id: "villain", label: "악의조직", activeColor: "#f43f5e" },
              { id: "bureau", label: "관리국", activeColor: "#10b981" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setMainTab(tab.id);
                  setActiveTab("profile");
                }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor:
                    mainTab === tab.id ? tab.activeColor : "transparent",
                  color: mainTab === tab.id ? "#ffffff" : "#9ca3af",
                  fontSize: "12px",
                  fontWeight: "bold",
                  transition: "0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* 1. 마법소녀 모바일 가로바 */}
        {mainTab === "magicalGirl" && (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              padding: "15px 10px",
              gap: "8px",
              scrollbarWidth: "none",
            }}
          >
            {zonesData.map((zone) => (
              <button
                key={zone.code}
                onClick={() => {
                  setSelectedZone(zone.code);
                  setActiveTab("profile");
                }}
                style={{
                  flex: "0 0 auto",
                  padding: "10px 18px",
                  borderRadius: "30px",
                  border:
                    selectedZone === zone.code
                      ? `1px solid ${zone.color}`
                      : "1px solid rgba(255,255,255,0.05)",
                  backgroundColor:
                    selectedZone === zone.code
                      ? `${zone.color}15`
                      : "rgba(255,255,255,0.02)",
                  color: selectedZone === zone.code ? zone.color : "#9ca3af",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {zone.code} {zone.magicalGirl}
              </button>
            ))}
          </div>
        )}

        {/* 2. 악의 조직 모바일 가로바 */}
        {mainTab === "villain" && (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              padding: "15px 10px",
              gap: "8px",
              scrollbarWidth: "none",
            }}
          >
            {villainsData.map((v) => (
              <button
                key={v.code}
                onClick={() => {
                  setSelectedVillain(v.code);
                  setActiveTab("profile");
                }}
                style={{
                  flex: "0 0 auto",
                  padding: "10px 18px",
                  borderRadius: "30px",
                  border:
                    selectedVillain === v.code
                      ? `1px solid ${v.color}`
                      : "1px solid rgba(255,255,255,0.05)",
                  backgroundColor:
                    selectedVillain === v.code
                      ? `${v.color}15`
                      : "rgba(255,255,255,0.02)",
                  color: selectedVillain === v.code ? v.color : "#9ca3af",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {v.code} {v.realName}
              </button>
            ))}
          </div>
        )}

        {/* 3. 관리국 요원 모바일 가로바 */}
        {mainTab === "bureau" && (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              padding: "15px 10px",
              gap: "8px",
              scrollbarWidth: "none",
            }}
          >
            {bureauData.map((b) => (
              <button
                key={b.code}
                onClick={() => {
                  setSelectedBureau(b.code);
                  setActiveTab("profile");
                }}
                style={{
                  flex: "0 0 auto",
                  padding: "10px 18px",
                  borderRadius: "30px",
                  border:
                    selectedBureau === b.code
                      ? `1px solid ${b.color}`
                      : "1px solid rgba(255,255,255,0.05)",
                  backgroundColor:
                    selectedBureau === b.code
                      ? `${b.color}15`
                      : "rgba(255,255,255,0.02)",
                  color: selectedBureau === b.code ? b.color : "#9ca3af",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {b.code} {b.magicalGirl}
              </button>
            ))}
          </div>
        )}

        <main style={{ padding: "0 15px" }}>{renderMainContent()}</main>
      </div>
    );
  }

  // 🖥️ PC 대시보드 버전 (상하 정렬 HUD 와이드 가로 뷰)
  return (
    <div
      style={{
        fontFamily: "'Pretendard', -apple-system, sans-serif",
        backgroundColor: theme.bg,
        color: "#f3f4f6",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, #0f172a 0%, #030712 60%)",
      }}
    >
      {/* [1] 좌측 네비게이션 서랍 공간 */}
      <aside
        style={{
          width: "340px",
          borderRight: theme.border,
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.sidebarBg,
          zIndex: 5,
        }}
      >
        <div
          style={{
            padding: "35px 30px",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              color: currentData.color,
              letterSpacing: "4px",
              fontWeight: "800",
              marginBottom: "15px",
            }}
          >
            <span>HUD INTERFACE</span>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: currentData.color,
                boxShadow: theme.accentGlow,
              }}
            ></span>
          </div>

          {/* 메인 3대 통합 시스템 탭 */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: "4px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.04)",
              marginBottom: "20px",
            }}
          >
            {[
              { id: "magicalGirl", label: "마법소녀", color: "#3b82f6" },
              { id: "villain", label: "악의조직", color: "#f43f5e" },
              { id: "bureau", label: "관리국", color: "#10b981" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setMainTab(tab.id);
                  setActiveTab("profile");
                }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor:
                    mainTab === tab.id ? tab.color : "transparent",
                  color: mainTab === tab.id ? "#ffffff" : "#6b7280",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h1
            style={{
              fontSize: "20px",
              margin: "0",
              fontWeight: "900",
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            {mainTab === "magicalGirl"
              ? "마법소녀 목록"
              : mainTab === "villain"
              ? "악의조직 목록"
              : "관리국 목록"}
          </h1>
        </div>

        {/* 대분류 상태 및 활성화 데이터 탭 텍스트 바인딩 가로 구조화 */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 15px" }}>
          {mainTab === "magicalGirl" &&
            zonesData.map((zone) => (
              <button
                key={zone.code}
                onClick={() => {
                  setSelectedZone(zone.code);
                  setActiveTab("profile");
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 20px",
                  margin: "3px 0",
                  border: "none",
                  borderRadius: "14px",
                  backgroundColor:
                    selectedZone === zone.code
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
                  borderLeft:
                    selectedZone === zone.code
                      ? `4px solid ${zone.color}`
                      : "4px solid transparent",
                  color: selectedZone === zone.code ? "#ffffff" : "#4b5563",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                <b
                  style={{
                    width: "45px",
                    fontSize: "15px",
                    color: selectedZone === zone.code ? zone.color : "#4b5563",
                  }}
                >
                  {zone.code}
                </b>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: selectedZone === zone.code ? "700" : "500",
                  }}
                >
                  {zone.magicalGirl}
                </span>
                {selectedZone === zone.code && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: zone.color,
                    }}
                  >
                    LIVE
                  </span>
                )}
              </button>
            ))}

          {mainTab === "villain" &&
            villainsData.map((v) => (
              <button
                key={v.code}
                onClick={() => {
                  setSelectedVillain(v.code);
                  setActiveTab("profile");
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 20px",
                  margin: "3px 0",
                  border: "none",
                  borderRadius: "14px",
                  backgroundColor:
                    selectedVillain === v.code
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
                  borderLeft:
                    selectedVillain === v.code
                      ? `4px solid ${v.color}`
                      : "4px solid transparent",
                  color: selectedVillain === v.code ? "#ffffff" : "#4b5563",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                <b
                  style={{
                    width: "45px",
                    fontSize: "15px",
                    color: selectedVillain === v.code ? v.color : "#4b5563",
                  }}
                >
                  {v.code}
                </b>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: selectedVillain === v.code ? "700" : "500",
                  }}
                >
                  {v.realName}
                </span>
                {selectedVillain === v.code && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: v.color,
                    }}
                  >
                    TARGET
                  </span>
                )}
              </button>
            ))}

          {mainTab === "bureau" &&
            bureauData.map((b) => (
              <button
                key={b.code}
                onClick={() => {
                  setSelectedBureau(b.code);
                  setActiveTab("profile");
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 20px",
                  margin: "3px 0",
                  border: "none",
                  borderRadius: "14px",
                  backgroundColor:
                    selectedBureau === b.code
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
                  borderLeft:
                    selectedBureau === b.code
                      ? `4px solid ${b.color}`
                      : "4px solid transparent",
                  color: selectedBureau === b.code ? "#ffffff" : "#4b5563",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                <b
                  style={{
                    width: "45px",
                    fontSize: "15px",
                    color: selectedBureau === b.code ? b.color : "#4b5563",
                  }}
                >
                  {b.code}
                </b>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: selectedBureau === b.code ? "700" : "500",
                  }}
                >
                  {b.magicalGirl}
                </span>
                {selectedBureau === b.code && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: b.color,
                    }}
                  >
                    LIVE
                  </span>
                )}
              </button>
            ))}
        </div>
      </aside>

      {/* [2] 메인 대시보드 뷰포트 영역 */}
      <main
        style={{
          flex: 1,
          padding: "45px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            paddingBottom: "25px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "13px",
                color: "#6b7280",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              <span>{currentData.base}</span>
              <span
                style={{
                  width: "1px",
                  height: "10px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              ></span>
              <span
                style={{ color: currentData.color, fontWeight: "700" }}
              ></span>
            </div>
            <h2
              style={{
                fontSize: "42px",
                margin: 0,
                fontWeight: "900",
                color: "#ffffff",
                letterSpacing: "-1.5px",
              }}
            >
              {displayName}
              <span
                style={{
                  fontSize: "18px",
                  color: "#4b5563",
                  fontWeight: "500",
                  marginLeft: "12px",
                }}
              >
                [ {currentData.realName || currentData.name} ]
              </span>
            </h2>
          </div>
          <div style={{ textAlign: "right", fontFamily: "monospace" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#4b5563",
                letterSpacing: "1px",
              }}
            >
              SYS_LOG_CLOCK
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#9ca3af",
              }}
            >
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* 상단 이미지 배치 + 그 아래 가로 정렬 정보 컨트롤 배치 구조 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            flex: 1,
          }}
        >
          {/* 이미지 영역 (1632*964 비율) */}
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              aspectRatio: "1632 / 964",
              borderRadius: "28px",
              overflow: "hidden",
              border: `1px solid ${currentData.color}44`,
              position: "relative",
              boxShadow: theme.glow,
              flexShrink: 0,
            }}
          >
            <img
              src={currentData.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "30px 20px 20px",
                background: "linear-gradient(to top, #030712 90%, transparent)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: currentData.color,
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  marginBottom: "2px",
                }}
              >
                {mainTab === "magicalGirl"
                  ? "ASSIGNED ZONE"
                  : mainTab === "villain"
                  ? "THREAT LEVEL INDICATOR"
                  : "MANAGEMENT AUTHORITY BRANCH"}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#ffffff",
                }}
              >
                {currentData.region || currentData.base || currentData.branch}
              </div>
            </div>
          </div>

          {/* 하단 정보 데이터 패널 서랍 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            {/* 탭 헤더 선택 제어 바 */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "14px",
                width: "fit-content",
                border: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              {["profile", "ability", "backstory"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor:
                      activeTab === t ? currentData.color : "transparent",
                    color: activeTab === t ? "#ffffff" : "#6b7280",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {t === "profile"
                    ? "인적 사항"
                    : t === "ability"
                    ? "고유 능력"
                    : "기록 보관소"}
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 패널 인클로저 */}
            <div
              style={{
                ...glassEffect,
                borderRadius: "24px",
                padding: "40px",
                fontSize: "15px",
                lineHeight: "1.8",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              {activeTab === "profile" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "25px 40px",
                  }}
                >
                  <InfoBlock
                    label="활동명"
                    value={displayName}
                    color={currentData.color}
                  />
                  <InfoBlock
                    label="본명"
                    value={currentData.realName || currentData.name}
                    color={currentData.color}
                  />
                  <InfoBlock
                    label="소속 및 관할"
                    value={
                      currentData.base ||
                      currentData.region ||
                      currentData.branch
                    }
                    color={currentData.color}
                  />
                  <InfoBlock
                    label="신장"
                    value={currentData.profile.height}
                    color={currentData.color}
                  />
                  <InfoBlock
                    label="마법봉 / 상징 무기"
                    value={
                      currentData.profile.weapon || currentData.profile.species
                    }
                    color={currentData.color}
                    isAccent={true}
                  />
                  <InfoBlock
                    label="성향 및 MBTI"
                    value={currentData.profile.mbti}
                    color={currentData.color}
                  />
                  <InfoBlock
                    label="성격 키워드"
                    value={currentData.profile.keywords}
                    color={currentData.color}
                  />

                  <div
                    style={{
                      gridColumn: "1 / span 2",
                      marginTop: "15px",
                      padding: "24px",
                      borderRadius: "20px",
                      backgroundColor: "rgba(239, 68, 68, 0.04)",
                      border: "1px solid rgba(239, 68, 68, 0.12)",
                    }}
                  >
                    <div
                      style={{
                        color: "#ef4444",
                        fontWeight: "800",
                        fontSize: "13px",
                        letterSpacing: "1px",
                        marginBottom: "6px",
                      }}
                    >
                      🚨 CRITICAL PROFILE WARNING (기밀 특이사항 보고)
                    </div>
                    <span
                      style={{
                        color: "#fca5a5",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {currentData.profile.note}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "ability" && (
                <div>
                  <h3
                    style={{
                      color: currentData.color,
                      fontSize: "22px",
                      fontWeight: "800",
                      margin: "0 0 16px 0",
                    }}
                  >
                    ⚡ {currentData.ability.name}
                  </h3>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "15px",
                      margin: 0,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {currentData.ability.details}
                  </p>
                </div>
              )}

              {activeTab === "backstory" && (
                <div style={{ whiteSpace: "pre-line", color: "#cbd5e1" }}>
                  <h3
                    style={{
                      color: "#4b5563",
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0 0 20px 0",
                      letterSpacing: "1px",
                    }}
                  >
                    ■ SECURE FILES // 연대기 아카이브 백스토리
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      lineHeight: "1.8",
                      color: "#9ca3af",
                    }}
                  >
                    {currentData.backstory}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <p
          style={{
            fontSize: "11px",
            color: "#374151",
            textAlign: "right",
            margin: 0,
          }}
        >
          ※ 본 데이터 시트는 공공 전산망 연동 규격 인증 프로토콜에 의해
          보호됩니다.
        </p>
      </main>
    </div>
  );

  // 모바일 통합 콘텐츠 분기 헬퍼 함수
  function renderMainContent() {
    return (
      <div
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: theme.cardBg,
          border: theme.border,
          borderRadius: "24px",
          padding: "20px",
          boxShadow: theme.glow,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1632 / 964",
              borderRadius: "24px",
              overflow: "hidden",
              border: `1px solid ${currentData.color}88`,
              padding: "4px",
              boxShadow: theme.accentGlow,
              marginBottom: "15px",
              flexShrink: 0,
            }}
          >
            <img
              src={currentData.image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                objectFit: "cover",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "11px",
              color: currentData.color,
              fontWeight: "bold",
              backgroundColor: `${currentData.color}11`,
              padding: "4px 10px",
              borderRadius: "6px",
              marginBottom: "6px",
            }}
          >
            {currentData.branch || currentData.base}
          </span>
          <h2
            style={{
              fontSize: "24px",
              margin: 0,
              fontWeight: "800",
              color: "#ffffff",
            }}
          >
            {displayName}
          </h2>
          <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "2px" }}>
            {currentData.region || currentData.base || "통제 구역 외 아카이브"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "20px",
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "4px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          {["profile", "ability", "backstory"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                backgroundColor:
                  activeTab === t ? currentData.color : "transparent",
                color: activeTab === t ? "#ffffff" : "#9ca3af",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {t === "profile" ? "스펙" : t === "ability" ? "능력" : "기록"}
            </button>
          ))}
        </div>

        <div
          style={{
            backgroundColor: theme.innerBg,
            padding: "20px",
            borderRadius: "16px",
            minHeight: "180px",
          }}
        >
          {activeTab === "profile" && (
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.7",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div>
                <span style={{ color: "#6b7280" }}>본명 식별:</span>{" "}
                {currentData.realName || currentData.name}
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>신장 / 성향:</span>{" "}
                {currentData.profile.height} / {currentData.profile.mbti}
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>무기 및 직책:</span>{" "}
                <span style={{ color: currentData.color, fontWeight: "bold" }}>
                  {currentData.profile.weapon || currentData.profile.species}
                </span>
              </div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>
                {currentData.profile.keywords}
              </div>
              <div
                style={{
                  color: "#fca5a5",
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                  padding: "12px",
                  borderRadius: "10px",
                  marginTop: "8px",
                }}
              >
                {currentData.profile.note}
              </div>
            </div>
          )}
          {activeTab === "ability" && (
            <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
              <div
                style={{
                  fontWeight: "bold",
                  color: currentData.color,
                  marginBottom: "8px",
                }}
              >
                {currentData.ability.name}
              </div>
              <p
                style={{ color: "#d1d5db", margin: 0, whiteSpace: "pre-line" }}
              >
                {currentData.ability.details}
              </p>
            </div>
          )}
          {activeTab === "backstory" && (
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.7",
                color: "#d1d5db",
                whiteSpace: "pre-line",
              }}
            >
              {currentData.backstory}
            </div>
          )}
        </div>
      </div>
    );
  }
}

// PC 텍스트 유닛 모듈형 블록 (App 컴포넌트 바깥 맨 아래에 배치)
function InfoBlock({ label, value, color, isAccent }) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.02)",
        paddingBottom: "10px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#4b5563",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: isAccent ? color : "#e5e7eb",
        }}
      >
        {value}
      </div>
    </div>
  );
}
