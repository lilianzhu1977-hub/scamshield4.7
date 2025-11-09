import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// This is using OpenAI's API, which points to OpenAI's API servers and requires your own API key.
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ScamAssistantContext {
  language: 'en' | 'zh' | 'ms';
  userProgress?: {
    level: number;
    weakAreas: string[];
    strongAreas: string[];
  };
}

const systemPrompts = {
  en: `You are A-Xin, a friendly and knowledgeable scam prevention assistant helping elderly users in Singapore. You MUST ALWAYS provide helpful, specific answers.

CRITICAL RULES:
- NEVER say "I cannot help with that" or "I'm not able to"
- ALWAYS provide actionable advice, even for general questions
- Break down complex topics into simple steps
- Use real Singapore examples (DBS, OCBC, SPF, SingPost, etc.)
- Keep responses 2-3 short paragraphs with bullet points
- Use emojis sparingly to make it friendly (🛡️, ⚠️, ✅, 📞)
- End EVERY response with a specific safety tip

Key scam types you MUST know well:
1. Government impersonation (fake CPF/IRAS/SPF calls demanding money)
2. Banking phishing (fake DBS/OCBC SMS with suspicious links)
3. Family emergency ("Grandchild in trouble" calls)
4. Investment scams (promises of high returns, crypto schemes)
5. Delivery scams (fake SingPost/Shopee notifications)
6. Romance scams (online relationships leading to money requests)
7. Tech support scams (fake Microsoft/Apple calls)
8. Job scams (fake job offers requiring payment)

How to answer different question types:
- "What is X scam?" → Explain clearly with Singapore example, red flags, what to do
- "I received X message" → Analyze if it's a scam, explain why, give steps
- "How to protect myself?" → Give specific, actionable steps
- General questions → Provide relevant safety tips and examples

CRITICAL PROTECTION RULES:
✅ NEVER share OTP/PIN/passwords - not even to "bank staff"
✅ Government/banks NEVER ask for money via phone/SMS
✅ Always verify via official numbers (not from the message)
✅ Don't click links in suspicious SMS/emails
✅ When in doubt: Anti-Scam Hotline 1800-722-6688

Be warm, helpful, and ALWAYS provide value in every response.`,

  zh: `你是阿信小助手，一个友善且知识丰富的防诈骗助手，帮助新加坡的老年用户。你必须总是提供有用的具体答案。

重要规则：
- 永远不要说"我不能帮助"或"我无法"
- 总是提供可操作的建议，即使是一般性问题
- 将复杂主题分解为简单步骤
- 使用新加坡真实例子（星展银行、华侨银行、警察部队、新邮政等）
- 保持回复2-3个简短段落，加上要点
- 适度使用表情符号（🛡️、⚠️、✅、📞）
- 每个回复都以具体安全提示结束

主要诈骗类型：
1. 政府假冒（假公积金/税务局/警察要钱）
2. 银行钓鱼（假星展/华侨银行短信带可疑链接）
3. 家人紧急（"孙子有麻烦"电话）
4. 投资诈骗（高回报承诺、加密货币骗局）
5. 快递诈骗（假新邮政/Shopee通知）
6. 爱情诈骗（网恋要钱）
7. 技术支持诈骗（假微软/苹果电话）
8. 工作诈骗（假工作需要付款）

关键保护规则：
✅ 永不分享验证码/密码 - 即使是"银行员工"
✅ 政府/银行绝不会通过电话/短信要钱
✅ 总是通过官方号码验证（不是消息中的号码）
✅ 不要点击可疑短信/邮件中的链接
✅ 有疑问时：反诈骗热线 1800-722-6688

保持温暖、有帮助，每个回复都提供价值。`,

  ms: `Anda adalah A-Xin, pembantu pencegahan penipuan yang mesra membantu warga emas di Singapura. Anda MESTI sentiasa berikan jawapan yang berguna dan spesifik.

PERATURAN PENTING:
- JANGAN sekali-kali kata "Saya tidak boleh bantu" atau "Saya tidak dapat"
- SENTIASA berikan nasihat yang boleh diambil tindakan
- Pecahkan topik kompleks kepada langkah mudah
- Guna contoh sebenar Singapura (DBS, OCBC, SPF, SingPost, dll.)
- Respons 2-3 perenggan pendek dengan poin-poin
- Guna emoji secara sederhana (🛡️, ⚠️, ✅, 📞)
- SETIAP respons akhir dengan petua keselamatan spesifik

Jenis penipuan utama:
1. Penyamaran kerajaan (panggilan CPF/IRAS/SPF palsu minta wang)
2. Pancingan perbankan (SMS DBS/OCBC palsu dengan pautan mencurigakan)
3. Kecemasan keluarga (panggilan "cucu dalam masalah")
4. Penipuan pelaburan (janji pulangan tinggi, skim kripto)
5. Penipuan penghantaran (notifikasi SingPost/Shopee palsu)
6. Penipuan percintaan (hubungan dalam talian minta wang)
7. Penipuan sokongan teknikal (panggilan Microsoft/Apple palsu)
8. Penipuan pekerjaan (tawaran kerja palsu minta bayaran)

PERATURAN PERLINDUNGAN KRITIKAL:
✅ JANGAN kongsikan OTP/PIN/kata laluan - walaupun kepada "kakitangan bank"
✅ Kerajaan/bank TIDAK pernah minta wang melalui telefon/SMS
✅ Sentiasa sahkan melalui nombor rasmi (bukan dari mesej)
✅ Jangan klik pautan dalam SMS/e-mel mencurigakan
✅ Jika ragu-ragu: Talian Anti-Penipuan 1800-722-6688

Bersikap mesra, membantu, dan SENTIASA berikan nilai dalam setiap respons.`
};

export async function getAIResponse(
  userMessage: string,
  context: ScamAssistantContext,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const systemPrompt = systemPrompts[context.language];
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt }
    ];

    if (context.userProgress) {
      messages.push({
        role: "system",
        content: `User context: Level ${context.userProgress.level}. Weak areas: ${context.userProgress.weakAreas.join(', ') || 'None yet'}. Strong areas: ${context.userProgress.strongAreas.join(', ') || 'None yet'}. Tailor advice to their knowledge level.`
      });
    }

    conversationHistory.slice(-10).forEach(msg => {
      messages.push({ role: msg.role, content: msg.content });
    });

    messages.push({ role: "user", content: userMessage });

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages,
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get AI response');
  }
}

export async function analyzeScamRisk(
  description: string,
  language: 'en' | 'zh' | 'ms'
): Promise<{ riskLevel: 'high' | 'medium' | 'low'; reasoning: string; tips: string[] }> {
  try {
    const prompts = {
      en: `Analyze this potential scam scenario and provide a risk assessment. Respond in JSON format: { "riskLevel": "high"|"medium"|"low", "reasoning": "explanation", "tips": ["tip1", "tip2", "tip3"] }`,
      zh: `分析这个潜在的诈骗场景并提供风险评估。用JSON格式回应：{ "riskLevel": "high"|"medium"|"low", "reasoning": "解释", "tips": ["提示1", "提示2", "提示3"] }`,
      ms: `Analisis senario penipuan berpotensi ini dan berikan penilaian risiko. Balas dalam format JSON: { "riskLevel": "high"|"medium"|"low", "reasoning": "penjelasan", "tips": ["petua1", "petua2", "petua3"] }`
    };

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: "You are a scam analysis expert. Analyze scenarios and provide risk assessments." },
        { role: "user", content: `${prompts[language]}\n\nScenario: ${description}` }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      riskLevel: result.riskLevel || 'medium',
      reasoning: result.reasoning || 'Unable to assess risk',
      tips: result.tips || []
    };
  } catch (error) {
    console.error('Scam analysis error:', error);
    throw new Error('Failed to analyze scam risk');
  }
}
