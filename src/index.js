document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("dado").addEventListener("click", async () => {
        const adviceData = await conselhoAleatorio();
        const translatedAdvice = await traduzirTexto(adviceData.advice);
        atualizarConselho(adviceData.id, translatedAdvice);
    });

    // Função para buscar um conselho aleatório
    async function conselhoAleatorio() {
        const url = "https://api.adviceslip.com/advice";
        try {
            const resposta = await fetch(url);
            const data = await resposta.json();
            return data.slip;
        } catch (error) {
            console.error('Erro ao buscar conselho:', error);
        }
    }

    // Função para traduzir o texto
    async function traduzirTexto(texto) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`;
        try {
            const resposta = await fetch(url);
            const data = await resposta.json();
            return data.responseData.translatedText;
        } catch (error) {
            console.error('Erro ao traduzir texto:', error);
            return texto; // Retorna o texto original em caso de erro
        }
    }

    // Função para atualizar o conteúdo do HTML com o novo conselho
    function atualizarConselho(id, texto) {
        const adviceNumber = document.getElementById('advice');
        const adviceMessage = document.getElementById('message');

        adviceNumber.textContent = `CONSELHO # ${id}`;
        adviceMessage.textContent = `"${texto}"`;
    }

    // Busca um conselho inicial ao carregar a página
    (async () => {
        const initialAdvice = await conselhoAleatorio();
        const translatedAdvice = await traduzirTexto(initialAdvice.advice);
        atualizarConselho(initialAdvice.id, translatedAdvice);
    })();
});
