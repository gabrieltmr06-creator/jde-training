const MOCK = {
  user: {
    name: 'Gabriel Melo',
    email: 'gabriel.melo@jde.com.br',
    role: 'Operador',
    avatar: 'GM',
    points: 1250,
    rank: 3
  },
  admin: {
    name: 'Ana Souza',
    email: 'ana.souza@jde.com.br',
    role: 'Administradora',
    avatar: 'AS'
  },
  stats: {
    student: [
      { label: 'Treinamentos Ativos', value: '3', icon: '📚', color: 'purple', trend: '+1 esta semana', up: true },
      { label: 'Concluídos', value: '12', icon: '✅', color: 'green', trend: '+2 este mês', up: true },
      { label: 'Certificados', value: '10', icon: '🏆', color: 'blue', trend: '83% taxa', up: true },
      { label: 'Horas Estudadas', value: '47h', icon: '⏱️', color: 'yellow', trend: '+5h este mês', up: true }
    ],
    admin: [
      { label: 'Total de Usuários', value: '248', icon: '👥', color: 'purple', trend: '+18 este mês', up: true },
      { label: 'Treinamentos Ativos', value: '8', icon: '📚', color: 'blue', trend: '3 novos', up: true },
      { label: 'Taxa de Aprovação', value: '87%', icon: '📊', color: 'green', trend: '+3% vs mês ant.', up: true },
      { label: 'Certificados Emitidos', value: '312', icon: '🏆', color: 'yellow', trend: '+45 este mês', up: true }
    ]
  },
  trainings: [
    {
      id: 1,
      title: 'NR-6 — Equipamentos de Proteção Individual (EPI)',
      description: 'Treinamento obrigatório sobre o uso, conservação e responsabilidades relacionadas aos Equipamentos de Proteção Individual conforme a NR-6 do Ministério do Trabalho.',
      instructor: 'Carlos Silva',
      duration: '3h 00min',
      modules: 5,
      progress: 40,
      status: 'in_progress',
      category: 'Segurança',
      rating: 4.8,
      students: 210,
      cover: 'linear-gradient(135deg, #3F3A31 0%, #6B5B3E 100%)',
      themes: ['Introdução à NR-6 e Legislação', 'Tipos de EPI e Aplicações', 'Conservação e Higienização', 'Responsabilidades do Empregador e Empregado', 'Avaliação Final']
    }
  ],
  questions: [
    {
      id: 1,
      theme: 'Introdução à NR-6 e Legislação',
      question: 'Qual norma regulamentadora trata especificamente dos Equipamentos de Proteção Individual?',
      options: ['NR-5', 'NR-6', 'NR-9', 'NR-12'],
      correct: 1
    },
    {
      id: 2,
      theme: 'Introdução à NR-6 e Legislação',
      question: 'De acordo com a NR-6, quem é responsável por fornecer o EPI ao trabalhador gratuitamente?',
      options: ['O próprio trabalhador', 'O empregador', 'O sindicato da categoria', 'O governo federal'],
      correct: 1
    },
    {
      id: 3,
      theme: 'Tipos de EPI e Aplicações',
      question: 'Qual EPI é indicado para proteção da cabeça contra impactos de objetos?',
      options: ['Óculos de proteção', 'Capacete de segurança', 'Protetor auricular', 'Luva de borracha'],
      correct: 1
    },
    {
      id: 4,
      theme: 'Tipos de EPI e Aplicações',
      question: 'Para que serve o Certificado de Aprovação (CA) presente nos EPIs?',
      options: [
        'Indicar o preço do equipamento',
        'Garantir que o EPI foi testado e aprovado pelo órgão competente',
        'Registrar a data de fabricação',
        'Servir como nota fiscal de compra'
      ],
      correct: 1
    },
    {
      id: 5,
      theme: 'Conservação e Higienização',
      question: 'Qual a responsabilidade do trabalhador em relação ao EPI recebido?',
      options: [
        'Pode emprestar para colegas',
        'Usar, guardar e conservar conforme orientação recebida',
        'Modificar livremente para maior conforto',
        'Devolver somente ao final do contrato'
      ],
      correct: 1
    },
    {
      id: 6,
      theme: 'Conservação e Higienização',
      question: 'O que o trabalhador deve fazer ao identificar que seu EPI está danificado?',
      options: [
        'Continuar usando até o fim do turno',
        'Comunicar imediatamente ao empregador para substituição',
        'Tentar consertar por conta própria',
        'Aguardar a próxima inspeção programada'
      ],
      correct: 1
    },
    {
      id: 7,
      theme: 'Responsabilidades do Empregador e Empregado',
      question: 'Qual das alternativas é uma obrigação do empregador segundo a NR-6?',
      options: [
        'Descontar o valor do EPI no salário do empregado',
        'Fornecer EPI adequado ao risco e em perfeito estado de conservação',
        'Permitir que o empregado escolha não usar o EPI',
        'Substituir o EPI apenas uma vez ao ano'
      ],
      correct: 1
    },
    {
      id: 8,
      theme: 'Responsabilidades do Empregador e Empregado',
      question: 'O que pode acontecer com o trabalhador que se recusar a usar o EPI fornecido?',
      options: [
        'Nada, é opcional',
        'Pode receber advertência e até ser demitido por justa causa',
        'Recebe apenas uma orientação verbal',
        'O empregador assume toda a responsabilidade'
      ],
      correct: 1
    },
    {
      id: 9,
      theme: 'Tipos de EPI e Aplicações',
      question: 'Para trabalhos com exposição a ruídos acima do limite permitido, qual EPI deve ser utilizado?',
      options: [
        'Óculos de segurança',
        'Protetor auricular (abafador ou plug de inserção)',
        'Máscara respiratória',
        'Cinto de segurança'
      ],
      correct: 1
    },
    {
      id: 10,
      theme: 'Introdução à NR-6 e Legislação',
      question: 'Quando o uso de EPI deve ser adotado na empresa?',
      options: [
        'Somente quando não existir proteção coletiva disponível',
        'Sempre que existirem riscos que não puderam ser eliminados por medidas coletivas ou administrativas',
        'Apenas em situações de emergência',
        'Somente em áreas externas da empresa'
      ],
      correct: 1
    }
  ],
  attendance: [
    { name: 'Gabriel Melo', cpf: 'XXX.XXX.123-XX', startTime: '09:00', endTime: '11:32', popups: '12/14 (86%)', score: '90%', status: 'present' },
    { name: 'Ana Souza', cpf: 'XXX.XXX.456-XX', startTime: '09:05', endTime: '11:28', popups: '13/14 (93%)', score: '85%', status: 'present' },
    { name: 'Carlos Silva', cpf: 'XXX.XXX.789-XX', startTime: '09:02', endTime: '11:45', popups: '14/14 (100%)', score: '95%', status: 'present' },
    { name: 'Maria Oliveira', cpf: 'XXX.XXX.321-XX', startTime: '09:10', endTime: '10:15', popups: '4/14 (29%)', score: '—', status: 'absent' },
    { name: 'Roberto Alves', cpf: 'XXX.XXX.654-XX', startTime: '09:01', endTime: '11:30', popups: '11/14 (79%)', score: '78%', status: 'present' },
    { name: 'Patrícia Santos', cpf: 'XXX.XXX.987-XX', startTime: '09:08', endTime: '11:40', popups: '10/14 (71%)', score: '82%', status: 'present' },
    { name: 'Fernando Costa', cpf: 'XXX.XXX.147-XX', startTime: '09:15', endTime: '11:55', popups: '9/14 (64%)', score: '—', status: 'absent' },
    { name: 'Luciana Ferreira', cpf: 'XXX.XXX.258-XX', startTime: '09:00', endTime: '11:35', popups: '13/14 (93%)', score: '92%', status: 'present' },
    { name: 'Pedro Henrique', cpf: 'XXX.XXX.369-XX', startTime: '09:03', endTime: '11:42', popups: '12/14 (86%)', score: '88%', status: 'present' },
    { name: 'Juliana Lima', cpf: 'XXX.XXX.741-XX', startTime: '09:12', endTime: '11:50', popups: '14/14 (100%)', score: '96%', status: 'present' }
  ],
  chatMessages: [
    { role: 'bot', text: 'Olá! Sou o assistente de treinamento da JDE. Como posso ajudar você hoje?' },
    { role: 'user', text: 'Qual o prazo para concluir o treinamento de NR-6?' },
    { role: 'bot', text: 'O treinamento de NR-6 — Equipamentos de Proteção Individual tem um prazo de conclusão de 30 dias a partir da data de matrícula. Você iniciou em 15/06/2026, então o prazo final é 15/07/2026. Lembre-se que é necessário atingir no mínimo 80% de aproveitamento na avaliação.' },
    { role: 'user', text: 'Se eu reprovar em algum tema, o que acontece?' },
    { role: 'bot', text: 'Ótima pergunta! Se você reprovar em um tema específico, nosso sistema de IA adaptativa libera apenas aquele tema para revisão. Você poderá assistir novamente ao conteúdo daquele módulo e refazer a avaliação com questões diferentes, mas do mesmo nível de dificuldade. Os demais temas aprovados ficam mantidos.' }
  ],
  chatSuggestions: [
    'Quais EPIs são obrigatórios?',
    'Como funciona o certificado?',
    'Posso refazer a avaliação?',
    'Quando vencem meus treinamentos?'
  ],
  recentActivity: [
    { action: 'Concluiu módulo 2', training: 'NR-6 — Equipamentos de Proteção Individual', time: 'Há 2 horas' },
    { action: 'Respondeu pop-up corretamente', training: 'NR-6 — Equipamentos de Proteção Individual', time: 'Há 2 horas' },
    { action: 'Iniciou módulo 2', training: 'NR-6 — Equipamentos de Proteção Individual', time: 'Há 3 horas' },
    { action: 'Concluiu módulo 1', training: 'NR-6 — Equipamentos de Proteção Individual', time: 'Ontem' },
    { action: 'Iniciou treinamento', training: 'NR-6 — Equipamentos de Proteção Individual', time: 'Ontem' }
  ],
  ranking: [
    { name: 'Carlos Silva', points: 2100, avatar: 'CS' },
    { name: 'Juliana Lima', points: 1890, avatar: 'JL' },
    { name: 'Gabriel Melo', points: 1250, avatar: 'GM' },
    { name: 'Ana Souza', points: 1180, avatar: 'AS' },
    { name: 'Luciana Ferreira', points: 1050, avatar: 'LF' }
  ],
  adminUsers: [
    { name: 'Gabriel Melo', email: 'gabriel.melo@jde.com.br', role: 'Operador', trainings: 3, status: 'active' },
    { name: 'Ana Souza', email: 'ana.souza@jde.com.br', role: 'Administradora', trainings: 5, status: 'active' },
    { name: 'Carlos Silva', email: 'carlos.silva@jde.com.br', role: 'Instrutor', trainings: 8, status: 'active' },
    { name: 'Maria Oliveira', email: 'maria.oliveira@jde.com.br', role: 'Operadora', trainings: 2, status: 'inactive' },
    { name: 'Roberto Alves', email: 'roberto.alves@jde.com.br', role: 'Supervisor', trainings: 6, status: 'active' },
    { name: 'Patrícia Santos', email: 'patricia.santos@jde.com.br', role: 'RH', trainings: 4, status: 'active' },
    { name: 'Fernando Costa', email: 'fernando.costa@jde.com.br', role: 'Operador', trainings: 1, status: 'pending' },
    { name: 'Luciana Ferreira', email: 'luciana.ferreira@jde.com.br', role: 'Operadora', trainings: 3, status: 'active' }
  ],
  lgpdSettings: {
    consentText: 'Ao utilizar este sistema, você concorda com a coleta e processamento dos seus dados pessoais conforme nossa Política de Privacidade e em conformidade com a LGPD (Lei nº 13.709/2018).',
    retentionDays: 180,
    lastAudit: '15/06/2026',
    dataRequests: 3,
    pendingDeletions: 1
  },
  chartData: {
    monthly: [45, 62, 78, 55, 89, 73, 92, 68, 85, 95, 72, 88],
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  }
};
