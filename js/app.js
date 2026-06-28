/* ============================================
   JDE Training System — Main Application
   SPA Router + Components + Page Renderers
   ============================================ */

let currentPage = 'login';
let appMode = 'student'; // 'student' | 'admin'
let popupVisible = false;

// ---- AI Chatbot System (Agente Interno) ----
const aiKnowledgeBase = [
  {
    keywords: ['nr-6', 'nr6', 'norma', 'regulamentadora', 'o que é', 'o que e', 'sobre a nr'],
    answer: 'A NR-6 é a Norma Regulamentadora nº 6, do Ministério do Trabalho, que estabelece as regras sobre Equipamentos de Proteção Individual (EPI). Ela define as obrigações tanto do empregador quanto do empregado em relação ao fornecimento, uso, conservação e substituição dos EPIs no ambiente de trabalho.'
  },
  {
    keywords: ['epi', 'equipamento', 'proteção individual', 'o que são', 'o que sao'],
    answer: 'EPI (Equipamento de Proteção Individual) é todo dispositivo de uso individual destinado a proteger a saúde e a integridade física do trabalhador. Inclui capacetes, óculos de proteção, protetores auriculares, máscaras respiratórias, luvas, calçados de segurança, cintos de segurança, entre outros. Todo EPI deve possuir o Certificado de Aprovação (CA) do Ministério do Trabalho.'
  },
  {
    keywords: ['tipo', 'tipos', 'quais', 'lista', 'exemplos', 'exemplo'],
    answer: 'Os principais tipos de EPI são:\n\n• Proteção da cabeça: capacete de segurança, capuz\n• Proteção dos olhos e face: óculos, viseira, protetor facial\n• Proteção auditiva: abafador (concha) e protetor de inserção (plug)\n• Proteção respiratória: máscara e respirador com filtro\n• Proteção das mãos: luvas (borracha, couro, malha de aço)\n• Proteção dos pés: botina e bota de segurança com biqueira\n• Proteção do corpo inteiro: macacão, avental\n• Proteção contra quedas: cinto de segurança tipo paraquedista\n\nCada EPI deve ser adequado ao risco específico da atividade.'
  },
  {
    keywords: ['ca', 'certificado', 'aprovação', 'aprovacao'],
    answer: 'O Certificado de Aprovação (CA) é um documento emitido pelo Ministério do Trabalho e Emprego que certifica que o EPI foi testado e aprovado conforme normas técnicas. Todo EPI comercializado no Brasil DEVE ter o CA válido. Você pode verificar o CA na marcação do próprio equipamento. Usar EPI sem CA válido é considerado irregular e pode gerar penalidades para a empresa.'
  },
  {
    keywords: ['empregador', 'empresa', 'obrigação', 'obrigações', 'obrigacao', 'dever', 'fornecer', 'fornecimento'],
    answer: 'As obrigações do empregador segundo a NR-6 são:\n\n• Fornecer o EPI gratuitamente, adequado ao risco da atividade\n• Garantir que o EPI esteja em perfeito estado de conservação e funcionamento\n• Orientar e treinar o trabalhador sobre o uso adequado, guarda e conservação\n• Substituir imediatamente quando danificado ou extraviado\n• Exigir o uso correto por parte do trabalhador\n• Comunicar ao MTE qualquer irregularidade\n• Registrar o fornecimento do EPI ao trabalhador'
  },
  {
    keywords: ['empregado', 'trabalhador', 'funcionário', 'funcionario', 'responsabilidade', 'minha obrigação', 'minha obrigacao', 'devo'],
    answer: 'As obrigações do trabalhador segundo a NR-6 são:\n\n• Usar o EPI apenas para a finalidade a que se destina\n• Responsabilizar-se pela guarda e conservação do EPI\n• Comunicar ao empregador qualquer dano ou alteração que torne o EPI impróprio para uso\n• Cumprir as orientações de uso recebidas no treinamento\n\nO trabalhador que se recusar a usar o EPI fornecido pode sofrer advertência, suspensão e até demissão por justa causa.'
  },
  {
    keywords: ['recusar', 'recusa', 'não usar', 'nao usar', 'justa causa', 'demissão', 'demissao', 'punição', 'punicao', 'advertência', 'advertencia'],
    answer: 'Sim, a recusa em usar o EPI fornecido é considerada falta grave. O trabalhador pode sofrer:\n\n1. Advertência verbal\n2. Advertência por escrito\n3. Suspensão\n4. Demissão por justa causa (em caso de reincidência)\n\nIsso está previsto no artigo 158 da CLT e reforçado pela NR-6. O EPI é uma proteção para sua segurança e seu uso é obrigatório.'
  },
  {
    keywords: ['conserv', 'higien', 'limpeza', 'limpar', 'guardar', 'armazen', 'cuidado', 'manutenção', 'manutencao'],
    answer: 'Cuidados com o EPI:\n\n• Inspecione o EPI antes de cada uso, verificando danos, desgaste ou defeitos\n• Higienize conforme orientação do fabricante (alguns podem ser lavados, outros apenas limpos com pano úmido)\n• Armazene em local limpo, seco e ventilado, longe de produtos químicos\n• Nunca modifique ou adapte o EPI — isso invalida sua proteção\n• Comunique imediatamente ao empregador se identificar qualquer dano\n• O empregador deve substituir o EPI danificado gratuitamente'
  },
  {
    keywords: ['danificado', 'dano', 'quebr', 'estragado', 'defeito', 'substituir', 'substituição', 'substituicao', 'trocar', 'troca'],
    answer: 'Ao identificar que seu EPI está danificado, você deve:\n\n1. Parar de usar o equipamento imediatamente\n2. Comunicar ao empregador ou supervisor\n3. Solicitar a substituição\n\nO empregador é obrigado a substituir o EPI danificado ou extraviado gratuitamente e imediatamente. Continuar trabalhando com EPI danificado coloca sua segurança em risco e é uma irregularidade.'
  },
  {
    keywords: ['pop-up', 'popup', 'presença', 'presenca', 'validação', 'validacao', 'verificação', 'verificacao'],
    answer: 'O sistema de pop-ups é a nossa forma de validar que você está realmente assistindo ao treinamento. Funciona assim:\n\n• Durante o vídeo, pop-ups aparecem em intervalos aleatórios (a cada 1 a 3 minutos)\n• Cada pop-up exibe 2 caracteres que você deve digitar\n• Você tem 20 segundos para responder\n• É necessário acertar pelo menos 70% dos pop-ups para ter presença validada\n• O vídeo pausa automaticamente quando o pop-up aparece e retoma após a resposta'
  },
  {
    keywords: ['avaliação', 'avaliacao', 'prova', 'questionário', 'questionario', 'questões', 'questoes', 'pergunta'],
    answer: 'Ao final do vídeo, você fará uma avaliação com 10 questões sobre o conteúdo da NR-6. Informações importantes:\n\n• A meta de aprovação é 80% (acertar pelo menos 8 de 10 questões)\n• As questões são de múltipla escolha com 4 alternativas\n• Se reprovar em um tema específico, apenas aquele tema será liberado para revisão\n• Na revisão, você assiste ao conteúdo novamente e faz uma nova avaliação com questões diferentes, mas mesmo nível de dificuldade\n• O histórico de tentativas fica registrado'
  },
  {
    keywords: ['certificado', 'diploma', 'comprovante', 'conclusão', 'conclusao'],
    answer: 'Após concluir o treinamento com aprovação (≥80% na avaliação + ≥70% nos pop-ups), um certificado digital é gerado automaticamente contendo:\n\n• Seu nome completo\n• Nome do treinamento e carga horária\n• Data de conclusão e percentual de aproveitamento\n• QR Code para validação online\n• Código hash exclusivo para autenticidade\n• Assinatura visual da empresa\n\nVocê pode baixar o certificado em PDF ou compartilhar o link de validação.'
  },
  {
    keywords: ['reprovar', 'reprovação', 'reprovacao', 'reprovei', 'não passei', 'nao passei', 'refazer', 'recuperação', 'recuperacao', 'tema'],
    answer: 'Se você reprovar na avaliação, nosso sistema de IA adaptativa funciona assim:\n\n• Identifica exatamente em qual tema você teve dificuldade\n• Libera apenas aquele tema para revisão (você não precisa refazer tudo)\n• Você assiste ao conteúdo daquele módulo novamente + um resumo em texto\n• Uma nova avaliação é gerada com questões diferentes, mas do mesmo nível de dificuldade\n• Você tem até 3 tentativas por tema\n• Os temas já aprovados ficam mantidos'
  },
  {
    keywords: ['prazo', 'tempo', 'vencimento', 'validade', 'quando', 'limite', 'dias'],
    answer: 'Informações sobre prazos:\n\n• Você tem 30 dias a partir da matrícula para concluir o treinamento\n• O certificado tem validade de 1 ano após a emissão\n• Ao se aproximar do vencimento, você receberá notificações para reciclagem\n• Os logs de presença (pop-ups) ficam armazenados por 180 dias conforme LGPD\n• Após o prazo de retenção, os dados são excluídos automaticamente'
  },
  {
    keywords: ['lgpd', 'dados', 'privacidade', 'proteção de dados', 'protecao de dados', 'consentimento', 'exclusão', 'exclusao'],
    answer: 'A plataforma está 100% em conformidade com a LGPD (Lei nº 13.709/2018):\n\n• Consentimento explícito em duas camadas (resumo fácil + termo completo)\n• CPF é exibido de forma mascarada (XXX.XXX.123-XX) em relatórios\n• Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)\n• Logs de pop-ups retidos por no máximo 180 dias\n• Você pode solicitar exclusão dos seus dados a qualquer momento pelo sistema\n• Todos os acessos a dados sensíveis são registrados em log de auditoria'
  },
  {
    keywords: ['ruído', 'ruido', 'barulho', 'som', 'auditiv', 'ouvido', 'surdez'],
    answer: 'Para proteção auditiva, a NR-6 prevê dois tipos principais de EPI:\n\n• Protetor auricular tipo concha (abafador): cobre toda a orelha, indicado para ruídos intensos e contínuos\n• Protetor de inserção (plug): inserido no canal auditivo, mais leve e prático\n\nO uso é obrigatório quando o nível de ruído ultrapassa 85 decibéis (limite de tolerância). A exposição prolongada sem proteção pode causar perda auditiva irreversível.'
  },
  {
    keywords: ['respirat', 'máscara', 'mascara', 'respirador', 'poeira', 'químico', 'quimico', 'gás', 'gas'],
    answer: 'EPIs de proteção respiratória incluem:\n\n• Máscara descartável (PFF1, PFF2, PFF3): para poeiras e névoas\n• Respirador com filtro: para vapores orgânicos e gases\n• Máscara de fuga: para evacuação em emergências\n\nA escolha depende do tipo de contaminante (poeira, névoa, fumo, gás, vapor) e da concentração. O filtro deve ser trocado conforme orientação do fabricante. Nunca use máscara com filtro vencido ou saturado.'
  },
  {
    keywords: ['luva', 'mão', 'mao', 'mãos', 'maos'],
    answer: 'Luvas de proteção variam conforme o risco:\n\n• Luvas de borracha/látex: proteção contra produtos químicos e umidade\n• Luvas de couro/vaqueta: proteção contra abrasão e cortes\n• Luvas de malha de aço: manuseio de materiais cortantes\n• Luvas térmicas: proteção contra calor ou frio extremo\n• Luvas isolantes: proteção contra choque elétrico\n\nÉ fundamental usar o tipo correto para o risco. Luvas inadequadas podem dar falsa sensação de segurança.'
  },
  {
    keywords: ['olá', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hey', 'tudo bem', 'como vai'],
    answer: 'Olá! Sou o assistente de treinamentos da JDE Peet\'s. Estou aqui para ajudar com suas dúvidas sobre a NR-6 e Equipamentos de Proteção Individual. Pode me perguntar sobre tipos de EPI, obrigações, certificados, avaliação, ou qualquer outro assunto do treinamento!'
  },
  {
    keywords: ['obrigado', 'valeu', 'agradeço', 'agradeco', 'thanks', 'brigado'],
    answer: 'De nada! Fico feliz em ajudar. Se tiver mais alguma dúvida sobre o treinamento de NR-6 ou sobre a plataforma, é só perguntar. Bom treinamento! 👷'
  },
  {
    keywords: ['ajuda', 'help', 'como funciona', 'o que você faz', 'o que voce faz', 'comandos'],
    answer: 'Sou o assistente IA da plataforma JDE Peet\'s Training. Posso ajudar com:\n\n• Prazos e datas do treinamento\n• Dúvidas sobre a NR-6 e EPIs\n• Tipos de equipamentos de proteção\n• Obrigações do empregador e empregado\n• Como funciona a avaliação e o certificado\n• Sistema de pop-ups de presença\n• Recuperação por tema\n• Horários e regras\n• LGPD e proteção de dados\n\nÉ só me perguntar!'
  },
  {
    keywords: ['até quando', 'ate quando', 'prazo final', 'data limite', 'último dia', 'ultimo dia', 'vence quando', 'terminar até', 'terminar ate', 'posso fazer até', 'posso fazer ate', 'tenho até', 'tenho ate', 'quando termina'],
    answer: `Seu treinamento de NR-6 foi iniciado em 15/06/2026 e o prazo de conclusão é de 30 dias corridos.\n\n📅 Prazo final: 15/07/2026\n\nVocê ainda tem tempo! Para concluir, é necessário:\n• Assistir ao vídeo completo\n• Responder ≥70% dos pop-ups corretamente\n• Atingir ≥80% na avaliação final (10 questões)\n\nSe precisar de mais tempo, entre em contato com o RH ou seu supervisor.`
  },
  {
    keywords: ['horário', 'horario', 'hora', 'quando posso', 'qualquer hora', 'qualquer horário', 'qualquer horario', 'madrugada', 'noite', 'fim de semana', 'sábado', 'sabado', 'domingo', 'feriado'],
    answer: 'A plataforma está disponível 24 horas por dia, 7 dias por semana! Você pode fazer o treinamento a qualquer momento:\n\n• Dias úteis, finais de semana ou feriados\n• De madrugada, manhã, tarde ou noite\n• No escritório, em casa ou no celular\n\nBasta acessar pelo navegador (Chrome, Edge ou Firefox). O importante é concluir dentro do prazo de 30 dias (até 15/07/2026).'
  },
  {
    keywords: ['quanto tempo', 'duração', 'duracao', 'demora', 'leva quanto', 'horas', 'carga horária', 'carga horaria', 'longo'],
    answer: 'O treinamento de NR-6 tem carga horária total de 3 horas, distribuídas assim:\n\n• Vídeo do treinamento: ~20 minutos\n• Pop-ups de validação durante o vídeo: ~5 minutos extras\n• Avaliação final (10 questões): ~15 minutos\n• Tempo total estimado: 40 a 50 minutos\n\nVocê pode pausar e retomar quando quiser — seu progresso fica salvo automaticamente.'
  },
  {
    keywords: ['pausar', 'pausa', 'parar', 'continuar depois', 'salvar progresso', 'salva', 'voltar depois', 'sair e voltar', 'fechar'],
    answer: 'Sim, você pode pausar o treinamento a qualquer momento! Seu progresso é salvo automaticamente.\n\n• Se fechar o navegador, ao voltar você continua de onde parou\n• Os pop-ups já respondidos ficam registrados\n• O vídeo retoma do ponto em que você parou\n\nSó lembre de concluir tudo dentro do prazo (até 15/07/2026).'
  },
  {
    keywords: ['celular', 'mobile', 'smartphone', 'tablet', 'telefone', 'pelo celular', 'no celular', 'responsivo'],
    answer: 'Sim! A plataforma é totalmente responsiva e funciona em:\n\n📱 Smartphones (Android e iPhone)\n📱 Tablets\n💻 Notebooks e desktops\n\nBasta abrir o navegador (Chrome, Edge ou Firefox) e acessar a plataforma. Não precisa instalar nenhum aplicativo. Recomendamos uma conexão estável de internet para o vídeo rodar sem travamentos.'
  },
  {
    keywords: ['nota', 'minha nota', 'tirei quanto', 'resultado', 'aprovei', 'passei', 'meu desempenho', 'meu resultado', 'como fui', 'como estou', 'meu progresso'],
    answer: () => {
      const pct = popupTotal > 0 ? Math.round((popupCorrect/popupTotal)*100) : 0;
      return `Aqui está o resumo do seu desempenho atual:\n\n📚 Treinamento: NR-6 — Equipamentos de Proteção Individual\n📊 Progresso: 40% do curso concluído (2 de 5 módulos)\n🔔 Pop-ups respondidos: ${popupCorrect}/${popupTotal} (${pct}%)\n📝 Avaliação: ${quizActive ? 'Em andamento' : 'Ainda não realizada'}\n\nContinue assistindo o vídeo e responda os pop-ups. Ao final, a avaliação será liberada automaticamente!`;
    }
  },
  {
    keywords: ['quantas questões', 'quantas questoes', 'quantas perguntas', 'quantas vezes', 'tentativas', 'quantas tentativa', 'posso refazer', 'fazer de novo', 'repetir'],
    answer: 'Sobre a avaliação:\n\n• São 10 questões de múltipla escolha\n• Meta de aprovação: 80% (acertar pelo menos 8)\n• Se reprovar em um tema, você tem até 3 tentativas para aquele tema\n• A cada nova tentativa, as questões são diferentes (mas mesmo nível de dificuldade)\n• Os temas já aprovados não precisam ser refeitos\n\nSobre o vídeo:\n• Você pode assistir quantas vezes quiser\n• Os pop-ups aparecem sempre que o vídeo está rodando'
  },
  {
    keywords: ['quem é meu instrutor', 'quem e meu instrutor', 'professor', 'instrutor', 'quem dá', 'quem da', 'ministra'],
    answer: 'O instrutor do treinamento NR-6 — Equipamentos de Proteção Individual é o Carlos Silva.\n\nEle é Técnico de Segurança do Trabalho com mais de 10 anos de experiência na área. Se tiver dúvidas específicas que eu não consiga responder, entre em contato com ele pelo e-mail corporativo ou fale com o RH.'
  },
  {
    keywords: ['obrigatório', 'obrigatorio', 'preciso fazer', 'tenho que fazer', 'sou obrigado', 'opcional', 'posso não fazer', 'posso nao fazer'],
    answer: 'Sim, o treinamento de NR-6 é OBRIGATÓRIO para todos os colaboradores que atuam em áreas com risco que exijam uso de EPI.\n\n⚠️ A não realização do treinamento pode resultar em:\n• Impedimento de acessar determinadas áreas de trabalho\n• Notificação ao supervisor e ao RH\n• Não conformidade em auditorias de segurança\n\nAlém disso, é uma exigência legal conforme a NR-6 — o empregador deve treinar o trabalhador sobre o uso adequado dos EPIs.'
  },
  {
    keywords: ['onde pego', 'onde consigo', 'onde busco', 'onde retiro', 'buscar epi', 'pegar epi', 'retirar epi', 'solicitar epi', 'pedir epi'],
    answer: 'Para obter seus EPIs na JDE Peet\'s:\n\n1. Procure o almoxarifado ou o setor de Segurança do Trabalho\n2. Apresente-se e informe sua função/área\n3. Os EPIs adequados ao seu risco serão fornecidos gratuitamente\n4. Assine o termo de recebimento (ficha de EPI)\n5. Receba orientações de uso\n\nSe seu EPI estiver danificado ou vencido, solicite a troca imediatamente ao seu supervisor. A empresa é obrigada a substituir sem custo.'
  },
  {
    keywords: ['acidente', 'me machuquei', 'machucou', 'lesão', 'lesao', 'emergência', 'emergencia', 'socorr'],
    answer: '⚠️ Em caso de acidente de trabalho:\n\n1. PARE a atividade imediatamente\n2. Acione o supervisor e a equipe de segurança\n3. Preste os primeiros socorros (se treinado) ou aguarde a brigada\n4. NÃO remova EPIs da vítima (exceto se estiverem causando mais dano)\n5. O acidente deve ser comunicado e registrado (CAT)\n\nSe for uma emergência grave, ligue para:\n• SAMU: 192\n• Bombeiros: 193\n\nSua segurança é prioridade. Em caso de dúvida, sempre pare e peça ajuda.'
  },
  {
    keywords: ['ranking', 'pontuação', 'pontuacao', 'pontos', 'gamificação', 'gamificacao', 'posição', 'posicao', 'colocação', 'colocacao'],
    answer: () => {
      const pts = 1250 + (popupCorrect * 10);
      return `Seu ranking atual na plataforma:\n\n🏅 Posição: 3º lugar\n⭐ Pontuação: ${pts} pontos\n\nVocê ganha pontos por:\n• Acertos nos pop-ups (+10 pts cada)\n• Respostas rápidas nos pop-ups (bônus de velocidade)\n• Acertos na avaliação (+20 pts cada)\n• Conclusão do treinamento (+100 pts)\n\nOs top 3 do ranking são reconhecidos mensalmente. Continue se dedicando!`;
    }
  },
  {
    keywords: ['lista de presença', 'presença', 'presenca', 'fui marcado', 'presente', 'ausente', 'falta', 'frequência', 'frequencia'],
    answer: 'A lista de presença é gerada automaticamente com base nos pop-ups de validação:\n\n• Você precisa acertar ≥70% dos pop-ups para ser marcado como PRESENTE\n• Se acertar menos de 70%, será marcado como AUSENTE\n• A lista contém: nome, CPF (mascarado), horários, % de pop-ups e nota\n• O RH e seu supervisor podem visualizar sua presença\n• A lista pode ser exportada em PDF ou CSV\n\nSe você acredita que houve algum erro no registro, procure o RH.'
  },
  {
    keywords: ['não consigo', 'nao consigo', 'erro', 'bug', 'travou', 'não carrega', 'nao carrega', 'problema', 'não funciona', 'nao funciona', 'travando', 'lento'],
    answer: 'Se está tendo problemas técnicos, tente estas soluções:\n\n1. Atualize a página (F5 ou Ctrl+R)\n2. Limpe o cache do navegador\n3. Verifique sua conexão com a internet\n4. Tente outro navegador (Chrome, Edge ou Firefox)\n5. Se estiver no celular, tente pelo computador\n\nSe o problema persistir, entre em contato com:\n• Suporte técnico: suporte@jde.com.br\n• Ou fale com o RH da sua unidade\n\nInforme qual erro apareceu e em qual etapa do treinamento você estava.'
  },
  {
    keywords: ['posso fazer em casa', 'home office', 'remoto', 'fora da empresa', 'casa'],
    answer: 'Sim! Você pode fazer o treinamento de qualquer lugar com acesso à internet:\n\n🏠 Em casa\n🏢 No escritório\n☕ Em qualquer lugar\n\nA plataforma é 100% online e funciona em qualquer navegador moderno. Seu progresso é salvo automaticamente. Não há restrição de local — apenas certifique-se de ter:\n• Conexão estável com a internet\n• Ambiente tranquilo para se concentrar\n• Áudio funcionando (o vídeo tem narração)'
  },
  {
    keywords: ['imprimir', 'impressão', 'impressao', 'pdf', 'baixar', 'download', 'salvar certificado'],
    answer: 'Após a aprovação no treinamento, você pode:\n\n📄 Baixar o certificado em PDF — clique em "Download PDF" na tela de certificados\n🔗 Compartilhar o link de validação — qualquer pessoa pode verificar a autenticidade pelo QR Code\n🖨️ Imprimir — abra o PDF e imprima normalmente\n\nO certificado contém QR Code, hash único e metadados do treinamento. A validação online funciona indefinidamente.'
  },
  {
    keywords: ['próximo treinamento', 'proximo treinamento', 'outros treinamentos', 'mais treinamento', 'depois desse', 'próximo curso', 'proximo curso'],
    answer: 'Atualmente você está inscrito no treinamento de NR-6. Após concluí-lo, novos treinamentos poderão ser liberados conforme a necessidade da sua função.\n\nTreinamentos frequentes na JDE Peet\'s incluem:\n• NR-35 — Trabalho em Altura\n• NR-12 — Segurança em Máquinas\n• NR-10 — Segurança em Eletricidade\n• Integração de Novos Colaboradores\n• Combate a Incêndio\n\nFique atento às notificações da plataforma e comunicados do RH!'
  },
  {
    keywords: ['quem criou', 'sobre o sistema', 'sobre a plataforma', 'sobre o site', 'desenvolvido', 'tecnologia'],
    answer: 'A plataforma JDE Peet\'s Training foi desenvolvida para oferecer uma experiência de treinamento corporativo moderna e segura.\n\nRecursos principais:\n• Validação de presença por pop-ups aleatórios\n• Avaliação adaptativa com IA por tema\n• Certificados digitais com QR Code\n• Chat IA para suporte em tempo real\n• Conformidade total com a LGPD\n• Interface responsiva (funciona em qualquer dispositivo)\n\nO sistema está em fase de PoC (Prova de Conceito) e será expandido para mais treinamentos em breve.'
  }
];

function processAIResponse(userMessage) {
  const msg = userMessage.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of aiKnowledgeBase) {
    let score = 0;
    let matchCount = 0;
    for (const kw of entry.keywords) {
      const kwNorm = kw.normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (msg.includes(kwNorm)) {
        score += kwNorm.length + 3;
        matchCount++;
      }
    }
    if (matchCount > 1) score *= 1.5;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore >= 2) {
    return typeof bestMatch.answer === 'function' ? bestMatch.answer() : bestMatch.answer;
  }

  return 'Não encontrei uma resposta exata para isso, mas posso ajudar com várias dúvidas! Tente perguntar:\n\n• "Até quando posso fazer o treinamento?"\n• "Quanto tempo demora?"\n• "Posso fazer pelo celular?"\n• "Quais são os tipos de EPI?"\n• "O que acontece se eu reprovar?"\n• "Como funciona o certificado?"\n• "Posso fazer em casa?"\n• "Qual minha nota atual?"\n• "O treinamento é obrigatório?"\n\nOu qualquer dúvida sobre NR-6 e EPIs!';
}

// ---- Pop-up Validation System ----
let popupTimer = null;
let popupCountdown = null;
let popupTimeLeft = 20;
let popupCode = '';
let popupTotal = 0;
let popupCorrect = 0;
let popupIncorrect = 0;
let popupScheduled = false;
let videoElement = null;

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
}

function scheduleNextPopup() {
  if (popupScheduled) return;
  const delay = (Math.random() * 120 + 60) * 1000; // 1~3 min aleatório
  popupTimer = setTimeout(() => {
    popupScheduled = false;
    triggerPopup();
  }, delay);
  popupScheduled = true;
}

function clearPopupSchedule() {
  if (popupTimer) { clearTimeout(popupTimer); popupTimer = null; }
  if (popupCountdown) { clearInterval(popupCountdown); popupCountdown = null; }
  popupScheduled = false;
}

function triggerPopup() {
  videoElement = document.getElementById('trainingVideo');
  if (videoElement) videoElement.pause();
  popupCode = generateCode();
  popupTimeLeft = 20;
  popupTotal++;
  popupVisible = true;
  renderPopupOverlay();
  startPopupCountdown();
}

function renderPopupOverlay() {
  let overlay = document.getElementById('popupOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'popupOverlay';
    document.body.appendChild(overlay);
  }
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup-modal" onclick="event.stopPropagation()">
      <div class="popup-icon">⚠️</div>
      <div class="popup-title">Validação de Presença</div>
      <div class="popup-subtitle">Digite as letras abaixo para confirmar que você está assistindo</div>
      <div class="popup-code">${popupCode.split('').join(' ')}</div>
      <div class="popup-timer popup-timer-static" id="popupTimerDisplay">
        <span id="popupTimeText">${popupTimeLeft}</span>
      </div>
      <input type="text" class="popup-input" id="popupCodeInput" maxlength="2" placeholder="__" autofocus autocomplete="off">
      <div id="popupFeedback" style="min-height:22px;margin-bottom:8px;font-size:13px;font-weight:500"></div>
      <button class="btn btn-primary btn-lg btn-full" id="confirmPopupBtn">
        ✓ Confirmar
      </button>
      <p style="font-size:11px;color:var(--text-tertiary);margin-top:12px">
        Pop-up ${popupTotal} · Acertos: ${popupCorrect}/${popupTotal > 1 ? popupTotal - 1 : 0} · Tempo: <span id="popupCountdownText">${popupTimeLeft}s</span>
      </p>
    </div>
  `;

  const input = document.getElementById('popupCodeInput');
  if (input) {
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') confirmPopupAnswer();
    });
  }
  document.getElementById('confirmPopupBtn')?.addEventListener('click', confirmPopupAnswer);
}

function startPopupCountdown() {
  if (popupCountdown) clearInterval(popupCountdown);
  popupCountdown = setInterval(() => {
    popupTimeLeft--;
    const timeText = document.getElementById('popupTimeText');
    const countdownText = document.getElementById('popupCountdownText');
    const timerDisplay = document.getElementById('popupTimerDisplay');
    if (timeText) timeText.textContent = popupTimeLeft;
    if (countdownText) countdownText.textContent = popupTimeLeft + 's';
    if (timerDisplay && popupTimeLeft <= 5) {
      timerDisplay.style.borderColor = 'var(--accent-danger)';
      timerDisplay.style.color = 'var(--accent-danger)';
    }
    if (popupTimeLeft <= 0) {
      clearInterval(popupCountdown);
      popupCountdown = null;
      popupIncorrect++;
      showPopupResult(false, 'Tempo esgotado!');
    }
  }, 1000);
}

function confirmPopupAnswer() {
  const input = document.getElementById('popupCodeInput');
  if (!input) return;
  const answer = input.value.trim().toUpperCase();
  if (answer.length < 2) {
    const feedback = document.getElementById('popupFeedback');
    if (feedback) { feedback.textContent = 'Digite as 2 letras.'; feedback.style.color = 'var(--accent-danger)'; }
    input.style.animation = 'shake 0.4s ease';
    setTimeout(() => input.style.animation = '', 400);
    return;
  }
  clearInterval(popupCountdown);
  popupCountdown = null;
  if (answer === popupCode) {
    popupCorrect++;
    showPopupResult(true, 'Correto! Presença validada.');
  } else {
    popupIncorrect++;
    showPopupResult(false, `Incorreto. O código era: ${popupCode}`);
  }
}

function showPopupResult(success, message) {
  const feedback = document.getElementById('popupFeedback');
  const btn = document.getElementById('confirmPopupBtn');
  const input = document.getElementById('popupCodeInput');
  if (feedback) {
    feedback.textContent = message;
    feedback.style.color = success ? 'var(--accent-success)' : 'var(--accent-danger)';
  }
  if (input) input.disabled = true;
  if (btn) {
    btn.textContent = success ? '✓ Continuar assistindo' : '→ Continuar';
    btn.onclick = closePopupAndResume;
  }
}

function closePopupAndResume() {
  popupVisible = false;
  const overlay = document.getElementById('popupOverlay');
  if (overlay) overlay.remove();
  videoElement = document.getElementById('trainingVideo');
  if (videoElement) {
    videoElement.play();
    scheduleNextPopup();
  }
  updatePopupStats();
}

function updatePopupStats() {
  const statsEl = document.getElementById('popupStatsBar');
  if (statsEl) {
    const pct = popupTotal > 0 ? Math.round((popupCorrect / popupTotal) * 100) : 0;
    statsEl.innerHTML = `
      <span class="badge ${pct >= 70 ? 'badge-success' : 'badge-warning'}">Pop-ups: ${popupCorrect}/${popupTotal} (${pct}%)</span>
      <span style="font-size:12px;color:var(--text-tertiary)">Mínimo: 70% para presença válida</span>
    `;
  }
}

function initVideoPopups() {
  clearPopupSchedule();
  const video = document.getElementById('trainingVideo');
  if (!video) return;
  video.addEventListener('play', () => {
    scheduleNextPopup();
  });
  video.addEventListener('pause', () => {
    if (!popupVisible) clearPopupSchedule();
  });
  video.addEventListener('ended', () => {
    clearPopupSchedule();
    setTimeout(() => {
      startPostVideoQuiz();
    }, 800);
  });
}

// ---- Post-Video Quiz System ----
let quizActive = false;
let quizCurrentQuestion = 0;
let quizAnswers = [];
let quizShowingResult = false;

function startPostVideoQuiz() {
  clearPopupSchedule();
  quizActive = true;
  quizCurrentQuestion = 0;
  quizAnswers = new Array(MOCK.questions.length).fill(-1);
  quizShowingResult = false;
  renderQuizOverlay();
}

function renderQuizOverlay() {
  let overlay = document.getElementById('quizOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'quizOverlay';
    document.body.appendChild(overlay);
  }
  overlay.className = 'popup-overlay';
  overlay.style.backdropFilter = 'blur(8px)';

  if (quizShowingResult) {
    overlay.innerHTML = renderQuizResult();
    document.getElementById('quizCloseBtn')?.addEventListener('click', closeQuiz);
    document.getElementById('quizRetryBtn')?.addEventListener('click', () => {
      quizCurrentQuestion = 0;
      quizAnswers = new Array(MOCK.questions.length).fill(-1);
      quizShowingResult = false;
      renderQuizOverlay();
    });
    return;
  }

  const q = MOCK.questions[quizCurrentQuestion];
  const total = MOCK.questions.length;
  const progress = Math.round(((quizCurrentQuestion) / total) * 100);

  overlay.innerHTML = `
    <div style="background:var(--bg-card);border-radius:var(--radius-xl);max-width:640px;width:95%;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-popup);animation:popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)">
      <div style="padding:24px 28px 0">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--jde-gold);text-transform:uppercase;letter-spacing:0.05em">Avaliação Pós-Treinamento</div>
            <div style="font-size:18px;font-weight:700;margin-top:4px">NR-6 — Equipamentos de Proteção Individual</div>
          </div>
          <span class="badge badge-primary">Questão ${quizCurrentQuestion + 1}/${total}</span>
        </div>
        <div class="progress-bar" style="height:4px;margin-bottom:4px">
          <div class="progress-bar-fill" style="width:${progress}%;transition:width 0.4s ease"></div>
        </div>
        <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:20px;display:flex;justify-content:space-between">
          <span>Progresso: ${progress}%</span>
          <span>Meta: 80% de acerto</span>
        </div>
      </div>

      <div style="padding:0 28px 28px">
        <div style="background:var(--bg-secondary);border-radius:var(--radius-lg);padding:20px;margin-bottom:20px">
          <div style="font-size:11px;font-weight:600;color:var(--jde-gold);margin-bottom:6px">${q.theme}</div>
          <div style="font-size:15px;font-weight:600;line-height:1.5">${q.question}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          ${q.options.map((opt, j) => `
            <div class="question-option ${quizAnswers[quizCurrentQuestion] === j ? 'selected' : ''}" data-quiz-option="${j}" style="cursor:pointer">
              <div class="question-option-radio"></div>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center">
          <button class="btn btn-secondary" id="quizPrevBtn" ${quizCurrentQuestion === 0 ? 'disabled style="opacity:0.4;pointer-events:none"' : ''}>
            ← Anterior
          </button>
          <div style="display:flex;gap:4px">
            ${MOCK.questions.map((_, i) => `
              <div style="width:10px;height:10px;border-radius:50%;background:${quizAnswers[i] !== -1 ? 'var(--jde-gold)' : i === quizCurrentQuestion ? 'var(--jde-dark)' : 'var(--border-primary)'};transition:all 0.2s"></div>
            `).join('')}
          </div>
          ${quizCurrentQuestion === total - 1 ? `
            <button class="btn btn-primary" id="quizFinishBtn" ${quizAnswers[quizCurrentQuestion] === -1 ? 'disabled style="opacity:0.4;pointer-events:none"' : ''}>
              Finalizar ✓
            </button>
          ` : `
            <button class="btn btn-primary" id="quizNextBtn" ${quizAnswers[quizCurrentQuestion] === -1 ? 'disabled style="opacity:0.4;pointer-events:none"' : ''}>
              Próxima →
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  // Bind option clicks
  document.querySelectorAll('[data-quiz-option]').forEach(el => {
    el.addEventListener('click', () => {
      quizAnswers[quizCurrentQuestion] = parseInt(el.dataset.quizOption);
      renderQuizOverlay();
    });
  });

  document.getElementById('quizPrevBtn')?.addEventListener('click', () => {
    if (quizCurrentQuestion > 0) { quizCurrentQuestion--; renderQuizOverlay(); }
  });

  document.getElementById('quizNextBtn')?.addEventListener('click', () => {
    if (quizCurrentQuestion < total - 1) { quizCurrentQuestion++; renderQuizOverlay(); }
  });

  document.getElementById('quizFinishBtn')?.addEventListener('click', () => {
    quizShowingResult = true;
    renderQuizOverlay();
  });
}

function renderQuizResult() {
  let correctCount = 0;
  const details = MOCK.questions.map((q, i) => {
    const isCorrect = quizAnswers[i] === q.correct;
    if (isCorrect) correctCount++;
    return { question: q.question, theme: q.theme, selected: q.options[quizAnswers[i]] || '—', correct: q.options[q.correct], isCorrect };
  });

  const total = MOCK.questions.length;
  const pct = Math.round((correctCount / total) * 100);
  const passed = pct >= 80;

  const detailsHtml = details.map((d, i) => `
    <div style="padding:12px 16px;border-bottom:1px solid var(--border-secondary);display:flex;gap:12px;align-items:flex-start">
      <div style="width:24px;height:24px;min-width:24px;border-radius:50%;background:${d.isCorrect ? 'var(--accent-success-light)' : 'var(--accent-danger-light)'};color:${d.isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;margin-top:2px">${d.isCorrect ? '✓' : '✗'}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500;margin-bottom:4px">${i + 1}. ${d.question}</div>
        ${!d.isCorrect ? `<div style="font-size:12px;color:var(--accent-danger)">Sua resposta: ${d.selected}</div>
        <div style="font-size:12px;color:var(--accent-success)">Resposta correta: ${d.correct}</div>` : `<div style="font-size:12px;color:var(--accent-success)">Resposta: ${d.correct}</div>`}
      </div>
    </div>
  `).join('');

  return `
    <div style="background:var(--bg-card);border-radius:var(--radius-xl);max-width:640px;width:95%;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-popup);animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)">
      <div style="padding:32px 28px;text-align:center;background:${passed ? 'var(--accent-success-light)' : 'var(--accent-danger-light)'};border-radius:var(--radius-xl) var(--radius-xl) 0 0">
        <div style="font-size:48px;margin-bottom:12px">${passed ? '🎉' : '📚'}</div>
        <div style="font-size:22px;font-weight:700;color:${passed ? 'var(--accent-success)' : 'var(--accent-danger)'};margin-bottom:4px">
          ${passed ? 'Parabéns! Aprovado!' : 'Não atingiu a meta'}
        </div>
        <div style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">
          ${passed ? 'Você atingiu a meta de aprovação do treinamento.' : 'Você precisa de no mínimo 80% de acerto. Revise o conteúdo e tente novamente.'}
        </div>
        <div style="display:flex;justify-content:center;gap:32px">
          <div>
            <div style="font-size:36px;font-weight:800;color:${passed ? 'var(--accent-success)' : 'var(--accent-danger)'}">${pct}%</div>
            <div style="font-size:12px;color:var(--text-tertiary)">Aproveitamento</div>
          </div>
          <div>
            <div style="font-size:36px;font-weight:800;color:var(--text-primary)">${correctCount}/${total}</div>
            <div style="font-size:12px;color:var(--text-tertiary)">Acertos</div>
          </div>
          <div>
            <div style="font-size:36px;font-weight:800;color:var(--jde-gold)">80%</div>
            <div style="font-size:12px;color:var(--text-tertiary)">Meta</div>
          </div>
        </div>
      </div>

      <div style="padding:0 0 8px">
        <div style="padding:16px 28px 8px;font-size:14px;font-weight:600">Detalhamento por Questão</div>
        ${detailsHtml}
      </div>

      <div style="padding:16px 28px 24px;display:flex;gap:10px;justify-content:center">
        ${passed ? `
          <button class="btn btn-primary btn-lg" id="quizCloseBtn">🏆 Ver Certificado</button>
        ` : `
          <button class="btn btn-secondary btn-lg" id="quizRetryBtn">🔄 Refazer Avaliação</button>
          <button class="btn btn-outline btn-lg" id="quizCloseBtn">Voltar ao Treinamento</button>
        `}
      </div>
    </div>
  `;
}

function closeQuiz() {
  quizActive = false;
  const overlay = document.getElementById('quizOverlay');
  if (overlay) overlay.remove();
  if (quizShowingResult) {
    const correctCount = MOCK.questions.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    const pct = Math.round((correctCount / MOCK.questions.length) * 100);
    if (pct >= 80) {
      navigate('certificates');
    }
  }
}

// ---- SVG Icons (inline, no external deps) ----
const icons = {
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  play: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  send: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  logout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  lock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  arrowUp: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  filter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
};

// ---- Navigation Config ----
const studentNav = [
  { section: 'Principal' },
  { id: 'trainings', label: 'Treinamentos', icon: '📚', badge: '1' },
  { id: 'certificates', label: 'Certificados', icon: '🏆' },
  { id: 'chatbot', label: 'Chat IA', icon: '🤖' },
  { section: 'Comunicação' },
  { id: 'supervision', label: 'Supervisão', icon: '📩' },
];

const adminNav = [
  { section: 'Visão Geral' },
  { id: 'admin-dashboard', label: 'Dashboard', icon: '📊' },
  { section: 'Gestão' },
  { id: 'admin-trainings', label: 'Treinamentos', icon: '📚' },
  { id: 'admin-users', label: 'Usuários', icon: '👥' },
  { id: 'admin-questions', label: 'Questões', icon: '❓' },
  { id: 'admin-certificates', label: 'Certificados', icon: '🏆' },
  { section: 'Análise' },
  { id: 'admin-reports', label: 'Relatórios', icon: '📈' },
  { id: 'admin-attendance', label: 'Lista de Presença', icon: '📋' },
  { section: 'Sistema' },
  { id: 'admin-lgpd', label: 'LGPD', icon: '🔒' },
  { id: 'admin-ai', label: 'Assistente Admin', icon: '🤖' },
];

// ---- Router ----
function navigate(page) {
  clearPopupSchedule();
  const overlay = document.getElementById('popupOverlay');
  if (overlay) overlay.remove();
  popupVisible = false;
  currentPage = page;
  render();
}

// ---- Main Render ----
function render() {
  const app = document.getElementById('app');
  if (currentPage === 'login') {
    app.innerHTML = renderLoginPage();
    bindLoginEvents();
  } else {
    app.innerHTML = renderAppLayout();
    bindAppEvents();
  }
}

// ---- LOGIN PAGE ----
function renderLoginPage() {
  return `
    <div class="login-page">
      <div class="login-left">
        <div class="login-form-wrapper">
          <div class="login-logo">
            <div class="login-logo-icon" style="background:var(--gradient-primary)">JDE</div>
            <div class="login-logo-text">JDE <span style="color:var(--jde-gold)">Peet's</span></div>
          </div>
          <h1 class="login-title">Bem-vindo de volta</h1>
          <p class="login-subtitle">Acesse sua plataforma de treinamentos corporativos</p>
          <form id="loginForm">
            <div class="form-group">
              <label class="form-label">E-mail corporativo</label>
              <div class="form-input-icon">
                <span class="input-icon">${icons.mail}</span>
                <input type="email" class="form-input" placeholder="seu.nome@jde.com.br" value="gabriel.melo@jde.com.br">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Senha</label>
              <div class="form-input-icon">
                <span class="input-icon">${icons.lock}</span>
                <input type="password" class="form-input" placeholder="••••••••" value="12345678">
              </div>
            </div>
            <div class="flex justify-between items-center" style="margin-bottom:24px">
              <label class="form-checkbox">
                <input type="checkbox" checked> Lembrar de mim
              </label>
              <a href="#" style="font-size:13px;color:var(--accent-primary);font-weight:500">Esqueci a senha</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-full" style="margin-bottom:16px">
              Entrar
            </button>
            <p style="text-align:center;font-size:13px;color:var(--text-tertiary)">
              Ambiente seguro · Dados protegidos pela LGPD
            </p>
          </form>
        </div>
      </div>
      <div class="login-right">
        <div class="login-right-content">
          <div class="login-right-icon">☕</div>
          <h2>JDE Peet's Training</h2>
          <p>Plataforma de treinamentos corporativos com IA adaptativa, validação de presença e emissão automática de certificados.</p>
          <div class="login-features">
            <div class="login-feature">
              <div class="login-feature-icon">✅</div>
              <span>Validação de presença por pop-ups aleatórios</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">🧠</div>
              <span>Avaliação adaptativa com IA por tema</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">📜</div>
              <span>Certificados digitais com QR Code</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">🔒</div>
              <span>100% em conformidade com a LGPD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindLoginEvents() {
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    navigate('trainings');
  });
}

// ---- APP LAYOUT ----
function renderAppLayout() {
  const nav = appMode === 'admin' ? adminNav : studentNav;
  const user = appMode === 'admin' ? MOCK.admin : MOCK.user;
  return `
    <div class="app-layout">
      ${renderSidebar(nav, user)}
      <div class="main-content">
        ${renderTopbar()}
        <div class="page-content" id="pageContent">
          ${renderPage()}
        </div>
      </div>
    </div>
  `;
}

function renderSidebar(nav, user) {
  let items = '';
  nav.forEach(item => {
    if (item.section) {
      items += `<div class="sidebar-section-label">${item.section}</div>`;
    } else {
      items += `
        <div class="sidebar-item ${currentPage === item.id ? 'active' : ''}" data-page="${item.id}">
          <span class="sidebar-item-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.badge ? `<span class="sidebar-item-badge">${item.badge}</span>` : ''}
        </div>
      `;
    }
  });

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon" style="background:var(--gradient-primary)">JDE</div>
          <div class="sidebar-logo-text">JDE <span style="color:var(--jde-gold)">Peet's</span></div>
        </div>
      </div>
      <div class="sidebar-mode-toggle">
        <button class="sidebar-mode-btn ${appMode === 'student' ? 'active' : ''}" data-mode="student">Aluno</button>
        <button class="sidebar-mode-btn ${appMode === 'admin' ? 'active' : ''}" data-mode="admin">Admin</button>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section">${items}</div>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar">${user.avatar}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user.name}</div>
            <div class="sidebar-user-role">${user.role}</div>
          </div>
          <button class="btn-ghost" onclick="navigate('login')" title="Sair">${icons.logout}</button>
        </div>
      </div>
    </aside>
  `;
}

function getPageTitle() {
  const titles = {
    'dashboard': 'Dashboard',
    'trainings': 'Treinamentos',
    'training-detail': 'Detalhes do Treinamento',
    'assessment': 'Avaliação',
    'recovery': 'Recuperação por Tema',
    'certificates': 'Certificados',
    'attendance': 'Lista de Presença',
    'chatbot': 'Chat IA',
    'admin-dashboard': 'Dashboard Administrativo',
    'admin-trainings': 'Gerenciar Treinamentos',
    'admin-users': 'Gerenciar Usuários',
    'admin-questions': 'Banco de Questões',
    'admin-certificates': 'Certificados Emitidos',
    'admin-reports': 'Relatórios',
    'admin-attendance': 'Lista de Presença',
    'admin-lgpd': 'Configurações LGPD',
    'admin-ai': 'Assistente Administrativo',
    'supervision': 'Supervisão',
  };
  return titles[currentPage] || 'Treinamentos';
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="topbar-icon-btn" id="menuToggle">${icons.menu}</button>
        <h1 class="topbar-title">${getPageTitle()}</h1>
      </div>
      <div class="topbar-right">
        <div class="topbar-search">
          ${icons.search}
          <span>Buscar...</span>
          <kbd>⌘K</kbd>
        </div>
        <button class="topbar-icon-btn">
          ${icons.bell}
          <span class="topbar-badge"></span>
        </button>
        <div class="sidebar-avatar" style="width:32px;height:32px;font-size:11px;cursor:pointer">${MOCK.user.avatar}</div>
      </div>
    </header>
  `;
}

function renderPage() {
  const pages = {
    'dashboard': renderDashboard,
    'trainings': renderTrainings,
    'training-detail': renderTrainingDetail,
    'assessment': renderAssessment,
    'recovery': renderRecovery,
    'certificates': renderCertificates,
    'attendance': renderAttendance,
    'chatbot': renderChatbot,
    'admin-dashboard': renderAdminDashboard,
    'admin-trainings': renderAdminTrainings,
    'admin-users': renderAdminUsers,
    'admin-questions': renderAdminQuestions,
    'admin-certificates': renderAdminCertificates,
    'admin-reports': renderAdminReports,
    'admin-attendance': renderAttendance,
    'admin-lgpd': renderAdminLGPD,
    'admin-ai': renderAdminAI,
    'supervision': renderSupervision,
  };
  return (pages[currentPage] || renderTrainings)();
}

function bindAppEvents() {
  document.querySelectorAll('.sidebar-item').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });
  document.querySelectorAll('.sidebar-mode-btn').forEach(el => {
    el.addEventListener('click', () => {
      appMode = el.dataset.mode;
      currentPage = appMode === 'admin' ? 'admin-dashboard' : 'trainings';
      render();
    });
  });
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('open');
  });

  // Page-specific bindings
  bindPageEvents();
}

function bindPageEvents() {
  // Training cards
  document.querySelectorAll('[data-training-id]').forEach(el => {
    el.addEventListener('click', () => navigate('training-detail'));
  });

  // Question options
  document.querySelectorAll('.question-option').forEach(el => {
    el.addEventListener('click', () => {
      const parent = el.closest('.question-options');
      parent.querySelectorAll('.question-option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
    });
  });

  // Video popup system
  if (currentPage === 'training-detail') {
    initVideoPopups();
  }

  // Chat send
  document.getElementById('chatSendBtn')?.addEventListener('click', sendChatMessage);
  document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });

  // Chat suggestions
  document.querySelectorAll('.chat-suggestion').forEach(el => {
    el.addEventListener('click', () => {
      const input = document.getElementById('chatInput');
      if (input) { input.value = el.textContent; sendChatMessage(); }
    });
  });

  // Admin AI chat
  document.getElementById('adminChatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAdminChat(); }
  });
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const container = document.getElementById('chatMessages');
  if (!input || !container || !input.value.trim()) return;

  const userMsg = input.value.trim();
  input.value = '';

  container.innerHTML += `
    <div class="chat-message user animate-fade-in-up">
      <div class="chat-message-avatar">GM</div>
      <div class="chat-message-bubble">${userMsg}</div>
    </div>
  `;
  container.scrollTop = container.scrollHeight;

  const typingId = 'typing-' + Date.now();
  container.innerHTML += `
    <div class="chat-message bot animate-fade-in-up" id="${typingId}">
      <div class="chat-message-avatar">🤖</div>
      <div class="chat-message-bubble" style="display:flex;align-items:center;gap:6px">
        <span style="animation:pulse 1s infinite">●</span>
        <span style="animation:pulse 1s infinite 0.2s">●</span>
        <span style="animation:pulse 1s infinite 0.4s">●</span>
      </div>
    </div>
  `;
  container.scrollTop = container.scrollHeight;

  const delay = 600 + Math.random() * 800;
  setTimeout(() => {
    const response = processAIResponse(userMsg);
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.querySelector('.chat-message-bubble').innerHTML = response.replace(/\n/g, '<br>');
      typingEl.querySelector('.chat-message-bubble').style = '';
    }
    container.scrollTop = container.scrollHeight;
  }, delay);
}

// ============================================
// PAGE RENDERERS
// ============================================

// ---- DASHBOARD (Student) ----
function renderDashboard() {
  const stats = MOCK.stats.student.map((s, i) => `
    <div class="stat-card animate-fade-in stagger-${i + 1}">
      <div class="stat-card-header">
        <div class="stat-card-icon ${s.color}">${s.icon}</div>
        <div class="stat-card-trend up">${icons.arrowUp} ${s.trend}</div>
      </div>
      <div class="stat-card-value">${s.value}</div>
      <div class="stat-card-label">${s.label}</div>
    </div>
  `).join('');

  const activity = MOCK.recentActivity.map(a => `
    <div class="flex items-center gap-3" style="padding:12px 0;border-bottom:1px solid var(--border-secondary)">
      <div style="width:8px;height:8px;border-radius:50%;background:var(--accent-primary);min-width:8px"></div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500">${a.action}</div>
        <div style="font-size:12px;color:var(--text-tertiary)">${a.training}</div>
      </div>
      <div style="font-size:12px;color:var(--text-tertiary);white-space:nowrap">${a.time}</div>
    </div>
  `).join('');

  const ranking = MOCK.ranking.map((r, i) => `
    <div class="flex items-center gap-3" style="padding:10px 0;${i < MOCK.ranking.length - 1 ? 'border-bottom:1px solid var(--border-secondary)' : ''}">
      <div style="width:24px;height:24px;border-radius:50%;background:${i === 0 ? 'var(--accent-warning)' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : 'var(--bg-tertiary)'};color:${i < 3 ? 'white' : 'var(--text-secondary)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${i + 1}</div>
      <div class="sidebar-avatar" style="width:30px;height:30px;font-size:10px">${r.avatar}</div>
      <div style="flex:1;font-size:13px;font-weight:500">${r.name}</div>
      <div style="font-size:13px;font-weight:600;color:var(--accent-primary)">${r.points} pts</div>
    </div>
  `).join('');

  const chartBars = MOCK.chartData.monthly.map((v, i) => `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div class="chart-bar" style="height:${v}%;width:100%;background:${i === new Date().getMonth() ? 'var(--accent-primary)' : 'var(--accent-primary-subtle)'};border-radius:4px 4px 0 0;opacity:${i === new Date().getMonth() ? '1' : '0.7'}"></div>
      <span style="font-size:10px;color:var(--text-tertiary)">${MOCK.chartData.labels[i]}</span>
    </div>
  `).join('');

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Olá, Gabriel! 👋</h1>
        <p class="page-description">Acompanhe seu progresso e continue seus treinamentos</p>
      </div>
      <button class="btn btn-primary" onclick="navigate('trainings')">Ver Treinamentos</button>
    </div>

    <div class="grid-4" style="margin-bottom:28px">${stats}</div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:28px">
      <div class="card animate-fade-in stagger-5">
        <div class="flex justify-between items-center" style="margin-bottom:20px">
          <h3 style="font-size:15px;font-weight:600">Progresso Mensal</h3>
          <span class="badge badge-primary">2026</span>
        </div>
        <div style="height:200px;display:flex;align-items:flex-end;gap:6px;padding-top:10px">
          ${chartBars}
        </div>
      </div>

      <div class="card animate-fade-in stagger-6">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">🏅 Ranking</h3>
        ${ranking}
      </div>
    </div>

    <div class="card animate-fade-in">
      <h3 style="font-size:15px;font-weight:600;margin-bottom:8px">Atividades Recentes</h3>
      ${activity}
    </div>
  `;
}

// ---- TRAININGS LIST ----
function renderTrainings() {
  const cards = MOCK.trainings.map((t, i) => {
    const statusMap = { 'completed': ['Concluído', 'badge-success'], 'in_progress': ['Em Andamento', 'badge-info'], 'not_started': ['Não Iniciado', 'badge-neutral'] };
    const [statusText, statusClass] = statusMap[t.status];
    return `
      <div class="training-card animate-fade-in stagger-${(i % 6) + 1}" data-training-id="${t.id}">
        <div class="training-card-cover" style="background:${t.cover}">
          <span>${t.category === 'Segurança' ? '🛡️' : t.category === 'Compliance' ? '📋' : t.category === 'Onboarding' ? '🤝' : '🌿'}</span>
          <div class="training-card-badge">
            <span class="badge ${statusClass}">${statusText}</span>
          </div>
        </div>
        <div class="training-card-body">
          <div class="training-card-title">${t.title}</div>
          <div class="training-card-desc">${t.description}</div>
          <div class="training-card-meta">
            <span class="training-card-meta-item">⏱️ ${t.duration}</span>
            <span class="training-card-meta-item">📖 ${t.modules} módulos</span>
            <span class="training-card-meta-item">⭐ ${t.rating}</span>
          </div>
          <div class="training-card-footer">
            <div class="training-card-progress" style="flex:1">
              <div class="training-card-progress-label">
                <span>Progresso</span>
                <span style="font-weight:600">${t.progress}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill ${t.progress === 100 ? 'green' : ''}" style="width:${t.progress}%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Treinamentos</h1>
        <p class="page-description">Explore e continue seus treinamentos corporativos</p>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-search">
        <span class="filter-search-icon">${icons.search}</span>
        <input type="text" class="form-input" placeholder="Buscar treinamentos...">
      </div>
      <button class="btn btn-outline btn-sm">${icons.filter} Filtros</button>
      <select class="form-input" style="width:auto;padding:8px 36px 8px 12px;font-size:13px">
        <option>Todos</option>
        <option>Em Andamento</option>
        <option>Concluídos</option>
        <option>Não Iniciados</option>
      </select>
    </div>

    <div class="grid-3">${cards}</div>
  `;
}

// ---- TRAINING DETAIL ----
function renderTrainingDetail() {
  const t = MOCK.trainings[0];
  const timeline = t.themes.map((theme, i) => `
    <div class="timeline-item">
      <div class="timeline-item-dot-wrapper">
        <div class="timeline-item-dot ${i < 3 ? 'completed' : i === 3 ? 'active' : ''}"></div>
        <div class="timeline-item-line"></div>
      </div>
      <div class="timeline-item-content">
        <h4 style="color:${i < 3 ? 'var(--accent-success)' : i === 3 ? 'var(--accent-primary)' : 'var(--text-secondary)'}">
          ${i < 3 ? '✓ ' : ''}Módulo ${i + 1}: ${theme}
        </h4>
        <p>${i < 3 ? 'Concluído' : i === 3 ? 'Em andamento' : 'Bloqueado'}</p>
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <div class="flex items-center gap-2" style="margin-bottom:8px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('trainings')">← Voltar</button>
        <span class="badge badge-info">Em Andamento</span>
      </div>
      <h1 class="page-title">${t.title}</h1>
      <p class="page-description">${t.description}</p>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px">
      <div>
        <div style="margin-bottom:20px;border-radius:var(--radius-lg);overflow:hidden;background:#0f0f1a">
          <video id="trainingVideo" controls style="width:100%;display:block;border-radius:var(--radius-lg)" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' fill='%230f0f1a'%3E%3Crect width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23555' font-family='sans-serif' font-size='20'%3EClique ▶ para iniciar o módulo%3C/text%3E%3C/svg%3E">
            <source src="video nr5/YTDown_YouTube_Media_2kf-wk5aIhc_001_1080p.mp4" type="video/mp4">
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>

        <div class="card" style="padding:14px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;background:var(--accent-warning-light);border-color:#fcd34d">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:18px">🔔</span>
            <div>
              <div style="font-size:13px;font-weight:600;color:#92400e">Validação de Presença Ativa</div>
              <div style="font-size:12px;color:#a16207">Pop-ups aparecerão aleatoriamente durante o vídeo para validar sua presença</div>
            </div>
          </div>
          <div id="popupStatsBar" style="display:flex;align-items:center;gap:8px">
            <span class="badge badge-neutral">Pop-ups: 0/0 (0%)</span>
            <span style="font-size:12px;color:var(--text-tertiary)">Mínimo: 70% para presença válida</span>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:24px">
          <button class="btn btn-outline" onclick="navigate('assessment')">📝 Iniciar Avaliação</button>
          <button class="btn btn-ghost">${icons.download} Material PDF</button>
        </div>

        <div class="card" style="margin-bottom:20px">
          <div class="tabs">
            <div class="tab active">Conteúdo</div>
            <div class="tab">Arquivos</div>
            <div class="tab">Discussão</div>
          </div>
          <div>
            <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Tipos de EPI e suas Aplicações</h3>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.8;margin-bottom:16px">
              Este módulo aborda os principais tipos de Equipamentos de Proteção Individual e suas aplicações, incluindo:
            </p>
            <ul style="font-size:14px;color:var(--text-secondary);line-height:2;padding-left:20px">
              <li>Proteção para cabeça: capacetes e capuzes</li>
              <li>Proteção auditiva: abafadores e protetores de inserção</li>
              <li>Proteção respiratória: máscaras e respiradores</li>
              <li>Proteção para mãos: luvas de diferentes materiais</li>
              <li>Certificado de Aprovação (CA) e sua importância</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:20px">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:4px">Progresso do Curso</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">3 de 5 módulos concluídos</p>
          <div class="progress-bar" style="height:8px;margin-bottom:8px">
            <div class="progress-bar-fill" style="width:60%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary);margin-bottom:24px">
            <span>60% completo</span>
            <span>~50 min restantes</span>
          </div>
          <div class="timeline">${timeline}</div>
        </div>

        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:12px">Informações</h3>
          <div style="display:flex;flex-direction:column;gap:12px;font-size:13px">
            <div class="flex justify-between"><span style="color:var(--text-secondary)">Instrutor</span><span style="font-weight:500">${t.instructor}</span></div>
            <div class="flex justify-between"><span style="color:var(--text-secondary)">Duração</span><span style="font-weight:500">${t.duration}</span></div>
            <div class="flex justify-between"><span style="color:var(--text-secondary)">Alunos</span><span style="font-weight:500">${t.students}</span></div>
            <div class="flex justify-between"><span style="color:var(--text-secondary)">Avaliação</span><span style="font-weight:500">⭐ ${t.rating}</span></div>
            <div class="flex justify-between"><span style="color:var(--text-secondary)">Meta Aprovação</span><span style="font-weight:500;color:var(--accent-primary)">80%</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- POPUP VALIDATION MODAL ----
// ---- ASSESSMENT ----
function renderAssessment() {
  const questions = MOCK.questions.map((q, i) => `
    <div class="question-card animate-fade-in stagger-${i + 1}">
      <div class="question-number">Questão ${i + 1} de ${MOCK.questions.length} · Tema: ${q.theme}</div>
      <div class="question-text">${q.question}</div>
      <div class="question-options">
        ${q.options.map((opt, j) => `
          <div class="question-option" data-q="${i}" data-o="${j}">
            <div class="question-option-radio"></div>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <div class="flex items-center gap-2" style="margin-bottom:8px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('training-detail')">← Voltar ao curso</button>
      </div>
      <h1 class="page-title">Avaliação — NR-6</h1>
      <p class="page-description">Responda as questões abaixo. Meta de aprovação: 80%</p>
    </div>

    <div class="card" style="margin-bottom:20px;padding:16px 24px">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="badge badge-info">Tema atual: NR-6</span>
          <span style="font-size:13px;color:var(--text-secondary)">5 questões · ~10 min</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:13px;color:var(--text-secondary)">Progresso:</span>
          <div class="progress-bar" style="width:120px">
            <div class="progress-bar-fill" style="width:40%"></div>
          </div>
          <span style="font-size:13px;font-weight:600">2/5</span>
        </div>
      </div>
    </div>

    ${questions}

    <div class="flex justify-between" style="margin-top:24px">
      <button class="btn btn-secondary">← Anterior</button>
      <div class="flex gap-2">
        <button class="btn btn-outline" onclick="navigate('recovery')">Ver Resultado (Mock)</button>
        <button class="btn btn-primary">Próxima →</button>
      </div>
    </div>
  `;
}

// ---- RECOVERY ----
function renderRecovery() {
  return `
    <div class="page-header">
      <div class="flex items-center gap-2" style="margin-bottom:8px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('assessment')">← Voltar</button>
      </div>
      <h1 class="page-title">Resultado da Avaliação</h1>
    </div>

    <div class="card" style="margin-bottom:24px;text-align:center;padding:32px">
      <div style="font-size:48px;margin-bottom:12px">📊</div>
      <h2 style="font-size:22px;font-weight:700;margin-bottom:8px">Resultado: Aprovado Parcialmente</h2>
      <p style="color:var(--text-secondary);margin-bottom:24px">Você foi aprovado em 3 de 4 temas. É necessário revisar o tema reprovado.</p>
      <div class="grid-4" style="max-width:600px;margin:0 auto">
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--accent-success)">90%</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Legislação NR-6</div>
          <span class="badge badge-success" style="margin-top:4px">Aprovado</span>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--accent-success)">85%</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Tipos de EPI</div>
          <span class="badge badge-success" style="margin-top:4px">Aprovado</span>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--accent-danger)">60%</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Análise Risco</div>
          <span class="badge badge-danger" style="margin-top:4px">Reprovado</span>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--accent-success)">95%</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Emergência</div>
          <span class="badge badge-success" style="margin-top:4px">Aprovado</span>
        </div>
      </div>
    </div>

    <div class="recovery-banner animate-pop-in">
      <div class="recovery-banner-icon">⚠️</div>
      <h3>Você foi reprovado apenas no tema:</h3>
      <p style="font-size:20px;font-weight:700;color:#92400e;margin-top:4px">Conservação e Higienização</p>
    </div>

    <div class="recovery-theme-card animate-fade-in-up" style="margin-bottom:24px">
      <div style="font-size:36px;margin-bottom:12px">📖</div>
      <h3 style="font-size:18px;font-weight:700;margin-bottom:8px">Revisão: Conservação e Higienização</h3>
      <p style="color:var(--text-secondary);margin-bottom:20px;max-width:500px;margin-left:auto;margin-right:auto">
        Revise o conteúdo sobre conservação, higienização e armazenamento correto dos EPIs.
        Após a revisão, uma nova avaliação com questões diferentes será liberada.
      </p>
      <div class="flex gap-3 justify-center">
        <button class="btn btn-primary btn-lg" onclick="navigate('training-detail')">
          📹 Revisar Módulo em Vídeo
        </button>
        <button class="btn btn-outline btn-lg" onclick="navigate('assessment')">
          📝 Nova Avaliação
        </button>
      </div>
      <p style="font-size:12px;color:var(--text-tertiary);margin-top:16px">
        IA Adaptativa: questões diferentes, mesmo nível de dificuldade · Tentativa 2 de 3
      </p>
    </div>
  `;
}

// ---- CERTIFICATES ----
function renderCertificates() {
  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Certificado Digital</h1>
        <p class="page-description">Certificado de conclusão com validação por QR Code</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary">${icons.download} Download PDF</button>
        <button class="btn btn-outline">🔗 Compartilhar</button>
      </div>
    </div>

    <div class="certificate animate-fade-in-up">
      <div class="certificate-logo" style="background:var(--gradient-primary)">JDE</div>
      <div class="certificate-title">Certificado de Conclusão</div>
      <div class="certificate-heading">Treinamento Corporativo</div>
      <div class="certificate-text">Certificamos que</div>
      <div class="certificate-name">Gabriel Melo</div>
      <div class="certificate-text">concluiu com aproveitamento o treinamento</div>
      <div class="certificate-course">NR-6 — Equipamentos de Proteção Individual</div>
      <div class="certificate-text">com carga horária de 3h 15min e aproveitamento de 92%</div>
      <div class="certificate-text" style="margin-top:8px">Data de conclusão: 20 de Junho de 2026</div>

      <div class="certificate-qr">
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:2px;width:60px;height:60px">
          ${Array.from({length: 25}, () => `<div style="background:${Math.random() > 0.4 ? '#111' : '#fff'};border-radius:1px"></div>`).join('')}
        </div>
      </div>
      <div class="certificate-hash">Hash: 7f3a9b2c-e4d1-4f8a-b5c6-2d1e3f4a5b6c</div>

      <div class="certificate-meta">
        <div class="certificate-meta-item">
          <div class="certificate-meta-label">Emissor</div>
          <div class="certificate-meta-value">JDE Treinamentos</div>
        </div>
        <div class="certificate-meta-item">
          <div class="certificate-meta-label">Código</div>
          <div class="certificate-meta-value">CERT-2026-00312</div>
        </div>
        <div class="certificate-meta-item">
          <div class="certificate-meta-label">Validade</div>
          <div class="certificate-meta-value">20/06/2027</div>
        </div>
        <div class="certificate-meta-item">
          <div class="certificate-meta-label">Nota</div>
          <div class="certificate-meta-value">92%</div>
        </div>
      </div>
    </div>
  `;
}

// ---- ATTENDANCE ----
function renderAttendance() {
  const rows = MOCK.attendance.map(a => `
    <tr>
      <td style="font-weight:500">${a.name}</td>
      <td><code style="font-size:12px;background:var(--bg-tertiary);padding:2px 8px;border-radius:4px">${a.cpf}</code></td>
      <td>${a.startTime}</td>
      <td>${a.endTime}</td>
      <td>${a.popups}</td>
      <td>${a.score}</td>
      <td><span class="badge ${a.status === 'present' ? 'badge-success' : 'badge-danger'}">${a.status === 'present' ? 'Presente' : 'Ausente'}</span></td>
    </tr>
  `).join('');

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Lista de Presença</h1>
        <p class="page-description">NR-6 — Equipamentos de Proteção Individual · Turma A · 20/06/2026</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm">${icons.download} Exportar CSV</button>
        <button class="btn btn-primary btn-sm">${icons.download} Exportar PDF</button>
      </div>
    </div>

    <div class="grid-4" style="margin-bottom:24px">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-card-icon green">👥</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">10</div>
        <div class="stat-card-label">Total de Participantes</div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-card-icon blue">✅</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">8</div>
        <div class="stat-card-label">Presentes (≥70%)</div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-card-icon red">❌</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">2</div>
        <div class="stat-card-label">Ausentes (&lt;70%)</div>
      </div>
      <div class="stat-card animate-fade-in stagger-4">
        <div class="stat-card-icon yellow">📊</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">87%</div>
        <div class="stat-card-label">Média de Pop-ups</div>
      </div>
    </div>

    <div class="table-wrapper animate-fade-in">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Pop-ups Válidos</th>
            <th>Nota</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ---- CHATBOT ----
function renderChatbot() {
  const suggestions = MOCK.chatSuggestions.map(s => `
    <button class="chat-suggestion">${s}</button>
  `).join('');

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Assistente IA</h1>
        <p class="page-description">Agente inteligente para dúvidas sobre NR-6 e a plataforma de treinamentos</p>
      </div>
      <span class="badge badge-success">🟢 IA Online</span>
    </div>

    <div class="chat-container animate-fade-in">
      <div class="chat-header">
        <div class="chat-header-avatar">🤖</div>
        <div class="chat-header-info">
          <h3>JDE Assistant</h3>
          <p>Online</p>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="chat-message bot">
          <div class="chat-message-avatar">🤖</div>
          <div class="chat-message-bubble">Olá! Sou o assistente de treinamentos da JDE Peet's. Estou aqui para ajudar com suas dúvidas sobre a NR-6 e Equipamentos de Proteção Individual. Pode me perguntar sobre tipos de EPI, obrigações, certificados, avaliação, ou qualquer outro assunto do treinamento!</div>
        </div>
      </div>
      <div class="chat-suggestions" id="chatSuggestions">${suggestions}</div>
      <div class="chat-input-area">
        <textarea class="chat-input" id="chatInput" placeholder="Digite sua dúvida sobre o treinamento..." rows="1"></textarea>
        <button class="chat-send-btn" id="chatSendBtn">${icons.send}</button>
      </div>
    </div>
  `;
}

// ---- ADMIN DASHBOARD ----
function renderAdminDashboard() {
  const totalCadastrados = MOCK.adminUsers.length;
  const fizeram = MOCK.adminUsers.filter(u => u.status === 'active' && u.trainings >= 1).length;
  const naoFizeram = totalCadastrados - fizeram;
  const pctFizeram = Math.round((fizeram / totalCadastrados) * 100);
  const pctNaoFizeram = 100 - pctFizeram;

  const userRows = MOCK.adminUsers.map(u => {
    const fez = u.status === 'active' && u.trainings >= 1;
    return `
      <tr>
        <td>
          <div class="flex items-center gap-3">
            <div class="sidebar-avatar" style="width:32px;height:32px;font-size:11px">${u.name.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <div style="font-weight:500">${u.name}</div>
              <div style="font-size:11px;color:var(--text-tertiary)">${u.email}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-neutral">${u.role}</span></td>
        <td><span class="badge ${fez ? 'badge-success' : 'badge-danger'}">${fez ? '✓ Concluído' : '✗ Pendente'}</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h1 class="page-title">Dashboard Administrativo</h1>
      <p class="page-description">Visão geral do treinamento NR-6 — Equipamentos de Proteção Individual</p>
    </div>

    <div class="grid-3" style="margin-bottom:28px">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-card-header">
          <div class="stat-card-icon purple">👥</div>
        </div>
        <div class="stat-card-value">${totalCadastrados}</div>
        <div class="stat-card-label">Pessoas Cadastradas</div>
        <div style="font-size:12px;color:var(--text-tertiary);margin-top:6px">Total de colaboradores na plataforma</div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-card-header">
          <div class="stat-card-icon green">✅</div>
          <div class="stat-card-trend up">${icons.arrowUp} ${pctFizeram}%</div>
        </div>
        <div class="stat-card-value">${fizeram}</div>
        <div class="stat-card-label">Fizeram o Treinamento</div>
        <div style="margin-top:8px">
          <div class="progress-bar" style="height:6px">
            <div class="progress-bar-fill green" style="width:${pctFizeram}%"></div>
          </div>
        </div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-card-header">
          <div class="stat-card-icon red">⏳</div>
          <div class="stat-card-trend down" style="color:var(--accent-danger)">${pctNaoFizeram}% pendente</div>
        </div>
        <div class="stat-card-value">${naoFizeram}</div>
        <div class="stat-card-label">Ainda Não Fizeram</div>
        <div style="margin-top:8px">
          <div class="progress-bar" style="height:6px">
            <div class="progress-bar-fill red" style="width:${pctNaoFizeram}%"></div>
          </div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px">
      <div class="card animate-fade-in stagger-4" style="text-align:center;padding:32px">
        <div style="position:relative;width:180px;height:180px;margin:0 auto 20px">
          <svg viewBox="0 0 36 36" style="width:180px;height:180px;transform:rotate(-90deg)">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bg-tertiary)" stroke-width="3"/>
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-success)" stroke-width="3" stroke-dasharray="${pctFizeram}, 100" stroke-linecap="round"/>
          </svg>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center">
            <div style="font-size:32px;font-weight:800;color:var(--accent-success)">${pctFizeram}%</div>
            <div style="font-size:11px;color:var(--text-tertiary)">concluíram</div>
          </div>
        </div>
        <h3 style="font-size:15px;font-weight:600;margin-bottom:12px">Taxa de Conclusão</h3>
        <div style="display:flex;justify-content:center;gap:24px">
          <div class="flex items-center gap-2"><div style="width:10px;height:10px;border-radius:2px;background:var(--accent-success)"></div><span style="font-size:12px">Concluíram (${fizeram})</span></div>
          <div class="flex items-center gap-2"><div style="width:10px;height:10px;border-radius:2px;background:var(--bg-tertiary)"></div><span style="font-size:12px">Pendentes (${naoFizeram})</span></div>
        </div>
      </div>

      <div class="card animate-fade-in stagger-5">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Resumo do Treinamento</h3>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="flex justify-between items-center" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div style="font-size:13px;color:var(--text-secondary)">Treinamento</div>
            <div style="font-size:13px;font-weight:600">NR-6 — EPI</div>
          </div>
          <div class="flex justify-between items-center" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div style="font-size:13px;color:var(--text-secondary)">Carga Horária</div>
            <div style="font-size:13px;font-weight:600">3h 00min</div>
          </div>
          <div class="flex justify-between items-center" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div style="font-size:13px;color:var(--text-secondary)">Meta de Aprovação</div>
            <div style="font-size:13px;font-weight:600;color:var(--jde-gold)">80%</div>
          </div>
          <div class="flex justify-between items-center" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div style="font-size:13px;color:var(--text-secondary)">Prazo Final</div>
            <div style="font-size:13px;font-weight:600">15/07/2026</div>
          </div>
          <div class="flex justify-between items-center" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div style="font-size:13px;color:var(--text-secondary)">Certificados Emitidos</div>
            <div style="font-size:13px;font-weight:600">${fizeram}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card animate-fade-in stagger-6">
      <div class="flex justify-between items-center" style="margin-bottom:16px">
        <h3 style="font-size:15px;font-weight:600">Status por Colaborador</h3>
        <button class="btn btn-ghost btn-sm" onclick="navigate('admin-users')">Ver todos →</button>
      </div>
      <div class="table-wrapper" style="border:none">
        <table class="table">
          <thead>
            <tr><th>Colaborador</th><th>Função</th><th>Status NR-6</th></tr>
          </thead>
          <tbody>${userRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- ADMIN TRAININGS (Create/Manage) ----
function renderAdminTrainings() {
  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Gerenciar Treinamentos</h1>
        <p class="page-description">Cadastre e gerencie os treinamentos da plataforma</p>
      </div>
      <button class="btn btn-primary">${icons.plus} Novo Treinamento</button>
    </div>

    <div class="card animate-fade-in" style="margin-bottom:28px">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:20px">Cadastrar Treinamento</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div class="form-group">
          <label class="form-label">Nome do Treinamento</label>
          <input type="text" class="form-input" placeholder="Ex: NR-6 — Equipamentos de Proteção Individual" value="NR-6 — Equipamentos de Proteção Individual">
        </div>
        <div class="form-group">
          <label class="form-label">Categoria</label>
          <select class="form-input">
            <option>Segurança</option>
            <option>Compliance</option>
            <option>Onboarding</option>
            <option>Meio Ambiente</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Carga Horária</label>
          <input type="text" class="form-input" placeholder="Ex: 2h 30min" value="2h 30min">
        </div>
        <div class="form-group">
          <label class="form-label">Meta de Aprovação (%)</label>
          <input type="number" class="form-input" placeholder="80" value="80">
        </div>
        <div class="form-group">
          <label class="form-label">Quantidade de Pop-ups</label>
          <input type="number" class="form-input" placeholder="14" value="14">
        </div>
        <div class="form-group">
          <label class="form-label">Instrutor</label>
          <input type="text" class="form-input" placeholder="Nome do instrutor" value="Carlos Silva">
        </div>
        <div class="form-group" style="grid-column:1/-1">
          <label class="form-label">Descrição</label>
          <textarea class="form-input" placeholder="Descreva o treinamento...">Capacitação obrigatória para atividades em altura superior a 2 metros.</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Upload de Vídeo</label>
          <div style="border:2px dashed var(--border-primary);border-radius:var(--radius-md);padding:32px;text-align:center;cursor:pointer">
            <div style="font-size:24px;margin-bottom:8px">📹</div>
            <div style="font-size:13px;color:var(--text-secondary)">Arraste o vídeo aqui ou clique para selecionar</div>
            <div style="font-size:11px;color:var(--text-tertiary);margin-top:4px">MP4, AVI, MOV · Máx 2GB</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Upload de Material PDF</label>
          <div style="border:2px dashed var(--border-primary);border-radius:var(--radius-md);padding:32px;text-align:center;cursor:pointer">
            <div style="font-size:24px;margin-bottom:8px">📄</div>
            <div style="font-size:13px;color:var(--text-secondary)">Arraste o PDF aqui ou clique para selecionar</div>
            <div style="font-size:11px;color:var(--text-tertiary);margin-top:4px">PDF · Máx 50MB</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2" style="margin-top:20px">
        <button class="btn btn-secondary">Cancelar</button>
        <button class="btn btn-primary">💾 Salvar Treinamento</button>
      </div>
    </div>

    <div class="table-wrapper animate-fade-in">
      <table class="table">
        <thead>
          <tr>
            <th>Treinamento</th>
            <th>Categoria</th>
            <th>Duração</th>
            <th>Alunos</th>
            <th>Meta</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${MOCK.trainings.map(t => `
            <tr>
              <td style="font-weight:500">${t.title}</td>
              <td><span class="badge badge-primary">${t.category}</span></td>
              <td>${t.duration}</td>
              <td>${t.students}</td>
              <td>80%</td>
              <td><span class="badge ${t.status === 'completed' ? 'badge-success' : t.status === 'in_progress' ? 'badge-info' : 'badge-neutral'}">${t.status === 'completed' ? 'Ativo' : t.status === 'in_progress' ? 'Ativo' : 'Rascunho'}</span></td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-sm">✏️</button>
                  <button class="btn btn-ghost btn-sm">${icons.eye}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ---- ADMIN USERS ----
function renderAdminUsers() {
  const rows = MOCK.adminUsers.map(u => `
    <tr>
      <td>
        <div class="flex items-center gap-3">
          <div class="sidebar-avatar" style="width:32px;height:32px;font-size:11px">${u.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div style="font-weight:500">${u.name}</div>
            <div style="font-size:11px;color:var(--text-tertiary)">${u.email}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-neutral">${u.role}</span></td>
      <td>${u.trainings}</td>
      <td><span class="badge ${u.status === 'active' ? 'badge-success' : u.status === 'inactive' ? 'badge-neutral' : 'badge-warning'}">${u.status === 'active' ? 'Ativo' : u.status === 'inactive' ? 'Inativo' : 'Pendente'}</span></td>
      <td>
        <div class="flex gap-1">
          <button class="btn btn-ghost btn-sm">✏️</button>
          <button class="btn btn-ghost btn-sm">${icons.eye}</button>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Gerenciar Usuários</h1>
        <p class="page-description">${MOCK.adminUsers.length} usuários cadastrados</p>
      </div>
      <button class="btn btn-primary">${icons.plus} Novo Usuário</button>
    </div>

    <div class="filter-bar">
      <div class="filter-search">
        <span class="filter-search-icon">${icons.search}</span>
        <input type="text" class="form-input" placeholder="Buscar usuários...">
      </div>
      <select class="form-input" style="width:auto;padding:8px 36px 8px 12px;font-size:13px">
        <option>Todos os status</option>
        <option>Ativos</option>
        <option>Inativos</option>
        <option>Pendentes</option>
      </select>
    </div>

    <div class="table-wrapper animate-fade-in">
      <table class="table">
        <thead>
          <tr><th>Usuário</th><th>Função</th><th>Treinamentos</th><th>Status</th><th>Ações</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ---- ADMIN QUESTIONS ----
function renderAdminQuestions() {
  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Banco de Questões</h1>
        <p class="page-description">Cadastre e gerencie as questões de avaliação</p>
      </div>
      <button class="btn btn-primary">${icons.plus} Nova Questão</button>
    </div>

    <div class="card animate-fade-in" style="margin-bottom:28px">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:20px">Cadastrar Questão</h3>
      <div class="form-group">
        <label class="form-label">Tema</label>
        <select class="form-input">
          <option>Introdução à NR-6 e Legislação</option>
          <option>Tipos de EPI e Aplicações</option>
          <option>Conservação e Higienização</option>
          <option>Responsabilidades do Empregador e Empregado</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Pergunta</label>
        <textarea class="form-input" placeholder="Digite a pergunta..."></textarea>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="form-group">
          <label class="form-label">Alternativa A</label>
          <input type="text" class="form-input" placeholder="Alternativa A">
        </div>
        <div class="form-group">
          <label class="form-label">Alternativa B</label>
          <input type="text" class="form-input" placeholder="Alternativa B">
        </div>
        <div class="form-group">
          <label class="form-label">Alternativa C</label>
          <input type="text" class="form-input" placeholder="Alternativa C">
        </div>
        <div class="form-group">
          <label class="form-label">Alternativa D</label>
          <input type="text" class="form-input" placeholder="Alternativa D">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Resposta Correta</label>
        <select class="form-input" style="width:200px">
          <option>Alternativa A</option>
          <option>Alternativa B</option>
          <option>Alternativa C</option>
          <option>Alternativa D</option>
        </select>
      </div>
      <div class="flex justify-end gap-2" style="margin-top:12px">
        <button class="btn btn-secondary">Cancelar</button>
        <button class="btn btn-primary">${icons.plus} Adicionar Questão</button>
      </div>
    </div>

    <div class="table-wrapper animate-fade-in">
      <table class="table">
        <thead>
          <tr><th>#</th><th>Tema</th><th>Pergunta</th><th>Alternativas</th><th>Ações</th></tr>
        </thead>
        <tbody>
          ${MOCK.questions.map((q, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><span class="badge badge-primary">${q.theme}</span></td>
              <td style="max-width:300px" class="truncate">${q.question}</td>
              <td>${q.options.length} opções</td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-sm">✏️</button>
                  <button class="btn btn-ghost btn-sm" style="color:var(--accent-danger)">🗑️</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ---- ADMIN REPORTS ----
function renderAdminReports() {
  const chartBars = MOCK.chartData.monthly.map((v, i) => `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div style="height:${v}%;width:100%;background:var(--accent-info);border-radius:4px 4px 0 0;opacity:${0.4 + (v / 100) * 0.6}"></div>
      <span style="font-size:10px;color:var(--text-tertiary)">${MOCK.chartData.labels[i]}</span>
    </div>
  `).join('');

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Relatórios</h1>
        <p class="page-description">Análise detalhada do desempenho da plataforma</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm">${icons.download} Exportar CSV</button>
        <button class="btn btn-primary btn-sm">${icons.download} Exportar PDF</button>
      </div>
    </div>

    <div class="grid-4" style="margin-bottom:28px">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-card-icon green">📊</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">87%</div>
        <div class="stat-card-label">Taxa de Aprovação</div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-card-icon blue">⏱️</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">2h 15m</div>
        <div class="stat-card-label">Tempo Médio</div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-card-icon purple">🏆</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">312</div>
        <div class="stat-card-label">Certificados Emitidos</div>
      </div>
      <div class="stat-card animate-fade-in stagger-4">
        <div class="stat-card-icon yellow">🔄</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">23</div>
        <div class="stat-card-label">Recuperações por Tema</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px">
      <div class="card animate-fade-in stagger-5">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:20px">Certificados Emitidos por Mês</h3>
        <div style="height:200px;display:flex;align-items:flex-end;gap:6px;padding-top:10px">${chartBars}</div>
      </div>

      <div class="card animate-fade-in stagger-6">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:20px">Desempenho por Treinamento</h3>
        <div style="display:flex;flex-direction:column;gap:16px">
          ${MOCK.trainings.slice(0, 4).map(t => `
            <div>
              <div class="flex justify-between" style="margin-bottom:6px">
                <span style="font-size:13px;font-weight:500">${t.title.split('—')[0].trim()}</span>
                <span style="font-size:13px;font-weight:600">${Math.floor(75 + Math.random() * 20)}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill green" style="width:${75 + Math.floor(Math.random() * 20)}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="card animate-fade-in">
      <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Top Treinamentos por Conclusão</h3>
      <div class="table-wrapper" style="border:none">
        <table class="table">
          <thead>
            <tr><th>Treinamento</th><th>Matrículas</th><th>Conclusões</th><th>Taxa</th><th>Nota Média</th></tr>
          </thead>
          <tbody>
            ${MOCK.trainings.map(t => `
              <tr>
                <td style="font-weight:500">${t.title}</td>
                <td>${t.students}</td>
                <td>${Math.floor(t.students * 0.85)}</td>
                <td><span class="badge badge-success">${Math.floor(80 + Math.random() * 15)}%</span></td>
                <td>⭐ ${t.rating}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- ADMIN LGPD ----
function renderAdminLGPD() {
  return `
    <div class="page-header">
      <h1 class="page-title">Configurações LGPD</h1>
      <p class="page-description">Gerenciamento de conformidade com a Lei Geral de Proteção de Dados</p>
    </div>

    <div class="grid-4" style="margin-bottom:28px">
      <div class="stat-card animate-fade-in stagger-1">
        <div class="stat-card-icon green">✅</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">100%</div>
        <div class="stat-card-label">Conformidade</div>
      </div>
      <div class="stat-card animate-fade-in stagger-2">
        <div class="stat-card-icon blue">📋</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">248</div>
        <div class="stat-card-label">Consentimentos</div>
      </div>
      <div class="stat-card animate-fade-in stagger-3">
        <div class="stat-card-icon yellow">📩</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">${MOCK.lgpdSettings.dataRequests}</div>
        <div class="stat-card-label">Solicitações de Dados</div>
      </div>
      <div class="stat-card animate-fade-in stagger-4">
        <div class="stat-card-icon red">🗑️</div>
        <div class="stat-card-value" style="font-size:24px;margin-top:12px">${MOCK.lgpdSettings.pendingDeletions}</div>
        <div class="stat-card-label">Exclusões Pendentes</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px">
      <div class="card animate-fade-in stagger-5">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:20px">Termo de Consentimento</h3>
        <div class="form-group">
          <label class="form-label">Texto do Consentimento (Resumo)</label>
          <textarea class="form-input" style="min-height:120px">${MOCK.lgpdSettings.consentText}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Tempo de Retenção de Logs (dias)</label>
          <input type="number" class="form-input" value="${MOCK.lgpdSettings.retentionDays}">
          <p style="font-size:11px;color:var(--text-tertiary);margin-top:4px">Logs de pop-ups serão excluídos automaticamente após este período</p>
        </div>
        <button class="btn btn-primary" style="margin-top:8px">💾 Salvar Configurações</button>
      </div>

      <div class="card animate-fade-in stagger-6">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:20px">Políticas e Segurança</h3>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="flex items-center justify-between" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div>
              <div style="font-size:13px;font-weight:600">Criptografia em Trânsito</div>
              <div style="font-size:11px;color:var(--text-tertiary)">TLS 1.3</div>
            </div>
            <span class="badge badge-success">Ativo</span>
          </div>
          <div class="flex items-center justify-between" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div>
              <div style="font-size:13px;font-weight:600">Criptografia em Repouso</div>
              <div style="font-size:11px;color:var(--text-tertiary)">AES-256</div>
            </div>
            <span class="badge badge-success">Ativo</span>
          </div>
          <div class="flex items-center justify-between" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div>
              <div style="font-size:13px;font-weight:600">Anonimização de CPF</div>
              <div style="font-size:11px;color:var(--text-tertiary)">XXX.XXX.123-XX</div>
            </div>
            <span class="badge badge-success">Ativo</span>
          </div>
          <div class="flex items-center justify-between" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div>
              <div style="font-size:13px;font-weight:600">Logs de Acesso</div>
              <div style="font-size:11px;color:var(--text-tertiary)">Última auditoria: ${MOCK.lgpdSettings.lastAudit}</div>
            </div>
            <span class="badge badge-success">Ativo</span>
          </div>
          <div class="flex items-center justify-between" style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <div>
              <div style="font-size:13px;font-weight:600">Consentimento em Duas Camadas</div>
              <div style="font-size:11px;color:var(--text-tertiary)">Resumo + Termo completo</div>
            </div>
            <span class="badge badge-success">Ativo</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card animate-fade-in">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Solicitações de Exclusão de Dados</h3>
      <div class="table-wrapper" style="border:none">
        <table class="table">
          <thead>
            <tr><th>Solicitante</th><th>CPF</th><th>Data</th><th>Tipo</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:500">Maria Oliveira</td>
              <td><code style="font-size:12px;background:var(--bg-tertiary);padding:2px 8px;border-radius:4px">XXX.XXX.321-XX</code></td>
              <td>25/06/2026</td>
              <td>Exclusão total</td>
              <td><span class="badge badge-warning">Pendente</span></td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-success btn-sm">Aprovar</button>
                  <button class="btn btn-ghost btn-sm">${icons.eye}</button>
                </div>
              </td>
            </tr>
            <tr>
              <td style="font-weight:500">Fernando Costa</td>
              <td><code style="font-size:12px;background:var(--bg-tertiary);padding:2px 8px;border-radius:4px">XXX.XXX.147-XX</code></td>
              <td>22/06/2026</td>
              <td>Exportação de dados</td>
              <td><span class="badge badge-success">Concluído</span></td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-sm">${icons.download}</button>
                  <button class="btn btn-ghost btn-sm">${icons.eye}</button>
                </div>
              </td>
            </tr>
            <tr>
              <td style="font-weight:500">Pedro Henrique</td>
              <td><code style="font-size:12px;background:var(--bg-tertiary);padding:2px 8px;border-radius:4px">XXX.XXX.369-XX</code></td>
              <td>18/06/2026</td>
              <td>Exclusão total</td>
              <td><span class="badge badge-success">Concluído</span></td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-sm">${icons.eye}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- ADMIN CERTIFICATES (Cards por colaborador) ----
function renderAdminCertificates() {
  const usersWithCerts = MOCK.adminUsers.filter(u => u.status === 'active' && u.trainings >= 1);
  const usersWithout = MOCK.adminUsers.filter(u => u.status !== 'active' || u.trainings < 1);

  const certCards = usersWithCerts.map((u, i) => {
    const initials = u.name.split(' ').map(n => n[0]).join('');
    const hash = (Math.random().toString(36).substring(2, 8) + '-' + Math.random().toString(36).substring(2, 6)).toUpperCase();
    const nota = Math.floor(80 + Math.random() * 18);
    const dataConc = `${Math.floor(18 + Math.random() * 8)}/06/2026`;
    return `
      <div class="card animate-fade-in stagger-${(i % 4) + 1}" style="padding:20px">
        <div class="flex items-center gap-3" style="margin-bottom:16px">
          <div class="sidebar-avatar" style="width:42px;height:42px;font-size:14px">${initials}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:600">${u.name}</div>
            <div style="font-size:12px;color:var(--text-tertiary)">${u.role} · ${u.email}</div>
          </div>
          <span class="badge badge-success">Certificado ✓</span>
        </div>
        <div style="background:var(--bg-secondary);border-radius:var(--radius-md);padding:14px;margin-bottom:12px">
          <div style="font-size:12px;font-weight:600;color:var(--jde-gold);margin-bottom:8px">🏆 NR-6 — Equipamentos de Proteção Individual</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px">
            <div><span style="color:var(--text-tertiary)">Conclusão:</span> <strong>${dataConc}</strong></div>
            <div><span style="color:var(--text-tertiary)">Nota:</span> <strong style="color:var(--accent-success)">${nota}%</strong></div>
            <div><span style="color:var(--text-tertiary)">Carga Horária:</span> <strong>3h 00min</strong></div>
            <div><span style="color:var(--text-tertiary)">Validade:</span> <strong>${dataConc.replace('2026', '2027')}</strong></div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <code style="font-size:10px;color:var(--text-tertiary);background:var(--bg-tertiary);padding:3px 8px;border-radius:4px">Hash: ${hash}</code>
          <button class="btn btn-ghost btn-sm" style="font-size:12px">${icons.eye} Ver certificado</button>
        </div>
      </div>
    `;
  }).join('');

  const pendingRows = usersWithout.map(u => `
    <div class="flex items-center gap-3" style="padding:10px 0;border-bottom:1px solid var(--border-secondary)">
      <div class="sidebar-avatar" style="width:32px;height:32px;font-size:11px">${u.name.split(' ').map(n => n[0]).join('')}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500">${u.name}</div>
        <div style="font-size:11px;color:var(--text-tertiary)">${u.role}</div>
      </div>
      <span class="badge badge-danger">Sem certificado</span>
    </div>
  `).join('');

  let html = '<div class="page-header flex justify-between items-center"><div><h1 class="page-title">Certificados por Colaborador</h1><p class="page-description">Visualize os certificados emitidos para cada colaborador ativo</p></div><div class="flex gap-2"><span class="badge badge-success" style="padding:6px 14px;font-size:13px">' + usersWithCerts.length + ' certificado(s)</span><span class="badge badge-danger" style="padding:6px 14px;font-size:13px">' + usersWithout.length + ' pendente(s)</span></div></div>';
  html += '<div class="grid-2" style="margin-bottom:28px">' + certCards + '</div>';
  if (usersWithout.length > 0) {
    html += '<div class="card animate-fade-in"><h3 style="font-size:15px;font-weight:600;margin-bottom:12px">⏳ Colaboradores sem Certificado</h3>' + pendingRows + '</div>';
  }
  return html;
}

// ---- ADMIN AI ASSISTANT ----
const adminAiKnowledge = [
  {
    keywords: ['quem não fez', 'quem nao fez', 'pendente', 'falta fazer', 'não fizeram', 'nao fizeram', 'quem falta'],
    answer: () => {
      const pendentes = MOCK.adminUsers.filter(u => u.status !== 'active' || u.trainings < 1);
      if (pendentes.length === 0) return 'Todos os colaboradores já concluíram o treinamento NR-6! 🎉';
      const lista = pendentes.map(u => `• ${u.name} (${u.role}) — ${u.email}`).join('\n');
      return `Os seguintes colaboradores ainda NÃO concluíram o treinamento NR-6:\n\n${lista}\n\nTotal: ${pendentes.length} pendente(s). Deseja enviar uma notificação para eles?`;
    }
  },
  {
    keywords: ['quem fez', 'quem concluiu', 'concluíram', 'concluiram', 'fizeram', 'aprovado'],
    answer: () => {
      const feitos = MOCK.adminUsers.filter(u => u.status === 'active' && u.trainings >= 1);
      const lista = feitos.map(u => `• ${u.name} (${u.role})`).join('\n');
      return `Colaboradores que JÁ concluíram o NR-6:\n\n${lista}\n\nTotal: ${feitos.length} de ${MOCK.adminUsers.length} (${Math.round(feitos.length/MOCK.adminUsers.length*100)}%)`;
    }
  },
  {
    keywords: ['quantos', 'quantas', 'total', 'cadastrados', 'cadastradas', 'número', 'numero'],
    answer: () => {
      const total = MOCK.adminUsers.length;
      const feitos = MOCK.adminUsers.filter(u => u.status === 'active' && u.trainings >= 1).length;
      const pendentes = total - feitos;
      return `Resumo do treinamento NR-6:\n\n👥 Total cadastrados: ${total}\n✅ Concluíram: ${feitos} (${Math.round(feitos/total*100)}%)\n⏳ Pendentes: ${pendentes} (${Math.round(pendentes/total*100)}%)\n📅 Prazo final: 15/07/2026`;
    }
  },
  {
    keywords: ['enviar mensagem', 'notificar', 'notificação', 'notificacao', 'avisar', 'lembrete', 'cobrar', 'mandar mensagem'],
    answer: 'Para enviar uma mensagem a um colaborador:\n\n1. Use o formulário abaixo "Enviar Mensagem"\n2. Selecione o colaborador destinatário\n3. Escreva o assunto e a mensagem\n4. Clique em "Enviar"\n\nA mensagem aparecerá na aba "Supervisão" do colaborador. Você também pode usar os botões rápidos para enviar lembretes automáticos sobre treinamentos pendentes.'
  },
  {
    keywords: ['relatório', 'relatorio', 'exportar', 'csv', 'pdf', 'lista'],
    answer: () => {
      const total = MOCK.adminUsers.length;
      const feitos = MOCK.adminUsers.filter(u => u.status === 'active' && u.trainings >= 1).length;
      return `Relatório disponível:\n\n📊 Taxa de conclusão: ${Math.round(feitos/total*100)}%\n📋 Lista de presença: ${MOCK.attendance.length} registros\n🏆 Certificados emitidos: ${feitos}\n\nPara exportar, acesse as páginas "Relatórios" ou "Lista de Presença" no menu lateral e clique em "Exportar CSV" ou "Exportar PDF".`;
    }
  },
  {
    keywords: ['prazo', 'data', 'vencimento', 'quando', 'deadline'],
    answer: 'Prazos do treinamento NR-6:\n\n📅 Início das matrículas: 15/06/2026\n📅 Prazo final: 15/07/2026\n⏰ Dias restantes: 17 dias\n\nColaboradores que não concluírem dentro do prazo ficarão com status "Não Conforme" e serão notificados automaticamente.'
  },
  {
    keywords: ['olá', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'ajuda', 'help'],
    answer: 'Olá! Sou o assistente administrativo da JDE Peet\'s Training. Posso ajudar com:\n\n• "Quem não fez o treinamento?" — lista de pendentes\n• "Quantos concluíram?" — resumo geral\n• "Enviar mensagem" — notificar colaboradores\n• "Relatório" — dados de conclusão\n• "Prazo" — datas e deadlines\n\nTambém posso enviar lembretes automáticos para quem está com treinamento pendente.'
  },
  {
    keywords: ['lembrete automático', 'lembrete automatico', 'enviar para todos', 'cobrar todos', 'notificar pendentes'],
    answer: () => {
      const pendentes = MOCK.adminUsers.filter(u => u.status !== 'active' || u.trainings < 1);
      if (pendentes.length === 0) return 'Não há colaboradores pendentes! Todos já concluíram o treinamento. 🎉';
      const nomes = pendentes.map(u => u.name).join(', ');
      MOCK.supervisorMessages.unshift({
        id: Date.now(),
        from: 'Ana Souza (Supervisora)',
        to: 'Todos pendentes',
        date: new Date().toLocaleString('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}),
        subject: 'Lembrete: Treinamento NR-6 pendente',
        body: `Prezado(a) colaborador(a), identificamos que o treinamento NR-6 — Equipamentos de Proteção Individual ainda não foi concluído. O prazo final é 15/07/2026. Por favor, acesse a plataforma e conclua o treinamento o quanto antes. Em caso de dúvidas, entre em contato com a supervisão.`,
        read: false
      });
      return `✅ Lembrete enviado com sucesso para ${pendentes.length} colaborador(es) pendente(s):\n\n${nomes}\n\nA mensagem aparecerá na aba "Supervisão" de cada colaborador.`;
    }
  }
];

function processAdminAI(userMessage) {
  const msg = userMessage.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let bestMatch = null;
  let bestScore = 0;
  for (const entry of adminAiKnowledge) {
    let score = 0;
    let matchCount = 0;
    for (const kw of entry.keywords) {
      const kwNorm = kw.normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (msg.includes(kwNorm)) { score += kwNorm.length + 3; matchCount++; }
    }
    if (matchCount > 1) score *= 1.5;
    if (score > bestScore) { bestScore = score; bestMatch = entry; }
  }
  if (bestMatch && bestScore >= 2) {
    return typeof bestMatch.answer === 'function' ? bestMatch.answer() : bestMatch.answer;
  }
  return 'Posso ajudar com a gestão dos treinamentos. Tente perguntar:\n\n• "Quem não fez o treinamento?"\n• "Quantos concluíram?"\n• "Enviar lembrete para pendentes"\n• "Relatório de conclusão"\n• "Qual o prazo?"';
}

function sendAdminChat() {
  const input = document.getElementById('adminChatInput');
  const container = document.getElementById('adminChatMessages');
  if (!input || !container || !input.value.trim()) return;
  const userMsg = input.value.trim();
  input.value = '';
  container.innerHTML += `
    <div class="chat-message user animate-fade-in-up">
      <div class="chat-message-avatar">AS</div>
      <div class="chat-message-bubble">${userMsg}</div>
    </div>`;
  container.scrollTop = container.scrollHeight;
  const typingId = 'admintyping-' + Date.now();
  container.innerHTML += `
    <div class="chat-message bot animate-fade-in-up" id="${typingId}">
      <div class="chat-message-avatar">🤖</div>
      <div class="chat-message-bubble" style="display:flex;align-items:center;gap:6px">
        <span style="animation:pulse 1s infinite">●</span>
        <span style="animation:pulse 1s infinite 0.2s">●</span>
        <span style="animation:pulse 1s infinite 0.4s">●</span>
      </div>
    </div>`;
  container.scrollTop = container.scrollHeight;
  setTimeout(() => {
    const response = processAdminAI(userMsg);
    const el = document.getElementById(typingId);
    if (el) { el.querySelector('.chat-message-bubble').innerHTML = response.replace(/\n/g, '<br>'); el.querySelector('.chat-message-bubble').style = ''; }
    container.scrollTop = container.scrollHeight;
  }, 600 + Math.random() * 800);
}

function sendSupervisorMessage() {
  const dest = document.getElementById('msgDestinatario');
  const subj = document.getElementById('msgAssunto');
  const body = document.getElementById('msgCorpo');
  if (!dest || !subj || !body || !subj.value.trim() || !body.value.trim()) return;
  MOCK.supervisorMessages.unshift({
    id: Date.now(),
    from: 'Ana Souza (Supervisora)',
    to: dest.value,
    date: new Date().toLocaleString('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}),
    subject: subj.value.trim(),
    body: body.value.trim(),
    read: false
  });
  subj.value = '';
  body.value = '';
  const feedback = document.getElementById('msgFeedback');
  if (feedback) {
    feedback.innerHTML = `<div class="badge badge-success" style="padding:8px 16px;font-size:13px">✅ Mensagem enviada com sucesso para ${dest.value}!</div>`;
    setTimeout(() => { feedback.innerHTML = ''; }, 3000);
  }
}

function renderAdminAI() {
  const adminSuggestions = [
    'Quem não fez o treinamento?',
    'Quantos concluíram?',
    'Enviar lembrete para pendentes',
    'Relatório de conclusão'
  ];

  const destOptions = MOCK.adminUsers.map(u => `<option value="${u.name}">${u.name} (${u.role})</option>`).join('');

  return `
    <div class="page-header">
      <h1 class="page-title">Assistente Administrativo</h1>
      <p class="page-description">Agente IA para gestão de treinamentos e comunicação com colaboradores</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="chat-container animate-fade-in" style="height:500px">
          <div class="chat-header">
            <div class="chat-header-avatar">🤖</div>
            <div class="chat-header-info">
              <h3>Assistente Admin</h3>
              <p>Online</p>
            </div>
          </div>
          <div class="chat-messages" id="adminChatMessages">
            <div class="chat-message bot">
              <div class="chat-message-avatar">🤖</div>
              <div class="chat-message-bubble">Olá Ana! Sou seu assistente administrativo. Posso ajudar com:<br><br>• Listar quem não fez o treinamento<br>• Resumo de conclusão<br>• Enviar lembretes para pendentes<br>• Relatórios e prazos<br><br>O que precisa?</div>
            </div>
          </div>
          <div class="chat-suggestions">${adminSuggestions.map(s => `<button class="chat-suggestion" onclick="document.getElementById('adminChatInput').value='${s}';sendAdminChat()">${s}</button>`).join('')}</div>
          <div class="chat-input-area">
            <textarea class="chat-input" id="adminChatInput" placeholder="Pergunte sobre os treinamentos..." rows="1"></textarea>
            <button class="chat-send-btn" onclick="sendAdminChat()">${icons.send}</button>
          </div>
        </div>
      </div>

      <div>
        <div class="card animate-fade-in" style="margin-bottom:20px">
          <h3 style="font-size:16px;font-weight:600;margin-bottom:20px">📩 Enviar Mensagem ao Colaborador</h3>
          <div class="form-group">
            <label class="form-label">Destinatário</label>
            <select class="form-input" id="msgDestinatario">
              <option value="Todos">Todos os colaboradores</option>
              ${destOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Assunto</label>
            <input type="text" class="form-input" id="msgAssunto" placeholder="Ex: Treinamento NR-6 pendente">
          </div>
          <div class="form-group">
            <label class="form-label">Mensagem</label>
            <textarea class="form-input" id="msgCorpo" placeholder="Escreva a mensagem..." style="min-height:120px"></textarea>
          </div>
          <div id="msgFeedback" style="margin-bottom:12px"></div>
          <div class="flex justify-end gap-2">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('msgAssunto').value='Treinamento NR-6 pendente';document.getElementById('msgCorpo').value='Prezado(a) colaborador(a), identificamos que o treinamento NR-6 — Equipamentos de Proteção Individual ainda não foi concluído. O prazo final é 15/07/2026. Por favor, acesse a plataforma e conclua o quanto antes.'">📝 Modelo Padrão</button>
            <button class="btn btn-primary" onclick="sendSupervisorMessage()">📩 Enviar</button>
          </div>
        </div>

        <div class="card animate-fade-in">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:12px">Mensagens Enviadas</h3>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:200px;overflow-y:auto" id="sentMessagesList">
            ${MOCK.supervisorMessages.map(m => `
              <div style="padding:10px 12px;background:var(--bg-secondary);border-radius:var(--radius-md);font-size:13px">
                <div class="flex justify-between"><span style="font-weight:500">Para: ${m.to}</span><span style="color:var(--text-tertiary);font-size:11px">${m.date}</span></div>
                <div style="color:var(--text-secondary);margin-top:2px">${m.subject}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- SUPERVISION (Aluno) ----
function renderSupervision() {
  const messages = MOCK.supervisorMessages;
  const unread = messages.filter(m => !m.read).length;

  const messageCards = messages.length > 0 ? messages.map((m, i) => `
    <div class="card animate-fade-in stagger-${(i % 4) + 1}" style="margin-bottom:12px;${!m.read ? 'border-left:3px solid var(--jde-gold)' : ''}">
      <div class="flex justify-between items-center" style="margin-bottom:8px">
        <div class="flex items-center gap-2">
          <div class="sidebar-avatar" style="width:28px;height:28px;font-size:10px">AS</div>
          <span style="font-size:13px;font-weight:600">${m.from}</span>
          ${!m.read ? '<span class="badge badge-warning" style="font-size:10px">Nova</span>' : ''}
        </div>
        <span style="font-size:12px;color:var(--text-tertiary)">${m.date}</span>
      </div>
      <div style="font-size:14px;font-weight:600;margin-bottom:6px">${m.subject}</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.6">${m.body}</div>
      ${!m.read ? `<button class="btn btn-ghost btn-sm" style="margin-top:8px;font-size:12px" onclick="MOCK.supervisorMessages[${i}].read=true;render()">✓ Marcar como lida</button>` : ''}
    </div>
  `).join('') : `
    <div class="empty-state">
      <div class="empty-state-icon">📭</div>
      <h3>Nenhuma mensagem</h3>
      <p>Você não tem mensagens da supervisão no momento.</p>
    </div>
  `;

  return `
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title">Supervisão</h1>
        <p class="page-description">Mensagens e orientações do seu supervisor</p>
      </div>
      ${unread > 0 ? `<span class="badge badge-warning" style="font-size:13px;padding:6px 14px">${unread} mensagem(ns) não lida(s)</span>` : '<span class="badge badge-success">Tudo em dia ✓</span>'}
    </div>

    ${messageCards}
  `;
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  render();
});
