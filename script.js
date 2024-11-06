let jogos = []; // Array para armazenar todos os jogos

    function limitarSelecao() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selecionados = Array.from(checkboxes).filter(checkbox => checkbox.checked);
        
        if (selecionados.length >= 20) {
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    checkbox.disabled = true;
                }
            });
        } else {
            checkboxes.forEach(checkbox => checkbox.disabled = false);
        }
    }

    function desmarcarTodos() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
    }

    function salvarJogo() {
        const checkboxes = document.querySelectorAll('input[name="numeros"]:checked');
        let numerosSelecionados = Array.from(checkboxes).map(checkbox => checkbox.value);

        if (numerosSelecionados.length < 5) {
            alert("Você precisa selecionar pelo menos 5 números.");
            return;
        }

        if (numerosSelecionados.length > 20) {
            alert("Você pode selecionar no máximo 20 números.");
            return;
        }

        jogos.push(numerosSelecionados);
        alert(`Jogo salvo! Números: ${numerosSelecionados.join(", ")}`);
        desmarcarTodos(); // Limpa as seleções para um novo jogo
    }

    function mostrarJogos() {
        if (jogos.length === 0) {
            alert("Nenhum jogo salvo.");
        } else {
            let mensagem = "Jogos salvos:\n";
            jogos.forEach((jogo, index) => {
                mensagem += `Jogo ${index + 1}: ${jogo.join(", ")}\n`;
            });
            alert(mensagem);
        }
    }

    function enviarTodosJogos() {
        const nome = document.querySelector('input[placeholder="Nome"]').value;
        const cidade = document.querySelector('input[placeholder="Cidade"]').value;
        const telefone = document.querySelector('input[placeholder="(XX)XXXXX-XXXX"]').value;

        if (!nome || !cidade || !telefone) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        if (jogos.length === 0) {
            alert("Nenhum jogo salvo para enviar.");
            return;
        }

        let mensagem = `Olá, meu nome é ${nome}, sou da cidade de ${cidade}, meu telefone é ${telefone}, e meus jogos são:\n`;
        jogos.forEach((jogo, index) => {
            mensagem += `Jogo ${index + 1}: ${jogo.join(", ")}\n`;
        });

        const url = `https://api.whatsapp.com/send?phone=5519982717180&text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }

    function mascaraTelefone(input) {
        let valor = input.value.replace(/\D/g, ''); 
        
        if (valor.length > 10) {
            valor = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7, 11)}`;
        } else if (valor.length > 5) {
            valor = `(${valor.slice(0, 2)})${valor.slice(2, 6)}-${valor.slice(6)}`;
        } else if (valor.length > 2) {
            valor = `(${valor.slice(0, 2)})${valor.slice(2)}`;
        }
        
        input.value = valor;
    }  