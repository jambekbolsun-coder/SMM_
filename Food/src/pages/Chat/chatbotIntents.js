export const intents = [
  {
    id: "pricing",
    category: "price",
    keywords: ["цена", "стоимость", "пакет", "сколько", "бюджет", "цену", "прайс"],
    answerKeys: [
      "chat_intent_price_1",
      "chat_intent_price_2",
      "chat_intent_price_3",
    ],
  },
  {
    id: "services",
    category: "services",
    keywords: [
      "услуга",
      "услуги",
      "продвижение",
      "контент",
      "таргет",
      "видео",
      "дизайн",
      "контент",
    ],
    answerKeys: [
      "chat_intent_services_1",
      "chat_intent_services_2",
      "chat_intent_services_3",
    ],
  },
  {
    id: "timing",
    category: "timing",
    keywords: ["срок", "сроки", "когда", "быстро", "скоро", "детали"],
    answerKeys: [
      "chat_intent_timeline_1",
      "chat_intent_timeline_2",
      "chat_intent_timeline_3",
    ],
  },
  {
    id: "target",
    category: "target",
    keywords: ["таргет", "целевая", "аудиторию", "кампанию", "рекламу"],
    answerKeys: [
      "chat_intent_target_1",
      "chat_intent_target_2",
      "chat_intent_target_3",
    ],
  },
  {
    id: "instagram",
    category: "instagram",
    keywords: ["instagram", "инстаграм", "insta", "сторис", "лента"],
    answerKeys: [
      "chat_intent_instagram_1",
      "chat_intent_instagram_2",
    ],
  },
  {
    id: "tiktok",
    category: "tiktok",
    keywords: ["tiktok", "тикток", "тик-ток", "тренд"],
    answerKeys: [
      "chat_intent_tiktok_1",
      "chat_intent_tiktok_2",
    ],
  },
  {
    id: "reels",
    category: "reels",
    keywords: ["reels", "рилс", "ролик", "видео"],
    answerKeys: [
      "chat_intent_reels_1",
      "chat_intent_reels_2",
    ],
  },
  {
    id: "mobilography",
    category: "mobilography",
    keywords: ["мобилограф", "мобилография", "съёмка на телефон", "съемка на телефон"],
    answerKeys: [
      "chat_intent_mobilography_1",
      "chat_intent_mobilography_2",
    ],
  },
  {
    id: "design",
    category: "design",
    keywords: ["дизайн", "графика", "оформление", "брендбук", "фирменный стиль"],
    answerKeys: [
      "chat_intent_design_1",
      "chat_intent_design_2",
    ],
  },
  {
    id: "team",
    category: "team",
    keywords: ["команда", "специалист", "таргетолог", "мобилограф", "дизайнер"],
    answerKeys: [
      "chat_intent_team_1",
      "chat_intent_team_2",
    ],
  },
  {
    id: "reviews",
    category: "reviews",
    keywords: ["отзыв", "кейсы", "результат", "клиенты", "работаете"],
    answerKeys: [
      "chat_intent_reviews_1",
      "chat_intent_reviews_2",
    ],
  },
  {
    id: "contacts",
    category: "contacts",
    keywords: ["контакт", "связь", "телефон", "whatsapp", "telegram", "телега"],
    answerKeys: [
      "chat_intent_contacts_1",
      "chat_intent_contacts_2",
    ],
  },
  {
    id: "cooperation",
    category: "cooperation",
    keywords: ["сотрудничество", "работать", "партнёр", "партнёрство", "сотрудничаем"],
    answerKeys: [
      "chat_intent_cooperation_1",
      "chat_intent_cooperation_2",
    ],
  },
];

export const fallbackAnswers = [
  "chat_intent_fallback_1",
  "chat_intent_fallback_2",
  "chat_intent_fallback_3",
];
