const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const imageContainer = document.getElementById('image-container');
const inventoryElement = document.getElementById('inventory');
const restartButton = document.getElementById('restart');

let currentState = {};

function startGame() {
    currentState = { step: 1, inventory: [] };
    restartButton.style.display = 'none';
    updateInventory();
    showStory();
}

function showStory() {
    const storyNode = storyNodes.find(node => node.step === currentState.step);
    storyElement.textContent = storyNode.text;
    choicesElement.innerHTML = '';

    // Atualiza a imagem
    if (storyNode.image) {
        imageContainer.innerHTML = `<img src="${storyNode.image}" alt="Story Image">`;
    } else {
        imageContainer.innerHTML = '';
    }

    // Mostra os botões de escolha
    storyNode.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice.nextStep);
        choicesElement.appendChild(button);
    });

    // Adiciona o item ao inventário, se houver
    if (storyNode.item) {
        addToInventory(storyNode.item);
    }
}

function makeChoice(nextStep) {
    if (nextStep === 'win' || nextStep === 'lose') {
        endGame(nextStep);
    } else {
        currentState.step = nextStep;
        showStory();
    }
}

function endGame(outcome) {
    storyElement.textContent = outcome === 'win' ? 'Parabéns! Você conseguiu sair da escola!' : 'Infelizmente, você não conseguiu sair da escola.';
    choicesElement.innerHTML = '';
    imageContainer.innerHTML = ''; // Limpa a imagem ao finalizar
    restartButton.style.display = 'block';
}

function addToInventory(item) {
    if (!currentState.inventory.includes(item)) {
        currentState.inventory.push(item);
        updateInventory();
    }
}

function updateInventory() {
    inventoryElement.textContent = `Inventário: ${currentState.inventory.join(', ')}`;
}

const storyNodes = [
    // Passos 1-14 (já existentes, ajustados para a nova sequência)
    {
        step: 1,
        text: 'Você é um professor que acabou de terminar suas atividades do dia. Ao tentar sair da escola, percebe que todas as portas estão trancadas. Você decide procurar uma saída, mas precisa resolver alguns enigmas educacionais para conseguir.',
        image: 'images/school_hallway.jpg',
        choices: [
            { text: 'Ir para a biblioteca', nextStep: 2 },
            { text: 'Ir para a sala dos professores', nextStep: 3 },
        ],
    },
    {
        step: 2,
        text: 'Na biblioteca, você encontra um grupo de alunos que está discutindo sobre as melhores práticas de leitura. Um dos alunos pergunta qual a melhor estratégia para promover a leitura crítica entre os colegas.',
        image: 'images/library.jpg',
        choices: [
            { text: 'Organizar debates sobre os livros lidos', nextStep: 4 },
            { text: 'Distribuir resumos prontos para todos', nextStep: 5 },
        ],
    },
    {
        step: 3,
        text: 'Na sala dos professores, você encontra um enigma na mesa: "Qual é a melhor forma de avaliar o progresso dos alunos?"',
        image: 'images/teachers_lounge.jpg',
        choices: [
            { text: 'Usar apenas provas escritas', nextStep: 6 },
            { text: 'Incorporar autoavaliação e feedback contínuo', nextStep: 7 },
        ],
    },
    {
        step: 4,
        text: 'Você organizou debates, e os alunos começaram a desenvolver habilidades críticas. A biblioteca agora tem uma passagem secreta que leva a uma nova sala. Você também encontra uma chave na mesa.',
        image: 'images/library.jpg',
        item: 'Chave da Biblioteca',
        choices: [
            { text: 'Seguir pela passagem secreta', nextStep: 8 },
            { text: 'Explorar a biblioteca mais a fundo', nextStep: 2 },
        ],
    },
    {
        step: 5,
        text: 'Os alunos ficaram desmotivados com os resumos prontos e não desenvolveram a leitura crítica. A biblioteca permanece trancada.',
        image: 'images/locked_door.jpg',
        choices: [
            { text: 'Tentar novamente', nextStep: 1 },
        ],
    },
    {
        step: 6,
        text: 'Os alunos ficaram estressados e a avaliação não refletiu plenamente suas capacidades. A sala dos professores permanece trancada.',
        image: 'images/locked_door.jpg',
        choices: [
            { text: 'Tentar novamente', nextStep: 1 },
        ],
    },
    {
        step: 7,
        text: 'Ao incorporar autoavaliação e feedback contínuo, os alunos começaram a se engajar mais no processo de aprendizado. A chave encontrada na sala dos professores pode ser útil.',
        image: 'images/teachers_lounge.jpg',
        item: 'Chave da Sala dos Professores',
        choices: [
            { text: 'Usar a chave para explorar novas salas', nextStep: 10 },
            { text: 'Voltar para a biblioteca', nextStep: 2 },
        ],
    },
    {
        step: 8,
        text: 'Você segue pela passagem secreta e entra na Sala de Informática. Na mesa, há um enigma sobre conceitos de programação: "Qual é a estrutura básica que permite que um programa execute diferentes ações com base em condições?"',
        image: 'images/computer_room.jpg',
        choices: [
            { text: 'Estrutura Condicional', nextStep: 9 },
            { text: 'Looping', nextStep: 11 },
        ],
    },
    {
        step: 9,
        text: 'A resposta correta abre uma gaveta secreta na Sala de Informática, revelando uma chave importante. Você pode usar essa chave para acessar uma nova sala.',
        image: 'images/computer_room.jpg',
        item: 'Chave da Sala de Informática',
        choices: [
            { text: 'Pegar a chave', nextStep: 12 },
            { text: 'Explorar outras salas', nextStep: 13 },
        ],
    },
    {
        step: 10,
        text: 'Com a chave da sala dos professores, você entra em uma nova sala cheia de material didático. Um enigma na parede diz: "O que é abstração no pensamento computacional?"',
        image: 'images/classroom.jpg',
        choices: [
            { text: 'Ocultar detalhes complexos e focar apenas nas informações relevantes', nextStep: 14 },
            { text: 'Repetir uma tarefa várias vezes', nextStep: 15 },
        ],
    },
    {
        step: 11,
        text: 'A resposta errada ativa um alarme que alerta os alunos. A Sala de Informática agora está trancada, e você precisa encontrar outra maneira de sair.',
        image: 'images/alarm.png',
        choices: [
            { text: 'Voltar para explorar outros locais', nextStep: 1 },
        ],
    },
    {
        step: 12,
        text: 'Com a chave da Sala de Informática, você abre a porta para uma nova sala cheia de livros e materiais de ensino. Um enigma está na parede: "Qual conceito fundamental de programação ajuda a dividir um problema em partes menores e mais gerenciáveis?"',
        image: 'images/library.jpg',
        choices: [
            { text: 'Divisão de Problemas', nextStep: 16 },
            { text: 'Looping', nextStep: 17 },
        ],
    },
    {
        step: 13,
        text: 'Explorando outras salas, você encontra uma sala dedicada à mediação escolar. Um enigma na parede diz: "Qual é a principal função da mediação em conflitos escolares?"',
        image: 'images/classroom.jpg',
        choices: [
            { text: 'Facilitar a comunicação e buscar soluções pacíficas', nextStep: 18 },
            { text: 'Impor uma solução unilateral', nextStep: 19 },
        ],
    },
    {
        step: 14,
        text: 'A resposta correta ativa um sistema de iluminação que revela uma nova sala de saída. Você tem uma chave e um plano de aula para ajudar.',
        image: 'images/school_hallway.jpg',
        item: 'Plano de Aula',
        choices: [
            { text: 'Usar o plano para sair', nextStep: 20 },
            { text: 'Explorar mais a sala', nextStep: 21 },
        ],
    },
    {
        step: 15,
        text: 'A resposta errada bloqueia a porta e você é forçado a tentar novamente. Você precisa resolver o enigma correto para avançar.',
        image: 'images/locked_door.jpg',
        choices: [
            { text: 'Tentar novamente', nextStep: 10 },
        ],
    },
    {
        step: 16,
        text: 'A resposta correta revela uma nova passagem na sala de material didático. Você segue para uma nova sala com um enigma final.',
        image: 'images/hall.jpg',
        choices: [
            { text: 'Seguir para a sala final', nextStep: 22 },
        ],
    },
    {
        step: 17,
        text: 'A resposta errada tranca a sala de material didático. Você precisa procurar outro caminho para continuar.',
        image: 'images/locked_door.jpg',
        choices: [
            { text: 'Voltar para explorar outros caminhos', nextStep: 1 },
        ],
    },
    {
        step: 18,
        text: 'A resposta correta sobre mediação leva você a uma sala final. Um enigma está na parede: "Qual é a melhor forma de promover a colaboração entre os alunos em um projeto?"',
        image: 'images/hall.jpg',
        choices: [
            { text: 'Trabalho em Grupo', nextStep: 23 },
            { text: 'Atividades Individuais', nextStep: 24 },
        ],
    },
    {
        step: 19,
        text: 'A resposta errada faz com que você tenha que retornar e tentar outros caminhos para avançar.',
        image: 'images/locked_door.jpg',
        choices: [
            { text: 'Voltar para explorar outros caminhos', nextStep: 1 },
        ],
    },
    {
        step: 20,
        text: 'Usando o plano de aula, você resolve o enigma final e encontra a saída da escola. Parabéns, você conseguiu!',
        image: 'images/hall.jpg',
        choices: [
            { text: 'Sair da escola', nextStep: 'win' },
        ],
    },
    {
        step: 21,
        text: 'Você decide explorar mais a sala, mas encontra um enigma extra: "Por que é importante promover a colaboração entre os alunos em sala de aula?"',
        image: 'images/hall.jpg',
        choices: [
            { text: 'Desenvolve habilidades sociais e promove a resolução conjunta de problemas', nextStep: 20 },
            { text: 'Para reduzir o tempo de aula necessário', nextStep: 22 },
        ],
    },
    {
        step: 22,
        text: 'Você segue para a sala final com o enigma de colaboração: "Qual é a melhor forma de promover a colaboração entre os alunos em um projeto?"',
        image: 'images/hall.jpg',
        choices: [
            { text: 'Trabalho em Grupo', nextStep: 23 },
            { text: 'Atividades Individuais', nextStep: 24 },
        ],
    },
    {
        step: 23,
        text: 'Você escolhe promover trabalho em grupo, e a colaboração leva à solução final. Você encontrou a saída da escola com sucesso!',
        image: 'images/hall.jpg',
        choices: [
            { text: 'Sair da escola', nextStep: 'win' },
        ],
    },
    {
        step: 24,
        text: 'Você escolhe atividades individuais, mas isso não ajuda a resolver o enigma final. Você precisa voltar e tentar a opção correta.',
        image: 'images/locked_door.jpg',
        choices: [
            { text: 'Voltar e tentar novamente', nextStep: 22 },
        ],
    },
];


startGame();
