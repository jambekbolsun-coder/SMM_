import { chatData } from "./chatbotData.js";
import { intents, fallbackAnswers } from "./chatbotIntents.js";

const normalizeText = (text) => text?.toLowerCase().trim() || "";
export const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getMessageTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
};

export const createBotMessage = (text, options = {}) => ({
  id: `bot-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  from: "bot",
  text,
  time: getMessageTime(),
  buttons: options.buttons || [],
});

export const createUserMessage = (text) => ({
  id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  from: "user",
  text,
  time: getMessageTime(),
});

export const isLeadRequest = (text) => {
  const normalized = normalizeText(text);
  return chatData.leadKeywords.some((keyword) => normalized.includes(keyword));
};

export const getIntentFromMessage = (text) => {
  const normalized = normalizeText(text);
  const scored = intents
    .map((intent) => ({
      intent,
      score: intent.keywords.reduce(
        (count, keyword) => count + (normalized.includes(keyword) ? 1 : 0),
        0,
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.length ? scored[0].intent : null;
};

export const extractClientInfo = (text, profile) => {
  const normalized = normalizeText(text);
  let updated = { ...profile };

  const nameMatch = text.match(/(?:меня зовут|я зовут|я -|я —|имя )\s*([А-ЯЁа-яёA-Za-z]+)/i);
  if (nameMatch) {
    updated.name = nameMatch[1];
  }

  if (!updated.package) {
    Object.entries(chatData.packageMatchers).some(([packageName, aliases]) => {
      if (aliases.some((keyword) => normalized.includes(keyword))) {
        updated.package = packageName;
        return true;
      }
      return false;
    });
  }

  if (!updated.service) {
    Object.entries(chatData.serviceMatchers).some(([serviceName, aliases]) => {
      if (aliases.some((keyword) => normalized.includes(keyword))) {
        updated.service = serviceName;
        return true;
      }
      return false;
    });
  }

  return updated;
};

export const getButtonsForIntent = (intentId, t) => {
  const defaultCtas = [
    {
      id: "apply",
      label: t("chat_cta_apply"),
      action: "route",
      route: "/contacts",
    },
    {
      id: "whatsapp",
      label: t("chat_cta_whatsapp"),
      action: "url",
      url: "https://wa.me/996700000000",
    },
  ];

  const actionMap = {
    pricing: ["apply", "cases", "whatsapp"],
    services: ["apply", "manager", "instagram"],
    timing: ["apply", "manager"],
    target: ["apply", "whatsapp"],
    instagram: ["apply", "cases", "instagram"],
    tiktok: ["apply", "cases"],
    reels: ["apply", "cases"],
    mobilography: ["apply", "cases"],
    design: ["apply", "manager"],
    team: ["apply", "manager"],
    reviews: ["cases", "apply"],
    contacts: ["apply", "whatsapp", "telegram"],
    cooperation: ["apply", "manager"],
  };

  const buttons = actionMap[intentId] || ["apply", "manager"];

  return buttons
    .map((buttonId) => {
      const config = chatData.ctaActions.find((item) => item.id === buttonId);
      if (!config) return null;
      return {
        id: config.id,
        label: t(config.labelKey),
        action: config.type,
        route: config.route,
        url: config.url,
      };
    })
    .filter(Boolean);
};

export const getReplyForIntent = (text, t, profile) => {
  const intent = getIntentFromMessage(text);
  const namePrefix = profile.name ? t("chat_reply_personalized_prefix", { name: profile.name }) : "";

  if (isLeadRequest(text)) {
    return {
      text: `${namePrefix}${t("chat_lead_request")}`,
      buttons: [
        {
          id: "apply",
          label: t("chat_cta_apply"),
          action: "route",
          route: "/contacts",
        },
        {
          id: "whatsapp",
          label: t("chat_cta_whatsapp"),
          action: "url",
          url: "https://wa.me/996700000000",
        },
        {
          id: "telegram",
          label: t("chat_cta_telegram"),
          action: "url",
          url: "https://t.me/smmkadr",
        },
      ],
    };
  }

  if (intent) {
    const answer = t(getRandomElement(intent.answerKeys));
    const buttons = getButtonsForIntent(intent.id, t);
    const serviceHint = profile.service ? `${t("chat_reply_service_saved", { service: profile.service })}` : "";
    const packageHint = profile.package ? `${t("chat_reply_package_saved", { package: profile.package })}` : "";

    return {
      text: `${namePrefix}${serviceHint}${packageHint}${answer}`.trim(),
      buttons,
    };
  }

  return {
    text: `${namePrefix}${t(getRandomElement(fallbackAnswers))}`,
    buttons: [
      {
        id: "apply",
        label: t("chat_cta_apply"),
        action: "route",
        route: "/contacts",
      },
      {
        id: "whatsapp",
        label: t("chat_cta_whatsapp"),
        action: "url",
        url: "https://wa.me/996700000000",
      },
    ],
  };
};

export const getTypingTextOptions = (t) => [
  t("chat_typing_1"),
  t("chat_typing_2"),
  t("chat_typing_3"),
  t("chat_typing_4"),
];
